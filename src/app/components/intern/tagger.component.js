System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, TaggerComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            TaggerComponent = /** @class */ (function () {
                function TaggerComponent() {
                    this.sentences = [];
                    this.parallel = [];
                    this.resultsen = "";
                    this.resultpar = "";
                    this.tags = [];
                    this.index = 0;
                    this.target = /put(s|ten|ting)?\s((.+?)\s)?up/;
                    this.resulthidden = true;
                    this.faulty = 0;
                    this.cooldown = false;
                }
                TaggerComponent.prototype.acquire = function (data, tagged) {
                    this.sentences = data.split(/\n/);
                    this.sentences.push("ooo put up ooo PRESS ENTER TO FINALIZE");
                    this.parallel = tagged.split(/\n/);
                };
                TaggerComponent.prototype.process = function (sentence) {
                    var match = this.target.exec(sentence);
                    if (match == null) {
                        this.faulty++;
                        return "<span class='tagger-error'>Please press ESC to jump faulty sentence</span><br/>" + sentence;
                    }
                    var startpos = match.index;
                    var endpos = startpos + match[0].length;
                    var startingtag = "<span class='tagger-target'>";
                    var closingtag = "</span>";
                    // insert first at endpos, then startpos, so that endpos is not changed by inserting to startpos
                    var withClosing = [sentence.slice(0, endpos), closingtag, sentence.slice(endpos)].join('');
                    return [withClosing.slice(0, startpos), startingtag, withClosing.slice(startpos)].join('');
                };
                TaggerComponent.prototype.evaluate = function (key) {
                    console.log(key.which);
                };
                TaggerComponent.prototype.getCurrent = function () {
                    return this.process(this.sentences[this.index]);
                };
                TaggerComponent.prototype.activate = function (key) {
                    if (this.cooldown) {
                        return;
                    }
                    var tag = -1;
                    switch (key.which) {
                        case 37:
                            tag = 0;
                            this.tags.push(tag);
                            break;
                        case 39:
                            tag = 1;
                            this.tags.push(tag);
                            break;
                        case 27:
                            this.deleteFaulty();
                            this.index--;
                            break;
                        case 13:
                            this.finalize();
                            break;
                        default:
                            break;
                    }
                    this.index++;
                    this.cooldown = true;
                    var me = this;
                    setTimeout(function () { me.cooldown = false; }, 1500);
                };
                TaggerComponent.prototype.deleteFaulty = function () {
                    this.sentences.splice(this.index, 1);
                    this.parallel.splice(this.index, 1);
                };
                TaggerComponent.prototype.finalize = function () {
                    this.index = 0;
                    this.sentences.pop();
                    for (var i = 0; i < this.sentences.length; i++) {
                        var sent = this.sentences[i];
                        var parr = this.parallel[i];
                        var tag = this.tags[i];
                        this.resultsen += sent + "\t" + tag + "\n";
                        this.resultpar += parr + "\t" + tag + "\n";
                    }
                    this.resulthidden = false;
                };
                TaggerComponent = __decorate([
                    core_1.Component({
                        selector: 'tagger',
                        templateUrl: 'app/templates/tagger.html'
                    })
                ], TaggerComponent);
                return TaggerComponent;
            }());
            exports_1("TaggerComponent", TaggerComponent);
        }
    };
});
//# sourceMappingURL=tagger.component.js.map