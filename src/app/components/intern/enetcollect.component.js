System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var EnetCollectDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EnetCollectDemoComponent = (function () {
                function EnetCollectDemoComponent() {
                    this.isLoggedIn = false;
                    this.isAdmin = false;
                    this.showAddEntry = false;
                    this.showLitlist = true;
                    this.showReview = false;
                    this.litlist = [
                        {
                            'author': 'Alfter David',
                            'year': '2017',
                            'title': 'Demonstration of work in progress',
                            'journal': 'Journal of meteorolinguics',
                            "keywords": "demo, work, tags",
                            "summary": "This is a very interesting paper. I suggest everyone read it.",
                            "file": ""
                        },
                        {
                            'author': 'Cibej Jaka',
                            'year': '2016',
                            'title': 'Taming wolves',
                            'journal': 'Proceedings of the first international workshop on animal taming',
                            "keywords": "wolves, taming, NLP",
                            "summary": "This is not such a good paper although the author shows great potential.",
                            "file": ""
                        },
                        {
                            'author': 'Milosevska Lina',
                            'year': '2018',
                            'title': 'Writing good academic Macedonian',
                            'journal': 'Journal of modern languages',
                            "keywords": "CALL, linguistics, writing",
                            "summary": "Haven't read this paper yet. Will do that later.",
                            "file": ""
                        }
                    ];
                    this.revlist = [
                        {
                            'author': 'No author',
                            'year': '9999',
                            'title': 'No title',
                            'journal': 'No journal',
                            "keywords": "no, key, words, provided",
                            "summary": "This is a really bad suggestion. It should be rejected.",
                            "file": ""
                        }
                    ];
                }
                EnetCollectDemoComponent.prototype.nav = function (i) {
                    if (i == 1) {
                        this.showAddEntry = false;
                        this.showReview = false;
                        this.showLitlist = true;
                    }
                    if (i == 2) {
                        this.showAddEntry = true;
                        this.showLitlist = false;
                        this.showReview = false;
                    }
                    if (i == 3) {
                        this.showAddEntry = true;
                        this.showLitlist = false;
                        this.showReview = false;
                    }
                    if (i == 4) {
                        this.showLitlist = false;
                        this.showAddEntry = false;
                        this.showReview = true;
                    }
                };
                EnetCollectDemoComponent.prototype.suggest = function (a, y, t, j, k, s) {
                    var o = {
                        "author": a,
                        "year": y,
                        "title": t,
                        "journal": j,
                        "keywords": k,
                        "summary": s,
                        "file": ""
                    };
                    this.revlist.push(o);
                };
                EnetCollectDemoComponent.prototype.accept = function (entry) {
                    this.litlist.push(entry);
                    var idx = this.revlist.indexOf(entry);
                    this.revlist.splice(idx, 1);
                };
                EnetCollectDemoComponent.prototype.reject = function (entry) {
                    var idx = this.revlist.indexOf(entry);
                    this.revlist.splice(idx, 1);
                };
                EnetCollectDemoComponent.prototype.addEntry = function (a, y, t, j, k, s) {
                    var o = {
                        "author": a,
                        "year": y,
                        "title": t,
                        "journal": j,
                        "keywords": k,
                        "summary": s,
                        "file": ""
                    };
                    this.litlist.push(o);
                };
                EnetCollectDemoComponent = __decorate([
                    core_1.Component({
                        selector: 'enetcollect',
                        templateUrl: 'app/templates/enetcollect.html',
                        styleUrls: ['app/css/enetcollect.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], EnetCollectDemoComponent);
                return EnetCollectDemoComponent;
            }());
            exports_1("EnetCollectDemoComponent", EnetCollectDemoComponent);
        }
    }
});
//# sourceMappingURL=enetcollect.component.js.map