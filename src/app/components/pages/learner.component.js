System.register(["@angular/core", "../../services/localizer.service", "../component/choiceSelector.component", "../component/userSearch.component", "../component/wordlistSelector", "../navigation/userNavbar.component"], function(exports_1, context_1) {
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
    var core_1, localizer_service_1, choiceSelector_component_1, userSearch_component_1, wordlistSelector_1, userNavbar_component_1;
    var LearnerComponent;
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
            function (userSearch_component_1_1) {
                userSearch_component_1 = userSearch_component_1_1;
            },
            function (wordlistSelector_1_1) {
                wordlistSelector_1 = wordlistSelector_1_1;
            },
            function (userNavbar_component_1_1) {
                userNavbar_component_1 = userNavbar_component_1_1;
            }],
        execute: function() {
            LearnerComponent = (function () {
                function LearnerComponent(localizer) {
                    this.localizer = localizer;
                    this.disableMulti1 = false;
                    this.useCustom = false;
                    this.labels1 = [
                        { name: "trainVOC_multi", selected: true },
                        { name: "trainVOC_infl" },
                        { name: "train_spelling" }
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
                                    { name: "adverbs", selected: false },
                                    { name: "participles", selected: false },
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
                                    { name: "determiners", selected: false },
                                    { name: "conjunctions", selected: false },
                                    { name: "prepositions", selected: false },
                                    { name: "pronouns", selected: false },
                                    { name: "subjunctions", selected: false },
                                    { name: "numerals", selected: false }
                                ]
                            }
                        ]
                    };
                    this.multi2 = {
                        title: "selectProficiencyLevel",
                        data: [
                            {
                                labels: [
                                    { name: "cefrA1", selected: true },
                                    { name: "cefrA2", selected: true },
                                    { name: "cefrB1", selected: true },
                                    { name: "cefrB2", selected: true },
                                    { name: "cefrC1", selected: true },
                                    { name: "cefrC2", selected: true }
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
                    this.exerciseParticles = ["pos_selectionNote", "pos_selectionNote"];
                    this.levelParticle = "level_selectNote";
                    this.wordListOrUserSearch = "...";
                    this.customWordCount = 0;
                    this.currentWordlist = "...";
                    this.calculateResume();
                }
                LearnerComponent.prototype.localize = function (key) {
                    return this.localizer.localize(key);
                };
                LearnerComponent.prototype.setSelected = function (label) {
                    for (var i = 0; i < this.labels1.length; i++) {
                        this.labels1[i]["selected"] = (this.labels1[i].name == label.name);
                    }
                    this.disableMulti1 = ((this.currentWordlist != "general") && (this.currentWordlist != "academic")) || (this._getSelectedExerciseIndex() == 2);
                };
                LearnerComponent.prototype._getSelectedExerciseIndex = function () {
                    for (var i = 0; i < this.labels1.length; i++) {
                        if (this.labels1[i]["selected"]) {
                            return i;
                        }
                    }
                };
                LearnerComponent.prototype.getChoiceForSelected = function () {
                    switch (this._getSelectedExerciseIndex()) {
                        case 0:
                        case 1:
                            return this.multi1;
                        case 2:
                            return;
                        default: return;
                    }
                };
                LearnerComponent.prototype.calculateResume = function () {
                    var index = this._getSelectedExerciseIndex();
                    this.exerciseName = this.labels1[index].name;
                    this.numberOfWordChoices = this._countSelected(this.getChoiceForSelected());
                    this.exerciseParticle = this.exerciseParticles[index];
                    this.numberOfLevelChoices = this._countSelected(this.multi2);
                };
                LearnerComponent.prototype.handleUserSearchNumberChange = function (event) {
                    this.customWordCount = event;
                };
                LearnerComponent.prototype.handleWordlistChange = function (event) {
                    this.currentWordlist = event;
                    this.disableMulti1 = ((this.currentWordlist != "general") && (this.currentWordlist != "academic")) || (this._getSelectedExerciseIndex() == 2);
                };
                LearnerComponent.prototype._countSelected = function (object) {
                    var count = 0;
                    var total = 0;
                    if (!object) {
                        return [0, 0];
                    }
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
                LearnerComponent.prototype.pluralize = function (phrase) {
                    // -> for custom words, change english 'words' to 'word' if custom word count == 1
                    if (this.localizer.getLanguage() === 'sv')
                        return phrase;
                    if (this.customWordCount != 1)
                        return phrase;
                    return phrase.replace("words", "word");
                };
                LearnerComponent.prototype.getCurrentWordlist = function () {
                    return this.currentWordlist;
                };
                LearnerComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-out',
                        templateUrl: 'app/templates/learner-component.html',
                        directives: [choiceSelector_component_1.ChoiceSelectorComponent, userSearch_component_1.UserSearchComponent, wordlistSelector_1.WordlistSelectorComponent, userNavbar_component_1.UserNavbarComponent],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [localizer_service_1.LocalizerService])
                ], LearnerComponent);
                return LearnerComponent;
            }());
            exports_1("LearnerComponent", LearnerComponent);
        }
    }
});
//# sourceMappingURL=learner.component.js.map