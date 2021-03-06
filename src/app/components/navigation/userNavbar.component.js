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
    var core_1, localizer_service_1, UserNavbarComponent;
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
            UserNavbarComponent = /** @class */ (function () {
                function UserNavbarComponent(localizer) {
                    this.localizer = localizer;
                    this.roles = [
                        { 'name': 'linguists', route: '/linguist' },
                        { 'name': 'lang_learners', route: '/learner' }
                    ];
                }
                UserNavbarComponent.prototype.localize = function (key) {
                    return this.localizer.localize(key);
                };
                UserNavbarComponent.prototype.selectRole = function (newRole) {
                    this.roles.forEach(function (role) {
                        role['active'] = (newRole == role);
                    });
                };
                UserNavbarComponent = __decorate([
                    core_1.Component({
                        selector: 'user-navbar',
                        templateUrl: 'app/templates/user-navbar.html'
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService])
                ], UserNavbarComponent);
                return UserNavbarComponent;
            }());
            exports_1("UserNavbarComponent", UserNavbarComponent);
        }
    };
});
//# sourceMappingURL=userNavbar.component.js.map