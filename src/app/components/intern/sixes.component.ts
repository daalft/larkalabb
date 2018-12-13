import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataAggregatorService} from '../../services/dataAggregator.service';
import * as _ from 'lodash';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'sixes',
  templateUrl: '../../templates/sixes.html'
})

export class SixesComponent {
  private words;
  private words2;
  private currentBlock;
  public currentWord;

  public ready: boolean;
  public started: boolean;
  public finished: boolean;
  public finalpage: boolean;

  private wantedmore: boolean;

  public currentNum = 0;
  public totalNum = 0;

  private rater;
  private mothertongue;
  private proficiency;

  private allowed;

  public identifiedSwedish = 0;
  public correctList = [];
  public misidentifiedSwedish = 0;
  public incorrectList = [];
  public missedSwedish = 0;
  public missedList = [];

  constructor(private http: HttpClient, private agg: DataAggregatorService, private login: LoginService) {
    const me = this;
    this.http.get('app/data/sixes_a_list1.json').subscribe(function(d) {
      me.words = d;
      me.ready = true;
      me.totalNum = 4 * (<any>d).length;
    });
    this.http.get('app/data/sixes_a_list2.json').subscribe(function(d) {
      me.words2 = d;
    });
    this.http.get('app/data/sixes_allowed.json').subscribe(function(d) {
      me.allowed = d;
    });
    this.agg.setLogType('log_db');
  }


  next() {
    this.agg.setAggregator({'exercise': 'sixes', 'rater': this.rater, 'mothertongue': this.mothertongue,
      'proficiency': this.proficiency});
    if (!this.currentBlock) {
      this.currentBlock = this.words.shift();
      console.log(this.currentBlock);
    }
    if (this.currentBlock.length === 0) {
      if (this.words.length === 0) {
        this.finished = true;
      } else {
        this.currentBlock = _.shuffle(this.words.shift());
      }
    }
    this.currentWord = this.currentBlock.shift();
    this.currentNum++;
    this.agg.addInformation('word', this.currentWord['word']);
    this.agg.addInformation('mod', this.currentWord['mod']);
  }

  start(mothertongue, proficiency, identime) {
    if (identime !== '') {
      if (this.allowed.indexOf(identime) !== -1) {
        this.rater = identime;
      } else {
        alert("Invalid identifier. Please make sure you enter the identifier exactly as given.");
        return;
      }
    } else {
      this.rater = this.login.getRandomId();
    }
    this.mothertongue = mothertongue;
    if (this.mothertongue === 'sv') {
      this.proficiency = 'native';
    } else {
      this.proficiency = proficiency;
    }
    this.started = true;
    this.next();
  }

  record(num: number) {
    // num == 0 if answered nonword
    // num == 1 if answered word
    this.agg.addInformation('answer', num);
    this.agg.closeAggregator();
    if (num === 1 && this.currentWord['mod'] === 'oo') {
      this.identifiedSwedish++;
      this.correctList.push(this.currentWord['word']);
    } else if (num === 1) {
      this.misidentifiedSwedish++;
      this.incorrectList.push(this.currentWord['word']);
    } else if (num === 0 && this.currentWord['mod'] === 'oo') {
      this.missedSwedish++;
      this.missedList.push(this.currentWord['word']);
    }
    this.next();
  }

  iwantmore() {
    if (this.wantedmore) {
      alert("Sorry, this is all we got for now!");
      this.finalizeme();
      return;
    }
    this.words = this.words2;
    this.finished = false;
    this.wantedmore = true;
    this.totalNum += 4 * this.words2.length;
    this.currentNum--;
    this.next();
  }

  finalizeme() {
    this.finalpage = true;
  }
}
