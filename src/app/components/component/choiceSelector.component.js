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
    var core_1, localizer_service_1, ChoiceSelectorComponent;
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
            ChoiceSelectorComponent = /** @class */ (function () {
                function ChoiceSelectorComponent(localizer) {
                    this.localizer = localizer;
                }
                ChoiceSelectorComponent.prototype.sense = function (array) {
                    for (var i = 0; i < array.length; i++) {
                        var labels = array[i].labels;
                        var selected = this.countSelected(labels);
                        var total = labels.length;
                        if (selected / total > 0.5) {
                            this.setSelected(labels, false);
                        }
                        else {
                            this.setSelected(labels, true);
                        }
                    }
                };
                ChoiceSelectorComponent.prototype.sense2 = function (labels) {
                    var selected = this.countSelected(labels);
                    var total = labels.length;
                    if (selected / total > 0.5) {
                        this.setSelected(labels, false);
                    }
                    else {
                        this.setSelected(labels, true);
                    }
                };
                ChoiceSelectorComponent.prototype.countSelected = function (labels) {
                    var count = 0;
                    for (var i = 0; i < labels.length; i++) {
                        if (labels[i].selected) {
                            count++;
                        }
                    }
                    return count;
                };
                ChoiceSelectorComponent.prototype.setSelected = function (labels, value) {
                    for (var i = 0; i < labels.length; i++) {
                        labels[i].selected = value;
                    }
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], ChoiceSelectorComponent.prototype, "choices", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], ChoiceSelectorComponent.prototype, "disabled", void 0);
                ChoiceSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'choice-selector',
                        templateUrl: 'app/templates/choice-selector.html'
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService])
                ], ChoiceSelectorComponent);
                return ChoiceSelectorComponent;
            }());
            exports_1("ChoiceSelectorComponent", ChoiceSelectorComponent);
        }
    };
});
//# sourceMappingURL=choiceSelector.component.js.map