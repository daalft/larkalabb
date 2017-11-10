System.register(["@angular/core", "../component/profileOverview.component", "../navigation/profileMenu.component", "../component/learnerProgress.component", "../component/profileDetails.component", "../../services/login.service"], function(exports_1, context_1) {
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
    var core_1, profileOverview_component_1, profileMenu_component_1, learnerProgress_component_1, profileDetails_component_1, login_service_1;
    var ProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (profileOverview_component_1_1) {
                profileOverview_component_1 = profileOverview_component_1_1;
            },
            function (profileMenu_component_1_1) {
                profileMenu_component_1 = profileMenu_component_1_1;
            },
            function (learnerProgress_component_1_1) {
                learnerProgress_component_1 = learnerProgress_component_1_1;
            },
            function (profileDetails_component_1_1) {
                profileDetails_component_1 = profileDetails_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            ProfileComponent = (function () {
                function ProfileComponent(login) {
                    this.login = login;
                    this.currentPage = 0;
                }
                ProfileComponent.prototype.canActivate = function (route, state) {
                    return this.login.isLoggedIn();
                };
                ProfileComponent.prototype.changePage = function (page) {
                    this.currentPage = page['page'];
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: 'app/templates/profile.html',
                        styleUrls: ['app/css/profile.css'],
                        directives: [profileOverview_component_1.ProfileOverviewComponent, profileMenu_component_1.ProfileMenuComponent, learnerProgress_component_1.LearnerProgressComponent, profileDetails_component_1.ProfileDetailsComponent]
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService])
                ], ProfileComponent);
                return ProfileComponent;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map