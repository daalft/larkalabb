System.register(["@angular/core", "@angular/router-deprecated", "../../services/localizer.service"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, localizer_service_1;
    var InformationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            }],
        execute: function() {
            InformationComponent = (function () {
                function InformationComponent(localizer, _routeParams) {
                    this.localizer = localizer;
                    this._routeParams = _routeParams;
                    this.isVisible = false;
                }
                InformationComponent.prototype.ngOnInit = function () {
                    this.isVisible = true;
                    var lemma = this._routeParams.get('lemma');
                    if (!lemma)
                        return; // there was no word or we failed to get it
                    var pos = this._routeParams.get('pos');
                    var sense = this._routeParams.get('sense');
                    console.log(lemma + " " + pos + " " + sense);
                };
                InformationComponent = __decorate([
                    core_1.Component({
                        selector: 'information-show',
                        templateUrl: 'app/templates/information-show.html',
                        styleUrls: ['app/css/information.css'],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, router_deprecated_1.RouteParams])
                ], InformationComponent);
                return InformationComponent;
            }());
            exports_1("InformationComponent", InformationComponent);
        }
    }
});
//# sourceMappingURL=information.component.js.map