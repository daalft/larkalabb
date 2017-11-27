System.register(["@angular/core", "../../services/larka.service", "../component/pleasewait.component"], function (exports_1, context_1) {
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
    var core_1, larka_service_1, pleasewait_component_1, SiwocoComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            }
        ],
        execute: function () {
            SiwocoComponent = /** @class */ (function () {
                function SiwocoComponent(larka) {
                    this.larka = larka;
                    this.analyses = [];
                }
                SiwocoComponent.prototype.predict = function (word, pos, rop) {
                    this.waiter.on();
                    var me = this;
                    this.larka.siwoco(word, pos, rop).subscribe(function (data) {
                        var w = data["word"];
                        var p = data["pos"];
                        var rop = data["receptiveOrProductive"];
                        var l = data["level"];
                        me.analyses.unshift({ 'word': w, 'pos': p, 'rop': rop, 'level': l });
                        me.waiter.off();
                    });
                };
                SiwocoComponent.prototype.keyhandler = function (event, word, pos, rop) {
                    if (event.keyCode == 13) {
                        this.predict(word, pos, rop);
                    }
                };
                __decorate([
                    core_1.ViewChild('waiter'),
                    __metadata("design:type", pleasewait_component_1.PleaseWaitComponent)
                ], SiwocoComponent.prototype, "waiter", void 0);
                SiwocoComponent = __decorate([
                    core_1.Component({
                        selector: 'siwoco',
                        templateUrl: 'app/templates/siwoco.html',
                        styleUrls: ['app/css/siwoco.css']
                    }),
                    __metadata("design:paramtypes", [larka_service_1.LarkaService])
                ], SiwocoComponent);
                return SiwocoComponent;
            }());
            exports_1("SiwocoComponent", SiwocoComponent);
        }
    };
});
//# sourceMappingURL=siwoco.component.js.map