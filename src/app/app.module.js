System.register(['@angular/core', '@angular/platform-browser', "./app.component", "@angular/forms", "@angular/http", "./app.routing", "./components/pages/home.component", "./components/pages/linguist.component", "./components/pages/learner.component", "./components/intern/tagger.component", "./components/component/textevaluation.component", "./components/navigation/topNavbar.component", "./components/navigation/logoSpace.component", "./components/component/autocomplete.component", "./components/component/choiceSelector.component", "./components/component/exercise.component", "./components/component/userSearch.component", "./components/component/wordlistSelector", "./components/navigation/userNavbar.component", "./components/component/modeSelector.component", "ng2-bs3-modal/ng2-bs3-modal", "./components/component/diagnostic.component", "./components/component/pleasewait.component", "./components/pages/test.component", "./components/pages/hitex.component", "./components/component/switch-toggle.component", "./components/navigation/overlayMenu.component", "./components/component/profileDetails.component", "./components/component/lang-select.component", "./components/component/profileOverview.component", "./components/component/learnerProgress.component", "./components/navigation/profileMenu.component", "./components/pages/profile.component", "./components/component/talkingHead.component", "./components/intern/exercisetype.component", "./components/intern/treekernel.component", "./components/component/hangbird.component", "./components/component/vocabulary.multiple.exercise.component", "./components/pages/register.component", "./components/pages/editor.component", "./components/component/cedit.form.component", "./components/intern/hitex.dev.component", "./components/intern/hangbird.eesti.component", "./components/intern/diagnostic.demo.component", "./components/component/gap.doublet.component", "./components/component/liwrix.component", "./components/component/hangbird.image.component", "./components/intern/siwoco.component", "./components/intern/enelett.component", "./components/intern/enetcollect.component"], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, app_component_1, forms_1, http_1, app_routing_1, home_component_1, linguist_component_1, learner_component_1, tagger_component_1, textevaluation_component_1, topNavbar_component_1, logoSpace_component_1, autocomplete_component_1, choiceSelector_component_1, exercise_component_1, userSearch_component_1, wordlistSelector_1, userNavbar_component_1, modeSelector_component_1, ng2_bs3_modal_1, diagnostic_component_1, pleasewait_component_1, test_component_1, hitex_component_1, switch_toggle_component_1, overlayMenu_component_1, profileDetails_component_1, lang_select_component_1, profileOverview_component_1, learnerProgress_component_1, profileMenu_component_1, profile_component_1, talkingHead_component_1, exercisetype_component_1, treekernel_component_1, hangbird_component_1, vocabulary_multiple_exercise_component_1, register_component_1, editor_component_1, cedit_form_component_1, hitex_dev_component_1, hangbird_eesti_component_1, diagnostic_demo_component_1, gap_doublet_component_1, liwrix_component_1, hangbird_image_component_1, siwoco_component_1, enelett_component_1, enetcollect_component_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (linguist_component_1_1) {
                linguist_component_1 = linguist_component_1_1;
            },
            function (learner_component_1_1) {
                learner_component_1 = learner_component_1_1;
            },
            function (tagger_component_1_1) {
                tagger_component_1 = tagger_component_1_1;
            },
            function (textevaluation_component_1_1) {
                textevaluation_component_1 = textevaluation_component_1_1;
            },
            function (topNavbar_component_1_1) {
                topNavbar_component_1 = topNavbar_component_1_1;
            },
            function (logoSpace_component_1_1) {
                logoSpace_component_1 = logoSpace_component_1_1;
            },
            function (autocomplete_component_1_1) {
                autocomplete_component_1 = autocomplete_component_1_1;
            },
            function (choiceSelector_component_1_1) {
                choiceSelector_component_1 = choiceSelector_component_1_1;
            },
            function (exercise_component_1_1) {
                exercise_component_1 = exercise_component_1_1;
            },
            function (userSearch_component_1_1) {
                userSearch_component_1 = userSearch_component_1_1;
            },
            function (wordlistSelector_1_1) {
                wordlistSelector_1 = wordlistSelector_1_1;
            },
            function (userNavbar_component_1_1) {
                userNavbar_component_1 = userNavbar_component_1_1;
            },
            function (modeSelector_component_1_1) {
                modeSelector_component_1 = modeSelector_component_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (diagnostic_component_1_1) {
                diagnostic_component_1 = diagnostic_component_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            },
            function (test_component_1_1) {
                test_component_1 = test_component_1_1;
            },
            function (hitex_component_1_1) {
                hitex_component_1 = hitex_component_1_1;
            },
            function (switch_toggle_component_1_1) {
                switch_toggle_component_1 = switch_toggle_component_1_1;
            },
            function (overlayMenu_component_1_1) {
                overlayMenu_component_1 = overlayMenu_component_1_1;
            },
            function (profileDetails_component_1_1) {
                profileDetails_component_1 = profileDetails_component_1_1;
            },
            function (lang_select_component_1_1) {
                lang_select_component_1 = lang_select_component_1_1;
            },
            function (profileOverview_component_1_1) {
                profileOverview_component_1 = profileOverview_component_1_1;
            },
            function (learnerProgress_component_1_1) {
                learnerProgress_component_1 = learnerProgress_component_1_1;
            },
            function (profileMenu_component_1_1) {
                profileMenu_component_1 = profileMenu_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (talkingHead_component_1_1) {
                talkingHead_component_1 = talkingHead_component_1_1;
            },
            function (exercisetype_component_1_1) {
                exercisetype_component_1 = exercisetype_component_1_1;
            },
            function (treekernel_component_1_1) {
                treekernel_component_1 = treekernel_component_1_1;
            },
            function (hangbird_component_1_1) {
                hangbird_component_1 = hangbird_component_1_1;
            },
            function (vocabulary_multiple_exercise_component_1_1) {
                vocabulary_multiple_exercise_component_1 = vocabulary_multiple_exercise_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (editor_component_1_1) {
                editor_component_1 = editor_component_1_1;
            },
            function (cedit_form_component_1_1) {
                cedit_form_component_1 = cedit_form_component_1_1;
            },
            function (hitex_dev_component_1_1) {
                hitex_dev_component_1 = hitex_dev_component_1_1;
            },
            function (hangbird_eesti_component_1_1) {
                hangbird_eesti_component_1 = hangbird_eesti_component_1_1;
            },
            function (diagnostic_demo_component_1_1) {
                diagnostic_demo_component_1 = diagnostic_demo_component_1_1;
            },
            function (gap_doublet_component_1_1) {
                gap_doublet_component_1 = gap_doublet_component_1_1;
            },
            function (liwrix_component_1_1) {
                liwrix_component_1 = liwrix_component_1_1;
            },
            function (hangbird_image_component_1_1) {
                hangbird_image_component_1 = hangbird_image_component_1_1;
            },
            function (siwoco_component_1_1) {
                siwoco_component_1 = siwoco_component_1_1;
            },
            function (enelett_component_1_1) {
                enelett_component_1 = enelett_component_1_1;
            },
            function (enetcollect_component_1_1) {
                enetcollect_component_1 = enetcollect_component_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.routing],
                        declarations: [app_component_1.LarkaApp,
                            home_component_1.HomeComponent,
                            linguist_component_1.LinguistComponent,
                            learner_component_1.LearnerComponent,
                            tagger_component_1.TaggerComponent,
                            register_component_1.RegisterComponent,
                            test_component_1.TestComponent,
                            hitex_component_1.HitexComponent,
                            hitex_dev_component_1.HitexDevComponent,
                            textevaluation_component_1.TextEvaluationComponent,
                            diagnostic_component_1.DiagnosticTestComponent,
                            diagnostic_demo_component_1.DiagnosticDemoComponent,
                            liwrix_component_1.LiwrixComponent,
                            gap_doublet_component_1.GapDoubletComponent,
                            switch_toggle_component_1.SwitchToggleComponent,
                            topNavbar_component_1.TopNavbarComponent,
                            overlayMenu_component_1.OverlayMenuComponent,
                            logoSpace_component_1.LogoSpaceComponent,
                            userNavbar_component_1.UserNavbarComponent,
                            modeSelector_component_1.ModeSelectorComponent,
                            autocomplete_component_1.AutocompleteComponent,
                            lang_select_component_1.LanguageSelectionComponent,
                            choiceSelector_component_1.ChoiceSelectorComponent,
                            userSearch_component_1.UserSearchComponent,
                            wordlistSelector_1.WordlistSelectorComponent,
                            exercise_component_1.ExerciseComponent,
                            pleasewait_component_1.PleaseWaitComponent,
                            siwoco_component_1.SiwocoComponent,
                            profile_component_1.ProfileComponent,
                            profileDetails_component_1.ProfileDetailsComponent,
                            profileOverview_component_1.ProfileOverviewComponent,
                            learnerProgress_component_1.LearnerProgressComponent,
                            profileMenu_component_1.ProfileMenuComponent,
                            editor_component_1.CorpusEditorComponent,
                            cedit_form_component_1.CeditFormComponent,
                            vocabulary_multiple_exercise_component_1.VocabularyMultipleChoiceExerciseComponent,
                            talkingHead_component_1.TalkingHeadComponent,
                            exercisetype_component_1.ExerciseTypeComponent,
                            treekernel_component_1.TreeKernelComponent,
                            hangbird_component_1.HangBirdComponent,
                            hangbird_image_component_1.HangBirdImageComponent,
                            hangbird_eesti_component_1.HangBirdEestiComponent,
                            enelett_component_1.EnelettComponent,
                            enetcollect_component_1.EnetCollectDemoComponent,
                            ng2_bs3_modal_1.MODAL_DIRECTIVES],
                        bootstrap: [app_component_1.LarkaApp],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=app.module.js.map