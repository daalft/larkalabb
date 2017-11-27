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
    var core_1, http_1, DiagnosticTestComponent;
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
            DiagnosticTestComponent = /** @class */ (function () {
                function DiagnosticTestComponent(http) {
                    this.http = http;
                    this.currentLowerBound = 1;
                    this.currentUpperBound = 5;
                    var me = this;
                    this.http.get("app/data/cefr_vnj_wf_fx_C1.json").map(function (json) { return json.json(); }).subscribe(function (data) {
                        me.c1words = data;
                        me.http.get("app/data/cefr_vnj_wf_fx_B2.json").map(function (json) { return json.json(); }).subscribe(function (data) {
                            me.b2words = data;
                            me.http.get("app/data/cefr_vnj_wf_fx_B1.json").map(function (json) { return json.json(); }).subscribe(function (data) {
                                me.b1words = data;
                                me.http.get("app/data/cefr_vnj_wf_fx_A2.json").map(function (json) { return json.json(); }).subscribe(function (data) {
                                    me.a2words = data;
                                    me.http.get("app/data/cefr_vnj_wf_fx_A1.json").map(function (json) { return json.json(); }).subscribe(function (data) {
                                        me.a1words = data;
                                        me.words = me.getWords();
                                    });
                                });
                            });
                        });
                    });
                }
                DiagnosticTestComponent.prototype.select = function (word) {
                    this.words.forEach(function (w) {
                        if (w === word) {
                            w["selected"] = !w["selected"];
                        }
                    });
                };
                DiagnosticTestComponent.prototype.getWord = function (level) {
                    if (this.a1words && this.a2words && this.b1words && this.b2words && this.c1words) {
                        var array = [];
                        if (level === 1)
                            array = this.a1words;
                        if (level === 2)
                            array = this.a2words;
                        if (level === 3)
                            array = this.b1words;
                        if (level === 4)
                            array = this.b2words;
                        if (level === 5)
                            array = this.c1words;
                        return array[Math.floor(Math.random() * array.length)];
                    }
                    else {
                        return;
                    }
                };
                /**
                 * Return five words between the current lower and upper bound
                 */
                DiagnosticTestComponent.prototype.getWords = function () {
                    var currentLevel = this.currentLowerBound;
                    var words = [];
                    for (var i = 0; i < 5; i++) {
                        words.push({ "word": this.getWord(currentLevel), "level": currentLevel });
                        currentLevel = this.updateLevel(currentLevel);
                    }
                    return words;
                };
                DiagnosticTestComponent.prototype.updateLevel = function (level) {
                    var nextLevel = ++level;
                    if (nextLevel > this.currentUpperBound) {
                        nextLevel = this.currentLowerBound;
                    }
                    return nextLevel;
                };
                DiagnosticTestComponent.prototype.setLowerBound = function (level) {
                    this.currentLowerBound = level;
                };
                DiagnosticTestComponent.prototype.decreaseLowerBound = function () {
                    if (this.currentLowerBound == 1)
                        return;
                    this.currentLowerBound--;
                };
                DiagnosticTestComponent.prototype.setUpperBound = function (level) {
                    this.currentUpperBound = level;
                };
                DiagnosticTestComponent.prototype.increaseUpperBound = function () {
                    if (this.currentUpperBound == 5)
                        return;
                    this.currentUpperBound++;
                };
                DiagnosticTestComponent.prototype.updateBounds = function () {
                    var knownLevels = [];
                    var meanLevel = (this.currentLowerBound + this.currentUpperBound) / 2;
                    var meanKnownLevel = 0;
                    this.words.forEach(function (word) {
                        var level = word["level"];
                        var selected = word["selected"];
                        if (selected) {
                            knownLevels.push(level);
                        }
                    });
                    meanKnownLevel = knownLevels.reduce(function (pv, cv) { return pv + cv; }, 0) / knownLevels.length;
                    console.log(knownLevels);
                    console.log(meanLevel);
                    console.log(meanKnownLevel);
                };
                DiagnosticTestComponent = __decorate([
                    core_1.Component({
                        selector: 'diagnostic-test',
                        templateUrl: 'app/templates/diagnostic.html',
                        styleUrls: ['app/css/diagnostic.css']
                    }),
                    __metadata("design:paramtypes", [http_1.Http])
                ], DiagnosticTestComponent);
                return DiagnosticTestComponent;
            }());
            exports_1("DiagnosticTestComponent", DiagnosticTestComponent);
        }
    };
});
//# sourceMappingURL=diagnostic.component.js.map