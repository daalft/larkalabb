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
    var core_1, http_1, KarpService;
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
            KarpService = /** @class */ (function () {
                function KarpService(http) {
                    this.http = http;
                    this.baseUrl = "https://ws.spraakbanken.gu.se/ws/karp/v2/";
                    this.userQuery = "query?q=extended||and|baseformC|equals|"; // append word to search for
                    this.posQuery = "||and|pos|equals|";
                    this.userResource = "&resource=saldom";
                    this.lexin = "&resource=lexin";
                    this.miniEntry = "minientry?q=extended||and|wf|equals|";
                    this.restriction = "&show=lemgram";
                }
                KarpService.prototype.fetchFrom = function (word, pos, resource) {
                    console.log(this.baseUrl + this.userQuery + word + this.posQuery + pos + "&resource=" + resource);
                    return this.http.get(this.baseUrl + this.userQuery + word + this.posQuery + pos + "&resource=" + resource);
                };
                KarpService.prototype.fetch = function (word) {
                    return this.http.get(this.baseUrl + this.userQuery + word + this.userResource);
                };
                /**
                 * Fetch mini entry with default restriction (pos,lemgram)
                 * @param word
                 */
                KarpService.prototype.fetchMini = function (word) {
                    return this.http.get(this.baseUrl + this.miniEntry + word + this.userResource + this.restriction);
                };
                KarpService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], KarpService);
                return KarpService;
            }());
            exports_1("KarpService", KarpService);
        }
    };
});
//# sourceMappingURL=karp.service.js.map