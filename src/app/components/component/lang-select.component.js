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
    var core_1, LanguageSelectionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            LanguageSelectionComponent = /** @class */ (function () {
                function LanguageSelectionComponent() {
                    // mock arrays for number of fields
                    this.mothertongues = [1];
                    this.othertongues = [1];
                    // real values
                    this.mothertonguesReal = [];
                    this.othertonguesReal = [];
                    this.levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
                }
                LanguageSelectionComponent.prototype.addMothertongue = function () {
                    this.mothertongues.push(1);
                };
                LanguageSelectionComponent.prototype.addOthertongue = function () {
                    this.othertongues.push(1);
                };
                LanguageSelectionComponent.prototype.handleMtSet = function (value) {
                    this.mothertonguesReal.push(value);
                };
                LanguageSelectionComponent.prototype.handleOtSet = function (value) {
                    this.othertonguesReal.push(value);
                };
                LanguageSelectionComponent.prototype.getMothertongues = function () {
                    return this.mothertonguesReal;
                };
                LanguageSelectionComponent.prototype.getOthertongues = function () {
                    return this.othertonguesReal;
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], LanguageSelectionComponent.prototype, "langs", void 0);
                LanguageSelectionComponent = __decorate([
                    core_1.Component({
                        selector: 'lang-select',
                        templateUrl: 'app/templates/lang-select.html',
                        styleUrls: ['app/css/autocomplete.css']
                    })
                ], LanguageSelectionComponent);
                return LanguageSelectionComponent;
            }());
            exports_1("LanguageSelectionComponent", LanguageSelectionComponent);
        }
    };
});
//# sourceMappingURL=lang-select.component.js.map