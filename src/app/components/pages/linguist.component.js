/**
 * Created by David on 3/9/2016.
 */
System.register(["@angular/core", "../../services/localizer.service", "./../component/choiceSelector.component", "../component/modeSelector.component", "../../services/larka.service", "../../services/larka.adapter.service", "../component/exercise.component", "../../services/state.service", "../navigation/userNavbar.component"], function(exports_1, context_1) {
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
    var core_1, localizer_service_1, choiceSelector_component_1, modeSelector_component_1, larka_service_1, larka_adapter_service_1, exercise_component_1, state_service_1, userNavbar_component_1;
    var LinguistComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (choiceSelector_component_1_1) {
                choiceSelector_component_1 = choiceSelector_component_1_1;
            },
            function (modeSelector_component_1_1) {
                modeSelector_component_1 = modeSelector_component_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (larka_adapter_service_1_1) {
                larka_adapter_service_1 = larka_adapter_service_1_1;
            },
            function (exercise_component_1_1) {
                exercise_component_1 = exercise_component_1_1;
            },
            function (state_service_1_1) {
                state_service_1 = state_service_1_1;
            },
            function (userNavbar_component_1_1) {
                userNavbar_component_1 = userNavbar_component_1_1;
            }],
        execute: function() {
            LinguistComponent = (function () {
                function LinguistComponent(localizer, larka, state) {
                    this.localizer = localizer;
                    this.larka = larka;
                    this.state = state;
                    this.quarantineList = [];
                    this.numberOfChoices = [0, 0];
                    this.exerciseParticles = ["pos_selectionNote", "pos_selectionNote", "synt_selectionNote", "synt_selectionNote", "sem_selectionNote"];
                    this.labels1 = [
                        { name: "trainPOS1", selected: true },
                        { name: "trainPOS2" },
                        { name: "trainSYNT1" },
                        { name: "trainSYNT2" },
                        { name: "trainSemanticRoles" }
                    ]; // TODO load labels dynamically?
                    this.multi1 = {
                        title: "selectWordClasses_plural",
                        data: [
                            {
                                header: {
                                    name: "contentWords",
                                    selected: false,
                                    isHeader: true
                                },
                                labels: [
                                    { name: "adjectives", selected: true },
                                    { name: "adverbs", selected: true },
                                    { name: "participles", selected: true },
                                    { name: "nouns", selected: true },
                                    { name: "verbs", selected: true }
                                ]
                            },
                            {
                                header: {
                                    name: "functionWordClasses",
                                    selected: false,
                                    isHeader: true
                                },
                                labels: [
                                    { name: "determiners", selected: true },
                                    { name: "conjunctions", selected: true },
                                    { name: "prepositions", selected: true },
                                    { name: "pronouns", selected: true },
                                    { name: "subjunctions", selected: true },
                                    { name: "numerals", selected: true }
                                ]
                            }
                        ]
                    };
                    this.multi2 = {
                        title: "selectSyntRoles_plural",
                        data: [
                            {
                                labels: [
                                    { name: "adverbial", selected: true },
                                    { name: "finite verb", selected: true },
                                    { name: "indirect object", selected: true },
                                    { name: "nonfinite verb", selected: true },
                                    { name: "object", selected: true },
                                    { name: "predicate", selected: true },
                                    { name: "subject", selected: true }
                                ]
                            }
                        ]
                    };
                    this.multi3 = {
                        title: "selectSemRoles_plural",
                        data: [
                            {
                                labels: [
                                    { name: "agent_sem", selected: true },
                                    { name: "experiencer_sem", selected: true },
                                    { name: "theme_sem", selected: true },
                                    { name: "instrument_sem", selected: true },
                                    { name: "location_sem", selected: true },
                                    { name: "direction_sem", selected: true },
                                    { name: "recipient_sem", selected: true },
                                    { name: "origin_sem", selected: true },
                                    { name: "time_sem", selected: true },
                                    { name: "manner_sem", selected: true },
                                    { name: "purpose_sem", selected: true },
                                    { name: "cause_sem", selected: true }
                                ]
                            }
                        ]
                    };
                    this.calculateResume();
                    if (this.state.hasState("linguist")) {
                        var me_1 = this;
                        this.state.retrieve("linguist").subscribe(function (state) {
                            me_1.currentMode = state["currentMode"];
                            me_1.exerciseName = state["exerciseName"];
                            me_1.labels1 = state["labels1"];
                            me_1.multi1 = state["multi1"];
                            me_1.multi2 = state["multi2"];
                            me_1.multi3 = state["multi3"];
                            me_1.exerciseParticle = state["exerciseParticle"];
                            me_1.numberOfChoices = state["numberOfChoices"];
                        });
                    }
                }
                // ngAfterViewInit() {
                //     if (this.state.hasState("linguist")) {
                //         var me = this;
                //
                //         this.state.retrieve("linguist").subscribe(function(state) {
                //             me.exState = state["exState"];
                //             me.exercise.reinitialize(me.exState);
                //         });
                //
                //         //this.calculateResume ();
                //     } else {
                //         this.calculateResume ();
                //     }
                //     setTimeout(function() {
                //         console.log("after view init");
                //     }, 0);
                // }
                LinguistComponent.prototype.routerOnActivate = function () {
                };
                /*ngOnDestroy () {
                    console.log("saving state");
                    let currentState = {};
                    currentState["currentMode"] = this.currentMode;
                    currentState["exerciseName"]= this.exerciseName;
                    currentState["exState"]= this.exercise;
                    currentState["currentMode"]= this.currentMode;
                    currentState["labels1"]= this.labels1;
                    currentState["multi1"]= this.multi1;
                    currentState["multi2"]= this.multi2;
                    currentState["multi3"]= this.multi3;
                    currentState["exerciseParticle"] = this.exerciseParticle;
                    currentState["numberOfChoices"]= this.numberOfChoices;
                    //console.log(currentState);
                    this.state.persist("linguist", currentState);
                }*/
                LinguistComponent.prototype.localize = function (key) {
                    return this.localizer.localize(key);
                };
                LinguistComponent.prototype.handleModeChange = function (event) {
                    //console.log("mode changed " + event);
                    this.currentMode = event;
                    this.exercise.requestModeChange(this.currentMode);
                };
                LinguistComponent.prototype.generate = function (event) {
                    //console.log("generation request");
                    this.modeSelector.lockButton();
                    //console.log("current mode: " + this.currentMode);
                    //console.log("current exercise: " + this.exerciseName);
                    //console.log("params: " + this._getSelected(this.getChoiceForSelected()));
                    var me = this;
                    this.larka.generate(this.exerciseName, this._getSelected(this.getChoiceForSelected()), this.quarantineList.join(","), 2).subscribe(function (data) {
                        // release generating button
                        me.modeSelector.releaseButton();
                        me.exercise.setData(data);
                        me.quarantineList.push(data["sentence_id"]);
                    });
                };
                LinguistComponent.prototype.setSelected = function (label) {
                    for (var i = 0; i < this.labels1.length; i++) {
                        var condition = (this.labels1[i].name == label.name);
                        this.labels1[i]["selected"] = condition;
                        if (condition) {
                            this.exerciseName = this.labels1[i].name;
                        }
                    }
                    this.calculateResume();
                };
                LinguistComponent.prototype._getSelectedIndex = function () {
                    for (var i = 0; i < this.labels1.length; i++) {
                        if (this.labels1[i]["selected"]) {
                            return i;
                        }
                    }
                };
                LinguistComponent.prototype.getChoiceForSelected = function () {
                    switch (this._getSelectedIndex()) {
                        case 0:
                        case 1:
                            return this.multi1;
                        case 2:
                        case 3:
                            return this.multi2;
                        case 4:
                            return this.multi3;
                        default: return;
                    }
                };
                LinguistComponent.prototype.calculateResume = function () {
                    var index = this._getSelectedIndex();
                    this.exerciseName = this.labels1[index].name;
                    this.numberOfChoices = this._countSelected(this.getChoiceForSelected());
                    this.exerciseParticle = this.exerciseParticles[index];
                };
                LinguistComponent.prototype._getSelected = function (object) {
                    var out = [];
                    object.data.forEach(function (a) {
                        a.labels.forEach(function (b) {
                            if (b.selected) {
                                out.push(b.name);
                            }
                        });
                    });
                    return out;
                };
                LinguistComponent.prototype._countSelected = function (object) {
                    var count = 0;
                    var total = 0;
                    object.data.forEach(function (a) {
                        a.labels.forEach(function (b) {
                            if (b.selected) {
                                count++;
                            }
                            total++;
                        });
                    });
                    return [count, total];
                };
                __decorate([
                    core_1.ViewChild(modeSelector_component_1.ModeSelectorComponent), 
                    __metadata('design:type', modeSelector_component_1.ModeSelectorComponent)
                ], LinguistComponent.prototype, "modeSelector", void 0);
                __decorate([
                    core_1.ViewChild(exercise_component_1.ExerciseComponent), 
                    __metadata('design:type', exercise_component_1.ExerciseComponent)
                ], LinguistComponent.prototype, "exercise", void 0);
                LinguistComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-out',
                        templateUrl: 'app/templates/linguist-component.html',
                        directives: [choiceSelector_component_1.ChoiceSelectorComponent, modeSelector_component_1.ModeSelectorComponent, exercise_component_1.ExerciseComponent, userNavbar_component_1.UserNavbarComponent],
                        providers: [larka_service_1.LarkaService, larka_adapter_service_1.LarkaAdapter, state_service_1.StateService],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService, larka_service_1.LarkaService, state_service_1.StateService])
                ], LinguistComponent);
                return LinguistComponent;
            }());
            exports_1("LinguistComponent", LinguistComponent);
        }
    }
});
//# sourceMappingURL=linguist.component.js.map