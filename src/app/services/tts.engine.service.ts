/**
 * Created by David on 6/7/2017.
 */
import {Injectable} from "@angular/core";
import {NuanceService} from "./nuance.service";
import {SitepalAsService} from "./sitepal.as.service";

@Injectable()
export class TTSEngine {

    constructor(private tts: SitepalAsService) {}

    textToSpeech(text, voice) {
        return this.tts.speak(text, voice);
    }
}
