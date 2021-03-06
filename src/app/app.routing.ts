import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LinguistComponent} from "./components/pages/linguist.component";
import {TextEvaluationComponent} from "./components/component/textevaluation.component";
import {TaggerComponent} from "./components/intern/tagger.component";
import {LearnerComponent} from "./components/pages/learner.component";
import {HomeComponent} from "./components/pages/home.component";
import {DiagnosticTestComponent} from "./components/component/diagnostic.component";
import {TestComponent} from "./components/pages/test.component";
import {HitexComponent} from "./components/pages/hitex.component";
import {ProfileDetailsComponent} from "./components/component/profileDetails.component";
import {LearnerProgressComponent} from "./components/component/learnerProgress.component";
import {ProfileOverviewComponent} from "./components/component/profileOverview.component";
import {ProfileComponent} from "./components/pages/profile.component";
import {ExerciseTypeComponent} from "./components/intern/exercisetype.component";
import {HangBirdComponent} from "./components/component/hangbird.component";
import {RegisterComponent} from "./components/pages/register.component";
import {CorpusEditorComponent} from "./components/pages/editor.component";


import {HangBirdEestiComponent} from "./components/intern/hangbird.eesti.component";
import {DiagnosticDemoComponent} from "./components/intern/diagnostic.demo.component";
import {LiwrixComponent} from "./components/component/liwrix.component";
import {HangBirdImageComponent} from "./components/component/hangbird.image.component";
import {SiwocoComponent} from "./components/intern/siwoco.component";
import {EnetCollectDemoComponent} from "./components/intern/enetcollect.component";
import {CanActivateTestGuard} from "./components/guards/can-activate-test-guard";
import {VocabularyMultipleChoiceExerciseComponent} from "./components/component/vocabulary.multiple.exercise.component";
import {InflectionMultipleExerciseComponent} from "./components/component/inflection.multiple.exercise.component";
import {WordraterComponent} from "./components/intern/wordrater.component";
import {XRaterComponent} from "./components/intern/xrater.component";
import {UserinfoComponent} from "./components/pages/userinfo.component";
import {SixesComponent} from "./components/intern/sixes.component";
import {Wordrater2Component} from "./components/intern/wordrater2.component";
import {NonwordComponent} from "./components/intern/nonword.component";
import {EnetcollectConsentComponent} from "./components/intern/enetcollect.consent.component";
import {BundledGapComponent} from "./components/intern/bundled.gap.component";
import {L2pAnnotatorComponent} from "./components/intern/l2p.annotator.component";
import {CallectorComponent} from "./components/intern/callector.component";

const appRoutes: Routes = [


    {path:'linguist', component: LinguistComponent},
    {path:'learner', component: LearnerComponent},
    {path: 'texteval', component: TextEvaluationComponent},
    {path: 'home', component: HomeComponent},
    {path: 'editor', component: CorpusEditorComponent},
    {path: 'liwrix', component: LiwrixComponent},
    {path: 'diagnostic', component: DiagnosticTestComponent},
    {path: 'hitex', component: HitexComponent},
    {path: 'enetcollect', component: EnetCollectDemoComponent},
  {path: 'voc-mc', component: VocabularyMultipleChoiceExerciseComponent},
  {path: 'infl-mc', component: InflectionMultipleExerciseComponent},
    {path: 'register', component: RegisterComponent},
  {path: 'userinfo', component: UserinfoComponent},
  {path: 'enetcollectconsent', component: EnetcollectConsentComponent},
  {path: 'bundles', component: BundledGapComponent},
    // TODO remove
    //{path: 'ncnd', component: DiagnosticDemoComponent},
    //{path: 'tagger', component: TaggerComponent},
    {path: 'test', component: TestComponent},
    {path: 'prode', component: ProfileDetailsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'sixes', component: SixesComponent},
  {path: 'legato', component: L2pAnnotatorComponent},
    // {path: 'profile/:id/details', component: ProfileDetailsComponent},
    // {path: 'profile/:id/progress', component: LearnerProgressComponent},

    {path: 'siwoco', component: SiwocoComponent},
    // {path: 'profile/:id/egg', component: ProfileEggComponent},
  {path: 'nonwords', component: NonwordComponent},

    {path: 'wordguess', component: HangBirdComponent},
    {path: 'wordguess-image', component: HangBirdImageComponent},
    {path: 'wordguess-eesti', component: HangBirdEestiComponent},
  {path: 'callector', component: CallectorComponent},
    {path: 'wordrater', component: WordraterComponent},
  {path: 'wordrater2', component: Wordrater2Component},
  {path: 'xrater', component: XRaterComponent},

  {path: 'exeval', component: ExerciseTypeComponent},
    {path:'**', component: HomeComponent},
    {path: '', redirectTo: 'home',  pathMatch: 'full'}
    //{path: '*', component: LinguistComponent},
    //{path: '**', redirectTo: '/home', pathMatch: 'full'}
    //new AuxRoute({path:'/information', component: InformationComponent, name: 'Information'})
];
export const appRoutingProviders: any[] = [

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
/**
 * Created by David on 9/1/2016.
 */
