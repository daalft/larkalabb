System.register(["@angular/core", "./services/localizer.service", "rxjs/add/operator/map", "@angular/router", "./services/larka.service", "./services/larka.adapter.service", "./services/logger.service", "./services/login.service", "./services/easteregg.service", "./services/nuance.service", "./services/dataAggregator.service", "./services/korp.service", "./services/karp.service", "./services/hash.service", "./services/tts.engine.service", "./services/ispeech.service"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, router_1, larka_service_1, larka_adapter_service_1, logger_service_1, login_service_1, easteregg_service_1, nuance_service_1, dataAggregator_service_1, korp_service_1, karp_service_1, hash_service_1, tts_engine_service_1, ispeech_service_1, LarkaApp;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (_1) {
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (larka_adapter_service_1_1) {
                larka_adapter_service_1 = larka_adapter_service_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (easteregg_service_1_1) {
                easteregg_service_1 = easteregg_service_1_1;
            },
            function (nuance_service_1_1) {
                nuance_service_1 = nuance_service_1_1;
            },
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            },
            function (korp_service_1_1) {
                korp_service_1 = korp_service_1_1;
            },
            function (karp_service_1_1) {
                karp_service_1 = karp_service_1_1;
            },
            function (hash_service_1_1) {
                hash_service_1 = hash_service_1_1;
            },
            function (tts_engine_service_1_1) {
                tts_engine_service_1 = tts_engine_service_1_1;
            },
            function (ispeech_service_1_1) {
                ispeech_service_1 = ispeech_service_1_1;
            }
        ],
        execute: function () {
            LarkaApp = /** @class */ (function () {
                function LarkaApp(localizer, router) {
                    this.localizer = localizer;
                    this.router = router;
                }
                LarkaApp.prototype.localize = function (key) {
                    return this.localizer.localize(key);
                };
                LarkaApp = __decorate([
                    core_1.Component({
                        selector: 'larka-app',
                        templateUrl: 'app/templates/larka-app.html',
                        providers: [localizer_service_1.LocalizerService, larka_service_1.LarkaService, larka_adapter_service_1.LarkaAdapter, logger_service_1.LoggerService, login_service_1.LoginService, korp_service_1.KorpService, karp_service_1.KarpService, dataAggregator_service_1.DataAggregatorService, nuance_service_1.NuanceService, easteregg_service_1.EasterEggService, hash_service_1.HashService, tts_engine_service_1.TTSEngine, ispeech_service_1.iSpeechTTSEngine],
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService, router_1.Router])
                ], LarkaApp);
                return LarkaApp;
            }());
            exports_1("LarkaApp", LarkaApp);
        }
    };
});
//# sourceMappingURL=app.component.js.map