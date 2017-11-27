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
    var core_1, SwitchToggleComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            SwitchToggleComponent = /** @class */ (function () {
                function SwitchToggleComponent() {
                    this.toggleArray = [false, false];
                }
                SwitchToggleComponent.prototype.toggle = function (position) {
                    this.toggleArray[position] = !this.toggleArray[position];
                    if (this.toggleArray[(position + 1) % 2]) {
                        this.toggleArray[(position + 1) % 2] = false;
                    }
                };
                SwitchToggleComponent.prototype.getValue = function () {
                    var value = (this.toggleArray[0] ? this.option1 : this.toggleArray[1] ? this.option2 : "");
                    if (value) {
                        return this.name + "=" + value.toLowerCase();
                    }
                    return "";
                };
                SwitchToggleComponent.prototype.getName = function () {
                    return this.name;
                };
                SwitchToggleComponent.prototype.setValue = function (val) {
                    this.toggleArray[val] = true;
                    if (this.toggleArray[(val + 1) % 2]) {
                        this.toggleArray[(val + 1) % 2] = false;
                    }
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], SwitchToggleComponent.prototype, "option1", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], SwitchToggleComponent.prototype, "option2", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], SwitchToggleComponent.prototype, "name", void 0);
                SwitchToggleComponent = __decorate([
                    core_1.Component({
                        selector: 'switch-toggle',
                        templateUrl: 'app/templates/switch-toggle.html',
                        styleUrls: ['app/css/switch-toggle.css']
                    }),
                    __metadata("design:paramtypes", [])
                ], SwitchToggleComponent);
                return SwitchToggleComponent;
            }());
            exports_1("SwitchToggleComponent", SwitchToggleComponent);
        }
    };
});
//# sourceMappingURL=switch-toggle.component.js.map