"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../../data");
var util_1 = require("../../util");
var aggregate_1 = require("./aggregate");
var dataflow_1 = require("./dataflow");
var facet_1 = require("./facet");
var filterinvalid_1 = require("./filterinvalid");
var optimizers = require("./optimizers");
var stack_1 = require("./stack");
exports.FACET_SCALE_PREFIX = 'scale_';
/**
 * Clones the subtree and ignores output nodes except for the leafs, which are renamed.
 */
function cloneSubtree(facet) {
    function clone(node) {
        if (!(node instanceof facet_1.FacetNode)) {
            var copy_1 = node.clone();
            if (copy_1 instanceof dataflow_1.OutputNode) {
                var newName = exports.FACET_SCALE_PREFIX + copy_1.getSource();
                copy_1.setSource(newName);
                facet.model.component.data.outputNodes[newName] = copy_1;
            }
            else if (copy_1 instanceof aggregate_1.AggregateNode || copy_1 instanceof stack_1.StackNode) {
                copy_1.addDimensions(facet.fields);
            }
            util_1.flatten(node.children.map(clone)).forEach(function (n) { return n.parent = copy_1; });
            return [copy_1];
        }
        return util_1.flatten(node.children.map(clone));
    }
    return clone;
}
/**
 * Move facet nodes down to the next fork or output node. Also pull the main output with the facet node.
 * After moving down the facet node, make a copy of the subtree and make it a child of the main output.
 */
function moveFacetDown(node) {
    if (node instanceof facet_1.FacetNode) {
        if (node.numChildren() === 1 && !(node.children[0] instanceof dataflow_1.OutputNode)) {
            // move down until we hit a fork or output node
            var child = node.children[0];
            if (child instanceof aggregate_1.AggregateNode || child instanceof stack_1.StackNode) {
                child.addDimensions(node.fields);
            }
            child.swapWithParent();
            moveFacetDown(node);
        }
        else {
            // move main to facet
            moveMainDownToFacet(node.model.component.data.main);
            // replicate the subtree and place it before the facet's main node
            var copy = util_1.flatten(node.children.map(cloneSubtree(node)));
            copy.forEach(function (c) { return c.parent = node.model.component.data.main; });
        }
    }
    else {
        node.children.forEach(moveFacetDown);
    }
}
function moveMainDownToFacet(node) {
    if (node instanceof dataflow_1.OutputNode && node.type === data_1.MAIN) {
        if (node.numChildren() === 1) {
            var child = node.children[0];
            if (!(child instanceof facet_1.FacetNode)) {
                child.swapWithParent();
                moveMainDownToFacet(node);
            }
        }
    }
}
/**
 * Remove nodes that are not required starting from a root.
 */
function removeUnnecessaryNodes(node) {
    // remove empty null filter nodes
    if (node instanceof filterinvalid_1.FilterInvalidNode && util_1.every(util_1.vals(node.filter), function (f) { return f === null; })) {
        node.remove();
    }
    // remove output nodes that are not required
    if (node instanceof dataflow_1.OutputNode && !node.isRequired()) {
        node.remove();
    }
    node.children.forEach(removeUnnecessaryNodes);
}
/**
 * Return all leaf nodes.
 */
function getLeaves(roots) {
    var leaves = [];
    function append(node) {
        if (node.numChildren() === 0) {
            leaves.push(node);
        }
        else {
            node.children.forEach(append);
        }
    }
    roots.forEach(append);
    return leaves;
}
/**
 * Optimizes the dataflow of the passed in data component.
 */
function optimizeDataflow(dataComponent) {
    var roots = util_1.vals(dataComponent.sources);
    roots.forEach(removeUnnecessaryNodes);
    // remove source nodes that don't have any children because they also don't have output nodes
    roots = roots.filter(function (r) { return r.numChildren() > 0; });
    getLeaves(roots).forEach(optimizers.iterateFromLeaves(optimizers.removeUnusedSubtrees));
    roots = roots.filter(function (r) { return r.numChildren() > 0; });
    getLeaves(roots).forEach(optimizers.iterateFromLeaves(optimizers.moveParseUp));
    getLeaves(roots).forEach(optimizers.removeDuplicateTimeUnits);
    roots.forEach(moveFacetDown);
    util_1.keys(dataComponent.sources).forEach(function (s) {
        if (dataComponent.sources[s].numChildren() === 0) {
            delete dataComponent.sources[s];
        }
    });
}
exports.optimizeDataflow = optimizeDataflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW1pemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcGlsZS9kYXRhL29wdGltaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdDO0FBQ2hDLG1DQUFzRDtBQUN0RCx5Q0FBMEM7QUFDMUMsdUNBQW9EO0FBQ3BELGlDQUFrQztBQUNsQyxpREFBa0Q7QUFFbEQseUNBQTJDO0FBRTNDLGlDQUFrQztBQUVyQixRQUFBLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUUzQzs7R0FFRztBQUNILHNCQUFzQixLQUFnQjtJQUNwQyxlQUFlLElBQWtCO1FBQy9CLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxpQkFBUyxDQUFDLEVBQUU7WUFDaEMsSUFBTSxNQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRTFCLElBQUksTUFBSSxZQUFZLHFCQUFVLEVBQUU7Z0JBQzlCLElBQU0sT0FBTyxHQUFHLDBCQUFrQixHQUFHLE1BQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEQsTUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFJLENBQUM7YUFDeEQ7aUJBQU0sSUFBSSxNQUFJLFlBQVkseUJBQWEsSUFBSSxNQUFJLFlBQVksaUJBQVMsRUFBRTtnQkFDckUsTUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEM7WUFDRCxjQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFlLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQUksRUFBZixDQUFlLENBQUMsQ0FBQztZQUVoRixPQUFPLENBQUMsTUFBSSxD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QUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2hELE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBCRCw0Q0FvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01BSU59IGZyb20gJy4uLy4uL2RhdGEnO1xuaW1wb3J0IHtldmVyeSwgZmxhdHRlbiwga2V5cywgdmFsc30gZnJvbSAnLi4vLi4vdXRpbCc7XG5pbXBvcnQge0FnZ3JlZ2F0ZU5vZGV9IGZyb20gJy4vYWdncmVnYXRlJztcbmltcG9ydCB7RGF0YUZsb3dOb2RlLCBPdXRwdXROb2RlfSBmcm9tICcuL2RhdGFmbG93JztcbmltcG9ydCB7RmFjZXROb2RlfSBmcm9tICcuL2ZhY2V0JztcbmltcG9ydCB7RmlsdGVySW52YWxpZE5vZGV9IGZyb20gJy4vZmlsdGVyaW52YWxpZCc7XG5pbXBvcnQge0RhdGFDb21wb25lbnR9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0ICogYXMgb3B0aW1pemVycyBmcm9tICcuL29wdGltaXplcnMnO1xuaW1wb3J0IHtTb3VyY2VOb2RlfSBmcm9tICcuL3NvdXJjZSc7XG5pbXBvcnQge1N0YWNrTm9kZX0gZnJvbSAnLi9zdGFjayc7XG5cbmV4cG9ydCBjb25zdCBGQUNFVF9TQ0FMRV9QUkVGSVggPSAnc2NhbGVfJztcblxuLyoqXG4gKiBDbG9uZXMgdGhlIHN1YnRyZWUgYW5kIGlnbm9yZXMgb3V0cHV0IG5vZGVzIGV4Y2VwdCBmb3IgdGhlIGxlYWZzLCB3aGljaCBhcmUgcmVuYW1lZC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTdWJ0cmVlKGZhY2V0OiBGYWNldE5vZGUpIHtcbiAgZnVuY3Rpb24gY2xvbmUobm9kZTogRGF0YUZsb3dOb2RlKTogRGF0YUZsb3dOb2RlW10ge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBGYWNldE5vZGUpKSB7XG4gICAgICBjb25zdCBjb3B5ID0gbm9kZS5jbG9uZSgpO1xuXG4gICAgICBpZiAoY29weSBpbnN0YW5jZW9mIE91dHB1dE5vZGUpIHtcbiAgICAgICAgY29uc3QgbmV3TmFtZSA9IEZBQ0VUX1NDQUxFX1BSRUZJWCArIGNvcHkuZ2V0U291cmNlKCk7XG4gICAgICAgIGNvcHkuc2V0U291cmNlKG5ld05hbWUpO1xuXG4gICAgICAgIGZhY2V0Lm1vZGVsLmNvbXBvbmVudC5kYXRhLm91dHB1dE5vZGVzW25ld05hbWVdID0gY29weTtcbiAgICAgIH0gZWxzZSBpZiAoY29weSBpbnN0YW5jZW9mIEFnZ3JlZ2F0ZU5vZGUgfHwgY29weSBpbnN0YW5jZW9mIFN0YWNrTm9kZSkge1xuICAgICAgICBjb3B5LmFkZERpbWVuc2lvbnMoZmFjZXQuZmllbGRzKTtcbiAgICAgIH1cbiAgICAgIGZsYXR0ZW4obm9kZS5jaGlsZHJlbi5tYXAoY2xvbmUpKS5mb3JFYWNoKChuOiBEYXRhRmxvd05vZGUpID0+IG4ucGFyZW50ID0gY29weSk7XG5cbiAgICAgIHJldHVybiBbY29weV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsYXR0ZW4obm9kZS5jaGlsZHJlbi5tYXAoY2xvbmUpKTtcbiAgfVxuICByZXR1cm4gY2xvbmU7XG59XG5cbi8qKlxuICogTW92ZSBmYWNldCBub2RlcyBkb3duIHRvIHRoZSBuZXh0IGZvcmsgb3Igb3V0cHV0IG5vZGUuIEFsc28gcHVsbCB0aGUgbWFpbiBvdXRwdXQgd2l0aCB0aGUgZmFjZXQgbm9kZS5cbiAqIEFmdGVyIG1vdmluZyBkb3duIHRoZSBmYWNldCBub2RlLCBtYWtlIGEgY29weSBvZiB0aGUgc3VidHJlZSBhbmQgbWFrZSBpdCBhIGNoaWxkIG9mIHRoZSBtYWluIG91dHB1dC5cbiAqL1xuZnVuY3Rpb24gbW92ZUZhY2V0RG93bihub2RlOiBEYXRhRmxvd05vZGUpIHtcbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBGYWNldE5vZGUpIHtcbiAgICBpZiAobm9kZS5udW1DaGlsZHJlbigpID09PSAxICYmICEobm9kZS5jaGlsZHJlblswXSBpbnN0YW5jZW9mIE91dHB1dE5vZGUpKSB7XG4gICAgICAvLyBtb3ZlIGRvd24gdW50aWwgd2UgaGl0IGEgZm9yayBvciBvdXRwdXQgbm9kZVxuXG4gICAgICBjb25zdCBjaGlsZCA9IG5vZGUuY2hpbGRyZW5bMF07XG5cbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEFnZ3JlZ2F0ZU5vZGUgfHwgY2hpbGQgaW5zdGFuY2VvZiBTdGFja05vZGUpIHtcbiAgICAgICAgY2hpbGQuYWRkRGltZW5zaW9ucyhub2RlLmZpZWxkcyk7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnN3YXBXaXRoUGFyZW50KCk7XG4gICAgICBtb3ZlRmFjZXREb3duKG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtb3ZlIG1haW4gdG8gZmFjZXRcbiAgICAgIG1vdmVNYWluRG93blRvRmFjZXQobm9kZS5tb2RlbC5jb21wb25lbnQuZGF0YS5tYWluKTtcblxuICAgICAgLy8gcmVwbGljYXRlIHRoZSBzdWJ0cmVlIGFuZCBwbGFjZSBpdCBiZWZvcmUgdGhlIGZhY2V0J3MgbWFpbiBub2RlXG4gICAgICBjb25zdCBjb3B5OiBEYXRhRmxvd05vZGVbXSA9IGZsYXR0ZW4obm9kZS5jaGlsZHJlbi5tYXAoY2xvbmVTdWJ0cmVlKG5vZGUpKSk7XG4gICAgICBjb3B5LmZvckVhY2goYyA9PiBjLnBhcmVudCA9IG5vZGUubW9kZWwuY29tcG9uZW50LmRhdGEubWFpbik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChtb3ZlRmFjZXREb3duKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlTWFpbkRvd25Ub0ZhY2V0KG5vZGU6IERhdGFGbG93Tm9kZSkge1xuICBpZiAobm9kZSBpbnN0YW5jZW9mIE91dHB1dE5vZGUgJiYgbm9kZS50eXBlID09PSBNQUlOKSB7XG4gICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4oKSA9PT0gMSkge1xuICAgICAgY29uc3QgY2hpbGQgPSBub2RlLmNoaWxkcmVuWzBdO1xuXG4gICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEZhY2V0Tm9kZSkpIHtcbiAgICAgICAgY2hpbGQuc3dhcFdpdGhQYXJlbnQoKTtcbiAgICAgICAgbW92ZU1haW5Eb3duVG9GYWNldChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgbm9kZXMgdGhhdCBhcmUgbm90IHJlcXVpcmVkIHN0YXJ0aW5nIGZyb20gYSByb290LlxuICovXG5mdW5jdGlvbiByZW1vdmVVbm5lY2Vzc2FyeU5vZGVzKG5vZGU6IERhdGFGbG93Tm9kZSkge1xuXG4gIC8vIHJlbW92ZSBlbXB0eSBudWxsIGZpbHRlciBub2Rlc1xuICBpZiAobm9kZSBpbnN0YW5jZW9mIEZpbHRlckludmFsaWROb2RlICYmIGV2ZXJ5KHZhbHMobm9kZS5maWx0ZXIpLCBmID0+IGYgPT09IG51bGwpKSB7XG4gICAgbm9kZS5yZW1vdmUoKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBvdXRwdXQgbm9kZXMgdGhhdCBhcmUgbm90IHJlcXVpcmVkXG4gIGlmIChub2RlIGluc3RhbmNlb2YgT3V0cHV0Tm9kZSAmJiAhbm9kZS5pc1JlcXVpcmVkKCkpIHtcbiAgICBub2RlLnJlbW92ZSgpO1xuICB9XG5cbiAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKHJlbW92ZVVubmVjZXNzYXJ5Tm9kZXMpO1xufVxuXG4vKipcbiAqIFJldHVybiBhbGwgbGVhZiBub2Rlcy5cbiAqL1xuZnVuY3Rpb24gZ2V0TGVhdmVzKHJvb3RzOiBEYXRhRmxvd05vZGVbXSkge1xuICBjb25zdCBsZWF2ZXM6IERhdGFGbG93Tm9kZVtdID0gW107XG4gIGZ1bmN0aW9uIGFwcGVuZChub2RlOiBEYXRhRmxvd05vZGUpIHtcbiAgICBpZiAobm9kZS5udW1DaGlsZHJlbigpID09PSAwKSB7XG4gICAgICBsZWF2ZXMucHVzaChub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGFwcGVuZCk7XG4gICAgfVxuICB9XG5cbiAgcm9vdHMuZm9yRWFjaChhcHBlbmQpO1xuICByZXR1cm4gbGVhdmVzO1xufVxuXG4vKipcbiAqIE9wdGltaXplcyB0aGUgZGF0YWZsb3cgb2YgdGhlIHBhc3NlZCBpbiBkYXRhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9wdGltaXplRGF0YWZsb3coZGF0YUNvbXBvbmVudDogRGF0YUNvbXBvbmVudCkge1xuICBsZXQgcm9vdHM6IFNvdXJjZU5vZGVbXSA9IHZhbHMoZGF0YUNvbXBvbmVudC5zb3VyY2VzKTtcblxuICByb290cy5mb3JFYWNoKHJlbW92ZVVubmVjZXNzYXJ5Tm9kZXMpO1xuXG4gIC8vIHJlbW92ZSBzb3VyY2Ugbm9kZXMgdGhhdCBkb24ndCBoYXZlIGFueSBjaGlsZHJlbiBiZWNhdXNlIHRoZXkgYWxzbyBkb24ndCBoYXZlIG91dHB1dCBub2Rlc1xuICByb290cyA9IHJvb3RzLmZpbHRlcihyID0+IHIubnVtQ2hpbGRyZW4oKSA+IDApO1xuICBnZXRMZWF2ZXMocm9vdHMpLmZvckVhY2gob3B0aW1pemVycy5pdGVyYXRlRnJvbUxlYXZlcyhvcHRpbWl6ZXJzLnJlbW92ZVVudXNlZFN1YnRyZWVzKSk7XG4gIHJvb3RzID0gcm9vdHMuZmlsdGVyKHIgPT4gci5udW1DaGlsZHJlbigpID4gMCk7XG5cbiAgZ2V0TGVhdmVzKHJvb3RzKS5mb3JFYWNoKG9wdGltaXplcnMuaXRlcmF0ZUZyb21MZWF2ZXMob3B0aW1pemVycy5tb3ZlUGFyc2VVcCkpO1xuICBnZXRMZWF2ZXMocm9vdHMpLmZvckVhY2gob3B0aW1pemVycy5yZW1vdmVEdXBsaWNhdGVUaW1lVW5pdHMpO1xuXG4gIHJvb3RzLmZvckVhY2gobW92ZUZhY2V0RG93bik7XG5cbiAga2V5cyhkYXRhQ29tcG9uZW50LnNvdXJjZXMpLmZvckVhY2gocyA9PiB7XG4gICAgaWYgKGRhdGFDb21wb25lbnQuc291cmNlc1tzXS5udW1DaGlsZHJlbigpID09PSAwKSB7XG4gICAgICBkZWxldGUgZGF0YUNvbXBvbmVudC5zb3VyY2VzW3NdO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=