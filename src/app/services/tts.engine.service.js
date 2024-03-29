System.register(["@angular/core", "./nuance.service"], function (exports_1, context_1) {
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
    var core_1, nuance_service_1, TTSEngine;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nuance_service_1_1) {
                nuance_service_1 = nuance_service_1_1;
            }
        ],
        execute: function () {
            TTSEngine = /** @class */ (function () {
                function TTSEngine(tts) {
                    this.tts = tts;
                }
                TTSEngine.prototype.textToSpeech = function (text, spell) {
                    return this.tts.speak(text, spell).map(function (res) { return res.json(); });
                };
                TTSEngine = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [nuance_service_1.NuanceService])
                ], TTSEngine);
                return TTSEngine;
            }());
            exports_1("TTSEngine", TTSEngine);
        }
    };
});
//# sourceMappingURL=tts.engine.service.js.map