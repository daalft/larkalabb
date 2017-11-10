/**
 * Created by David on 4/5/2016.
 */
/**
 Connect to the old Lärka version
 */
System.register(["@angular/core", "@angular/http"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var LarkaAdapter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            LarkaAdapter = (function () {
                function LarkaAdapter(http) {
                    this.http = http;
                    this.baseUrl = "https://ws.spraakbanken.gu.se/ws/icall/icall.cgi?";
                }
                ;
                LarkaAdapter.prototype.generateMulti = function (domain, param, level) {
                    //exe=multi&lang=sv&poslist=KN,SN,DT,PP,PN,JJ,AB,NN,VB&domain=kelly&level=A1,A2,B1,B2,C1,C2
                    var exetype = "exetype=multi";
                    var particleQ = "pos";
                    var paramQ = particleQ + "=" + this.map(param).join(",");
                    var domain = "domain=" + domain;
                    var level = "level=" + this.map(level);
                    //let lang = "lang=sv";
                    var url = this.baseUrl + exetype + "&" + paramQ + "&" + level;
                    console.log(url);
                    var response = this.http.get(url);
                    try {
                        response = response.map(function (res) { return res.json(); });
                    }
                    catch (e) {
                        console.log(e);
                        return this.generateMulti(domain, param, level);
                    }
                    return response;
                };
                LarkaAdapter.prototype.generate = function (exetype, param, carantine, indent) {
                    //exetype=pos1&pos=NN&carantine=0&indent=2
                    var exetypeShort = this.map(exetype);
                    var exetypeQ = "exetype=" + exetypeShort;
                    var particleQ = exetypeShort == 'pos1' ? "pos" :
                        exetypeShort == 'pos2' ? "pos" :
                            exetypeShort == 'synt1' ? 'deprel' :
                                exetypeShort == 'synt2' ? 'deprel' :
                                    exetypeShort == 'sem' ? 'semroles' :
                                        "";
                    var paramQ = particleQ + "=" + this.map(param).join(",");
                    var carantineQ = "carantine=" + carantine;
                    var indentQ = "indent=" + indent;
                    var url = this.baseUrl + exetypeQ + "&" + paramQ + "&" + carantineQ + "&" + indentQ;
                    //console.log(url);
                    return this.http.get(url).map(function (res) { return res.json(); });
                };
                LarkaAdapter.prototype.map = function (key) {
                    if (typeof key == "string") {
                        if (key == "trainSemanticRoles")
                            return "sem";
                        if (key.match("train")) {
                            return key.substr(5).toLowerCase();
                        }
                        else {
                            return key;
                        }
                    }
                    else {
                        if ({}.toString.call(key) == "[object Array]") {
                            var mappedOut = [];
                            for (var i = 0; i < key.length; i++) {
                                mappedOut.push(this.posMap(key[i]));
                            }
                            return mappedOut;
                        }
                    }
                };
                LarkaAdapter.prototype.posMap = function (pos) {
                    switch (pos) {
                        case "adjectives":
                            return "JJ";
                        case "adverbs":
                            return "AB";
                        case "participles":
                            return "PC";
                        case "nouns":
                            return "NN";
                        case "verbs":
                            return "VB";
                        case "determiners":
                            return "DT";
                        case "conjunctions":
                            return "KN";
                        case "prepositions":
                            return "PP";
                        case "pronouns":
                            return "PN";
                        case "subjunctions":
                            return "SN";
                        case "numerals":
                            return "RG";
                        case "subject": return "SS";
                        case "adverbial": return "AA";
                        case "finite verb": return "FV";
                        case "indirect object": return "IO";
                        case "nonfinite verb": return "IV";
                        case "object": return "OO";
                        case "predicate": return "OP";
                        case "agent_sem":
                            return "Agent";
                        case "experiencer_sem":
                            return "Experiencer";
                        case "theme_sem":
                            return "Theme";
                        case "instrument_sem": return "Instrument";
                        case "location_sem": return "Location";
                        case "direction_sem": return "Direction";
                        case "recipient_sem": return "Recipient";
                        case "origin_sem": return "Origin";
                        case "time_sem": return "Time";
                        case "manner_sem": return "Manner";
                        case "purpose_sem": return "Purpose";
                        case "cause_sem": return "Cause";
                        default:
                            return pos;
                    }
                };
                LarkaAdapter = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LarkaAdapter);
                return LarkaAdapter;
            }());
            exports_1("LarkaAdapter", LarkaAdapter);
        }
    }
});
//# sourceMappingURL=larka.adapter.service.js.map