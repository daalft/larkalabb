import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LarkaApp} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app.routing';
import {HomeComponent} from './components/pages/home.component';
import {LinguistComponent} from './components/pages/linguist.component';
import {LearnerComponent} from './components/pages/learner.component';
import {TaggerComponent} from './components/intern/tagger.component';
import {TextEvaluationComponent} from './components/component/textevaluation.component';
import {TopNavbarComponent} from './components/navigation/topNavbar.component';
import {LogoSpaceComponent} from './components/navigation/logoSpace.component';
import {AutocompleteComponent} from './components/component/autocomplete.component';
import {ChoiceSelectorComponent} from './components/component/choiceSelector.component';
import {ExerciseComponent} from './components/component/exercise.component';
import {UserSearchComponent} from './components/component/userSearch.component';
import {WordlistSelectorComponent} from './components/component/wordlistSelector';
import {UserNavbarComponent} from './components/navigation/userNavbar.component';
import {ModeSelectorComponent} from './components/component/modeSelector.component';
import {DiagnosticTestComponent} from './components/component/diagnostic.component';
import {PleaseWaitComponent} from './components/component/pleasewait.component';
import {TestComponent} from './components/pages/test.component';
import {HitexComponent} from './components/pages/hitex.component';
import {SwitchToggleComponent} from './components/component/switch-toggle.component';
import {OverlayMenuComponent} from './components/navigation/overlayMenu.component';
import {ProfileDetailsComponent} from './components/component/profileDetails.component';
import {LanguageSelectionComponent} from './components/component/lang-select.component';
import {ProfileOverviewComponent} from './components/component/profileOverview.component';
import {LearnerProgressComponent} from './components/component/learnerProgress.component';
import {ProfileMenuComponent} from './components/navigation/profileMenu.component';
import {ProfileComponent} from './components/pages/profile.component';
import {ExerciseTypeComponent} from './components/intern/exercisetype.component';
import {TreeKernelComponent} from './components/intern/treekernel.component';
import {HangBirdComponent} from './components/component/hangbird.component';
import {VocabularyMultipleChoiceExerciseComponent} from './components/component/vocabulary.multiple.exercise.component';
import {RegisterComponent} from './components/pages/register.component';
import {CorpusEditorComponent} from './components/pages/editor.component';
import {HangBirdEestiComponent} from './components/intern/hangbird.eesti.component';
import {DiagnosticDemoComponent} from './components/intern/diagnostic.demo.component';
import {GapDoubletComponent} from './components/component/gap.doublet.component';
import {LiwrixComponent} from './components/component/liwrix.component';
import {HangBirdImageComponent} from './components/component/hangbird.image.component';
import {SiwocoComponent} from './components/intern/siwoco.component';
import {EnetCollectDemoComponent} from './components/intern/enetcollect.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import {CanActivateTestGuard} from "./components/guards/can-activate-test-guard";
import {InflectionMultipleExerciseComponent} from "./components/component/inflection.multiple.exercise.component";
import {BufferTest} from "./components/intern/buffer.test";
import {BufferMultiExeComponent} from "./components/buffer/buffer.multi.exe.component";
import {ChartsModule} from "ng2-charts";
import {CefrlexComponent} from "./components/intern/cefrlex.component";
import {
  MatAutocompleteModule,
  MatIconModule,
  MatBadgeModule,
  MatInputModule,
  MatSliderModule,
  MatSnackBarModule
} from "@angular/material";

import {LmErrorComponent} from "./components/intern/lm.error.component";
import {FinnishComponent} from "./components/intern/finnish.component";
import {TalkingHead} from "./components/intern/talkingHead";
import {WordraterComponent} from "./components/intern/wordrater.component";
import {SentenceRaterComponent} from "./components/intern/sentence.rater.component";
import {XRaterComponent} from "./components/intern/xrater.component";
import {UserinfoComponent} from "./components/pages/userinfo.component";
import {BundledGapComponent} from "./components/intern/bundled.gap.component";
import {SixesComponent} from "./components/intern/sixes.component";
import {Wordrater2Component} from "./components/intern/wordrater2.component";
import {NonwordComponent} from "./components/intern/nonword.component";
import {EnetcollectConsentComponent} from "./components/intern/enetcollect.consent.component";
import {L2pAnnotatorComponent} from "./components/intern/l2p.annotator.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CallectorComponent} from "./components/intern/callector.component";




@NgModule({
    imports: [BrowserModule, MatBadgeModule, MatIconModule, FormsModule, HttpModule, HttpClientModule, ModalModule.forRoot(), routing, ChartsModule, MatSliderModule, OverlayModule, MatSnackBarModule, BrowserAnimationsModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
    declarations: [LarkaApp,
        HomeComponent,
        LinguistComponent,
        LearnerComponent,
        TaggerComponent,
        RegisterComponent,
        TestComponent,
        HitexComponent,
        TextEvaluationComponent,
        DiagnosticTestComponent,
        DiagnosticDemoComponent,
        LiwrixComponent,
        GapDoubletComponent,
        SwitchToggleComponent,
        TopNavbarComponent,
        OverlayMenuComponent,
        LogoSpaceComponent,
        UserNavbarComponent,
        ModeSelectorComponent,
        AutocompleteComponent,
        LanguageSelectionComponent,
        ChoiceSelectorComponent,
        UserSearchComponent,
        WordlistSelectorComponent,
        ExerciseComponent,
        PleaseWaitComponent,
        SiwocoComponent,
        ProfileComponent,
        ProfileDetailsComponent,
        ProfileOverviewComponent,
        LearnerProgressComponent,
        ProfileMenuComponent,
        CorpusEditorComponent,
        VocabularyMultipleChoiceExerciseComponent,
        InflectionMultipleExerciseComponent,
        ExerciseTypeComponent,
        TreeKernelComponent,
        HangBirdComponent,
        HangBirdImageComponent,
        HangBirdEestiComponent,
        EnetCollectDemoComponent,
      BufferTest,
      BufferMultiExeComponent,
      LmErrorComponent,
      FinnishComponent,
      NonwordComponent,
      EnetcollectConsentComponent,
      L2pAnnotatorComponent,
      TalkingHead,
      WordraterComponent,
      CefrlexComponent,
      SentenceRaterComponent,
      XRaterComponent,
      UserinfoComponent,
      BundledGapComponent,
    SixesComponent,
CallectorComponent,
      Wordrater2Component
    ],

    bootstrap: [LarkaApp]
})

export class AppModule {}
