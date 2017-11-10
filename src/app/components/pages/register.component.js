System.register(["@angular/core", "../../services/localizer.service", "../../services/login.service", "../../services/hash.service"], function(exports_1, context_1) {
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
    var core_1, localizer_service_1, login_service_1, hash_service_1;
    var RegisterComponent;
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
            function (hash_service_1_1) {
                hash_service_1 = hash_service_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(localizer, login) {
                    this.localizer = localizer;
                    this.login = login;
                    this.currentPage = 1;
                    this.allowNext = true;
                }
                RegisterComponent.prototype.nextPage = function (usn, pw) {
                    var me = this;
                    if (!usn) {
                        alert("Please choose a username!");
                        return;
                    }
                    if (!pw) {
                        alert("Please choose a password!");
                        return;
                    }
                    this.login.userExists(usn).subscribe(function (res) {
                        var status = res["Status"];
                        if (status == true) {
                            alert("This username is already taken!");
                            return;
                        }
                        me.uname = usn;
                        me.chash = hash_service_1.HashService.hashCode(pw + usn);
                        me.currentPage++;
                    });
                };
                RegisterComponent.prototype.bubble = function (event) {
                    this.allowNext = event;
                };
                RegisterComponent.prototype.createUser = function (udata) {
                    if (this.allowNext) {
                        udata["username"] = this.uname;
                        udata["chash"] = this.chash;
                        this.login.createUser(udata);
                        this.currentPage++;
                    }
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register-component',
                        templateUrl: 'app/templates/register.html',
                        styleUrls: ['app/css/register.css']
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, login_service_1.LoginService])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map