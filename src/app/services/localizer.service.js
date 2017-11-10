System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var LocalizerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            LocalizerService = (function () {
                function LocalizerService(http) {
                    var _this = this;
                    this.dictionary = {};
                    this.dictionary['sv'] = {};
                    this.dictionary['en'] = {};
                    if (!this.currentLanguage) {
                        this.currentLanguage = 'sv';
                    }
                    http.get('app/data/locale-sv.json')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.dictionary['sv'] = data; });
                    http.get('app/data/locale-en.json')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.dictionary['en'] = data; });
                }
                LocalizerService.prototype.localize = function (key) {
                    if (this.dictionary) {
                        return this.dictionary[this.currentLanguage][key];
                    }
                };
                LocalizerService.prototype.getLanguage = function () {
                    return this.currentLanguage;
                };
                LocalizerService.prototype.setLanguage = function (language) {
                    this.currentLanguage = language;
                };
                LocalizerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LocalizerService);
                return LocalizerService;
            }());
            exports_1("LocalizerService", LocalizerService);
        }
    }
});
//# sourceMappingURL=localizer.service.js.map