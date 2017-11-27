/**
 * Created by David on 4/5/2016.
 */
System.register(["@angular/core", "../../services/localizer.service", "@angular/router", "../../services/dataAggregator.service", "../../services/login.service"], function (exports_1, context_1) {
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
    var core_1, localizer_service_1, core_2, core_3, router_1, dataAggregator_service_1, login_service_1, ExerciseComponent, Exercise, Target;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }
        ],
        execute: function () {/**
             * Created by David on 4/5/2016.
             */
            ExerciseComponent = /** @class */ (function () {
                function ExerciseComponent(localizer, _router, aggregator, login) {
                    this.localizer = localizer;
                    this._router = _router;
                    this.aggregator = aggregator;
                    this.login = login;
                    //@ViewChild('reportModal') modal: ModalComponent<any>;
                    this.data = undefined;
                    this.previousExamples = [];
                    this.reported_sentence = [];
                    this.nextRequester = new core_2.EventEmitter();
                    this.reloadRequester = new core_2.EventEmitter();
                    //console.log("ex comp const");
                    this.visible = false; // should default to false anyway
                    this.user = login.isLoggedIn() ? this.login.getUserId() : "";
                }
                ExerciseComponent.prototype.ngOnDestroy = function () {
                    // when destroying, flush data
                    this.aggregator.flush();
                };
                ExerciseComponent.prototype.ngAfterViewInit = function () {
                    this.aggregator.getUserInfo();
                };
                ExerciseComponent.prototype.reinitialize = function (ex) {
                    var _this = this;
                    console.log(ex.data);
                    if (!ex)
                        return;
                    //this.data = ex.data;
                    this.current = ex.current;
                    this.previousExamples = ex.previousExamples;
                    this.mode = ex.mode;
                    this.data = ex.data;
                    this._parse2(ex.data);
                    setTimeout(function () {
                        //trigger your update
                        _this.visible = true;
                    }, 0);
                    // TODO what about previous examples?
                };
                ExerciseComponent.prototype.setData = function (data) {
                    this.visible = true;
                    this.data = data;
                    this.current = new Exercise();
                    this._parse(data);
                    //console.log(this.current.target_pos);
                };
                ExerciseComponent.prototype._parse = function (data) {
                    this.current.corpus = this.data["corpus"];
                    this.current.distractors = this.data["distractors"];
                    this.current.exetype = this.data["exetype"];
                    this.current.korp_url = this.data["korp_url_link"];
                    this.current.larka_url = this.data["larka_url_link"];
                    this.current.sent_index = this.data["sent_index"];
                    this.current.sentence_id = this.data["sentence_id"];
                    this.current.sentence_left = this.special(this.data["sentence_left"]);
                    this.current.sentence_right = this.special(this.data["sentence_right"]);
                    this.current.target = this.special(this.data["target"]);
                    this.current.target_index = this.data["target_index"];
                    this.current.target_pos = this.data["target_pos"];
                    this.current.target_deprel = this.data["target_deprel"];
                    this.current.target_semrole = this.data["target_role"];
                    //console.log(this.current.target_semrole);
                    this.current.index = this.previousExamples.length + 1;
                    this.current.json = this.data;
                };
                ExerciseComponent.prototype._parse2 = function (data) {
                    this.current.corpus = data["corpus"];
                    this.current.distractors = data["distractors"];
                    this.current.exetype = data["exetype"];
                    this.current.korp_url = data["korp_url_link"];
                    this.current.larka_url = data["larka_url_link"];
                    this.current.sent_index = data["sent_index"];
                    this.current.sentence_id = data["sentence_id"];
                    this.current.sentence_left = data["sentence_left"];
                    this.current.sentence_right = data["sentence_right"];
                    this.current.target = data["target"];
                    this.current.target_index = data["target_index"];
                    this.current.target_pos = data["target_pos"];
                    this.current.target_deprel = data["target_deprel"];
                    this.current.target_semrole = data["target_role"];
                    //console.log(this.current.target_semrole);
                    this.current.index = this.previousExamples.length + 1;
                    console.log(data);
                    console.log(data["target"]);
                };
                ExerciseComponent.prototype.aggregate = function (type, data) {
                    this.aggregator.aggregate(type, data, this.login.isLoggedIn() ?
                        this.login.getUserId() :
                        this.login.getRandomId());
                };
                ExerciseComponent.prototype.archive = function () {
                    // TODO prevent buggy behavior!
                    this.aggregate("exercise", this.minimize(this.current));
                    this.previousExamples.unshift(this.current);
                    this.current = new Exercise();
                    this.nextRequester.emit("generate");
                };
                ExerciseComponent.prototype.minimize = function (exercise) {
                    var answer = exercise.answer;
                    var distractors = exercise.distractors;
                    var exetype = exercise.exetype;
                    var target = this.targetForExetype(exetype, exercise.target_pos, exercise.target_deprel, exercise.target_semrole);
                    var sentence = this.concat(exercise.sentence_left, exercise.target, exercise.sentence_right);
                    var obj = {
                        "answer": answer,
                        "distractors": distractors,
                        "exetype": exetype,
                        "target": target,
                        "sentence": sentence
                    };
                    //console.log(obj);
                    return obj;
                };
                ExerciseComponent.prototype.targetForExetype = function (exetype, pos, deprel, sem) {
                    switch (exetype) {
                        case "pos1":
                        case "pos2": return pos;
                        case "synt1":
                        case "synt2": return deprel;
                        case "sem": return sem;
                        default: console.log(exetype);
                    }
                };
                ExerciseComponent.prototype.concat = function (left, target, right) {
                    var sentence = "";
                    for (var i = 0; i < left.length; i++) {
                        sentence += left[i]["word"] + " ";
                    }
                    for (var i = 0; i < target.length; i++) {
                        sentence += target[i]["word"] + " ";
                    }
                    for (var i = 0; i < right.length; i++) {
                        sentence += right[i]["word"] + " ";
                    }
                    return sentence;
                };
                ExerciseComponent.prototype.evaluate = function (value, exercise) {
                    if (!exercise) {
                        this.current.answer = value;
                    }
                    else {
                        exercise.answer = value;
                    }
                    //console.log(this.current.target_pos);
                    //console.log(answer);
                    this.aggregate("exercise-answer", value);
                };
                ExerciseComponent.prototype.setCurrent = function (value) {
                    //console.log(value);
                    this.current.answer = value;
                };
                ExerciseComponent.prototype.isCorrect = function (exercise) {
                    if (exercise.exetype == 'pos1' || exercise.exetype == 'pos2') {
                        return exercise.answer == exercise.target_pos;
                    }
                    if (exercise.exetype == 'synt1' || exercise.exetype == 'synt2')
                        return exercise.answer == exercise.target_deprel;
                    if (exercise.exetype == 'sem_roles') {
                        return exercise.answer == exercise.target_semrole;
                    }
                };
                ExerciseComponent.prototype.requestModeChange = function (mode) {
                    // TODO on mode change, clear current exercise?
                    // TODO on mode change and clear, save history?
                    //console.log(mode);
                    if (!this.mode) {
                        this.mode = mode;
                    }
                    else {
                        var modeChangeDenied = false;
                        if (modeChangeDenied) {
                            return;
                        }
                        // TODO check if we are allowed to change mode
                        this.mode = mode;
                    }
                    // TODO archive + log
                    this.previousExamples = [];
                    this.current = undefined;
                    this.visible = false;
                    //this.aggregator.
                };
                ExerciseComponent.prototype.showInformation = function (word) {
                    var lex = word["lex"].slice(1, -1);
                    var lemmaRest = lex.split(/\.{2}/);
                    var lemma = lemmaRest[0];
                    if (!lemma) {
                        var altLemma = word["lemma"];
                        if (altLemma) {
                            lemma = altLemma;
                        }
                        else {
                            console.log("ERROR: no lemma found!");
                            console.log(word);
                            console.log("Aborting");
                            return;
                        }
                    }
                    var posRest = lemmaRest[1].split(/\./);
                    var pos = posRest[0];
                    var sense = posRest[1];
                    this._router.navigate(['.', { lemma: lemma, pos: pos, sense: sense }]);
                    this.aggregate("show-info", word);
                };
                ExerciseComponent.prototype.tree = function (exercise) {
                    console.log(exercise);
                };
                ExerciseComponent.prototype.special = function (input) {
                    if ({}.toString.apply(input) == "[object Array]")
                        return input;
                    var array = input.split(/ /);
                    var other = [];
                    for (var i = 0; i < array.length; i++) {
                        other.push({ "word": array[i] });
                    }
                    return other;
                };
                ExerciseComponent.prototype.showjson = function (json) {
                    //console.log(json);
                    var w = window.open();
                    var windowHTML = "<!DOCTYPE HTML><html><head><title>Lärka - JSON result</title></head><body><pre id=\"json_result\">" + JSON.stringify(json, null, 2) + "</pre></body></html>";
                    w.document.write(windowHTML);
                    w.document.close();
                    this.aggregate("show-json", json);
                };
                ExerciseComponent.prototype.report = function (exercise) {
                    //console.log(exercise);
                    /*
                            this.modal.prompt()
                                .size('lg')
                                .isBlocking(true)
                                .keyboard(27)
                                .title('Hello World')
                                .body('A Customized Modal')
                                .open();
                    */
                    var exercise_sentence = "";
                    for (var i = 0; i < exercise.sentence_left.length; i++) {
                        this.reported_sentence.push({ "word": exercise.sentence_left[i]["word"] });
                    }
                    this.reported_sentence.push({ "word": exercise.target[0]["word"] });
                    for (var i = 0; i < exercise.sentence_right.length; i++) {
                        this.reported_sentence.push({ "word": exercise.sentence_right[i]["word"] });
                    }
                    // TODO aggregate only when user clicks on "save"
                    this.aggregate("report", this.reported_sentence);
                };
                ExerciseComponent.prototype.mark = function (index) {
                    this.reported_sentence[index]["selected"] = !this.reported_sentence[index]["selected"];
                };
                __decorate([
                    core_3.Output(),
                    __metadata("design:type", core_2.EventEmitter)
                ], ExerciseComponent.prototype, "nextRequester", void 0);
                __decorate([
                    core_3.Output(),
                    __metadata("design:type", core_2.EventEmitter)
                ], ExerciseComponent.prototype, "reloadRequester", void 0);
                ExerciseComponent = __decorate([
                    core_1.Component({
                        selector: 'exercise-component',
                        templateUrl: 'app/templates/exercise-component.html',
                        styleUrls: ['app/css/exercise.css'],
                        providers: [dataAggregator_service_1.DataAggregatorService]
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService, router_1.Router, dataAggregator_service_1.DataAggregatorService, login_service_1.LoginService])
                ], ExerciseComponent);
                return ExerciseComponent;
            }());
            exports_1("ExerciseComponent", ExerciseComponent);
            Exercise = /** @class */ (function () {
                function Exercise() {
                    this.distractors = [];
                    this.sentence_left = [];
                    this.sentence_right = [];
                    this.target = [new Target()];
                }
                return Exercise;
            }());
            Target = /** @class */ (function () {
                function Target() {
                    this.word = "...";
                }
                return Target;
            }());
        }
    };
});
//# sourceMappingURL=exercise.component.js.map