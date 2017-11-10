System.register(["@angular/core", "./autocomplete.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, autocomplete_component_1;
    var LanguageSelectionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (autocomplete_component_1_1) {
                autocomplete_component_1 = autocomplete_component_1_1;
            }],
        execute: function() {
            LanguageSelectionComponent = (function () {
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
                    __metadata('design:type', Object)
                ], LanguageSelectionComponent.prototype, "langs", void 0);
                LanguageSelectionComponent = __decorate([
                    core_1.Component({
                        selector: 'lang-select',
                        templateUrl: 'app/templates/lang-select.html',
                        directives: [autocomplete_component_1.AutocompleteComponent],
                        styleUrls: ['app/css/autocomplete.css'],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LanguageSelectionComponent);
                return LanguageSelectionComponent;
            }());
            exports_1("LanguageSelectionComponent", LanguageSelectionComponent);
        }
    }
});
//# sourceMappingURL=lang-select.component.js.map