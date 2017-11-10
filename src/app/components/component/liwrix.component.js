System.register(["@angular/core", "../../services/larka.service", "@angular/http", "../../services/localizer.service", "../../services/login.service", "./pleasewait.component", "../../services/dataAggregator.service", "../../services/korp.service", "../intern/treekernel.component"], function(exports_1, context_1) {
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
    var core_1, larka_service_1, http_1, localizer_service_1, login_service_1, pleasewait_component_1, dataAggregator_service_1, korp_service_1, treekernel_component_1;
    var LiwrixComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            },
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            },
            function (korp_service_1_1) {
                korp_service_1 = korp_service_1_1;
            },
            function (treekernel_component_1_1) {
                treekernel_component_1 = treekernel_component_1_1;
            }],
        execute: function() {
            LiwrixComponent = (function () {
                function LiwrixComponent(larka, http, localizer, login, aggregator, korp) {
                    this.larka = larka;
                    this.http = http;
                    this.localizer = localizer;
                    this.login = login;
                    this.aggregator = aggregator;
                    this.korp = korp;
                    this.spell = false;
                    this.mwe = true;
                    // wordlists by level
                    this.wordlist = {};
                    this.phrases = [];
                    // keeping track of words
                    this.previousWords = [];
                    this.currentWord = { 'path': '' };
                    this.score = 0;
                    // stuff
                    this.pathprefix = "https://ws.spraakbanken.gu.se/ws/icall/audio/";
                    this.idCounter = 1;
                    this.indexes = [];
                    this.showFirst = false;
                    this.showHint = false;
                    this.svc = 0; // special vowel count
                    this.scc = 0; // special consonant count
                    this.ready = false;
                    this.vowels = /[aeiouåöäüéy]/;
                    this.consonants = /[^aeiouåöäüéy]/;
                    // wordlists
                    this.wordlistA1 = "app/data/A1_svalex_2.json";
                    this.wordlistA2 = "app/data/A2_svalex_2.json";
                    this.wordlistB1 = "app/data/B1_svalex_2.json";
                    this.wordlistB2 = "app/data/B2_svalex_2.json";
                    this.wordlistC1 = "app/data/C1_svalex_2.json";
                    this.phraselist = "app/data/lexin-phrases.json";
                    this.aggregator.setLogType("log_db");
                    // load word lists
                    var me = this;
                    console.log("Loading wordlists");
                    //this.waiter.on();
                    if (this.login.isLoggedIn()) {
                        this.sessionid = this.login.getUserId();
                    }
                    else {
                        this.sessionid = this.login.getRandomId();
                    }
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
                                        me.ready = true;
                                    });
                                });
                            });
                        });
                    });
                    this.http.get(this.phraselist).map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.phrases = data;
                        console.log("Loaded phrases");
                    });
                }
                LiwrixComponent.prototype.check = function (id) {
                    var word = this.fetchById(id);
                    //word["tries"]++;
                    var newanswer = $('#answer-' + id).val();
                    //word["answer"] = newanswer; // TODO problematic?? removes previous answer?
                    return word["word"] == newanswer;
                };
                LiwrixComponent.prototype.checkManual = function (id) {
                    var word = this.fetchById(id);
                    word["tries"]++;
                    var newanswer = $('#answer-' + id).val();
                    word["answers"].push(newanswer);
                    // TODO add aggregator information about updated answer
                    return word["word"] == newanswer;
                };
                LiwrixComponent.prototype.fetchById = function (id) {
                    for (var i = 0; i < this.previousWords.length; i++) {
                        var cobj = this.previousWords[i];
                        if (cobj["id"] == id) {
                            return cobj;
                        }
                    }
                };
                LiwrixComponent.prototype.getRandomWord = function (level) {
                    if (this.type < 2) {
                        var index = Math.floor(Math.random() * this.wordlist[this.level].length);
                        while (this.indexes.indexOf(index) > -1) {
                            index = Math.floor(Math.random() * this.wordlist[this.level].length);
                        }
                        this.indexes.push(index);
                        return this.wordlist[this.level][index];
                    }
                    else {
                        if (this.type == 2) {
                            var index = Math.floor(Math.random() * this.phrases.length);
                            while (this.indexes.indexOf(index) > -1) {
                                index = Math.floor(Math.random() * this.phrases.length);
                            }
                            this.indexes.push(index);
                            return this.phrases[index];
                        }
                    }
                };
                LiwrixComponent.prototype.generateWord = function (word) {
                    var me = this;
                    this.waiter.on();
                    this.currentWord["word"] = word;
                    this.currentWord["id"] = this.idCounter++;
                    this.currentWord["tries"] = 0;
                    this.currentWord["answers"] = [];
                    if (this.score > 0) {
                        if (this.type < 2) {
                            var checkOne = Math.random() > 0.85;
                            if (checkOne) {
                                this.currentWord["special-vowel"] = true;
                                this.svc++;
                            }
                            else {
                                var checkTwo = Math.random() > 0.85;
                                if (checkTwo) {
                                    this.currentWord["special-consonant"] = true;
                                    this.scc++;
                                }
                            }
                        }
                    }
                    this.larka.speak(word, this.spell ? 'spell' : '').subscribe(function (d) {
                        if (d["Status"]) {
                            if (d["Status"] == 200) {
                                me.currentWord["path"] = me.pathprefix + d["filename"];
                                me.waiter.off();
                                setTimeout(function () {
                                    $("#answer-" + (me.idCounter - 1)).focus();
                                }, 500);
                                if (me.type < 2) {
                                    me.loadhints(word);
                                }
                                return 1;
                            }
                        }
                        me.waiter.off();
                        return 0; // should never happen anyway
                    });
                };
                LiwrixComponent.prototype.loadhints = function (word) {
                    var me = this;
                    this.korp.fetch(word).subscribe(function (d) {
                        var sentences = d["kwic"];
                        var hints = [[], []];
                        for (var i = 0; i < sentences.length; i++) {
                            var sentence = sentences[i];
                            var tokens = sentence["tokens"];
                            var start_index = sentence["match"]["start"];
                            var end_index = sentence["match"]["end"];
                            // Looks a bit strange but the function is useable here too
                            var words = treekernel_component_1.TreeKernelComponent.extractWords(tokens);
                            var words2 = treekernel_component_1.TreeKernelComponent.extractWords(tokens);
                            for (var i_1 = start_index; i_1 < end_index; i_1++) {
                                words[i_1] = "_____";
                                words2[i_1] =
                                    words2[i_1][0] +
                                        words2[i_1].slice(1).split("").reduce(function (acc, n) { return acc + "_"; }, ""); // placeholders for each letter in word
                            }
                            var sent_left = words.slice(0, start_index);
                            var target = words.slice(start_index, end_index);
                            var target2 = words2.slice(start_index, end_index);
                            var sent_right = words.slice(end_index);
                            var obj = {
                                "sent_left": sent_left.join(" "),
                                "target": target.join(" "),
                                "sent_right": sent_right.join(" ")
                            };
                            var obj2 = {
                                "sent_left": sent_left.join(" "),
                                "target": target2.join(" "),
                                "sent_right": sent_right.join(" ")
                            };
                            hints[0].push(obj);
                            hints[1].push(obj2);
                        }
                        me.currentWord["hints"] = hints;
                    });
                };
                LiwrixComponent.prototype.hint = function (id) {
                    //let word = this.fetchById(id);
                    this.showHint = true;
                    this.currentWord["showSentences"] = 1;
                    //this.hintCount++;
                };
                LiwrixComponent.prototype.hint2 = function () {
                    this.showFirst = true;
                    this.currentWord["showInitialLetter"] = 1;
                };
                LiwrixComponent.prototype.validate = function () {
                    var lastAnswer = this.currentWord["answers"][this.currentWord["answers"].length - 1];
                    if (!lastAnswer) {
                        return;
                    }
                    var target = this.currentWord["word"];
                    var isSpecialVowel = this.currentWord["special-vowel"];
                    var isSpecialConsonant = this.currentWord["special-consonant"];
                    var me = this;
                    if (isSpecialVowel) {
                        if (lastAnswer === target) {
                            this.score += 3;
                            return;
                        }
                        var lav = lastAnswer.split("").filter(function (v) {
                            return me.vowels.test(v);
                        });
                        var tav = target.split("").filter(function (v) {
                            return me.vowels.test(v);
                        });
                        if (lav.length == tav.length) {
                            for (var i = 0; i < lav.length; i++) {
                                if (lav[i] != tav[i]) {
                                    return;
                                }
                            }
                        }
                        this.score += 2;
                    }
                    else if (isSpecialConsonant) {
                        if (lastAnswer === target) {
                            this.score += 3;
                            return;
                        }
                        var lav = lastAnswer.split("").filter(function (v) {
                            return me.consonants.test(v);
                        });
                        var tav = target.split("").filter(function (v) {
                            return me.consonants.test(v);
                        });
                        if (lav.length == tav.length) {
                            for (var i = 0; i < lav.length; i++) {
                                if (lav[i] != tav[i]) {
                                    return;
                                }
                            }
                        }
                        this.score += 2;
                    }
                    else {
                        if (lastAnswer === target) {
                            this.score++;
                        }
                    }
                };
                LiwrixComponent.prototype.next = function () {
                    if (!this.currentWord["answers"]) {
                        this.currentWord["answers"] = [];
                        this.aggregator.setAggregator({ 'exercise': 'liwrix' });
                    }
                    this.currentWord["answers"].push($('#answer-' + this.currentWord["id"]).val());
                    this.currentWord["tries"]++;
                    this.validate(); // update score
                    var temp = this.currentWord;
                    if (temp['path']) {
                        for (var key in temp) {
                            if (temp.hasOwnProperty(key)) {
                                this.aggregator.addInformation(key, temp[key]);
                            }
                        }
                        this.aggregator.addInformation("uid", this.sessionid);
                        this.aggregator.addInformation("timestamp-end", new Date());
                    }
                    // new word
                    this.currentWord = { 'path': '' };
                    this.generateWord(this.getRandomWord(this.level));
                    if (temp['path']) {
                        this.previousWords.unshift(temp);
                        this.aggregator.closeAggregator();
                        this.aggregator.setAggregator({ 'exercise': 'liwrix' });
                    }
                    // reset stuff
                    this.showHint = false;
                    this.showFirst = false;
                };
                LiwrixComponent.prototype.setParams = function (type, mwe, level, mode) {
                    if (type == 1) {
                        this.spell = true;
                    }
                    this.type = type;
                    this.mode = mode;
                    this.mwe = mwe;
                    this.level = this.mapToLevel(level);
                    this.next();
                };
                LiwrixComponent.prototype.mapToLevel = function (int) {
                    switch (int) {
                        case 0: return "A1";
                        case 1: return "A2";
                        case 2: return "B1";
                        case 3: return "B2";
                        case 4: return "C1";
                        default:
                            break;
                    }
                };
                LiwrixComponent.prototype.getTotal = function () {
                    return this.previousWords.length;
                };
                LiwrixComponent.prototype.getCorrect = function () {
                    return this.previousWords.filter(function (d) {
                        if (d["word"] == d["answers"][d["answers"].length - 1]) {
                            return 1;
                        }
                    }).length;
                };
                LiwrixComponent.prototype.keyhandler = function (event, id) {
                    if (event.keyCode == 13) {
                        if (!id) {
                            this.next();
                        }
                        else {
                            this.checkManual(id);
                        }
                    }
                };
                __decorate([
                    core_1.ViewChild('waiter'), 
                    __metadata('design:type', pleasewait_component_1.PleaseWaitComponent)
                ], LiwrixComponent.prototype, "waiter", void 0);
                LiwrixComponent = __decorate([
                    core_1.Component({
                        selector: "liwrix",
                        templateUrl: "app/templates/liwrix.html",
                        styleUrls: ["app/css/liwrix.css"]
                    }), 
                    __metadata('design:paramtypes', [larka_service_1.LarkaService, http_1.Http, localizer_service_1.LocalizerService, login_service_1.LoginService, dataAggregator_service_1.DataAggregatorService, korp_service_1.KorpService])
                ], LiwrixComponent);
                return LiwrixComponent;
            }());
            exports_1("LiwrixComponent", LiwrixComponent);
        }
    }
});
//# sourceMappingURL=liwrix.component.js.map