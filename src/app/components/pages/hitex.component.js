System.register(["@angular/core", "../../services/localizer.service", "../component/switch-toggle.component", "../component/pleasewait.component", "../../services/larka.service", "@angular/http"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, switch_toggle_component_1, pleasewait_component_1, larka_service_1, http_1, HitexComponent;
    return {
        setters: [
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
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            HitexComponent = /** @class */ (function () {
                function HitexComponent(localizer, larka, http) {
                    this.localizer = localizer;
                    this.larka = larka;
                    this.http = http;
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
                    this.menuToggle = [false, false, false, false, false, false, false];
                    this.searchtermPosition = 0;
                    this.hits = [];
                    this.badhits = [];
                    // has a search already been run or are we virgin?
                    this.searchRun = false;
                    // keep previous search results?
                    this.keepPrevious = false; // TODO add GUI checkbox
                    this.sensitiveTopics = [
                        "Death", "Discrimination", "Drugs", "Religion", "Secretion", "Sex", "Violence", "Other"
                    ];
                    var me = this;
                    this.http.get('app/data/hitex-corpora.json').map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.corpora = data;
                    });
                }
                HitexComponent.prototype.changeMode = function (val) {
                    this.searchmode = val;
                    this.cqpmode = val == 2;
                };
                HitexComponent.prototype.changePos = function (event) {
                    if (event.target.value == "any") {
                        this.currentPos = "";
                        return;
                    }
                    this.currentPos = event.target.value.split("(")[1].split(")")[0];
                };
                HitexComponent.prototype.searchmodeString = function () {
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
                HitexComponent.prototype.toggle = function (position) {
                    this.menuToggle[position] = !this.menuToggle[position];
                };
                HitexComponent.prototype.setSearchtermPosition = function (pos) {
                    this.searchtermPosition = pos;
                };
                HitexComponent.prototype.searchtermPositionString = function () {
                    if (this.searchtermPosition == 0) {
                        return 'hitex-of-start';
                    }
                    if (this.searchtermPosition == 1) {
                        return 'hitex-of-end';
                    }
                    return 'error';
                };
                HitexComponent.prototype.run = function () {
                    this.searchRun = false;
                    this.waiter.on();
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
                    var max_kwics = $('#max_kwics').val();
                    var corpus_list_string = this.get_checked_string($('#hitex-corpus-list').find('input'));
                    var sensitive_voc_cats = this.get_checked_string($('#sensitive_voc_cats').find("input"));
                    var maxhit = $('#maxhit').val();
                    var random_seed = "";
                    var target_cefr = "";
                    var tc = $('#cefrs').find('input[type="radio"]:checked').val();
                    if (tc != "all") {
                        target_cefr = "" + tc;
                        this.cefr = tc;
                    }
                    var preserve_bad = $('#preserve_bad').is(':checked');
                    // get all active filters/rankers
                    var other_params = [];
                    this.switchtoggles.forEach(function (f) {
                        if (f.getValue()) {
                            other_params.push(f.getValue());
                        }
                    });
                    if (sensitive_voc_cats) {
                        other_params.push("sensitive_voc_cats=" + sensitive_voc_cats);
                    }
                    var proportion = $('#kw_pos_percent').val();
                    if (proportion) {
                        other_params.push("proportion=" + proportion);
                        var target_edge = (this.searchtermPosition == 0) ? "start" : "end";
                        other_params.push("target_edge=" + target_edge);
                    }
                    var non_lemmatized_thr = $('#non_lemmatized_thr').val();
                    if (non_lemmatized_thr) {
                        other_params.push("non_lemmatized_thr=" + non_lemmatized_thr);
                    }
                    var non_alpha_thr = $('#non_alpha_thr').val();
                    if (non_alpha_thr) {
                        other_params.push("non_alpha_thr=" + non_alpha_thr);
                    }
                    var min_len = $('#min_len').val();
                    if (min_len) {
                        other_params.push("min_len=" + min_len);
                    }
                    var max_len = $('#max_len').val();
                    if (max_len) {
                        other_params.push("max_len=" + max_len);
                    }
                    var ops = other_params.join("&");
                    var me = this;
                    this.larka.hitex(query_w, query_type, use_defaults, query_pos, max_kwics, corpus_list_string, maxhit, random_seed, target_cefr, preserve_bad, ops).subscribe(function (data) {
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
                                "rank": d["rank"],
                                "id": d["kwic_position"],
                                "typicality": d["match_info"]["typicality"][0],
                                "svalex_fr": d["match_info"]["svalex_fr"][0],
                                "showInfo": false
                            };
                            b["violations"] = [];
                            if (d["match_info"]["readability"]) {
                                b["cefr"] = d["match_info"]["readability"][1];
                                b["violations"].push({ "message": "Different CEFR level:", "data": d["match_info"]["readability"][1] });
                            }
                            if (d["match_info"]["proper_name"]) {
                                if (d["match_info"]["proper_name"][1] !== "no violations") {
                                    b["proper_name"] = d["match_info"]["proper_name"][1];
                                    b["violations"].push({ "message": "Contains proper names:", "data": d["match_info"]["proper_name"][1] });
                                }
                            }
                            if (d["match_info"]["participle"]) {
                                b["participle"] = d["match_info"]["participle"][1];
                                b["violations"].push({ "message": "Contains participles:", "data": d["match_info"]["participle"][1] });
                            }
                            if (d["match_info"]["modal_verb"]) {
                                b["modal_verb"] = d["match_info"]["modal_verb"][1];
                                b["violations"].push({ "message": "Contains modal verb:", "data": d["match_info"]["modal_verb"][1] });
                            }
                            if (d["match_info"]["elliptic"]) {
                                b["elliptic"] = d["match_info"]["elliptic"];
                                b["violations"].push({ "message": "Contains ellipsis:", "data": d["match_info"]["elliptic"][1] });
                            }
                            if (d["match_info"]["diff_voc_kelly"]) {
                                b["diff_voc_kelly"] = d["match_info"]["diff_voc_kelly"];
                                b["violations"].push({ "message": "Difficult words:", "data": d["match_info"]["diff_voc_kelly"][1] });
                            }
                            if (d["match_info"]["anaphora-AB1"]) {
                                b["anaphora"] = d["match_info"]["anaphora-AB1"][0][1];
                                b["violations"].push({ "message": "Contains adverbial anaphora.", "data": d["match_info"]["anaphora-AB1"][0][1] });
                            }
                            if (d["match_info"]["neg_form"]) {
                                b["negation"] = d["match_info"]["neg_form"][1];
                                b["violations"].push({ "message": "Contains negation:", "data": d["match_info"]["neg_form"][1] });
                            }
                            if (d["match_info"]["out_of_svalex"]) {
                                b["out_of_svalex"] = d["match_info"]["out_of_svalex"][1];
                                b["violations"].push({ "message": "Out-of-Svalex:", "data": d["match_info"]["out_of_svalex"][1] });
                            }
                            if (d["match_info"]["interrogative"]) {
                                b["interrogative"] = d["match_info"]["interrogative"][1];
                                b["violations"].push({ "message": "Interrogative form.", "data": "" });
                            }
                            if (d["match_info"]["no_root"]) {
                                b["no_root"] = d["match_info"]["no_root"][1];
                                b["violations"].push({ "message": "Missing dependency root.", "data": d["match_info"]["no_root"][1] });
                            }
                            if (d["match_info"]["sent_tokenization"]) {
                                b["sent_tokenization"] = d["match_info"]["sent_tokenization"][1];
                                b["violations"].push({ "message": "Wrong sentence segmentation.", "data": d["match_info"]["sent_tokenization"][1] });
                            }
                            if (d["match_info"]["non_alpha"]) {
                                b["non_alpha"] = d["match_info"]["non_alpha"][1];
                                b["violations"].push({ "message": "Contains non-alphabetical tokens.", "data": d["match_info"]["non_alpha"][1] });
                            }
                            if (d["match_info"]["non_lemmatized"]) {
                                b["non_lemmatized"] = d["match_info"]["non_lemmatized"][1];
                                b["violations"].push({ "message": "Non-lemmatized tokens:", "data": d["match_info"]["non_lemmatized"][1] });
                            }
                            if (d["match_info"]["struct_conn"]) {
                                b["struct_conn"] = d["match_info"]["struct_conn"][1];
                                b["violations"].push({ "message": "Structural connective.", "data": d["match_info"]["struct_conn"][1] });
                            }
                            if (d["match_info"]["yn_answer"]) {
                                b["yn_answer"] = d["match_info"]["yn_answer"][1];
                                b["violations"].push({ "message": "Yes-No type answer.", "data": d["match_info"]["yn_answer"][1] });
                            }
                            if (d["match_info"]["anaphora-PN"]) {
                                b["anaphora-PN"] = d["match_info"]["anaphora-PN"][1];
                                b["violations"].push({ "message": "Contains pronominal anaphora:", "data": d["match_info"]["anaphora-PN"][1] });
                            }
                            if (d["match_info"]["anaphora-AB"]) {
                                b["anaphora-AB"] = d["match_info"]["anaphora-AB"][1];
                                b["violations"].push({ "message": "Contains adverbial anaphora.", "data": d["match_info"]["anaphora-AB"][1] });
                            }
                            if (d["match_info"]["sensitive_voc"]) {
                                b["sensitive_voc"] = d["match_info"]["sensitive_voc"][1];
                                b["violations"].push({ "message": "Sensitive vocabulary:", "data": d["match_info"]["sensitive_voc"][1] });
                            }
                            if (d["match_info"]["length"]) {
                                b["length"] = d["match_info"]["length"][1];
                                b["violations"].push({ "message": "Wrong length:", "data": d["match_info"]["length"][1] });
                            }
                            if (d["match_info"]["repkw"]) {
                                b["repkw"] = d["match_info"]["repkw"][1];
                                b["violations"].push({ "message": "Search pattern repetition:", "data": d["match_info"]["repkw"][1] });
                            }
                            if (d["match_info"]["kw_position"]) {
                                b["kw_position"] = d["match_info"]["kw_position"][1];
                                b["violations"].push({ "message": "Position of search pattern:", "data": d["match_info"]["kw_position"][1] });
                            }
                            if (d["match_info"]["sverb"]) {
                                b["sverb"] = d["match_info"]["sverb"][1];
                                b["violations"].push({ "message": "S-verb:", "data": d["match_info"]["sverb"][1] });
                            }
                            if (d["match_info"]["abbrev"]) {
                                b["abbrev"] = d["match_info"]["abbrev"][1];
                                b["violations"].push({ "message": "Abbreviation:", "data": d["match_info"]["abbrev"][1] });
                            }
                            if (d["match_info"]["direct_speech"]) {
                                b["direct_speech"] = d["match_info"]["direct_speech"][1];
                                b["violations"].push({ "message": "Direct speech.", "data": d["match_info"]["direct_speech"][1] });
                            }
                            if (d["match_info"]["typicality"]) {
                                b["typicality"] = d["match_info"]["typicality"][0];
                                b["violations"].push({ "message": "Typicality:", "data": d["match_info"]["typicality"][0] });
                            }
                            if (parseFloat(b["score"]) < 0) {
                                me.badhits.push(b);
                            }
                            else {
                                me.hits.push(b);
                            }
                        });
                        me.waiter.off();
                        me.searchRun = true;
                    }, function (err) {
                        me.waiter.off();
                        alert("Something went wrong! " + err);
                    }, function () {
                        console.log("Completed.");
                    });
                };
                HitexComponent.prototype.get_checked_string = function (list) {
                    var chosen = [];
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        if ($(item).is(":checked")) {
                            chosen.push(item.value); // TODO map to values
                        }
                    }
                    return chosen.join(",");
                };
                HitexComponent.prototype.keyhandler = function (keycode) {
                    if (keycode == 13) {
                        this.run();
                    }
                };
                __decorate([
                    core_1.ViewChild('waiter'),
                    __metadata("design:type", pleasewait_component_1.PleaseWaitComponent)
                ], HitexComponent.prototype, "waiter", void 0);
                __decorate([
                    core_1.ViewChildren(switch_toggle_component_1.SwitchToggleComponent),
                    __metadata("design:type", core_1.QueryList)
                ], HitexComponent.prototype, "switchtoggles", void 0);
                HitexComponent = __decorate([
                    core_1.Component({
                        selector: 'hitex',
                        templateUrl: 'app/templates/hitex.html',
                        styleUrls: ['app/css/hitex.css'],
                        providers: [switch_toggle_component_1.SwitchToggleComponent]
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService, larka_service_1.LarkaService, http_1.Http])
                ], HitexComponent);
                return HitexComponent;
            }());
            exports_1("HitexComponent", HitexComponent);
        }
    };
});
//# sourceMappingURL=hitex.component.js.map