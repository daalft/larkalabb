System.register(["../../services/karp.service", "@angular/http", "@angular/core", "../../services/localizer.service", "./pleasewait.component", "../../services/dataAggregator.service", "../../services/login.service"], function(exports_1, context_1) {
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
    var karp_service_1, http_1, core_1, localizer_service_1, pleasewait_component_1, dataAggregator_service_1, login_service_1;
    var HangBirdComponent;
    return {
        setters:[
            function (karp_service_1_1) {
                karp_service_1 = karp_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            },
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            /**
             * Created by David on 1/25/2017.
             */
            HangBirdComponent = (function () {
                function HangBirdComponent(karp, http, localizer, aggregator, login) {
                    this.karp = karp;
                    this.http = http;
                    this.localizer = localizer;
                    this.aggregator = aggregator;
                    this.login = login;
                    this.numberOfTries = 0;
                    this.maxNumberOfTries = 7;
                    this.wordlist = {};
                    this.wordlistA1 = "app/data/A1_svalex_lexin.json";
                    this.wordlistA2 = "app/data/A2_svalex_lexin.json";
                    this.wordlistB1 = "app/data/B1_svalex_lexin.json";
                    this.wordlistB2 = "app/data/B2_svalex_lexin.json";
                    this.wordlistC1 = "app/data/C1_svalex_lexin.json";
                    this.wordlistBackup = ["villa", "tjuv", "kassa", "process"];
                    this.showHint = false;
                    this.usedHint = false;
                    this.levels = ["A1", "A2", "B1", "B2", "C1"];
                    this.level = "";
                    this.languages = ["hb-lang-sqi", "hb-lang-bos", "hb-lang-eng", "hb-lang-fin", "hb-lang-ell", "hb-lang-hrv", "hb-lang-kur_north", "hb-lang-fas",
                        "hb-lang-rus", "hb-lang-srp", "hb-lang-srp_cyrillic", "hb-lang-som", "hb-lang-spa", "hb-lang-kur_south", "hb-lang-tur"];
                    this.ongoing = false;
                    this.totalScore = 0;
                    this.inARow = 0;
                    this.eggindices = [1, 2, 3, 4];
                    this.indexHistory = [];
                    this.waimsPrefix = "https://ws.spraakbanken.gu.se/ws/icall/img/"; // /english/dog.png; /spanish/something.png
                    var me = this;
                    console.log("Loading wordlists");
                    this.aggregator.getUserInfo();
                    this.aggregator.setLogType("log_db");
                    this.sessionid = this.login.getRandomId();
                    this.http.get(this.wordlistA1).map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.wordlist["A1"] = data;
                        me.http.get(me.wordlistA2).map(function (res) { return res.json(); }).subscribe(function (data) {
                            me.wordlist["A2"] = data;
                            me.http.get(me.wordlistB1).map(function (res) { return res.json(); }).subscribe(function (data) {
                                me.wordlist["B1"] = data;
                                me.http.get(me.wordlistB2).map(function (res) { return res.json(); }).subscribe(function (data) {
                                    me.wordlist["B2"] = data;
                                    me.http.get(me.wordlistC1).map(function (res) { return res.json(); }).subscribe(function (data) {
                                        me.wordlist["C1"] = data;
                                        console.log("Loaded wordlists");
                                    });
                                });
                            });
                        });
                    });
                }
                HangBirdComponent.prototype.startGame = function () {
                    if (this.ongoing) {
                        this.endGame(2);
                    }
                    this.waiter.on();
                    this.numberOfTries = 0;
                    this.showHint = false;
                    this.usedHint = false;
                    this.ongoing = false;
                    this.msd = "";
                    this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ö", "Ä", "Å", "É"];
                    console.log("starting game");
                    this.ongoing = true;
                    this.previousWord = this.currentWord;
                    if (!this.language) {
                        this.language = "sqi";
                    }
                    if (!this.level) {
                        this.level = "A1";
                    }
                    if (!this.wordlist) {
                        return this.getBackupWord("Wordlist not loaded");
                    }
                    if (!this.wordlist[this.level]) {
                        return this.getBackupWord("Requested level not loaded");
                    }
                    var words = this.wordlist[this.level];
                    // Select random index
                    var index = Math.floor(Math.random() * words.length);
                    // Check whether index has been used before
                    while ($.inArray(index, this.indexHistory) > -1) {
                        console.log("re-index");
                        index = Math.floor(Math.random() * words.length);
                    }
                    // Add index to history
                    this.indexHistory.push(index);
                    this.currentWord = words[index]["word"].toUpperCase();
                    var pos = words[index]["pos"];
                    this.aggregator.setAggregator({ "exercise": "wordguess", "target": this.currentWord, "pos": pos, "sessionid": this.sessionid });
                    this.aggregator.addInformation("language", this.language);
                    this.aggregator.addInformation("level", this.level);
                    //this.currentWord = this.wordlistBackup[0];
                    this.currentWordVector = [];
                    for (var i = 0; i < this.currentWord.length; i++) {
                        this.currentWordVector[i] = "_";
                    }
                    console.log(this.currentWord);
                    this.getWordInformation(this.currentWord.toLowerCase(), pos);
                };
                HangBirdComponent.prototype.setLanguage = function (event) {
                    var pl = event.target.value;
                    this.language = pl.substr(8); // ignore hb-lang- prefix
                    //this.aggregator.aggregate("wordguess-lang", this.language, this.sessionid);
                };
                HangBirdComponent.prototype.setLevel = function (event) {
                    this.level = event.target.value;
                    //this.aggregator.aggregate("wordguess-level", this.level, this.sessionid);
                };
                HangBirdComponent.prototype.showTrans = function () {
                    this.showHint = true;
                    this.usedHint = true;
                    this.aggregator.addInformation("hint", "translation");
                };
                HangBirdComponent.prototype.getWordInformation = function (word, pos) {
                    var me = this;
                    this.karp.fetchFrom(word, pos, "lexin").map(function (res) { return res.json(); }).subscribe(function (data) {
                        var pwords = data["hits"]["hits"];
                        var pwordsf = pwords.filter(function (d) { return d["_source"]["FormRepresentations"].length > 15 && d["_source"]["FormRepresentations"][0]["baseform"] == word; });
                        var sortedws = pwordsf.sort(function (a, b) {
                            var ax = parseInt(a["_source"]["Sense"][0]["senseid"].slice(-1));
                            var bx = parseInt(b["_source"]["Sense"][0]["senseid"].slice(-1));
                            if (ax > bx) {
                                return 1;
                            }
                            if (ax < bx) {
                                return -1;
                            }
                            return 0;
                        });
                        var wlist = sortedws[0]["_source"]["FormRepresentations"];
                        for (var j = 0; j < wlist.length; j++) {
                            // get baseform and lang
                            var bf = wlist[j]["baseform"];
                            var l = wlist[j]["lang"];
                            if (l == "swe") {
                                //me.description = wlist[j]["text"]; // TODO delete (\d) from text
                                var desc = "";
                                if (wlist[j]["text"]) {
                                    desc = wlist[j]["text"]; // if no "text" present, try "desc" from Sense?
                                }
                                else {
                                    console.log(wlist[j]);
                                }
                                var digits = /(\(\d\))/;
                                if (desc.match(digits)) {
                                    var digit = digits.exec(desc);
                                    desc = desc.replace(digit[0], "");
                                }
                                me.description = desc;
                            }
                            if (l == me.language) {
                                me.translation = bf;
                            }
                        }
                        // TODO catch if loop was ended without extracting information
                        if (!me.currentWord || me.currentWord == me.previousWord) {
                            console.error("Could not get information for " + word);
                        }
                        me.waiter.off();
                    });
                };
                HangBirdComponent.prototype.getBackupWord = function (reason) {
                    console.log("Using backup list");
                    console.log(reason);
                    return this.wordlistBackup[Math.floor(Math.random() * this.wordlistBackup.length)];
                };
                HangBirdComponent.prototype.tryLetter = function (letter) {
                    this.aggregator.addInformation("letter", letter);
                    var res = this.getIndicesOf(letter, this.currentWord);
                    if (res.length == 0) {
                        this.numberOfTries++;
                    }
                    this.letters.splice(this.letters.indexOf(letter), 1); // Remove letter from array of letters
                    for (var i = 0; i < res.length; i++) {
                        this.currentWordVector[res[i]] = this.currentWord.charAt(res[i]);
                    }
                    // TODO if num tries > max tries, end game
                    if (this.numberOfTries >= this.maxNumberOfTries) {
                        this.aggregator.addInformation("end", "fail");
                        this.endGame(0);
                        return;
                    }
                    // TODO if word vector equals word, end game
                    if (this.currentWordVector.join("") == this.currentWord) {
                        this.aggregator.addInformation("end", "win");
                        this.endGame(1);
                    }
                };
                HangBirdComponent.prototype.restartGame = function () {
                    var me = this;
                    setTimeout(function () {
                        me.startGame();
                    }, 1000);
                };
                HangBirdComponent.prototype.endGame = function (status) {
                    this.ongoing = false;
                    var gscore = 0;
                    if (status == 1) {
                        this.inARow++;
                        gscore = 1;
                        if (this.usedHint) {
                            gscore = 0.5;
                        }
                        this.totalScore += gscore;
                        if (this.inARow > 4) {
                            //alert("Five in a row! Score multiplied by 2!");
                            this.inARow = 0;
                            this.totalScore *= 2;
                        }
                        this.aggregator.addInformation("score", this.totalScore);
                        this.aggregator.addInformation("timestamp-end", new Date());
                        this.aggregator.closeAggregator();
                    }
                    else if (status == 0) {
                        this.inARow = 0;
                        this.showHint = true;
                        this.currentWordVector = this.currentWord.split("");
                        this.aggregator.addInformation("timestamp-end", new Date());
                        this.aggregator.closeAggregator();
                        return;
                    }
                    console.log("ending game " + this.totalScore);
                    // TODO set overall status based on total score
                    if (status != 2) {
                        this.restartGame();
                    }
                };
                HangBirdComponent.prototype.getIndicesOf = function (searchStr, str) {
                    var searchStrLen = searchStr.length;
                    if (searchStrLen == 0) {
                        return [];
                    }
                    var startIndex = 0, index, indices = [];
                    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
                        indices.push(index);
                        startIndex = index + searchStrLen;
                    }
                    return indices;
                };
                __decorate([
                    // /english/dog.png; /spanish/something.png
                    core_1.ViewChild(pleasewait_component_1.PleaseWaitComponent), 
                    __metadata('design:type', pleasewait_component_1.PleaseWaitComponent)
                ], HangBirdComponent.prototype, "waiter", void 0);
                HangBirdComponent = __decorate([
                    core_1.Component({
                        selector: 'hangbird',
                        templateUrl: 'app/templates/hangbird.html',
                        styleUrls: ['app/css/hangbird.css']
                    }), 
                    __metadata('design:paramtypes', [karp_service_1.KarpService, http_1.Http, localizer_service_1.LocalizerService, dataAggregator_service_1.DataAggregatorService, login_service_1.LoginService])
                ], HangBirdComponent);
                return HangBirdComponent;
            }());
            exports_1("HangBirdComponent", HangBirdComponent);
        }
    }
});
//# sourceMappingURL=hangbird.component.js.map