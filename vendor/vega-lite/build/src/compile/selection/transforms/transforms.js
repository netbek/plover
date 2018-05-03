"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inputs_1 = require("./inputs");
var nearest_1 = require("./nearest");
var project_1 = require("./project");
var scales_1 = require("./scales");
var toggle_1 = require("./toggle");
var translate_1 = require("./translate");
var zoom_1 = require("./zoom");
var compilers = { project: project_1.default, toggle: toggle_1.default, scales: scales_1.default,
    translate: translate_1.default, zoom: zoom_1.default, inputs: inputs_1.default, nearest: nearest_1.default };
function forEachTransform(selCmpt, cb) {
    for (var t in compilers) {
        if (compilers[t].has(selCmpt)) {
            cb(compilers[t]);
        }
    }
}
exports.forEachTransform = forEachTransform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3Jtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21waWxlL3NlbGVjdGlvbi90cmFuc2Zvcm1zL3RyYW5zZm9ybXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQkEsbUNBQThCO0FBQzlCLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFDaEMsbUNBQThCO0FBQzlCLG1DQUE4QjtBQUM5Qix5Q0FBb0M7QUFDcEMsK0JBQTBCO0FBQzFCLElBQU0sU0FBUyxHQUE0QixFQUFDLE9BQU8sbUJBQUEsRUFBRSxNQUFNLGtCQUFBLEVBQUUsTUFBTSxrQkFBQTtJQUNqRSxTQUFTLHFCQUFBLEVBQUUsSUFBSSxnQkFBQSxFQUFFLE1BQU0sa0JBQUEsRUFBRSxPQUFPLG1CQUFBLEVBQUMsQ0FBQztBQUVwQywwQkFBaUMsT0FBMkIsRUFBRSxFQUFtQztJQUMvRixLQUFLLElBQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUN6QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO0tBQ0Y7QUFDSCxDQUFDO0FBTkQsNENBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlbGVjdGlvbkRlZn0gZnJvbSAnLi4vLi4vLi4vc2VsZWN0aW9uJztcbmltcG9ydCB7RGljdH0gZnJvbSAnLi4vLi4vLi4vdXRpbCc7XG5pbXBvcnQge1ZnU2lnbmFsfSBmcm9tICcuLi8uLi8uLi92ZWdhLnNjaGVtYSc7XG5pbXBvcnQge01vZGVsfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vLi4vdW5pdCc7XG5pbXBvcnQge1NlbGVjdGlvbkNvbXBvbmVudH0gZnJvbSAnLi4vc2VsZWN0aW9uJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zZm9ybUNvbXBpbGVyIHtcbiAgaGFzOiAoc2VsQ21wdDogU2VsZWN0aW9uQ29tcG9uZW50IHwgU2VsZWN0aW9uRGVmKSA9PiBib29sZWFuO1xuICBwYXJzZT86IChtb2RlbDogVW5pdE1vZGVsLCBkZWY6IFNlbGVjdGlvbkRlZiwgc2VsQ21wdDogU2VsZWN0aW9uQ29tcG9uZW50KSA9PiB2b2lkO1xuICBzaWduYWxzPzogKG1vZGVsOiBVbml0TW9kZWwsIHNlbENtcHQ6IFNlbGVjdGlvbkNvbXBvbmVudCwgc2lnbmFsczogVmdTaWduYWxbXSkgPT4gVmdTaWduYWxbXTtcbiAgdG9wTGV2ZWxTaWduYWxzPzogKG1vZGVsOiBNb2RlbCwgc2VsQ21wdDogU2VsZWN0aW9uQ29tcG9uZW50LCBzaWduYWxzOiBWZ1NpZ25hbFtdKSA9PiBWZ1NpZ25hbFtdO1xuICBtb2RpZnlFeHByPzogKG1vZGVsOiBVbml0TW9kZWwsIHNlbENtcHQ6IFNlbGVjdGlvbkNvbXBvbmVudCwgZXhwcjogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIG1hcmtzPzogKG1vZGVsOiBVbml0TW9kZWwsIHNlbENtcHQ6U2VsZWN0aW9uQ29tcG9uZW50LCBtYXJrczogYW55W10pID0+IGFueVtdO1xufVxuXG5pbXBvcnQgaW5wdXRzIGZyb20gJy4vaW5wdXRzJztcbmltcG9ydCBuZWFyZXN0IGZyb20gJy4vbmVhcmVzdCc7XG5pbXBvcnQgcHJvamVjdCBmcm9tICcuL3Byb2plY3QnO1xuaW1wb3J0IHNjYWxlcyBmcm9tICcuL3NjYWxlcyc7XG5pbXBvcnQgdG9nZ2xlIGZyb20gJy4vdG9nZ2xlJztcbmltcG9ydCB0cmFuc2xhdGUgZnJvbSAnLi90cmFuc2xhdGUnO1xuaW1wb3J0IHpvb20gZnJvbSAnLi96b29tJztcbmNvbnN0IGNvbXBpbGVyczogRGljdDxUcmFuc2Zvcm1Db21waWxlcj4gPSB7cHJvamVjdCwgdG9nZ2xlLCBzY2FsZXMsXG4gIHRyYW5zbGF0ZSwgem9vbSwgaW5wdXRzLCBuZWFyZXN0fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2hUcmFuc2Zvcm0oc2VsQ21wdDogU2VsZWN0aW9uQ29tcG9uZW50LCBjYjogKHR4OiBUcmFuc2Zvcm1Db21waWxlcikgPT4gdm9pZCkge1xuICBmb3IgKGNvbnN0IHQgaW4gY29tcGlsZXJzKSB7XG4gICAgaWYgKGNvbXBpbGVyc1t0XS5oYXMoc2VsQ21wdCkpIHtcbiAgICAgIGNiKGNvbXBpbGVyc1t0XSk7XG4gICAgfVxuICB9XG59XG4iXX0=