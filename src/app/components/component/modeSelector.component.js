/**
 * Created by David on 4/1/2016.
 */
System.register(["@angular/core", "../../services/localizer.service", "./pleasewait.component"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, pleasewait_component_1, ModeSelectorComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            }
        ],
        execute: function () {/**
             * Created by David on 4/1/2016.
             */
            ModeSelectorComponent = /** @class */ (function () {
                function ModeSelectorComponent(localizer) {
                    this.localizer = localizer;
                    this.busyGenerating = false;
                    this.modeChangeEmitter = new core_1.EventEmitter();
                    this.generateEmitter = new core_1.EventEmitter();
                }
                ModeSelectorComponent.prototype.ngOnInit = function () {
                    this.modes = this.options.split(/,/);
                    this.selectedMode = this.modes[0];
                    this.modeChangeEmitter.emit(this.selectedMode);
                };
                ModeSelectorComponent.prototype.isActive = function (modus) {
                    return this.selectedMode == modus;
                };
                ModeSelectorComponent.prototype.setMode = function (modus) {
                    this.selectedMode = modus;
                    this.modeChangeEmitter.emit(modus);
                };
                ModeSelectorComponent.prototype.generate = function () {
                    this.waiter.on();
                    this.generateEmitter.emit("generate");
                    this.busyGenerating = true;
                };
                ModeSelectorComponent.prototype.releaseButton = function () {
                    this.waiter.off();
                    this.busyGenerating = false;
                };
                ModeSelectorComponent.prototype.lockButton = function () {
                    this.waiter.on();
                    this.busyGenerating = true;
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], ModeSelectorComponent.prototype, "options", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], ModeSelectorComponent.prototype, "modeChangeEmitter", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], ModeSelectorComponent.prototype, "generateEmitter", void 0);
                __decorate([
                    core_1.ViewChild(pleasewait_component_1.PleaseWaitComponent),
                    __metadata("design:type", pleasewait_component_1.PleaseWaitComponent)
                ], ModeSelectorComponent.prototype, "waiter", void 0);
                ModeSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'mode-selector',
                        templateUrl: "app/templates/mode-selector.html",
                        providers: [pleasewait_component_1.PleaseWaitComponent]
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService])
                ], ModeSelectorComponent);
                return ModeSelectorComponent;
            }());
            exports_1("ModeSelectorComponent", ModeSelectorComponent);
        }
    };
});
//# sourceMappingURL=modeSelector.component.js.map