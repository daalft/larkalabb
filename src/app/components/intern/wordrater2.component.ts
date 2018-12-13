import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataAggregatorService} from '../../services/dataAggregator.service';
import {PleaseWaitComponent} from "../component/pleasewait.component";

@Component({
  selector: 'wordrater2',
  templateUrl: '../../templates/wordrater2.html'
})

export class Wordrater2Component {
  @ViewChild('waiter') waiter: PleaseWaitComponent;

  private data;
  private wordlist = 'app/data/wordrater2.json';

  private currentRater;

  public currentItem;
  public ongoing = false;

  public currentIndex = 0;
  public totalWords = 0;

  public ready = false;
  public final = false;

  public colorme;


  constructor(private http: HttpClient, private agg: DataAggregatorService) {
    const me = this;
    this.agg.setLogType('log_db');
    this.http.get(this.wordlist).subscribe(function(d) {
      me.data = d;
      me.totalWords = (<any>d).length;
      me.ready = true;
    });
  }

  finalize() {
    console.log('End of list');
    this.fakeCounter();
    this.ongoing = false;
    this.final = true;
  }

  start(rater) {
    console.log(rater);
    this.currentRater = rater;
    this.ongoing = true;
    const prevIdx = window.localStorage.getItem("wr2li");
    let prevIdxInt = -1;
    if (prevIdx) {
      prevIdxInt = parseInt(prevIdx, 10) - 1;
    }
    if (prevIdx && prevIdxInt > -1) {
      // forward to last position
      while (this.currentIndex < prevIdxInt) {
        this.currentIndex++;
        this.currentItem = this.data.pop();
      }
      //this.currentItem = this.data.pop();
    } else {
      this.currentItem = this.data.pop();
      this.currentIndex++;
    }

    this.agg.setAggregator({'exercise': 'wordrater2'});
    this.agg.addInformation('rater', this.currentRater);
    this.agg.addInformation('word', this.currentItem['word']);
    this.agg.addInformation('pos', this.currentItem['pos']);
    this.agg.addInformation('fo_lvl', this.currentItem['fo_lvl']);
    this.agg.addInformation('tt_lvl', this.currentItem['tt_lvl']);
  }

  next() {
    this.agg.closeAggregator();

    if (this.data.length > 0) {
      this.currentIndex++;
      this.currentItem = this.data.pop();
      this.agg.setAggregator({'exercise': 'wordrater2'});
      this.agg.addInformation('rater', this.currentRater);
      this.agg.addInformation('word', this.currentItem['word']);
      this.agg.addInformation('pos', this.currentItem['pos']);
      this.agg.addInformation('fo_lvl', this.currentItem['fo_lvl']);
      this.agg.addInformation('tt_lvl', this.currentItem['tt_lvl']);
    } else {
      this.finalize();
    }
  }

  validate(num: number) {
    // 1 -> FO
    // 2 -> TT
    // TODO log answer
    this.agg.addInformation('man_choice', num);
    console.log(num);
    this.next();
  }

  fakeCounter() {
    this.waiter.on();
    const me = this;
    setTimeout(function(){
      me.waiter.off();
    }, 10000);
  }
  cancel() {
    console.log("Cancelling");
    // TODO save index?
    window.localStorage.setItem("wr2li", '' + this.currentIndex);
    this.fakeCounter();
    this.currentRater = null;
    this.ongoing = false;
  }

  colorbutton(ev) {
    console.log(ev);

    this.colorme =  ev.target.checked;
  }

  getColorClass(which) {
    if (!this.colorme) {
      return;
    }
    if (which === 1) {
      return 'wr2b-' + this.currentItem['fo_lvl'];
    } else if (which === 2) {
      return 'wr2b-' + this.currentItem['tt_lvl'];
    } else {
      return;
    }

  }

  blurSI(ev) {
    console.log(ev);
    ev.target.blur();
  }
}
