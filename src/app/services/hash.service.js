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
    var HashService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Created by David on 2/13/2017.
             */
            HashService = (function () {
                function HashService() {
                }
                HashService.hashCode = function (string) {
                    var hash = 0;
                    if (string.length == 0) {
                        return hash;
                    }
                    for (var i = 0; i < string.length; i++) {
                        var char = string.charCodeAt(i);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash;
                    }
                    return hash;
                };
                HashService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HashService);
                return HashService;
            }());
            exports_1("HashService", HashService);
        }
    }
});
//# sourceMappingURL=hash.service.js.map