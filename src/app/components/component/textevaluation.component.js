System.register(["@angular/core", "../../services/localizer.service", "@angular/http", "../../services/larka.service", "./pleasewait.component", "../../services/easteregg.service"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, http_1, larka_service_1, pleasewait_component_1, easteregg_service_1, TextEvaluationComponent, ResponseObject;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            },
            function (easteregg_service_1_1) {
                easteregg_service_1 = easteregg_service_1_1;
            }
        ],
        execute: function () {
            TextEvaluationComponent = /** @class */ (function () {
                function TextEvaluationComponent(localizer, http, larka, eggs) {
                    this.localizer = localizer;
                    this.http = http;
                    this.larka = larka;
                    this.eggs = eggs;
                    // TODO remove
                    this.devMode = false;
                    this.assessEssay = true;
                    this.unprocessed = true;
                    this.processed = !this.unprocessed;
                    this.words = [];
                    this.responseObject = new ResponseObject();
                }
                TextEvaluationComponent.prototype.setAssessmentMode = function (mode) {
                    this.mode = mode;
                    if (mode == 1) {
                        this.assessText = true;
                        this.assessEssay = false;
                    }
                    if (mode == 2) {
                        this.assessText = false;
                        this.assessEssay = true;
                    }
                };
                TextEvaluationComponent.prototype.runAssessment = function () {
                    this.waiter.on();
                    var me = this;
                    var textarea = this.userinput["nativeElement"];
                    this.text = textarea.value;
                    var ttt = this.text.split(" ");
                    if (ttt.includes("höst") || ttt.includes("Höst") || ttt.includes("hösten") || ttt.includes("Hösten")) {
                        this.eggs.magicFunction2();
                    }
                    this.larka.texteval("complexity", (this.assessText ? "expert" : "learner"), true, this.text).subscribe(function (data) {
                        //console.log(data);
                        me.parseResponse(data);
                        me.unprocessed = false;
                        me.waiter.off();
                    });
                    // this.http.get("app/data/example_text_augment.json").map(data => data.json()).
                    //     subscribe(function (data) {
                    //     me.extractWords(data,false);
                    //     me.unprocessed = false;
                    // });
                };
                TextEvaluationComponent.prototype.parseResponse = function (data) {
                    // Overall predicted levels
                    var cefrLevelML = data["CEFR_ML"]; // check whether this exists
                    var cefrLevelKelly = data["CEFR_kelly_avg"];
                    var cefrLevelSvalex = data["CEFR_svalex_avg"];
                    var cefrLevelSwell = data["CEFR_swell_avg"];
                    this.responseObject.cefrML = cefrLevelML;
                    this.responseObject.cefrKelly = cefrLevelKelly;
                    this.responseObject.cefrSvalex = cefrLevelSvalex;
                    this.responseObject.cefrSwell = cefrLevelSwell;
                    // Different scores
                    var lixScore = data["LIX"];
                    var pntonn = data["PNtoNN"];
                    this.responseObject.lixScore = lixScore;
                    this.responseObject.lixMapping = this.mapLixScore(lixScore);
                    this.responseObject.pntonn = pntonn;
                    var avg_dep_len = data["avg_dep_len"];
                    var avg_sent_len = data["avg_sent_len"];
                    var avg_token_len = data["avg_tok_len"];
                    this.responseObject.avgDepLen = avg_dep_len;
                    this.responseObject.avgSentLen = avg_sent_len;
                    this.responseObject.avgTokLen = avg_token_len;
                    var nominal_ratio = data["nominal_ratio"];
                    var non_lemmatized = data["non-lemmatized"];
                    var nr_sents = data["nr_sents"];
                    var nr_tokens = data["nr_tokens"];
                    this.responseObject.nominalRatio = nominal_ratio;
                    this.responseObject.nonLemmatized = non_lemmatized;
                    this.responseObject.nrSents = nr_sents;
                    this.responseObject.nrTokens = nr_tokens;
                    // Frequency distributions over word lists
                    var kelly_cefr = data["kelly_CEFR"];
                    var svalex_cefr = data["svalex_CEFR"];
                    var swell_cefr = data["swell_CEFR"];
                    this.responseObject.kellyCefr = kelly_cefr;
                    this.responseObject.svalexCefr = svalex_cefr;
                    this.responseObject.swellCefr = swell_cefr;
                    // Text with (wordform,svalex,swell) annotation
                    var levelled_text = data["levelled_text"];
                    // TODO remove; replaced by this.words?
                    this.responseObject.levelledText = levelled_text;
                    this.words = levelled_text;
                };
                TextEvaluationComponent.prototype.mapLixScore = function (score) {
                    var numScore = parseInt(score);
                    /*
                    < 30	Mycket lättläst, barnböcker
                    30 - 40	Lättläst, skönlitteratur, populärtidningar
                    40 - 50	Medelsvår, normal tidningstext
                    50 - 60	Svår, normalt värde för officiella texter
                    > 60	Mycket svår, byråkratsvenska
                    */
                    if (numScore < 30)
                        return 'lix-interpretation-very-easy';
                    if (numScore >= 30 && numScore < 40)
                        return 'lix-interpretation-easy';
                    if (numScore >= 40 && numScore < 50)
                        return 'lix-interpretation-normal';
                    if (numScore >= 50 && numScore < 60)
                        return 'lix-interpretation-hard';
                    if (numScore >= 60)
                        return 'lix-interpretation-very-hard';
                    return "could not map lix score";
                };
                TextEvaluationComponent.prototype.renderJson = function (text) {
                    var json = JSON.parse(text);
                    this.extractWords(json, true);
                    this.unprocessed = false;
                };
                TextEvaluationComponent.prototype.extractWords = function (json, hasResultNode) {
                    if (hasResultNode === void 0) { hasResultNode = true; }
                    var sentences;
                    if (hasResultNode) {
                        sentences = json["result"]["corpus"]["paragraph"]["sentence"];
                    }
                    else {
                        sentences = json["corpus"]["paragraph"]["sentence"];
                    }
                    for (var i = 0; i < sentences.length; i++) {
                        var words = sentences[i]["w"];
                        for (var j = 0; j < words.length; j++) {
                            //console.log(words[j]["$t"]);
                            //this.words.push(words[j]["$t"]);
                            this.words.push(words[j]);
                        }
                    }
                };
                TextEvaluationComponent.prototype.isColor = function (word, pos, level) {
                    var cefr = level.value.toUpperCase();
                    var wordpos = word + "_" + pos;
                    return (wordpos["-receptive"] == cefr || wordpos["-productive"] == cefr) && level.checked;
                };
                TextEvaluationComponent.prototype.isBlue = function (word, pos, cb) {
                    return this.isColor(word, pos, cb);
                };
                TextEvaluationComponent.prototype.isGreen = function (word, pos, cb) {
                    return this.isColor(word, pos, cb);
                };
                TextEvaluationComponent.prototype.isYellow = function (word, pos, cb) {
                    return this.isColor(word, pos, cb);
                };
                TextEvaluationComponent.prototype.isOrange = function (word, pos, cb) {
                    return this.isColor(word, pos, cb);
                };
                TextEvaluationComponent.prototype.isRed = function (word, pos, cb) {
                    return this.isColor(word, pos, cb);
                };
                TextEvaluationComponent.prototype.isReceptive = function (word) {
                    return word.hasOwnProperty("-receptive");
                };
                TextEvaluationComponent.prototype.isProductive = function (word) {
                    return word.hasOwnProperty("-productive");
                };
                TextEvaluationComponent.prototype.isPotentiallyIncorrect = function (word) {
                    return word.hasOwnProperty("out-of-saldo");
                };
                TextEvaluationComponent.prototype.getStyle = function (word) {
                    var classes = "";
                    if (word[1]) {
                        var level = word[1];
                        if (level === "A1" && this.ca1) {
                            classes += "receptive ";
                            classes += "blue";
                        }
                        if (level === "A2" && this.ca2) {
                            classes += "receptive ";
                            classes += "green";
                        }
                        if (level === "B1" && this.cb1) {
                            classes += "receptive ";
                            classes += "yellow";
                        }
                        if (level === "B2" && this.cb2) {
                            classes += "receptive ";
                            classes += "orange";
                        }
                        if (level === "C1" && this.cc1) {
                            classes += "receptive ";
                            classes += "red";
                        }
                        if (level === "-" && this.cunk) {
                            classes += "out-of-saldo";
                        }
                    }
                    if (this.assessText) {
                        return classes;
                    }
                    // productive should *always* overwrite receptive
                    if (word[2]) {
                        //style = "opacity: 0.8;";
                        var level = word[2];
                        if (level === "A1" && this.ca1) {
                            classes = "productive ";
                            classes += "blue";
                        }
                        if (level === "A2" && this.ca2) {
                            classes = "productive ";
                            classes += "green";
                        }
                        if (level === "B1" && this.cb1) {
                            classes = "productive ";
                            classes += "yellow";
                        }
                        if (level === "B2" && this.cb2) {
                            classes = "productive ";
                            classes += "orange";
                        }
                        if (level === "C1" && this.cc1) {
                            classes = "productive ";
                            classes += "red";
                        }
                        // should not need to add out-of-saldo here
                        // since if it is out of saldo in svalex, it
                        // ought to be out of saldo in swell as well
                    }
                    //style += color;
                    return classes;
                };
                TextEvaluationComponent.prototype.editText = function () {
                    this.unprocessed = true;
                    //this.userinput["nativeElement"].value = this.text;
                };
                TextEvaluationComponent.prototype.reset = function () {
                    this.ca1 = false;
                    this.ca2 = false;
                    this.assessEssay = true;
                    this.assessText = false;
                    this.cb1 = false;
                    this.cb2 = false;
                    this.cc1 = false;
                    this.csch = false;
                    this.cunk = false;
                    this.unprocessed = true;
                    this.userinput["nativeElement"].value = "";
                };
                __decorate([
                    core_1.ViewChild('userinput'),
                    __metadata("design:type", HTMLTextAreaElement)
                ], TextEvaluationComponent.prototype, "userinput", void 0);
                __decorate([
                    core_1.ViewChild('waiter'),
                    __metadata("design:type", pleasewait_component_1.PleaseWaitComponent)
                ], TextEvaluationComponent.prototype, "waiter", void 0);
                TextEvaluationComponent = __decorate([
                    core_1.Component({
                        selector: 'textevaluation',
                        templateUrl: 'app/templates/textevaluation.html',
                        styleUrls: ['app/css/texteval.css'],
                        providers: [pleasewait_component_1.PleaseWaitComponent]
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService, http_1.Http, larka_service_1.LarkaService, easteregg_service_1.EasterEggService])
                ], TextEvaluationComponent);
                return TextEvaluationComponent;
            }());
            exports_1("TextEvaluationComponent", TextEvaluationComponent);
            ResponseObject = /** @class */ (function () {
                function ResponseObject() {
                }
                return ResponseObject;
            }());
        }
    };
});
//# sourceMappingURL=textevaluation.component.js.map