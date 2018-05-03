"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var vega_util_1 = require("vega-util");
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var log = require("../../log");
var scale_1 = require("../../scale");
var vega_schema_1 = require("../../vega.schema");
var mixins = require("./mixins");
var ref = require("./valueref");
exports.bar = {
    vgMark: 'rect',
    encodeEntry: function (model) {
        return tslib_1.__assign({}, mixins.baseEncodeEntry(model, { size: 'ignore', orient: 'ignore' }), x(model), y(model));
    }
};
function x(model) {
    var config = model.config, encoding = model.encoding, markDef = model.markDef, width = model.width;
    var orient = markDef.orient;
    var sizeDef = encoding.size;
    var xDef = encoding.x;
    var xScaleName = model.scaleName(channel_1.X);
    var xScale = model.getScaleComponent(channel_1.X);
    // x, x2, and width -- we must specify two of these in all conditions
    if (orient === 'horizontal') {
        return tslib_1.__assign({}, mixins.pointPosition('x', model, 'zeroOrMin'), mixins.pointPosition2(model, 'zeroOrMin'));
    }
    else { // vertical
        if (fielddef_1.isFieldDef(xDef)) {
            var xScaleType = xScale.get('type');
            if (xDef.bin && !sizeDef && !scale_1.hasDiscreteDomain(xScaleType)) {
                return mixins.binnedPosition(xDef, 'x', model.scaleName('x'), markDef.binSpacing === undefined ? config.bar.binSpacing : markDef.binSpacing, xScale.get('reverse'));
            }
            else {
                if (xScaleType === scale_1.ScaleType.BAND) {
                    return mixins.bandPosition(xDef, 'x', model);
                }
            }
        }
        // sized bin, normal point-ordinal axis, quantitative x-axis, or no x
        return mixins.centeredBandPosition('x', model, tslib_1.__assign({}, ref.mid(width)), defaultSizeRef(markDef, xScaleName, xScale, config));
    }
}
function y(model) {
    var config = model.config, encoding = model.encoding, height = model.height, markDef = model.markDef;
    var orient = markDef.orient;
    var sizeDef = encoding.size;
    var yDef = encoding.y;
    var yScaleName = model.scaleName(channel_1.Y);
    var yScale = model.getScaleComponent(channel_1.Y);
    // y, y2 & height -- we must specify two of these in all conditions
    if (orient === 'vertical') {
        return tslib_1.__assign({}, mixins.pointPosition('y', model, 'zeroOrMin'), mixins.pointPosition2(model, 'zeroOrMin'));
    }
    else {
        if (fielddef_1.isFieldDef(yDef)) {
            var yScaleType = yScale.get('type');
            if (yDef.bin && !sizeDef && !scale_1.hasDiscreteDomain(yScaleType)) {
                return mixins.binnedPosition(yDef, 'y', model.scaleName('y'), markDef.binSpacing === undefined ? config.bar.binSpacing : markDef.binSpacing, yScale.get('reverse'));
            }
            else if (yScaleType === scale_1.ScaleType.BAND) {
                return mixins.bandPosition(yDef, 'y', model);
            }
        }
        return mixins.centeredBandPosition('y', model, ref.mid(height), defaultSizeRef(markDef, yScaleName, yScale, config));
    }
}
function defaultSizeRef(markDef, scaleName, scale, config) {
    if (markDef.size !== undefined) {
        return { value: markDef.size };
    }
    else if (config.bar.discreteBandSize) {
        return { value: config.bar.discreteBandSize };
    }
    else if (scale) {
        var scaleType = scale.get('type');
        if (scaleType === scale_1.ScaleType.POINT) {
            var scaleRange = scale.get('range');
            if (vega_schema_1.isVgRangeStep(scaleRange) && vega_util_1.isNumber(scaleRange.step)) {
                return { value: scaleRange.step - 1 };
            }
            log.warn(log.message.BAR_WITH_POINT_SCALE_AND_RANGESTEP_NULL);
        }
        else if (scaleType === scale_1.ScaleType.BAND) {
            return ref.bandRef(scaleName);
        }
        else { // non-ordinal scale
            return { value: config.bar.continuousBandSize };
        }
    }
    else if (config.scale.rangeStep && config.scale.rangeStep !== null) {
        return { value: config.scale.rangeStep - 1 };
    }
    return { value: 20 };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvbWFyay9iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQW1DO0FBQ25DLHlDQUFtQztBQUVuQywyQ0FBMEM7QUFDMUMsK0JBQWlDO0FBRWpDLHFDQUF5RDtBQUN6RCxpREFBK0Q7QUFLL0QsaUNBQW1DO0FBQ25DLGdDQUFrQztBQUdyQixRQUFBLEdBQUcsR0FBaUI7SUFDL0IsTUFBTSxFQUFFLE1BQU07SUFDZCxXQUFXLEVBQUUsVUFBQyxLQUFnQjtRQUM1Qiw0QkFDSyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLEVBQ2pFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDUixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ1g7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLFdBQVcsS0FBZ0I7SUFDbEIsSUFBQSxxQkFBTSxFQUFFLHlCQUFRLEVBQUUsdUJBQU8sRUFBRSxtQkFBSyxDQUFVO0lBQ2pELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDOUIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUU5QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBQyxDQUFDLENBQUM7SUFDdEMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQUMsQ0FBQyxDQUFDO0lBQzFDLHFFQUFxRTtJQUNyRSxJQUFJLE1BQU0sS0FBSyxZQUFZLEVBQUU7UUFDM0IsNEJBQ0ssTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUM3QyxNQUFNLENBQUMsY0FBYyxDQUFD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QUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFDLENBQUM7U0FDL0M7S0FDRjtTQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1FBQ3BFLE9BQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFDLENBQUM7S0FDNUM7SUFDRCxPQUFPLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzTnVtYmVyfSBmcm9tICd2ZWdhLXV0aWwnO1xuaW1wb3J0IHtYLCBZfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHtpc0ZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nJztcbmltcG9ydCB7TWFya0RlZn0gZnJvbSAnLi4vLi4vbWFyayc7XG5pbXBvcnQge2hhc0Rpc2NyZXRlRG9tYWluLCBTY2FsZVR5cGV9IGZyb20gJy4uLy4uL3NjYWxlJztcbmltcG9ydCB7aXNWZ1JhbmdlU3RlcCwgVmdFbmNvZGVFbnRyeX0gZnJvbSAnLi4vLi4vdmVnYS5zY2hlbWEnO1xuaW1wb3J0IHtWZ1ZhbHVlUmVmfSBmcm9tICcuLi8uLi92ZWdhLnNjaGVtYSc7XG5pbXBvcnQge1NjYWxlQ29tcG9uZW50fSBmcm9tICcuLi9zY2FsZS9jb21wb25lbnQnO1xuaW1wb3J0IHtVbml0TW9kZWx9IGZyb20gJy4uL3VuaXQnO1xuaW1wb3J0IHtNYXJrQ29tcGlsZXJ9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgKiBhcyBtaXhpbnMgZnJvbSAnLi9taXhpbnMnO1xuaW1wb3J0ICogYXMgcmVmIGZyb20gJy4vdmFsdWVyZWYnO1xuXG5cbmV4cG9ydCBjb25zdCBiYXI6IE1hcmtDb21waWxlciA9IHtcbiAgdmdNYXJrOiAncmVjdCcsXG4gIGVuY29kZUVudHJ5OiAobW9kZWw6IFVuaXRNb2RlbCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5taXhpbnMuYmFzZUVuY29kZUVudHJ5KG1vZGVsLCB7c2l6ZTogJ2lnbm9yZScsIG9yaWVudDogJ2lnbm9yZSd9KSxcbiAgICAgIC4uLngobW9kZWwpLFxuICAgICAgLi4ueShtb2RlbCksXG4gICAgfTtcbiAgfVxufTtcblxuZnVuY3Rpb24geChtb2RlbDogVW5pdE1vZGVsKTogVmdFbmNvZGVFbnRyeSB7XG4gIGNvbnN0IHtjb25maWcsIGVuY29kaW5nLCBtYXJrRGVmLCB3aWR0aH0gPSBtb2RlbDtcbiAgY29uc3Qgb3JpZW50ID0gbWFya0RlZi5vcmllbnQ7XG4gIGNvbnN0IHNpemVEZWYgPSBlbmNvZGluZy5zaXplO1xuXG4gIGNvbnN0IHhEZWYgPSBlbmNvZGluZy54O1xuICBjb25zdCB4U2NhbGVOYW1lID0gbW9kZWwuc2NhbGVOYW1lKFgpO1xuICBjb25zdCB4U2NhbGUgPSBtb2RlbC5nZXRTY2FsZUNvbXBvbmVudChYKTtcbiAgLy8geCwgeDIsIGFuZCB3aWR0aCAtLSB3ZSBtdXN0IHNwZWNpZnkgdHdvIG9mIHRoZXNlIGluIGFsbCBjb25kaXRpb25zXG4gIGlmIChvcmllbnQgPT09ICdob3Jpem9udGFsJykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5taXhpbnMucG9pbnRQb3NpdGlvbigneCcsIG1vZGVsLCAnemVyb09yTWluJyksXG4gICAgICAuLi5taXhpbnMucG9pbnRQb3NpdGlvbjIobW9kZWwsICd6ZXJvT3JNaW4nKSxcbiAgICB9O1xuICB9IGVsc2UgeyAvLyB2ZXJ0aWNhbFxuICAgIGlmIChpc0ZpZWxkRGVmKHhEZWYpKSB7XG4gICAgICBjb25zdCB4U2NhbGVUeXBlID0geFNjYWxlLmdldCgndHlwZScpO1xuICAgICAgaWYgKHhEZWYuYmluICYmICFzaXplRGVmICYmICFoYXNEaXNjcmV0ZURvbWFpbih4U2NhbGVUeXBlKSkge1xuICAgICAgICByZXR1cm4gbWl4aW5zLmJpbm5lZFBvc2l0aW9uKFxuICAgICAgICAgIHhEZWYsICd4JywgbW9kZWwuc2NhbGVOYW1lKCd4JyksIG1hcmtEZWYuYmluU3BhY2luZyA9PT0gdW5kZWZpbmVkID8gY29uZmlnLmJhci5iaW5TcGFjaW5nIDogbWFya0RlZi5iaW5TcGFjaW5nLFxuICAgICAgICAgIHhTY2FsZS5nZXQoJ3JldmVyc2UnKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHhTY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5CQU5EKSB7XG4gICAgICAgICAgcmV0dXJuIG1peGlucy5iYW5kUG9zaXRpb24oeERlZiwgJ3gnLCBtb2RlbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc2l6ZWQgYmluLCBub3JtYWwgcG9pbnQtb3JkaW5hbCBheGlzLCBxdWFudGl0YXRpdmUgeC1heGlzLCBvciBubyB4XG5cbiAgICByZXR1cm4gbWl4aW5zLmNlbnRlcmVkQmFuZFBvc2l0aW9uKCd4JywgbW9kZWwsXG4gICAgICB7Li4ucmVmLm1pZCh3aWR0aCl9LFxuICAgICAgZGVmYXVsdFNpemVSZWYobWFya0RlZiwgeFNjYWxlTmFtZSwgeFNjYWxlLCBjb25maWcpXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB5KG1vZGVsOiBVbml0TW9kZWwpIHtcbiAgY29uc3Qge2NvbmZpZywgZW5jb2RpbmcsIGhlaWdodCwgbWFya0RlZn0gPSBtb2RlbDtcbiAgY29uc3Qgb3JpZW50ID0gbWFya0RlZi5vcmllbnQ7XG4gIGNvbnN0IHNpemVEZWYgPSBlbmNvZGluZy5zaXplO1xuXG4gIGNvbnN0IHlEZWYgPSBlbmNvZGluZy55O1xuICBjb25zdCB5U2NhbGVOYW1lID0gbW9kZWwuc2NhbGVOYW1lKFkpO1xuICBjb25zdCB5U2NhbGUgPSBtb2RlbC5nZXRTY2FsZUNvbXBvbmVudChZKTtcbiAgLy8geSwgeTIgJiBoZWlnaHQgLS0gd2UgbXVzdCBzcGVjaWZ5IHR3byBvZiB0aGVzZSBpbiBhbGwgY29uZGl0aW9uc1xuICBpZiAob3JpZW50ID09PSAndmVydGljYWwnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm1peGlucy5wb2ludFBvc2l0aW9uKCd5JywgbW9kZWwsICd6ZXJvT3JNaW4nKSxcbiAgICAgIC4uLm1peGlucy5wb2ludFBvc2l0aW9uMihtb2RlbCwgJ3plcm9Pck1pbicpLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRmllbGREZWYoeURlZikpIHtcbiAgICAgIGNvbnN0IHlTY2FsZVR5cGUgPSB5U2NhbGUuZ2V0KCd0eXBlJyk7XG4gICAgICBpZiAoeURlZi5iaW4gJiYgIXNpemVEZWYgJiYgIWhhc0Rpc2NyZXRlRG9tYWluKHlTY2FsZVR5cGUpKSB7XG4gICAgICAgIHJldHVybiBtaXhpbnMuYmlubmVkUG9zaXRpb24oXG4gICAgICAgICAgeURlZiwgJ3knLCBtb2RlbC5zY2FsZU5hbWUoJ3knKSxcbiAgICAgICAgICBtYXJrRGVmLmJpblNwYWNpbmcgPT09IHVuZGVmaW5lZCA/IGNvbmZpZy5iYXIuYmluU3BhY2luZyA6IG1hcmtEZWYuYmluU3BhY2luZyxcbiAgICAgICAgICB5U2NhbGUuZ2V0KCdyZXZlcnNlJylcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoeVNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkJBTkQpIHtcbiAgICAgICAgcmV0dXJuIG1peGlucy5iYW5kUG9zaXRpb24oeURlZiwgJ3knLCBtb2RlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaXhpbnMuY2VudGVyZWRCYW5kUG9zaXRpb24oJ3knLCBtb2RlbCwgcmVmLm1pZChoZWlnaHQpLFxuICAgICAgZGVmYXVsdFNpemVSZWYobWFya0RlZiwgeVNjYWxlTmFtZSwgeVNjYWxlLCBjb25maWcpXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0U2l6ZVJlZihtYXJrRGVmOiBNYXJrRGVmLCBzY2FsZU5hbWU6IHN0cmluZywgc2NhbGU6IFNjYWxlQ29tcG9uZW50LCBjb25maWc6IENvbmZpZyk6IFZnVmFsdWVSZWYge1xuICBpZiAobWFya0RlZi5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge3ZhbHVlOiBtYXJrRGVmLnNpemV9O1xuICB9IGVsc2UgaWYgKGNvbmZpZy5iYXIuZGlzY3JldGVCYW5kU2l6ZSkge1xuICAgIHJldHVybiB7dmFsdWU6IGNvbmZpZy5iYXIuZGlzY3JldGVCYW5kU2l6ZX07XG4gIH0gZWxzZSBpZiAoc2NhbGUpIHtcbiAgICBjb25zdCBzY2FsZVR5cGUgPSBzY2FsZS5nZXQoJ3R5cGUnKTtcbiAgICBpZiAoc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuUE9JTlQpIHtcbiAgICAgIGNvbnN0IHNjYWxlUmFuZ2UgPSBzY2FsZS5nZXQoJ3JhbmdlJyk7XG4gICAgICBpZiAoaXNWZ1JhbmdlU3RlcChzY2FsZVJhbmdlKSAmJiBpc051bWJlcihzY2FsZVJhbmdlLnN0ZXApKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IHNjYWxlUmFuZ2Uuc3RlcCAtIDF9O1xuICAgICAgfVxuICAgICAgbG9nLndhcm4obG9nLm1lc3NhZ2UuQkFSX1dJVEhfUE9JTlRfU0NBTEVfQU5EX1JBTkdFU1RFUF9OVUxMKTtcbiAgICB9IGVsc2UgaWYgKHNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkJBTkQpIHtcbiAgICAgIHJldHVybiByZWYuYmFuZFJlZihzY2FsZU5hbWUpO1xuICAgIH0gZWxzZSB7IC8vIG5vbi1vcmRpbmFsIHNjYWxlXG4gICAgICByZXR1cm4ge3ZhbHVlOiBjb25maWcuYmFyLmNvbnRpbnVvdXNCYW5kU2l6ZX07XG4gICAgfVxuICB9IGVsc2UgaWYgKGNvbmZpZy5zY2FsZS5yYW5nZVN0ZXAgJiYgY29uZmlnLnNjYWxlLnJhbmdlU3RlcCAhPT0gbnVsbCkge1xuICAgIHJldHVybiB7dmFsdWU6IGNvbmZpZy5zY2FsZS5yYW5nZVN0ZXAgLSAxfTtcbiAgfVxuICByZXR1cm4ge3ZhbHVlOiAyMH07XG59XG5cbiJdfQ==