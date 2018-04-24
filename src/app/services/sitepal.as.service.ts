import {Injectable} from '@angular/core';

@Injectable()
export class SitepalAsService {

  private engine = (<any>window);

  private lang = 9;
  private ttsEngine = 4;

  speak(text, voice) {
    return this.engine.sayText(text, voice, this.lang, this.ttsEngine);
  }
}
