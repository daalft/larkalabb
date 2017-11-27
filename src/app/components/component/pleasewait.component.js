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
    var core_1, localizer_service_1, PleaseWaitComponent;
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
            PleaseWaitComponent = /** @class */ (function () {
                function PleaseWaitComponent(localizer) {
                    this.localizer = localizer;
                    this.waiting = false;
                    this.magicVariable = true;
                }
                PleaseWaitComponent.prototype.on = function () {
                    this.magicVariable = Math.random() > 0.1;
                    this.waiting = true;
                };
                PleaseWaitComponent.prototype.off = function () {
                    this.waiting = false;
                };
                PleaseWaitComponent.prototype.showLark = function () {
                    return this.magicVariable;
                };
                PleaseWaitComponent = __decorate([
                    core_1.Component({
                        selector: 'pleasewait',
                        templateUrl: 'app/templates/pleasewait.html',
                        styleUrls: ['app/css/pleasewait.css']
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService])
                ], PleaseWaitComponent);
                return PleaseWaitComponent;
            }());
            exports_1("PleaseWaitComponent", PleaseWaitComponent);
        }
    };
});
//# sourceMappingURL=pleasewait.component.js.map