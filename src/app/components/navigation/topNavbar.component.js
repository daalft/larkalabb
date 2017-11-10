System.register(['@angular/core', '../../services/localizer.service', "../../services/login.service", "@angular/router", "../component/pleasewait.component"], function(exports_1, context_1) {
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
    var core_1, localizer_service_1, login_service_1, router_1, pleasewait_component_1;
    var TopNavbarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            }],
        execute: function() {
            TopNavbarComponent = (function () {
                function TopNavbarComponent(localizer, login, router) {
                    this.localizer = localizer;
                    this.login = login;
                    this.router = router;
                }
                TopNavbarComponent.prototype.ngAfterViewInit = function () {
                    // check what the browser url is
                    var url = window.location.pathname;
                    var segments = url.split(/\//);
                    var segment = segments[segments.length - 1];
                    // TODO do not hardwire this
                    switch (segment) {
                        case "linguist":
                        case "learner":
                            this.currentSelected = 1;
                            break;
                        case "hitex":
                            this.currentSelected = 2;
                            break;
                        case "editor":
                            this.currentSelected = 3;
                            break;
                        case "texteval":
                            this.currentSelected = 4;
                            break;
                        default: break;
                    }
                };
                TopNavbarComponent.prototype.toggleMenu = function (which) {
                    if (which == 1) {
                        this.menuLeft = !this.menuLeft;
                    }
                    if (which == 2) {
                        this.menuRight = !this.menuRight;
                    }
                };
                TopNavbarComponent.prototype.close = function () {
                    if (this.menuLeft) {
                        this.menuLeft = false;
                    }
                    if (this.menuRight) {
                        this.menuRight = false;
                    }
                };
                TopNavbarComponent.prototype.localize = function (key) {
                    return this.localizer.localize(key);
                };
                TopNavbarComponent.prototype.setLanguage = function (lang) {
                    this.localizer.setLanguage(lang);
                };
                TopNavbarComponent.prototype.getLanguage = function () {
                    return this.localizer.getLanguage();
                };
                TopNavbarComponent.prototype.loggedIn = function () {
                    return this.login.isLoggedIn();
                };
                TopNavbarComponent.prototype.isAdmin = function () {
                    return this.login.isLoggedIn() && (this.login.getUserId() == 1 || this.login.getUserId() == 2);
                };
                TopNavbarComponent.prototype.logout = function () {
                    this.login.logout();
                };
                TopNavbarComponent.prototype.tryLogin = function (username, password) {
                    this.waiter.on();
                    var remember = this.keep_checkbox;
                    if (remember) {
                        document.cookie = username + ":" + password;
                    }
                    var me = this;
                    var loginModal = $('#loginModal');
                    this.login.login(username, password, remember).subscribe(function (data) {
                        if (data["Status"] == 200) {
                            me.login.setUserId(data["userid"]);
                            loginModal.modal('hide');
                            me.wrongup = false;
                            me.waiter.off();
                        }
                        else {
                            me.wrongup = true;
                            me.waiter.off();
                        }
                    });
                };
                TopNavbarComponent.prototype.isSelected = function (value) {
                    return this.currentSelected == value;
                };
                TopNavbarComponent.prototype.setSelected = function (value) {
                    this.currentSelected = value;
                };
                __decorate([
                    core_1.ViewChild(pleasewait_component_1.PleaseWaitComponent), 
                    __metadata('design:type', pleasewait_component_1.PleaseWaitComponent)
                ], TopNavbarComponent.prototype, "waiter", void 0);
                TopNavbarComponent = __decorate([
                    core_1.Component({
                        selector: 'top-navbar',
                        providers: [login_service_1.LoginService],
                        templateUrl: 'app/templates/top-navbar-dev.html',
                        styleUrls: ['app/css/topnavbar.css']
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, login_service_1.LoginService, router_1.Router])
                ], TopNavbarComponent);
                return TopNavbarComponent;
            }());
            exports_1("TopNavbarComponent", TopNavbarComponent);
        }
    }
});
//# sourceMappingURL=topNavbar.component.js.map