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
    var core_1, ProfileMenuComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ProfileMenuComponent = /** @class */ (function () {
                function ProfileMenuComponent() {
                    this.cp = new core_1.EventEmitter();
                }
                ProfileMenuComponent.prototype.changePage = function (page) {
                    this.cp.emit({ 'page': page });
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], ProfileMenuComponent.prototype, "cp", void 0);
                ProfileMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'profile-menu',
                        templateUrl: 'app/templates/profile-menu.html',
                        styleUrls: ['app/css/profile-menu.css']
                    }),
                    __metadata("design:paramtypes", [])
                ], ProfileMenuComponent);
                return ProfileMenuComponent;
            }());
            exports_1("ProfileMenuComponent", ProfileMenuComponent);
        }
    };
});
//# sourceMappingURL=profileMenu.component.js.map