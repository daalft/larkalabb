System.register(["@angular/core", "../../services/localizer.service", "../../services/easteregg.service"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, easteregg_service_1, LogoSpaceComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (easteregg_service_1_1) {
                easteregg_service_1 = easteregg_service_1_1;
            }
        ],
        execute: function () {
            LogoSpaceComponent = /** @class */ (function () {
                function LogoSpaceComponent(localizer, eggs) {
                    this.localizer = localizer;
                    this.eggs = eggs;
                    this.imageName = "lark4_t2"; // base file name. requires an equivalent file with "d" ending for localization
                    this.fileEnding = ".png";
                    this.currentLogoSmall = "app/img/lark4_t2s.png";
                }
                LogoSpaceComponent.prototype.localize = function (key) {
                    return this.localizer.localize(key);
                };
                LogoSpaceComponent.prototype.getLanguage = function () {
                    return this.localizer.getLanguage();
                };
                LogoSpaceComponent.prototype.getCurrentLogo = function () {
                    var swedish = this.localizer.getLanguage() == 'sv';
                    var christmas = this.eggs.isChristmas();
                    var autumn = this.eggs.isAutumn();
                    if (christmas) {
                        return "app/img/" + this.imageName + "c" + this.fileEnding;
                    }
                    else if (autumn) {
                        return "app/img/" + this.imageName + "h2" + this.fileEnding;
                    }
                    return "app/img/" + this.imageName + (swedish ? "d" : "") + this.fileEnding;
                };
                LogoSpaceComponent.prototype.getCurrentLogoSmall = function () {
                    return this.currentLogoSmall;
                };
                LogoSpaceComponent = __decorate([
                    core_1.Component({
                        selector: 'logo-space',
                        templateUrl: 'app/templates/logo-space.html'
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService, easteregg_service_1.EasterEggService])
                ], LogoSpaceComponent);
                return LogoSpaceComponent;
            }());
            exports_1("LogoSpaceComponent", LogoSpaceComponent);
        }
    };
});
//# sourceMappingURL=logoSpace.component.js.map