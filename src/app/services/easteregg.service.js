System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, EasterEggService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            EasterEggService = /** @class */ (function () {
                /**
                 * Created by David on 4/25/2016.
                 */
                function EasterEggService() {
                    // eggs
                    this.eggArray = [];
                }
                EasterEggService.prototype.magicFunction1 = function () {
                    this.eggArray[0] = true;
                };
                EasterEggService.prototype.magicFunction2 = function () {
                    this.eggArray[1] = true;
                };
                EasterEggService.prototype.isChristmas = function () {
                    return this.eggArray[0];
                };
                EasterEggService.prototype.isAutumn = function () {
                    return this.eggArray[1];
                };
                EasterEggService = __decorate([
                    core_1.Injectable()
                ], EasterEggService);
                return EasterEggService;
            }());
            exports_1("EasterEggService", EasterEggService);
        }
    };
});
//# sourceMappingURL=easteregg.service.js.map