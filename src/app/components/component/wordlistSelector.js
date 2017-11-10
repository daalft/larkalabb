System.register(["@angular/core", "@angular/http", "../../services/localizer.service"], function(exports_1, context_1) {
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
    var core_1, http_1, localizer_service_1;
    var WordlistSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            }],
        execute: function() {
            WordlistSelectorComponent = (function () {
                function WordlistSelectorComponent(localizer, http) {
                    this.localizer = localizer;
                    this.http = http;
                    this.wordlistChange = new core_1.EventEmitter();
                    this.showAll = false;
                    this.loadList();
                }
                WordlistSelectorComponent.prototype.loadList = function () {
                    var me = this;
                    this.http.get('app/data/wordlist.json').map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        me.data = data;
                        me.mainList = data.slice(0, 2);
                        me.otherList = data.slice(2);
                        me.mainList[0]["selected"] = true;
                        me.wordlistChange.emit(me.mainList[0].name);
                    });
                };
                WordlistSelectorComponent.prototype.getMainLists = function () {
                    return this.mainList;
                };
                WordlistSelectorComponent.prototype.getOtherLists = function () {
                    return this.otherList;
                };
                WordlistSelectorComponent.prototype.getSelectedIndex = function () {
                    if (!this.data) {
                        return -1;
                    }
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i]["selected"]) {
                            return i;
                        }
                    }
                };
                WordlistSelectorComponent.prototype.getSelected = function (index) {
                    return this.data[index];
                };
                WordlistSelectorComponent.prototype.setSelected = function (wl) {
                    for (var i = 0; i < this.data.length; i++) {
                        this.data[i]["selected"] = (this.data[i].name == wl.name);
                    }
                    this.wordlistChange.emit(this.data[this.getSelectedIndex()].name);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], WordlistSelectorComponent.prototype, "wordlistChange", void 0);
                WordlistSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'wordlist-selector',
                        templateUrl: 'app/templates/wordlist-selector.html',
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, http_1.Http])
                ], WordlistSelectorComponent);
                return WordlistSelectorComponent;
            }());
            exports_1("WordlistSelectorComponent", WordlistSelectorComponent);
        }
    }
});
//# sourceMappingURL=wordlistSelector.js.map