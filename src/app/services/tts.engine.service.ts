/**
 * Created by David on 6/7/2017.
 */
import {Injectable} from "@angular/core";
import {NuanceService} from "./nuance.service";

@Injectable()
export class TTSEngine {

    constructor(private tts: NuanceService) {}

    textToSpeech(text, spell) {
        return this.tts.speak(text, spell);
    }
}
