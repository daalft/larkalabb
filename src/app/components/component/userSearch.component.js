System.register(["@angular/core", "../../services/localizer.service", "../../services/karp.service", "../../services/easteregg.service"], function(exports_1, context_1) {
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
    var core_1, localizer_service_1, karp_service_1, easteregg_service_1;
    var UserSearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (karp_service_1_1) {
                karp_service_1 = karp_service_1_1;
            },
            function (easteregg_service_1_1) {
                easteregg_service_1 = easteregg_service_1_1;
            }],
        execute: function() {
            UserSearchComponent = (function () {
                function UserSearchComponent(localizer, karp, eggs) {
                    this.localizer = localizer;
                    this.karp = karp;
                    this.eggs = eggs;
                    this.numberChange = new core_1.EventEmitter();
                    this.wordBackup = [];
                    this.everythingFine = true;
                    this.words = [];
                }
                UserSearchComponent.prototype.addWord = function (word) {
                    this.words.push(word);
                };
                UserSearchComponent.prototype._lemgramSplitter = function (lemgram) {
                    var wfRest = lemgram.split(/\.{2}/);
                    var wordform = wfRest[0];
                    var posRest = wfRest[1].split(/\.{1}/);
                    var pos = posRest[0];
                    // throw away information about senses
                    // TODO: unless this information can be used when querying?
                    return wordform + " (" + this.localizer.localize(pos) + ")";
                };
                UserSearchComponent.prototype._errorInput = function () {
                    this.everythingFine = false;
                };
                UserSearchComponent.prototype.fetch = function (userinput) {
                    var me = this;
                    this.everythingFine = true;
                    this.currentUserSearch = userinput;
                    if (this.currentUserSearch == "god jul") {
                        this.eggs.magicFunction1();
                    }
                    this.karp.fetchMini(this.currentUserSearch).map(function (data) { return data.json(); }).subscribe(function (data) {
                        var hits = data["hits"]["hits"];
                        if (hits.length == 0) {
                            console.log("No HITS for " + me.currentUserSearch);
                            me._errorInput();
                            return;
                        }
                        hits.reverse(); // reversal necessary due to unshift on "sorted by relevance" order
                        for (var i = 0; i < hits.length; i++) {
                            var lemgram = hits[i]["sort"][3];
                            var parsedLemgram = me._lemgramSplitter(lemgram);
                            if (me.wordBackup.indexOf(parsedLemgram) <= -1) {
                                me.words.unshift({ "word": parsedLemgram, "active": true });
                                me.wordBackup.unshift(parsedLemgram);
                            }
                        }
                        me.getSelected();
                    });
                };
                UserSearchComponent.prototype.remove = function (option) {
                    var index = this.wordBackup.indexOf(option.word);
                    if (index < 0) {
                        console.log("ERROR: Could not find word " + option.word); // <-- this should never happen
                    }
                    else {
                        this.wordBackup.splice(index, 1);
                        this.words.splice(index, 1);
                    }
                    this.numberChange.emit(this.wordBackup.length);
                };
                UserSearchComponent.prototype.clearWordlist = function () {
                    this.words = [];
                    this.wordBackup = [];
                    this.numberChange.emit(0);
                };
                UserSearchComponent.prototype.getStaticCurrentUserSearch = function () {
                    return this.currentUserSearch;
                };
                UserSearchComponent.prototype.getSelected = function () {
                    var count = 0;
                    for (var i = 0; i < this.words.length; i++) {
                        if (this.words[i]["active"]) {
                            count++;
                        }
                    }
                    this.numberChange.emit(count);
                    return count;
                };
                UserSearchComponent.prototype.updateCount = function () {
                    this.getSelected();
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], UserSearchComponent.prototype, "numberChange", void 0);
                UserSearchComponent = __decorate([
                    core_1.Component({
                        selector: 'user-search',
                        templateUrl: 'app/templates/user-search.html',
                        providers: [karp_service_1.KarpService],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, karp_service_1.KarpService, easteregg_service_1.EasterEggService])
                ], UserSearchComponent);
                return UserSearchComponent;
            }());
            exports_1("UserSearchComponent", UserSearchComponent);
        }
    }
});
//# sourceMappingURL=userSearch.component.js.map