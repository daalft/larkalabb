System.register(["@angular/core", "../../services/logger.service", "../../services/login.service", "../../services/dataAggregator.service"], function(exports_1, context_1) {
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
    var core_1, logger_service_1, login_service_1, dataAggregator_service_1;
    var ExerciseTypeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (dataAggregator_service_1_1) {
                dataAggregator_service_1 = dataAggregator_service_1_1;
            }],
        execute: function() {
            ExerciseTypeComponent = (function () {
                function ExerciseTypeComponent(logger, aggregator, login) {
                    this.logger = logger;
                    this.aggregator = aggregator;
                    this.login = login;
                    this.currentEx = -2;
                    this.hasEx = true;
                    this.aboutyou = [];
                    this.states = [];
                    this.levels = [];
                    this.exename = ["Bundled gaps 1", "Bundled gaps 2", "Vocabulary 1", "Vocabulary 2", "Sentence rearrangement", "Sentence composition", "Multiple choice"];
                }
                ExerciseTypeComponent.prototype.continuv = function () {
                    if (this.currentEx == -2) {
                        this.currentEx++;
                        this.resetCheckboxes();
                        this.resetCommentBox();
                        this.hasEx = false; // disable evaluation form for next page
                        return;
                    }
                    if (this.currentEx == -1) {
                        var position = $('#select-position > :checked')[0];
                        if (!position) {
                            alert("Please indicate your position");
                            return;
                        }
                        position = position.value;
                        if (position == "other") {
                            position = $('#input-other-position').val();
                            if (!position) {
                                alert("Please indicate your position");
                                return;
                            }
                        }
                        var swedish = $('#select-mothertongue > :checked')[0];
                        if (!swedish) {
                            alert("Please indicate whether you are a native speaker");
                            return;
                        }
                        swedish = swedish.value;
                        this.currentEx++;
                        this.hasEx = true; // enable evaluation form
                        this.aboutyou.push({ 'position': position, 'native': swedish });
                        return;
                    }
                    var comments = $('#comments').val();
                    var children = $($('#levels')[0]).children();
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var childOfChild = $(child).children()[0];
                        var checked = childOfChild.checked;
                        if (checked) {
                            var level = childOfChild.value;
                            this.levels.push(level);
                        }
                        else {
                            this.levels.push(0);
                        }
                    }
                    this.states[this.currentEx] = { 'comments': comments, 'levels': this.levels, 'index': this.currentEx };
                    this.resetCommentBox();
                    this.resetCheckboxes();
                    this.levels = [];
                    this.currentEx++;
                    this.restoreState(this.currentEx);
                };
                ExerciseTypeComponent.prototype.backv = function () {
                    this.currentEx--;
                    this.restoreState(this.currentEx);
                };
                ExerciseTypeComponent.prototype.restoreState = function (index) {
                    if (index < 0) {
                        return;
                    }
                    if (!this.states[index]) {
                        return;
                    }
                    var state = this.states[index];
                    var comments = state.comments;
                    var levels = state.levels;
                    $('#comments').val(comments);
                    var children = $($('#levels')[0]).children();
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var childOfChild = $(child).children()[0];
                        childOfChild.checked = levels[i] != 0;
                    }
                };
                ExerciseTypeComponent.prototype.submitv = function () {
                    var id = this.login.getRandomId();
                    this.states.push(this.aboutyou[0]);
                    var gcom = $('#general-comments').val();
                    this.states.push({ 'general-comments': gcom });
                    this.aggregator.aggregate("ex-eval", this.states, id);
                    this.aggregator.flush();
                    this.currentEx++;
                };
                ExerciseTypeComponent.prototype.summary = function () {
                    return this.states;
                };
                ExerciseTypeComponent.prototype.resetCheckboxes = function () {
                    var children = $($('#levels')[0]).children();
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var childOfChild = $(child).children()[0];
                        childOfChild.checked = false;
                    }
                };
                ExerciseTypeComponent.prototype.resetCommentBox = function () {
                    $('#comments').val("");
                };
                ExerciseTypeComponent.prototype.ngAfterViewInit = function () {
                    this.aggregator.getUserInfo();
                    var me = this;
                    $('.eselectable').on('click', function (d) {
                        $(d.target).toggleClass('eselactive');
                    });
                    $("#sortable").sortable({
                        placeholder: "ui-state-highlight",
                        forcePlaceholderSize: true
                    });
                    $("#sortable").disableSelection();
                };
                ExerciseTypeComponent = __decorate([
                    core_1.Component({
                        selector: 'exetype',
                        templateUrl: 'app/templates/exetypes.html',
                        styleUrls: ['app/css/molna.css']
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.LoggerService, dataAggregator_service_1.DataAggregatorService, login_service_1.LoginService])
                ], ExerciseTypeComponent);
                return ExerciseTypeComponent;
            }());
            exports_1("ExerciseTypeComponent", ExerciseTypeComponent);
        }
    }
});
//# sourceMappingURL=exercisetype.component.js.map