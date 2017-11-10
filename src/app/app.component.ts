/**
 * Created by David on 3/8/2016.
 */
import {Component, ModuleWithComponentFactories, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {LocalizerService} from "./services/localizer.service";
import 'rxjs/add/operator/map';
import {TopNavbarComponent} from "./components/navigation/topNavbar.component";
import {LogoSpaceComponent} from "./components/navigation/logoSpace.component";
import {Routes, RouterModule, Router} from "@angular/router";

import {UserNavbarComponent} from "./components/navigation/userNavbar.component";
import {LinguistComponent} from "./components/pages/linguist.component";
import {LearnerComponent} from "./components/pages/learner.component";
import {TextEvaluationComponent} from "./components/component/textevaluation.component";

import {ProfileDetailsComponent} from "./components/component/profileDetails.component";
import {InformationComponent} from "./components/component/information.component";
import {ExerciseComponent} from "./components/component/exercise.component";

import {TaggerComponent} from "./components/intern/tagger.component";
import {HomeComponent} from "./components/pages/home.component";
import {LarkaService} from "./services/larka.service";
import {LarkaAdapter} from "./services/larka.adapter.service";
import {LoggerService} from "./services/logger.service";
import {LoginService} from "./services/login.service";
import {ProfileMenuComponent} from "./components/navigation/profileMenu.component";
import {EasterEggService} from "./services/easteregg.service";
import {NuanceService} from "./services/nuance.service";
import {DataAggregatorService} from "./services/dataAggregator.service";
import {KorpService} from "./services/korp.service";
import {KarpService} from "./services/karp.service";
import {HashService} from "./services/hash.service";
import {TTSEngine} from "./services/tts.engine.service";
import {iSpeechTTSEngine} from "./services/ispeech.service";

@Component({
    selector: 'larka-app',
    templateUrl: 'app/templates/larka-app.html',
    providers: [LocalizerService, LarkaService, LarkaAdapter, LoggerService, LoginService, KorpService, KarpService, DataAggregatorService, NuanceService, EasterEggService, HashService, TTSEngine, iSpeechTTSEngine],
    //directives: [UserNavbarComponent, TopNavbarComponent, LogoSpaceComponent, ProfileMenuComponent],
    //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class LarkaApp {
    constructor (private localizer: LocalizerService, private router: Router) {}

    localize(key: string) {
        return this.localizer.localize(key);
    }

}