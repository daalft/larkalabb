System.register(["@angular/core", "../../services/larka.service"], function(exports_1, context_1) {
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
    var core_1, larka_service_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(larka) {
                    this.larka = larka;
                    this.larka.wakeup().subscribe(function (d) { console.log(d); });
                }
                HomeComponent.prototype.ngAfterViewInit = function () {
                    var ts = '<a class="twitter-timeline" data-width="300" data-height="600" data-link-color="#E95F28" href="https://twitter.com/larka_sb">Tweets by larka_sb</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
                    document.getElementById('twitterfeed').innerHTML = ts;
                    if (typeof twttr === 'undefined') {
                        (function () {
                            !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) {
                                js = d.createElement(s);
                                js.id = id;
                                js.src = p + '://platform.twitter.com/widgets.js';
                                fjs.parentNode.insertBefore(js, fjs);
                            } }(document, 'script', 'twitter-wjs');
                        })();
                    }
                    else {
                        twttr.widgets.load();
                    }
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home',
                        templateUrl: 'app/templates/home-component.html',
                        styleUrls: ['app/css/home.css']
                    }), 
                    __metadata('design:paramtypes', [larka_service_1.LarkaService])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map