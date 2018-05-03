"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var mark_1 = require("../../mark");
var scale_1 = require("../../scale");
var mixins = require("./mixins");
exports.rect = {
    vgMark: 'rect',
    encodeEntry: function (model) {
        return tslib_1.__assign({}, mixins.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), x(model), y(model));
    }
};
function x(model) {
    var xDef = model.encoding.x;
    var x2Def = model.encoding.x2;
    var xScale = model.getScaleComponent(channel_1.X);
    var xScaleType = xScale ? xScale.get('type') : undefined;
    if (fielddef_1.isFieldDef(xDef) && xDef.bin && !x2Def) {
        return mixins.binnedPosition(xDef, 'x', model.scaleName('x'), 0, xScale.get('reverse'));
    }
    else if (fielddef_1.isFieldDef(xDef) && xScale && scale_1.hasDiscreteDomain(xScaleType)) {
        /* istanbul ignore else */
        if (xScaleType === scale_1.ScaleType.BAND) {
            return mixins.bandPosition(xDef, 'x', model);
        }
        else {
            // We don't support rect mark with point/ordinal scale
            throw new Error(log.message.scaleTypeNotWorkWithMark(mark_1.RECT, xScaleType));
        }
    }
    else { // continuous scale or no scale
        return tslib_1.__assign({}, mixins.pointPosition('x', model, 'zeroOrMax'), mixins.pointPosition2(model, 'zeroOrMin', 'x2'));
    }
}
function y(model) {
    var yDef = model.encoding.y;
    var y2Def = model.encoding.y2;
    var yScale = model.getScaleComponent(channel_1.Y);
    var yScaleType = yScale ? yScale.get('type') : undefined;
    if (fielddef_1.isFieldDef(yDef) && yDef.bin && !y2Def) {
        return mixins.binnedPosition(yDef, 'y', model.scaleName('y'), 0, yScale.get('reverse'));
    }
    else if (fielddef_1.isFieldDef(yDef) && yScale && scale_1.hasDiscreteDomain(yScaleType)) {
        /* istanbul ignore else */
        if (yScaleType === scale_1.ScaleType.BAND) {
            return mixins.bandPosition(yDef, 'y', model);
        }
        else {
            // We don't support rect mark with point/ordinal scale
            throw new Error(log.message.scaleTypeNotWorkWithMark(mark_1.RECT, yScaleType));
        }
    }
    else { // continuous scale or no scale
        return tslib_1.__assign({}, mixins.pointPosition('y', model, 'zeroOrMax'), mixins.pointPosition2(model, 'zeroOrMin', 'y2'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21waWxlL21hcmsvcmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBbUM7QUFDbkMsMkNBQTBDO0FBQzFDLCtCQUFpQztBQUNqQyxtQ0FBZ0M7QUFDaEMscUNBQXlEO0FBR3pELGlDQUFtQztBQUV0QixRQUFBLElBQUksR0FBaUI7SUFDaEMsTUFBTSxFQUFFLE1BQU07SUFDZCxXQUFXLEVBQUUsVUFBQyxLQUFnQjtRQUM1Qiw0QkFDSyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLEVBQ2pFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDUixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ1g7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLFdBQVcsS0FBZ0I7SUFDekIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDaEMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQUMsQ0FBQyxDQUFDO0lBQzFDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRTNELElBQUkscUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQzFDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUN6RjtTQUFNLElBQUkscUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUkseUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdEUsMEJBQTBCO1FBQzFCLElBQUksVUFBVSxLQUFLLGlCQUFTLENBQUMsSUFBSSxFQUFFO1lBQ2pDLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxzREFBc0Q7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLFdBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO0tBQ0Y7U0FBTSxFQUFFLCtCQUErQjtRQUN0Qyw0QkFDSyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFDbEQ7S0FDSDtBQUNILENBQUM7QUFFRCxXQUFXLEtBQWdCO0lBQ3pCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0lBQ2hDLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUUzRCxJQUFJLHFCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUMxQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDekY7U0FBTSxJQUFJLHFCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxJQUFJLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3RFLDBCQUEwQjtRQUMxQixJQUFJLFVBQVUsS0FBSyxpQkFBUyxDQUFDLElBQUksRUFBRTtZQUNqQyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsc0RBQXNEO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxXQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUN6RTtLQUNGO1NBQU0sRUFBRSwrQkFBK0I7UUFDdEMsNEJBQ0ssTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUM3QyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQ2xEO0tBQ0g7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtYLCBZfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7aXNGaWVsZERlZn0gZnJvbSAnLi4vLi4vZmllbGRkZWYnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZyc7XG5pbXBvcnQge1JFQ1R9IGZyb20gJy4uLy4uL21hcmsnO1xuaW1wb3J0IHtoYXNEaXNjcmV0ZURvbWFpbiwgU2NhbGVUeXBlfSBmcm9tICcuLi8uLi9zY2FsZSc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge01hcmtDb21waWxlcn0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCAqIGFzIG1peGlucyBmcm9tICcuL21peGlucyc7XG5cbmV4cG9ydCBjb25zdCByZWN0OiBNYXJrQ29tcGlsZXIgPSB7XG4gIHZnTWFyazogJ3JlY3QnLFxuICBlbmNvZGVFbnRyeTogKG1vZGVsOiBVbml0TW9kZWwpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ubWl4aW5zLmJhc2VFbmNvZGVFbnRyeShtb2RlbCwge3NpemU6ICdpZ25vcmUnLCBvcmllbnQ6ICdpZ25vcmUnfSksXG4gICAgICAuLi54KG1vZGVsKSxcbiAgICAgIC4uLnkobW9kZWwpLFxuICAgIH07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHgobW9kZWw6IFVuaXRNb2RlbCkge1xuICBjb25zdCB4RGVmID0gbW9kZWwuZW5jb2RpbmcueDtcbiAgY29uc3QgeDJEZWYgPSBtb2RlbC5lbmNvZGluZy54MjtcbiAgY29uc3QgeFNjYWxlID0gbW9kZWwuZ2V0U2NhbGVDb21wb25lbnQoWCk7XG4gIGNvbnN0IHhTY2FsZVR5cGUgPSB4U2NhbGUgPyB4U2NhbGUuZ2V0KCd0eXBlJykgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzRmllbGREZWYoeERlZikgJiYgeERlZi5iaW4gJiYgIXgyRGVmKSB7XG4gICAgcmV0dXJuIG1peGlucy5iaW5uZWRQb3NpdGlvbih4RGVmLCAneCcsIG1vZGVsLnNjYWxlTmFtZSgneCcpLCAwLCB4U2NhbGUuZ2V0KCdyZXZlcnNlJykpO1xuICB9IGVsc2UgaWYgKGlzRmllbGREZWYoeERlZikgJiYgeFNjYWxlICYmIGhhc0Rpc2NyZXRlRG9tYWluKHhTY2FsZVR5cGUpKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoeFNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkJBTkQpIHtcbiAgICAgIHJldHVybiBtaXhpbnMuYmFuZFBvc2l0aW9uKHhEZWYsICd4JywgbW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBkb24ndCBzdXBwb3J0IHJlY3QgbWFyayB3aXRoIHBvaW50L29yZGluYWwgc2NhbGVcbiAgICAgIHRocm93IG5ldyBFcnJvcihsb2cubWVzc2FnZS5zY2FsZVR5cGVOb3RXb3JrV2l0aE1hcmsoUkVDVCwgeFNjYWxlVHlwZSkpO1xuICAgIH1cbiAgfSBlbHNlIHsgLy8gY29udGludW91cyBzY2FsZSBvciBubyBzY2FsZVxuICAgIHJldHVybiB7XG4gICAgICAuLi5taXhpbnMucG9pbnRQb3NpdGlvbigneCcsIG1vZGVsLCAnemVyb09yTWF4JyksXG4gICAgICAuLi5taXhpbnMucG9pbnRQb3NpdGlvbjIobW9kZWwsICd6ZXJvT3JNaW4nLCAneDInKVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24geShtb2RlbDogVW5pdE1vZGVsKSB7XG4gIGNvbnN0IHlEZWYgPSBtb2RlbC5lbmNvZGluZy55O1xuICBjb25zdCB5MkRlZiA9IG1vZGVsLmVuY29kaW5nLnkyO1xuICBjb25zdCB5U2NhbGUgPSBtb2RlbC5nZXRTY2FsZUNvbXBvbmVudChZKTtcbiAgY29uc3QgeVNjYWxlVHlwZSA9IHlTY2FsZSA/IHlTY2FsZS5nZXQoJ3R5cGUnKSA6IHVuZGVmaW5lZDtcblxuICBpZiAoaXNGaWVsZERlZih5RGVmKSAmJiB5RGVmLmJpbiAmJiAheTJEZWYpIHtcbiAgICByZXR1cm4gbWl4aW5zLmJpbm5lZFBvc2l0aW9uKHlEZWYsICd5JywgbW9kZWwuc2NhbGVOYW1lKCd5JyksIDAsIHlTY2FsZS5nZXQoJ3JldmVyc2UnKSk7XG4gIH0gZWxzZSBpZiAoaXNGaWVsZERlZih5RGVmKSAmJiB5U2NhbGUgJiYgaGFzRGlzY3JldGVEb21haW4oeVNjYWxlVHlwZSkpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh5U2NhbGVUeXBlID09PSBTY2FsZVR5cGUuQkFORCkge1xuICAgICAgcmV0dXJuIG1peGlucy5iYW5kUG9zaXRpb24oeURlZiwgJ3knLCBtb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIGRvbid0IHN1cHBvcnQgcmVjdCBtYXJrIHdpdGggcG9pbnQvb3JkaW5hbCBzY2FsZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGxvZy5tZXNzYWdlLnNjYWxlVHlwZU5vdFdvcmtXaXRoTWFyayhSRUNULCB5U2NhbGVUeXBlKSk7XG4gICAgfVxuICB9IGVsc2UgeyAvLyBjb250aW51b3VzIHNjYWxlIG9yIG5vIHNjYWxlXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1peGlucy5wb2ludFBvc2l0aW9uKCd5JywgbW9kZWwsICd6ZXJvT3JNYXgnKSxcbiAgICAgIC4uLm1peGlucy5wb2ludFBvc2l0aW9uMihtb2RlbCwgJ3plcm9Pck1pbicsICd5MicpXG4gICAgfTtcbiAgfVxufVxuIl19