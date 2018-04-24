import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-finnish',
  templateUrl: '../../templates/finnish.html'
})

export class FinnishComponent {

  private rv = (<any>window).responsiveVoice;

  public currentSong;

  private karhunpoika;
  private sininen;

  public modeChosen = false;
  private mode;

  constructor(private http: HttpClient) {
    const me = this;
    this.http.get('app/data/karhunpoika.json').subscribe(function(d) {
      me.karhunpoika = d;
      console.log(d);
    });
    this.http.get('app/data/sininen.json').subscribe(function(d) {
      me.sininen = d;
    });
  }

  setMode(song, mode) {
    console.log(song);
    console.log(mode);
    if (song === 0) {
      this.currentSong = this.karhunpoika;
    } else {
      this.currentSong = this.sininen;
    }
    this.mode = mode;
    this.modeChosen = true;
  }

  pronounce(word) {
    this.rv.speak(word, 'Finnish Female');
  }

  validate(guess, target) {
    guess = guess.toLowerCase();
    target = target.toLowerCase();
    if (guess === target) {
      // True
      return true;
    } else {
      if (target.match("[.,!?]$")) {
        const tsub = target.substr(0, target.length - 1);
        if (tsub === guess) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  isCorrect(guess, target) {
    return this.validate(guess, target);
  }

  test() {
    /*
    speechSynthesis.getVoices().forEach(function(voice) {
      console.log(voice.name, voice.default ? voice.default :'');
    });
    const msg = new SpeechSynthesisUtterance('Hello World');
    window.speechSynthesis.speak(msg);
*/
    this.rv.speak('Hyvää huomenta', 'Finnish Female');
  }
}
