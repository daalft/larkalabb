System.register(["@angular/core", "@angular/http", "./client.browser.service"], function(exports_1, context_1) {
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
    var core_1, http_1, client_browser_service_1;
    var LoggerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (client_browser_service_1_1) {
                client_browser_service_1 = client_browser_service_1_1;
            }],
        execute: function() {
            /**
             * Created by David on 9/28/2016.
             */
            LoggerService = (function () {
                function LoggerService(http) {
                    this.http = http;
                    this.backend = "https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi";
                    this.ipbackend = "https://ipinfo.io/json";
                }
                LoggerService.prototype.getUserInfo = function () {
                    var me = this;
                    this.http.get(this.ipbackend).map(function (data) { return data.json(); }).subscribe(function (data) {
                        me.geodata = data;
                    });
                };
                LoggerService.prototype.log = function (message, mode) {
                    //console.log("logging " + message);
                    if (!message) {
                        return;
                    }
                    // Inject browser data
                    if (!this.clientbrowser) {
                        this.clientbrowser = client_browser_service_1.ClientBrowserService.getInfo();
                    }
                    message["userclient"] = this.clientbrowser;
                    // Inject geodata
                    message["geodata"] = this.geodata;
                    console.log(message);
                    // TODO json encode string escape
                    var jsonmessage = JSON.stringify(message);
                    var reqStatus = 500;
                    //let headers = new Headers({ 'content-type': 'application/json' });
                    //let options = new RequestOptions({ headers: headers });
                    //?command=log&log_type=exe_linguists&text=
                    //?command=log&log_type=exe_linguists
                    var command = "log";
                    if (mode) {
                        command = mode;
                    }
                    var url = this.backend + "?command=" + command;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var usp = new http_1.URLSearchParams();
                    usp.append("type", message["exercise"]);
                    usp.append("log_type", message["exercise"]); // for compatibility with previous labb logging
                    for (var property in message) {
                        if (message.hasOwnProperty(property)) {
                            usp.append(property, message[property]);
                        }
                    }
                    this.http.post(url, usp).map(function (data) { return data.json(); }).subscribe(function (data) {
                    });
                    return reqStatus;
                };
                LoggerService.prototype.error = function (message) {
                };
                LoggerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LoggerService);
                return LoggerService;
            }());
            exports_1("LoggerService", LoggerService);
        }
    }
});
//# sourceMappingURL=logger.service.js.map