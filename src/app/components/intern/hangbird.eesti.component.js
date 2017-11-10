System.register(["../../services/karp.service", "@angular/http", "@angular/core", "../../services/localizer.service", "../../services/dataAggregator.service", "../../services/login.service", "../component/pleasewait.component"], function(exports_1, context_1) {
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
    var karp_service_1, http_1, core_1, localizer_service_1, dataAggregator_service_1, login_service_1, pleasewait_component_1;
    var HangBirdEestiComponent;
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
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            }],
        execute: function() {
            /**
             * Created by David on 1/25/2017.
             */
            HangBirdEestiComponent = (function () {
                function HangBirdEestiComponent(karp, http, localizer, aggregator, login) {
                    this.karp = karp;
                    this.http = http;
                    this.localizer = localizer;
                    this.aggregator = aggregator;
                    this.login = login;
                    this.numberOfTries = 0;
                    this.maxNumberOfTries = 7;
                    this.wordlist = ["tomat", "roos", "lennuk", "jalgratas", "kana", "kamm", "rukkilill"];
                    this.descriptions = [
                        "pehme punane köögivili, mida kasutatakse salatites või soojades toitudes",
                        "magusa lõhnaga lill, mis kasvab teravate okastega põõsa küljes",
                        "tiibadega sõiduk, mis lendab õhus",
                        "kahe rattaga sõiduk, mida sa liigutad jalgade abil",
                        "emane lind, keda inimesed kasvatavad, et liha ja mune saada",
                        "lame plastist või metallist ese, millega saab juukseid korda seada",
                        "sinise õiega lill, mis kasvab põllu peal"
                    ];
                    this.translations = [
                        "tomato", "rose", "airplane", "bicycle", "chicken", "comb", "cornflower"
                    ];
                    this.images = [
                        "app/img/wge/tomato.png",
                        "app/img/wge/rose.png",
                        "app/img/wge/aeroplanes.png",
                        "app/img/wge/bicycle.png",
                        "app/img/wge/chicken.png",
                        "app/img/wge/comb.png",
                        "app/img/wge/cornflower.png"
                    ];
                    this.showHint = false;
                    this.usedHint = false;
                    this.showDescription = false;
                    this.showImage = false;
                    this.letters = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "Õ", "Ä", "Ö", "Ü"];
                    this.languages = ["English"];
                    this.levels = ["A1", "A2", "B1", "B2", "C1"];
                    this.ongoing = false;
                    this.totalScore = 0;
                    this.inARow = 0;
                    this.index = -1;
                    this.eggindices = [1, 2, 3, 4];
                }
                HangBirdEestiComponent.prototype.setWord = function () {
                    if (this.ongoing) {
                        this.endGame(2);
                    }
                    this.numberOfTries = 0;
                    this.showHint = false;
                    this.usedHint = false;
                    this.showDescription = false;
                    this.showImage = false;
                    this.letters = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "Õ", "Ä", "Ö", "Ü"];
                    this.ongoing = true;
                    this.previousWord = this.currentWord;
                    this.index++;
                    this.currentWord = this.wordlist[this.index].toUpperCase();
                    this.image = this.images[this.index];
                    this.currentWordVector = [];
                    for (var i = 0; i < this.currentWord.length; i++) {
                        this.currentWordVector[i] = "_";
                    }
                    console.log(this.currentWord);
                    this.getWordInformation();
                };
                HangBirdEestiComponent.prototype.showTrans = function () {
                    this.showHint = true;
                    this.usedHint = true;
                };
                HangBirdEestiComponent.prototype.getWordInformation = function () {
                    this.description = this.descriptions[this.index];
                    this.translation = this.translations[this.index];
                };
                HangBirdEestiComponent.prototype.tryLetter = function (letter) {
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
                        this.endGame(0);
                        return;
                    }
                    // TODO if word vector equals word, end game
                    if (this.currentWordVector.join("") == this.currentWord) {
                        this.endGame(1);
                    }
                };
                HangBirdEestiComponent.prototype.startGame = function () {
                    var me = this;
                    this.waiter.on();
                    setTimeout(function () {
                        me.waiter.off();
                        me.setWord();
                    }, 2000);
                };
                HangBirdEestiComponent.prototype.endGame = function (status) {
                    this.ongoing = false;
                    var gscore = 0;
                    if (status == 1) {
                        this.inARow++;
                        gscore = 4;
                        if (this.usedHint) {
                            gscore -= 1;
                        }
                        if (this.showDescription) {
                            gscore -= 1;
                        }
                        if (this.showImage) {
                            gscore -= 1;
                        }
                        this.totalScore += gscore;
                        if (this.inARow > 4) {
                            //alert("Five in a row! Score multiplied by 2!");
                            this.inARow = 0;
                            this.totalScore *= 2;
                        }
                    }
                    else if (status == 0) {
                        this.inARow = 0;
                        this.showHint = true;
                        this.showDescription = true;
                        this.showImage = true;
                        this.currentWordVector = this.currentWord.split("");
                        return;
                    }
                    if (status != 2) {
                        this.startGame();
                    }
                };
                HangBirdEestiComponent.prototype.getIndicesOf = function (searchStr, str) {
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
                    core_1.ViewChild(pleasewait_component_1.PleaseWaitComponent), 
                    __metadata('design:type', pleasewait_component_1.PleaseWaitComponent)
                ], HangBirdEestiComponent.prototype, "waiter", void 0);
                HangBirdEestiComponent = __decorate([
                    core_1.Component({
                        selector: 'hangbird',
                        templateUrl: 'app/templates/hangbird-eesti.html',
                        styleUrls: ['app/css/hangbird.css']
                    }), 
                    __metadata('design:paramtypes', [karp_service_1.KarpService, http_1.Http, localizer_service_1.LocalizerService, dataAggregator_service_1.DataAggregatorService, login_service_1.LoginService])
                ], HangBirdEestiComponent);
                return HangBirdEestiComponent;
            }());
            exports_1("HangBirdEestiComponent", HangBirdEestiComponent);
        }
    }
});
//# sourceMappingURL=hangbird.eesti.component.js.map