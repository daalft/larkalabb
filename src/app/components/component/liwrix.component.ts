/**
 * Created by David on 6/19/2017.
 */
import {Component, ViewChild} from '@angular/core';
import {LarkaService} from '../../services/larka.service';
import {Http} from '@angular/http';
import {LocalizerService} from '../../services/localizer.service';
import {LoginService} from '../../services/login.service';
import {PleaseWaitComponent} from './pleasewait.component';
import {DataAggregatorService} from '../../services/dataAggregator.service';
import {KorpService} from '../../services/korp.service';
import {TreeKernelComponent} from '../intern/treekernel.component';
import {HttpClient} from '@angular/common/http';
import {TTSEngine} from "../../services/tts.engine.service";
import {DatetimeService} from "../../services/datetime.service";

@Component({
  selector: 'liwrix',
  templateUrl: '../../templates/liwrix.html',
  styleUrls: ['../../css/liwrix.css']
})

/*****************************************************************************
 * BUGS AND OTHER STUFF
 * ***************************************************************************


 1. Score only keeps the original score: in self-study mode, the score is not
 updated when an incorrect answer is corrected to a correct answer.
 Irrelevant for test mode.

 2. Can only select one single CEFR level for training.
 Could be expanded to allow more than one level?

 3. Resources are linked in via http, change to https?
 */

export class LiwrixComponent {
  @ViewChild('waiter') waiter: PleaseWaitComponent;

  // specific params
  private type;
  private mode;
  public level;
  private spell = false;
  private mwe = true;

  private voice = 1;

  // wordlists by level
  private wordlist = {};
  private phrases = [];

  // keeping track of words
  public previousWords = [];
  public currentWord = {'word': ''};

  private score = 0;

  // stuff
  private pathprefix = 'https://ws.spraakbanken.gu.se/ws/icall/audio/';
  private sessionid;
  private idCounter = 1;
  private indexes = [];

  public showFirst = false;
  public showHint = false;

  private svc = 0; // special vowel count
  private scc = 0; // special consonant count

  private ready = false;
  private ttsLoaded = false;

  private vowels = /[aeiouåöäüéy]/;
  private consonants = /[^aeiouåöäüéy]/;

  // wordlists
  private wordlistA1 = 'app/data/A1_svalex_2.json';
  private wordlistA2 = 'app/data/A2_svalex_2.json';
  private wordlistB1 = 'app/data/B1_svalex_2.json';
  private wordlistB2 = 'app/data/B2_svalex_2.json';
  private wordlistC1 = 'app/data/C1_svalex_2.json';

  private phraselist = 'app/data/lexin-phrases.json';

  private quarantine;

  constructor(private larka: LarkaService, private http: HttpClient, public localizer: LocalizerService, private login: LoginService, private aggregator: DataAggregatorService, private korp: KorpService, private tts: TTSEngine) {
    this.aggregator.setLogType('log_db');

    // load word lists
    const me = this;
    console.log('Loading wordlists');
    //this.waiter.on();
    if (this.login.isLoggedIn()) {
      console.log("logged in");
      this.sessionid = this.login.getUserId();
    } else {
      console.log("not logged in");
      this.sessionid = this.login.getRandomId();
    }
    this.http.get(this.wordlistA1).subscribe(function(data) {
      me.wordlist['A1'] = data;
      me.http.get(me.wordlistA2).subscribe(function(data) {
        me.wordlist['A2'] = data;
        me.http.get(me.wordlistB1).subscribe(function(data) {
          me.wordlist['B1'] = data;
          me.http.get(me.wordlistB2).subscribe(function(data) {
            me.wordlist['B2'] = data;
            me.http.get(me.wordlistC1).subscribe(function(data) {
              me.wordlist['C1'] = data;
              console.log('Loaded wordlists');
              me.ready = true;
            });
          });
        });
      });
    });
    this.http.get(this.phraselist).subscribe(function(data) {
      me.phrases = (data as any);
      console.log('Loaded phrases');
    });
    const pid = setInterval(function() {
      if ((<any>window).hasOwnProperty('sayText')) {
        me.ttsLoaded = true;
        clearInterval(pid);
      }
    }, 500);
  }

  vh_audioStarted () {
    console.log("TS: Audio started!");
  }

  playback(text) {
    this.tts.textToSpeech(text, this.voice);
  }

  check (id) {
    const word = this.fetchById(id);
    //word["tries"]++;
    const newanswer = $('#answer-' + id).val();
    //word["answer"] = newanswer; // TODO problematic?? removes previous answer?
    return word['word'] === newanswer;
  }

  checkManual (id) {
    const word = this.fetchById(id);
    word['tries']++;
    const newanswer = $('#answer-' + id).val();
    word['answers'].push(newanswer);

    // TODO add aggregator information about updated answer

    return word['word'] === newanswer;
  }

  fetchById (id) {
    for (let i = 0; i < this.previousWords.length; i++) {
      const cobj = this.previousWords[i];
      if (cobj['id'] === id) {
        return cobj;
      }
    }
  }

  getRandomWord(level) {
    if (this.type < 2) {
      let index = Math.floor(Math.random() * this.wordlist[this.level].length);
      while (this.indexes.indexOf(index) > -1) {
        index = Math.floor(Math.random() * this.wordlist[this.level].length);
      }
      this.indexes.push(index);
      return this.wordlist[this.level][index];
    } else {
      if (this.type == 2) {
        let index = Math.floor(Math.random() * this.phrases.length);
        while (this.indexes.indexOf(index) > -1) {
          index = Math.floor(Math.random() * this.phrases.length);
        }
        this.indexes.push(index);
        return this.phrases[index];
      }
    }
  }

  generateWord(word) {
    const me = this;
    this.waiter.on();
    this.currentWord['word'] = word;
    this.currentWord['id'] = this.idCounter++;
    this.currentWord['tries'] = 0;
    this.currentWord['answers'] = [];

    this.currentWord['special-type'] = 'NORMAL';
    if (this.score > 0) {
      if (this.type < 2) {
        const checkOne = Math.random() > 0.85;
        if (checkOne) {
          this.currentWord['special-type'] = 'VOWEL';
          this.svc++;
        } else {
          const checkTwo = Math.random() > 0.85;
          if (checkTwo) {
            this.currentWord['special-type'] = 'CONSONANT';
            this.scc++;
          }
        }
      }
    }
    this.waiter.off();
    $('#answer-' + (this.idCounter - 1)).focus();
    if (this.type < 2) {
        this.loadhints(word);
    }
    return 1;
    /*this.larka.speak(word, this.spell ? 'spell' : '').subscribe(function(d) {
      if (d['Status']) {
        if (d['Status'] == 200) {
          me.currentWord['path'] = me.pathprefix + d['filename'];
          me.waiter.off();

          setTimeout(function() {
            $('#answer-' + (me.idCounter - 1)).focus();
          }, 500);
          if (me.type < 2) {
            me.loadhints(word);
          }
          return 1;
        }
      }
      me.waiter.off();
      return 0; // should never happen anyway
    });
    */
  }

  loadhints(word) {
    const me = this;
    this.korp.fetch(word).subscribe(function(d) {
      const sentences = d['kwic'];
      const hints = [[], []];
      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        const tokens = sentence['tokens'];
        const start_index = sentence['match']['start'];
        const end_index = sentence['match']['end'];
        // Looks a bit strange but the function is useable here too
        const words = TreeKernelComponent.extractWords(tokens);
        const words2 = TreeKernelComponent.extractWords(tokens);
        for (let i = start_index; i < end_index; i++) {
          words[i] = '_____';
          words2[i] =
            words2[i][0] + // first letter of word
            words2[i].slice(1).split('').reduce(function(acc, n){ return acc + '_'; }, ''); // placeholders for each letter in word
        }
        const sent_left = words.slice(0, start_index);
        const target = words.slice(start_index, end_index);
        const target2 = words2.slice(start_index, end_index);
        const sent_right = words.slice(end_index);
        const obj = {
          'sent_left': sent_left.join(' '),
          'target': target.join(' '),
          'sent_right': sent_right.join(' ')
        };
        const obj2 = {
          'sent_left': sent_left.join(' '),
          'target': target2.join(' '),
          'sent_right': sent_right.join(' ')
        };

        hints[0].push(obj);
        hints[1].push(obj2);
      }
      me.currentWord['hints'] = hints;
    });
  }

  hint(id) {
    //let word = this.fetchById(id);
    this.showHint = true;
    this.currentWord['showSentences'] = 1;
    //this.hintCount++;
  }

  hint2 () {
    this.showFirst = true;
    this.currentWord['showInitialLetter'] = 1;
  }

  validate () {
    const lastAnswer = this.currentWord['answers'][this.currentWord['answers'].length - 1];
    if (!lastAnswer) {
      console.log("no last answer");
      return;
    }
    const target = this.currentWord['word'];
    const isSpecialVowel = this.currentWord['special-type'] === 'VOWEL';
    const isSpecialConsonant = this.currentWord['special-type'] === 'CONSONANT';
    console.log(this.currentWord);
    const me = this;

    if (isSpecialVowel) {
      if (lastAnswer === target) {
        this.score += 3;
        return;
      }
      const lav = lastAnswer.split('').filter(function(v) {
        return me.vowels.test(v);
      });
      const tav = target.split('').filter(function(v) {
        return me.vowels.test(v);
      });
      if (lav.length === tav.length) {
        for (let i = 0; i < lav.length; i++) {
          if (lav[i] !== tav[i]) {
            return;
          }
        }
      }
      this.score += 2;
    } else if (isSpecialConsonant) {
      if (lastAnswer === target) {
        this.score += 3;
        return;
      }
      const lav = lastAnswer.split('').filter(function(v) {
        return me.consonants.test(v);
      });
      const tav = target.split('').filter(function(v) {
        return me.consonants.test(v);
      });
      if (lav.length === tav.length) {
        for (let i = 0; i < lav.length; i++) {
          if (lav[i] !== tav[i]) {
            return;
          }
        }
      }
      this.score += 2;
    } else {
      if (lastAnswer === target) {
        console.log("score+");
        this.score++;
      }
    }
  }

  next() {
    if (!this.currentWord['answers']) {
      this.currentWord['answers'] = [];
      this.aggregator.setAggregator({'exercise': 'liwrix'});
    }
    this.currentWord['answers'].push($('#answer-' + this.currentWord['id']).val());
    this.currentWord['tries']++;
    this.currentWord['mode'] = this.mode;
    this.validate(); // update score

    const temp = this.currentWord;
    if (temp['word']) {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          this.aggregator.addInformation(key, temp[key]);
        }
      }
      this.aggregator.addInformation('uid', this.sessionid);
      this.aggregator.addInformation('level', this.level);
      this.aggregator.addInformation('timestamp-end', DatetimeService.currentTimestamp());
    }
    // new word
    this.currentWord = {'word': ''};
    this.generateWord(this.getRandomWord(this.level));
    if (temp['word']) { // catch first time archiving void object
      this.previousWords.unshift(temp);
      this.aggregator.closeAggregator();
      this.aggregator.setAggregator({'exercise': 'liwrix'});
    }
    // reset stuff
    this.showHint = false;
    this.showFirst = false;
    $('#answer-' + (this.currentWord['id']-1)).val('');
    this.waiter.on();
    this.tts.textToSpeech(this.currentWord['word'], this.voice);
    this.waiter.off();
  }

  setParams(type, level, mode, voice) {
    if (type === 1) {
      this.spell = true;
    }
    this.type = type;
    this.mode = mode;
    this.level = this.mapToLevel(level);
    this.voice = voice;
    this.next();
  }

  mapToLevel(int) {
    switch (int) {
      case 0: return 'A1';
      case 1: return 'A2';
      case 2: return 'B1';
      case 3: return 'B2';
      case 4: return 'C1';
      default:
        break;
    }
  }

  getTotal() {
    return this.previousWords.length;
  }

  getCorrect() {
    return this.previousWords.filter(function(d) {
      if (d['word'] === d['answers'][d['answers'].length - 1]) {
        return 1;
      }
    }).length;
  }

  keyhandler(event, id?) {
    if (event.keyCode === 13) {
      if (!id) {
        this.next();
      } else {
        this.checkManual(id);
      }
    }
  }

  playbackInProgress() {
    const pbs = $('.liwrix-play-button');
    for (let i = 0; i < pbs.length; i++) {
      if ($(pbs[i]).hasClass('liwrix-play-button-inactive')) {
        return true;
      }
    }
    return false;
  }
}
