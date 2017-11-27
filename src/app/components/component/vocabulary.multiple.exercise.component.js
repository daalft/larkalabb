System.register(["@angular/core", "../../services/larka.service", "./pleasewait.component"], function (exports_1, context_1) {
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
    var core_1, larka_service_1, pleasewait_component_1, VocabularyMultipleChoiceExerciseComponent;
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
            VocabularyMultipleChoiceExerciseComponent = /** @class */ (function () {
                function VocabularyMultipleChoiceExerciseComponent(larka) {
                    this.larka = larka;
                    this.distractors = [];
                    this.previous = [];
                    this.indexcounter = 1;
                }
                //{"target":"t\u00e5rades","distractors":{"t\u00e5rades":"correct","utvecklades":"distractor","genomfors":"distractor","h\u00f6rdes":"distractor","erh\u00f6lls":"distractor"},
                // "target_item":"VB.PRT.SFO","sent_index":51133,"corpus":"SUC3","sentence_left":"Klistret satt ordentligt och han k\u00e4nde hur det ",
                // "sentence_right":"i \u00f6gonen , men han teg och led . ","target_index":8,"exetype":"multi"}
                VocabularyMultipleChoiceExerciseComponent.prototype.generate = function (domain, pos, level) {
                    this.waiter.on();
                    if (!domain) {
                        domain = "kelly";
                    }
                    if (!pos) {
                        pos = ["NN", "VB", "JJ", "AB"]; // defaults taken from old-old Lärka
                    }
                    if (!level) {
                        level = "B1";
                    }
                    this.distractors = [];
                    var me = this;
                    this.larka.generateMulti(domain, pos, level).subscribe(function (data) {
                        me.parse(data);
                    });
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.parse = function (data) {
                    this.target = data["target"];
                    var distractors = data["distractors"];
                    var target_item = data["target_item"];
                    var sent_index = data["sent_index"];
                    var corpus = data["corpus"];
                    this.sentence_left = data["sentence_left"];
                    this.sentence_right = data["sentence_right"];
                    var target_index = data["target_index"];
                    var exetype = "multi"; // TODO needed for logging??
                    for (var property in distractors) {
                        if (distractors.hasOwnProperty(property)) {
                            this.distractors.push(property);
                        }
                    }
                    this.index = this.indexcounter++;
                    this.answer = this.distractors[0]; // answer only set on explicit change, assume first choice to avoid null answer
                    this.waiter.off();
                    console.log(this.target);
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.setAnswer = function (event) {
                    this.answer = event.target.value;
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.reviseAnswer = function (obj, event) {
                    obj["answer"] = event.target.value;
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.checkAnswer = function () {
                    if (this.answer == this.target) {
                    }
                    this.archive();
                    this.reset();
                    this.generate();
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.reset = function () {
                    this.sentence_left = "";
                    this.sentence_right = "";
                    this.target = "...";
                    this.distractors = [];
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.isCorrect = function (obj) {
                    if (!obj) {
                        console.error("Expected object. Received none.");
                    }
                    return obj["target"] == obj["answer"];
                };
                VocabularyMultipleChoiceExerciseComponent.prototype.archive = function () {
                    var obj = {
                        'target': this.target,
                        'distractors': this.distractors,
                        'sentence_left': this.sentence_left,
                        'sentence_right': this.sentence_right,
                        'answer': this.answer,
                        'index': this.index
                    };
                    this.previous.unshift(obj);
                };
                __decorate([
                    core_1.ViewChild(pleasewait_component_1.PleaseWaitComponent),
                    __metadata("design:type", pleasewait_component_1.PleaseWaitComponent)
                ], VocabularyMultipleChoiceExerciseComponent.prototype, "waiter", void 0);
                VocabularyMultipleChoiceExerciseComponent = __decorate([
                    core_1.Component({
                        selector: 'voc-mc',
                        templateUrl: 'app/templates/voc-mc.html',
                        styleUrls: ['app/css/voc-mc.css', 'app/css/exercise.css']
                    }),
                    __metadata("design:paramtypes", [larka_service_1.LarkaService])
                ], VocabularyMultipleChoiceExerciseComponent);
                return VocabularyMultipleChoiceExerciseComponent;
            }());
            exports_1("VocabularyMultipleChoiceExerciseComponent", VocabularyMultipleChoiceExerciseComponent);
        }
    };
});
//# sourceMappingURL=vocabulary.multiple.exercise.component.js.map