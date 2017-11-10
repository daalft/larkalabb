System.register(["@angular/core", "../../services/larka.service", "../../services/dataAggregator.service", "../../services/login.service", "../../services/korp.service"], function(exports_1, context_1) {
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
    var core_1, larka_service_1, dataAggregator_service_1, login_service_1, korp_service_1;
    var TreeKernelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (korp_service_1_1) {
                korp_service_1 = korp_service_1_1;
            }],
        execute: function() {
            TreeKernelComponent = (function () {
                function TreeKernelComponent(korp, larka, aggregator, login) {
                    this.korp = korp;
                    this.larka = larka;
                    this.aggregator = aggregator;
                    this.login = login;
                    this.modelSentence = "";
                    this.tokens = [];
                    this.maxSentenceLength = 10;
                }
                TreeKernelComponent.prototype.fetchSentence = function (query) {
                    var me = this;
                    this.korp.fetch(query).subscribe(function (data) {
                        var sentences = data["kwic"];
                        for (var i = 0; i < sentences.length; i++) {
                            var sentence = sentences[i];
                            var tokens = sentence["tokens"];
                            if (tokens.length > me.maxSentenceLength) {
                                continue;
                            }
                            var words = TreeKernelComponent.extractWords(tokens);
                            me.modelSentence = TreeKernelComponent.linearize(words);
                            console.log(me.modelSentence);
                            me.tokens = TreeKernelComponent.shuffle(words);
                            break;
                        }
                        if (me.modelSentence === "") {
                            console.error("No sentences retained. Relaunching query.");
                            me.fetchSentence(query);
                        }
                    });
                };
                TreeKernelComponent.extractWords = function (tokens) {
                    var a = [];
                    for (var i = 0; i < tokens.length; i++) {
                        var w = tokens[i]["word"];
                        a.push(w);
                    }
                    return a;
                };
                TreeKernelComponent.linearize = function (tokens) {
                    var p = tokens.pop();
                    var phrase = tokens.join(" ");
                    tokens.push(p);
                    return phrase + p;
                };
                TreeKernelComponent.shuffle = function (array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;
                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                };
                TreeKernelComponent.prototype.evaluate = function (composition) {
                    //let composition = $('#composition').val();
                    if (composition !== this.modelSentence) {
                        this.larka.ptk(this.modelSentence, composition).subscribe(function (d) {
                            console.log(d);
                        });
                    }
                    else {
                        console.log("exact match");
                    }
                    // else get next sentence
                };
                TreeKernelComponent = __decorate([
                    core_1.Component({
                        selector: 'treekernel',
                        templateUrl: 'app/templates/treekernel-eval.html',
                        styleUrls: ['app/css/treekernel.css']
                    }), 
                    __metadata('design:paramtypes', [korp_service_1.KorpService, larka_service_1.LarkaService, dataAggregator_service_1.DataAggregatorService, login_service_1.LoginService])
                ], TreeKernelComponent);
                return TreeKernelComponent;
            }());
            exports_1("TreeKernelComponent", TreeKernelComponent);
        }
    }
});
//# sourceMappingURL=treekernel.component.js.map