/**
 * Created by David on 3/8/2016.
 */
import {Component} from '@angular/core';
import {LocalizerService} from './services/localizer.service';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {LarkaService} from './services/larka.service';
import {LarkaAdapter} from './services/larka.adapter.service';
import {LoggerService} from './services/logger.service';
import {LoginService} from './services/login.service';
import {EasterEggService} from './services/easteregg.service';
import {NuanceService} from './services/nuance.service';
import {DataAggregatorService} from './services/dataAggregator.service';
import {KorpService} from './services/korp.service';
import {KarpService} from './services/karp.service';
import {HashService} from './services/hash.service';
import {TTSEngine} from './services/tts.engine.service';
import {iSpeechTTSEngine} from './services/ispeech.service';
import {CanActivateTestGuard} from "./components/guards/can-activate-test-guard";
import {BufferService} from "./services/buffer.service";
import {ChartsModule} from "ng2-charts";
import {SitepalAsService} from "./services/sitepal.as.service";
import {DatetimeService} from "./services/datetime.service";

@Component({
    selector: 'larka-app',
    templateUrl: 'templates/larka-app.html',
    providers: [LocalizerService, LarkaService, LarkaAdapter, LoggerService, LoginService, KorpService, KarpService, DataAggregatorService, NuanceService, EasterEggService, HashService, TTSEngine, iSpeechTTSEngine, BufferService, SitepalAsService, DatetimeService]
})


export class LarkaApp {
    constructor (public localizer: LocalizerService, private router: Router) {}

    localize(key: string) {
        return this.localizer.localize(key);
    }

}
