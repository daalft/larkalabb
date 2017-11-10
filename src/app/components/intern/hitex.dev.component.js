System.register(["@angular/core", "../../services/localizer.service", "../component/switch-toggle.component", "../component/pleasewait.component", "../../services/larka.service"], function(exports_1, context_1) {
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
    var core_1, localizer_service_1, switch_toggle_component_1, pleasewait_component_1, larka_service_1;
    var HitexDevComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (switch_toggle_component_1_1) {
                switch_toggle_component_1 = switch_toggle_component_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            }],
        execute: function() {
            HitexDevComponent = (function () {
                function HitexDevComponent(localizer, larka) {
                    this.localizer = localizer;
                    this.larka = larka;
                    this.searchmode = 0;
                    this.cqpmode = false;
                    this.useDefaults = true;
                    this.sensitiveVocab = false;
                    this.showAdvancedOptions = false;
                    this.pos_names = [
                        "AB", "HA", "JJ", "RG", "KN", "DT", "IE",
                        "IN", "NN", "RO", "PC", "PL", "PP", "PN", "PM",
                        "PS", "SN", "VB"
                    ];
                    // advanced menu toggle flags for showing and hiding menu
                    this.menuToggle = [false, false, false, false, false];
                    this.searchtermPosition = 0;
                    this.hits = [];
                    this.badhits = [];
                    // has a search already been run or are we virgin?
                    this.searchRun = false;
                    // keep previous search results?
                    this.keepPrevious = false; // TODO add GUI checkbox
                    this.oneHundred = [];
                }
                HitexDevComponent.prototype.resetOneHundred = function () {
                    this.oneHundred = [];
                };
                HitexDevComponent.prototype.changeMode = function (val) {
                    this.searchmode = val;
                    this.cqpmode = val == 2;
                };
                HitexDevComponent.prototype.changePos = function (event) {
                    if (event.target.value == "any") {
                        this.currentPos = "";
                        return;
                    }
                    this.currentPos = event.target.value.split("(")[1].split(")")[0];
                };
                HitexDevComponent.prototype.searchmodeString = function () {
                    if (this.searchmode == 0) {
                        return 'hitex-lemma';
                    }
                    if (this.searchmode == 1) {
                        return 'hitex-wordform';
                    }
                    if (this.searchmode == 2) {
                        return 'hitex-cqp';
                    }
                    return 'error';
                };
                HitexDevComponent.prototype.toggle = function (position) {
                    this.menuToggle[position] = !this.menuToggle[position];
                };
                HitexDevComponent.prototype.setSearchtermPosition = function (pos) {
                    this.searchtermPosition = pos;
                };
                HitexDevComponent.prototype.searchtermPositionString = function () {
                    if (this.searchtermPosition == 0) {
                        return 'hitex-of-start';
                    }
                    if (this.searchtermPosition == 1) {
                        return 'hitex-of-end';
                    }
                    return 'error';
                };
                HitexDevComponent.prototype.run = function () {
                    this.searchRun = false;
                    this.waiter.on();
                    this.maxsent = parseInt($('#maxsent').val());
                    // TODO reset lists? Keep previous results? -> changing CEFR level can result in sentences being both hit and badhit
                    if (!this.keepPrevious) {
                        this.hits = [];
                        this.badhits = [];
                    }
                    var query_w = $('#searchfield').val();
                    var use_defaults = $('#usedefaults').is(':checked');
                    var query_type = "";
                    if (this.searchmode == 0) {
                        query_type = "lemma";
                    }
                    if (this.searchmode == 1) {
                        query_type = "wordform";
                    }
                    if (this.searchmode == 3) {
                        query_type = "cqp";
                    }
                    var query_pos = "";
                    if (this.searchmode == 0 || this.searchmode == 1) {
                        if (this.currentPos != "any") {
                            query_pos = this.currentPos;
                        }
                    }
                    var max_kwics = 100;
                    var corpus_list = "suc3,gp1994,gp2001,gp2002,gp2003,gp2004,gp2005,gp2006,gp2007,gp2008,gp2009,gp2010,gp2011,gp2012,gp2013";
                    var maxhit = 20;
                    var random_seed = "";
                    var target_cefr = "";
                    var tc = $('input[type="radio"]:checked').val();
                    if (tc != "all") {
                        target_cefr = tc;
                        this.cefr = tc;
                    }
                    var me = this;
                    this.larka.hitex(query_w, query_type, use_defaults, query_pos, max_kwics, corpus_list, maxhit, random_seed, target_cefr).subscribe(function (data) {
                        if (!data) {
                            me.waiter.off();
                            alert("Something went wrong!");
                            return;
                        }
                        if (data["Error"]) {
                            me.waiter.off();
                            alert("Something went wrong: " + data["Error"]);
                            return;
                        }
                        data.forEach(function (d) {
                            var b = { "sentence_left": d["sent_left"],
                                "target": d["keyword"]["word"],
                                "sentence_right": d["sent_right"],
                                "score": d["score"],
                                "id": d["kwic_position"],
                                "showInfo": false
                            };
                            if (parseFloat(b["score"]) < 0) {
                            }
                            else {
                                //me.hits.push(b);
                                var found = false;
                                for (var i = 0; i < me.oneHundred.length; i++) {
                                    if (me.oneHundred[i]["id"] == b["id"]) {
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found) {
                                    me.oneHundred.push(b);
                                }
                            }
                        });
                        me.waiter.off();
                        me.searchRun = true;
                        if (me.oneHundred.length < me.maxsent) {
                            console.log(me.oneHundred.length);
                            me.run();
                        }
                        else {
                            alert("Reached threshold");
                        }
                    }, function (err) {
                        me.waiter.off();
                        alert("Something went wrong! " + err);
                    }, function () {
                        console.log("Completed.");
                    });
                };
                HitexDevComponent.prototype.keyhandler = function (keycode) {
                    if (keycode == 13) {
                        this.run();
                    }
                };
                __decorate([
                    core_1.ViewChild('waiter'), 
                    __metadata('design:type', pleasewait_component_1.PleaseWaitComponent)
                ], HitexDevComponent.prototype, "waiter", void 0);
                HitexDevComponent = __decorate([
                    core_1.Component({
                        selector: 'hitexdev',
                        templateUrl: 'app/templates/hitexdev.html',
                        styleUrls: ['app/css/hitex.css'],
                        providers: [switch_toggle_component_1.SwitchToggleComponent]
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, larka_service_1.LarkaService])
                ], HitexDevComponent);
                return HitexDevComponent;
            }());
            exports_1("HitexDevComponent", HitexDevComponent);
        }
    }
});
//# sourceMappingURL=hitex.dev.component.js.map