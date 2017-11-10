System.register(["@angular/router", "./components/pages/linguist.component", "./components/component/textevaluation.component", "./components/pages/learner.component", "./components/pages/home.component", "./components/component/diagnostic.component", "./components/pages/test.component", "./components/pages/hitex.component", "./components/component/profileDetails.component", "./components/pages/profile.component", "./components/intern/exercisetype.component", "./components/component/hangbird.component", "./components/pages/register.component", "./components/pages/editor.component", "./components/component/cedit.form.component", "./components/intern/hitex.dev.component", "./components/intern/hangbird.eesti.component", "./components/intern/diagnostic.demo.component", "./components/component/liwrix.component", "./components/component/hangbird.image.component", "./components/intern/siwoco.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, linguist_component_1, textevaluation_component_1, learner_component_1, home_component_1, diagnostic_component_1, test_component_1, hitex_component_1, profileDetails_component_1, profile_component_1, exercisetype_component_1, hangbird_component_1, register_component_1, editor_component_1, cedit_form_component_1, hitex_dev_component_1, hangbird_eesti_component_1, diagnostic_demo_component_1, liwrix_component_1, hangbird_image_component_1, siwoco_component_1;
    var appRoutes, appRoutingProviders, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (linguist_component_1_1) {
                linguist_component_1 = linguist_component_1_1;
            },
            function (textevaluation_component_1_1) {
                textevaluation_component_1 = textevaluation_component_1_1;
            },
            function (learner_component_1_1) {
                learner_component_1 = learner_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (diagnostic_component_1_1) {
                diagnostic_component_1 = diagnostic_component_1_1;
            },
            function (test_component_1_1) {
                test_component_1 = test_component_1_1;
            },
            function (hitex_component_1_1) {
                hitex_component_1 = hitex_component_1_1;
            },
            function (profileDetails_component_1_1) {
                profileDetails_component_1 = profileDetails_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (exercisetype_component_1_1) {
                exercisetype_component_1 = exercisetype_component_1_1;
            },
            function (hangbird_component_1_1) {
                hangbird_component_1 = hangbird_component_1_1;
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
            function (liwrix_component_1_1) {
                liwrix_component_1 = liwrix_component_1_1;
            },
            function (hangbird_image_component_1_1) {
                hangbird_image_component_1 = hangbird_image_component_1_1;
            },
            function (siwoco_component_1_1) {
                siwoco_component_1 = siwoco_component_1_1;
            }],
        execute: function() {
            appRoutes = [
                { path: 'linguist', component: linguist_component_1.LinguistComponent },
                { path: 'learner', component: learner_component_1.LearnerComponent },
                { path: 'texteval', component: textevaluation_component_1.TextEvaluationComponent },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'editor', component: editor_component_1.CorpusEditorComponent },
                { path: 'liwrix', component: liwrix_component_1.LiwrixComponent },
                { path: 'diagnostic', component: diagnostic_component_1.DiagnosticTestComponent },
                { path: 'hitex', component: hitex_component_1.HitexComponent },
                { path: 'hitexdev', component: hitex_dev_component_1.HitexDevComponent },
                { path: 'register', component: register_component_1.RegisterComponent },
                // TODO remove
                { path: 'ncnd', component: diagnostic_demo_component_1.DiagnosticDemoComponent },
                //{path: 'tagger', component: TaggerComponent},
                { path: 'test', component: test_component_1.TestComponent },
                { path: 'prode', component: profileDetails_component_1.ProfileDetailsComponent },
                { path: 'profile', component: profile_component_1.ProfileComponent },
                // {path: 'profile/:id/details', component: ProfileDetailsComponent},
                // {path: 'profile/:id/progress', component: LearnerProgressComponent},
                { path: 'cedit-form', component: cedit_form_component_1.CeditFormComponent, outlet: 'formoutlet' },
                { path: 'siwoco', component: siwoco_component_1.SiwocoComponent },
                // {path: 'profile/:id/egg', component: ProfileEggComponent},
                { path: 'wordguess', component: hangbird_component_1.HangBirdComponent },
                { path: 'wordguess-image', component: hangbird_image_component_1.HangBirdImageComponent },
                { path: 'wordguess-eesti', component: hangbird_eesti_component_1.HangBirdEestiComponent },
                { path: 'exeval', component: exercisetype_component_1.ExerciseTypeComponent },
                { path: '**', component: home_component_1.HomeComponent },
                { path: '', redirectTo: 'home', pathMatch: 'full' }
            ];
            exports_1("appRoutingProviders", appRoutingProviders = []);
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
/**
 * Created by David on 9/1/2016.
 */
//# sourceMappingURL=app.routing.js.map