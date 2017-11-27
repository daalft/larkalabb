System.register(["@angular/core", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, http_1, KorpService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            KorpService = /** @class */ (function () {
                function KorpService(http) {
                    this.http = http;
                    this.baseUrl = "https://spraakbanken.gu.se/ws/korp?";
                    this.userQuery = "query?q=extended||and|wf|equals|"; // append word to search for
                    this.command = "command=query";
                    this.userResource = "&resource=saldom";
                    this.corpora = "corpus=ROM99,GP2010,GP2011,GP2012,GP2013,GP2D,ATTASIDOR,LASBART,SUC3,TALBANKEN";
                    this.cut = "cut=10";
                    this.miniEntry = "minientry?q=extended||and|wf|equals|";
                    this.restriction = "&show=lemgram";
                }
                KorpService.prototype.fetch = function (words) {
                    if (!Array.isArray(words)) {
                        words = words.split(" ");
                    }
                    var query = "";
                    for (var i = 0; i < words.length; i++) {
                        query += '[word = "' + words[i] + '"]';
                    }
                    var url = this.baseUrl + this.command + "&"
                        + "cqp=" + query + "&"
                        + this.corpora + "&start=0&end=9&defaultcontext=1+sentence&"
                        + this.cut;
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                KorpService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], KorpService);
                return KorpService;
            }());
            exports_1("KorpService", KorpService);
        }
    };
});
//# sourceMappingURL=korp.service.js.map