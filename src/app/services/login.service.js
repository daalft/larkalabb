System.register(["@angular/core", "@angular/http", "./hash.service"], function (exports_1, context_1) {
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
    var core_1, http_1, hash_service_1, LoginService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (hash_service_1_1) {
                hash_service_1 = hash_service_1_1;
            }
        ],
        execute: function () {
            LoginService = /** @class */ (function () {
                function LoginService(http) {
                    this.http = http;
                    this.baseUrl = "https://ws.spraakbanken.gu.se/ws/larkadev/icall.cgi?";
                }
                LoginService.prototype.isLoggedIn = function () {
                    return this.loggedIn;
                };
                LoginService.prototype.userExists = function (username) {
                    var url = this.baseUrl + "command=exists&username=" + username;
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LoginService.prototype.createUser = function (udata) {
                    var command = "command=create_user";
                    //this.baseUrl;
                    var url = this.baseUrl + command;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var usp = new http_1.URLSearchParams();
                    for (var property in udata) {
                        if (udata.hasOwnProperty(property)) {
                            usp.append(property, udata[property]);
                        }
                    }
                    this.http.post(url, usp, { headers: headers }).subscribe(function (data) {
                    });
                };
                LoginService.prototype.logout = function () {
                    alert("Logging out");
                    this.loggedIn = false;
                    this.userId = null;
                };
                LoginService.prototype.login = function (username, password, remember) {
                    var url = this.baseUrl + "command=login";
                    var hpw = hash_service_1.HashService.hashCode(password + username);
                    var usp = new http_1.URLSearchParams();
                    usp.append('username', username);
                    usp.append('chash', hpw + "");
                    var me = this;
                    return this.http.post(url, usp).map(function (res) { return res.json(); });
                };
                LoginService.prototype.getRandomId = function () {
                    if (!this.randomId) {
                        this.randomId = "guestsession" + this.randomNumber();
                    }
                    return this.randomId;
                };
                LoginService.prototype.randomNumber = function () {
                    return Math.round(Math.random() * 1000000);
                };
                LoginService.prototype.createAuthorizationHeader = function (headers, userstring) {
                    headers.append('Authorization', 'Basic ' +
                        btoa(userstring));
                };
                LoginService.prototype.getUserId = function () {
                    return this.userId;
                };
                LoginService.prototype.setUserId = function (uid) {
                    this.userId = uid;
                    this.loggedIn = true;
                };
                LoginService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    };
});
//# sourceMappingURL=login.service.js.map