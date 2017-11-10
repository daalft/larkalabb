System.register(["@angular/core", '@angular/http', "./larka.adapter.service", "./tts.engine.service"], function(exports_1, context_1) {
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
    var core_1, http_1, larka_adapter_service_1, tts_engine_service_1;
    var LarkaService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (larka_adapter_service_1_1) {
                larka_adapter_service_1 = larka_adapter_service_1_1;
            },
            function (tts_engine_service_1_1) {
                tts_engine_service_1 = tts_engine_service_1_1;
            }],
        execute: function() {
            LarkaService = (function () {
                function LarkaService(http, tts, adapter) {
                    this.http = http;
                    this.tts = tts;
                    this.adapter = adapter;
                    this.devUrl = "https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi?indent=4&";
                }
                LarkaService.prototype.generateMulti = function (domain, pos, level) {
                    return this.adapter.generateMulti(domain, pos, level);
                };
                LarkaService.prototype.generate = function (exetype, pos, quarantine, indent) {
                    // delegate http call to adapter for now
                    return this.adapter.generate(exetype, pos, quarantine, indent);
                };
                LarkaService.prototype.texteval = function (command, producedBy, useML, text) {
                    //let text = encodeURIComponent("Det har kommit många flyktingar till Sverige de senaste åren. Förra året kom 160 tusen flyktingar hit. Men en del av dem somkom stannar inte. Allt fler väljer att åka tillbaka till sina hemländer. Fler än tio tusen flyktingar har lämnat Sverige frivilligt i år. De som reser hem får pengar av svenska staten. En familj kan få 75 tusen kronor.");
                    //console.log("Testing mode; ignoring CEFR_ML");
                    //console.log("Testing mode; hard-coded text");
                    var url = this.devUrl +
                        "command=" + command + "&" +
                        "produced_by=" + producedBy + "&" +
                        "CEFR_ML=" + (useML ? 1 : 0) + "&" +
                        "text=" + encodeURIComponent(text);
                    console.log(url);
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.hitex = function (query_w, query_type, use_defaults, query_pos, max_kwics, corpus_list, maxhit, random_seed, target_cefr, preserve_bad, other_params) {
                    var url = this.devUrl + "command=hitex&"
                        + "query_w=" + encodeURIComponent(query_w) + "&"
                        + "query_type=" + query_type + "&"
                        + "use_defaults=" + use_defaults;
                    if (query_pos) {
                        url += "&query_pos=" + query_pos;
                    }
                    if (max_kwics) {
                        url += "&max_kwics=" + max_kwics;
                    }
                    if (corpus_list) {
                        url += "&corpus_list=" + corpus_list;
                    }
                    if (maxhit) {
                        url += "&maxhit=" + maxhit;
                    }
                    if (random_seed) {
                        url += "&random_seed=" + random_seed;
                    }
                    if (target_cefr) {
                        url += "&target_cefr=" + target_cefr;
                    }
                    if (preserve_bad) {
                        url += "&preserve_bad=true";
                    }
                    if (other_params) {
                        url += "&" + other_params;
                    }
                    console.log(url);
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.ptk = function (sent1, sent2) {
                    var url = this.devUrl + "command=ptk&sent1=" + encodeURIComponent(sent1) + "&sent2=" + encodeURIComponent(sent2);
                    console.log(url);
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.cedit_save = function (userkey, lastpos, content) {
                    var url = this.devUrl + "command=cedit_save";
                    var usp = new http_1.URLSearchParams();
                    usp.append('userkey', userkey);
                    usp.append('lastposition', lastpos);
                    usp.append('content', encodeURIComponent(content));
                    return this.http.post(url, usp).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.cedit_restore = function (userkey) {
                    var url = this.devUrl + "command=cedit_restore&" +
                        "userkey=" + userkey;
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.cedit_checkKey = function (key) {
                    var url = this.devUrl + "command=cedit_checkkey&" +
                        "userkey=" + key;
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.speak = function (text, spell) {
                    return this.tts.textToSpeech(text, spell);
                };
                LarkaService.prototype.waims = function (word, pos) {
                    var url = this.devUrl + "command=waims" +
                        "&word=" + encodeURIComponent(word) +
                        "&pos=" + pos;
                    console.log(url);
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.siwoco = function (word, pos, rop) {
                    var url = this.devUrl + "command=siwoco" +
                        "&word=" + encodeURIComponent(word) +
                        "&pos=" + pos +
                        (rop ? "&receptiveOrProductive=" + rop : '');
                    console.log(url);
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService.prototype.wakeup = function () {
                    var url = this.devUrl + "command=hello";
                    console.log("wake up call");
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, tts_engine_service_1.TTSEngine, larka_adapter_service_1.LarkaAdapter])
                ], LarkaService);
                return LarkaService;
            }());
            exports_1("LarkaService", LarkaService);
        }
    }
});
//# sourceMappingURL=larka.service.js.map