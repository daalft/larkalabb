System.register(["@angular/core", "../../services/localizer.service"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, OverlayMenuComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            }
        ],
        execute: function () {
            OverlayMenuComponent = /** @class */ (function () {
                function OverlayMenuComponent(localizer) {
                    this.localizer = localizer;
                    this.showOne = false;
                    this.showTwo = false;
                }
                OverlayMenuComponent.prototype.open = function (which) {
                    if (which == 1) {
                        this.showOne = !this.showOne;
                    }
                    if (which == 2) {
                        this.showTwo = !this.showTwo;
                    }
                };
                OverlayMenuComponent.prototype.close = function () {
                    if (this.showOne) {
                        this.showOne = false;
                    }
                    if (this.showTwo) {
                        this.showTwo = false;
                    }
                };
                OverlayMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'overlay-menu',
                        templateUrl: 'app/templates/overlay-menu.html',
                        styleUrls: ['app/css/overlay-menu.css']
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService])
                ], OverlayMenuComponent);
                return OverlayMenuComponent;
            }());
            exports_1("OverlayMenuComponent", OverlayMenuComponent);
        }
    };
});
//# sourceMappingURL=overlayMenu.component.js.map