System.register(["@angular/core", "rxjs/Observable"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, Observable_1, StateService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            StateService = /** @class */ (function () {
                /**
                 * Created by David on 4/25/2016.
                 */
                function StateService() {
                    this.states = {};
                }
                StateService.prototype.persist = function (origin, state) {
                    this.states[origin] = state;
                };
                StateService.prototype.retrieve = function (origin) {
                    var me = this;
                    return Observable_1.Observable.create(function (obs) {
                        obs.next(me.states[origin]);
                        obs.complete();
                    });
                };
                StateService.prototype.hasState = function (origin) {
                    return this.states[origin] !== undefined;
                };
                StateService = __decorate([
                    core_1.Injectable()
                ], StateService);
                return StateService;
            }());
            exports_1("StateService", StateService);
        }
    };
});
//# sourceMappingURL=state.service.js.map