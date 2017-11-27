System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, GapDoubletComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            GapDoubletComponent = /** @class */ (function () {
                function GapDoubletComponent() {
                }
                GapDoubletComponent.prototype.keyhandler = function (event) {
                    var source = event.target;
                    var target = null;
                    if (source == this.gap1.nativeElement) {
                        target = this.gap2;
                    }
                    else if (source == this.gap2.nativeElement) {
                        target = this.gap1;
                    }
                    //event.target = target;
                    target.nativeElement.dispatchEvent(event); // fire event on other gap
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], GapDoubletComponent.prototype, "s1l", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], GapDoubletComponent.prototype, "s1r", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], GapDoubletComponent.prototype, "s2l", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], GapDoubletComponent.prototype, "s2r", void 0);
                __decorate([
                    core_1.ViewChild('gap1'),
                    __metadata("design:type", core_1.ElementRef)
                ], GapDoubletComponent.prototype, "gap1", void 0);
                __decorate([
                    core_1.ViewChild('gap2'),
                    __metadata("design:type", core_1.ElementRef)
                ], GapDoubletComponent.prototype, "gap2", void 0);
                GapDoubletComponent = __decorate([
                    core_1.Component({
                        selector: 'gap-doublet',
                        templateUrl: 'app/templates/gap-doublet.html',
                        styleUrls: ['app/css/molna.css', 'app/css/diagnostic.css']
                    })
                ], GapDoubletComponent);
                return GapDoubletComponent;
            }());
            exports_1("GapDoubletComponent", GapDoubletComponent);
        }
    };
});
//# sourceMappingURL=gap.doublet.component.js.map