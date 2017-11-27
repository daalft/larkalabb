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
    var core_1, http_1, iSpeechTTSEngine;
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
            iSpeechTTSEngine = /** @class */ (function () {
                function iSpeechTTSEngine(http) {
                    this.http = http;
                    this.key = "b00454523491d770b4bebe76b09aa218";
                    // API modes: rest/xml/json
                    this.url = "https://api.ispeech.org/api/rest"; //?apikey= action=convert &text=something &format=mp3 &voice=swswedishfemale
                }
                iSpeechTTSEngine.prototype.speak = function (text) {
                    var curl = this.url + "?apikey=" + this.key + "&action=convert&text=" + encodeURIComponent(text) + "&format=mp3&voice=swswedishfemale";
                    this.http.get(curl).subscribe(function (d) {
                        console.log(d);
                    });
                };
                iSpeechTTSEngine = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], iSpeechTTSEngine);
                return iSpeechTTSEngine;
            }());
            exports_1("iSpeechTTSEngine", iSpeechTTSEngine);
        }
    };
});
//# sourceMappingURL=ispeech.service.js.map