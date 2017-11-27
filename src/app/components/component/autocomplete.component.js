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
    var core_1, core_2, core_3, core_4, AutocompleteComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
                core_4 = core_1_1;
            }
        ],
        execute: function () {
            AutocompleteComponent = /** @class */ (function () {
                function AutocompleteComponent() {
                    this.selectedValueEmitter = new core_4.EventEmitter();
                    this.currentIndex = -1;
                    this.selectedValue = '';
                    this.noPropositions = true;
                }
                AutocompleteComponent.prototype.onKeyup = function (event, value) {
                    // 40 -> down
                    // 38 -> up
                    // 13 -> enter
                    if (event.which == 40) {
                        if (this.currentIndex > -1) {
                            this.currentProps[this.currentIndex]["highlight"] = false;
                        }
                        this.currentIndex = (this.currentIndex + 1) % (this.currentProps.length);
                        this.currentProps[this.currentIndex]["highlight"] = true;
                    }
                    else if (event.which == 38) {
                        if (this.currentIndex > 0) {
                            this.currentProps[this.currentIndex]["highlight"] = false;
                            this.currentIndex = (this.currentIndex - 1);
                            this.currentProps[this.currentIndex]["highlight"] = true;
                        }
                    }
                    else if (event.which == 13) {
                        this.setField(this.currentProps[this.currentIndex]);
                    }
                    else {
                        if (value == "") {
                            this.noPropositions = true;
                            return;
                        }
                        var me = this;
                        this.currentProps = [];
                        this.values.forEach(function (val) {
                            if (val.match(new RegExp("^" + value, "i"))) {
                                if (me.limitTo && me.currentProps.length >= me.limitTo) {
                                    return;
                                }
                                me.currentProps.push({ "name": val });
                            }
                        });
                        this.currentProps.sort();
                    }
                    this.noPropositions = (this.currentProps.length == 0);
                };
                AutocompleteComponent.prototype.setField = function (event) {
                    this.selectedValue = event.name;
                    if (this.currentIndex > -1) {
                        this.currentProps[this.currentIndex]["highlight"] = false;
                    }
                    this.currentProps = [];
                    this.currentIndex = -1;
                    this.noPropositions = true;
                    this.selectedValueEmitter.emit(this.selectedValue);
                };
                __decorate([
                    core_2.Input(),
                    __metadata("design:type", Array)
                ], AutocompleteComponent.prototype, "values", void 0);
                __decorate([
                    core_2.Input(),
                    __metadata("design:type", String)
                ], AutocompleteComponent.prototype, "label", void 0);
                __decorate([
                    core_2.Input(),
                    __metadata("design:type", Number)
                ], AutocompleteComponent.prototype, "limitTo", void 0);
                __decorate([
                    core_2.Input(),
                    __metadata("design:type", Number)
                ], AutocompleteComponent.prototype, "colwidth", void 0);
                __decorate([
                    core_3.Output(),
                    __metadata("design:type", core_4.EventEmitter)
                ], AutocompleteComponent.prototype, "selectedValueEmitter", void 0);
                AutocompleteComponent = __decorate([
                    core_1.Component({
                        selector: 'autocomplete-field',
                        templateUrl: 'app/templates/autocomplete-field.html',
                        styleUrls: ['app/css/autocomplete.css']
                    })
                ], AutocompleteComponent);
                return AutocompleteComponent;
            }());
            exports_1("AutocompleteComponent", AutocompleteComponent);
        }
    };
});
//# sourceMappingURL=autocomplete.component.js.map