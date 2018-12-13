import {AfterViewInit, Component, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DataAggregatorService} from "../../services/dataAggregator.service";

@Component({
  selector: 'xrater',
  templateUrl: '../../templates/xrater.html'
})

export class XRaterComponent implements OnDestroy {//} implements AfterViewInit {

  private mwe_url = 'app/data/lex2.json';
  private sentence_url = 'app/data/sensenses.json';

  public currentItem;

  private mwes;
  private mweCounter = 0;
  public totalMwes;

  private sentences;
  private sentenceCounter = 0;
  public totalSentences;

  public counter = 0;
  public totalItems = 0;

  private rater: string;

  public mode;

  public ongoing = false;

  constructor(private http: HttpClient, private aggregator: DataAggregatorService) {
    this.aggregator.setLogType('log_db');
    const me = this;
    this.http.get(this.mwe_url).subscribe(function(d) {
      me.mwes = d;
      me.totalMwes = (<any>d).length;
      me.checkMwe();
    });
    this.http.get(this.sentence_url).subscribe(function(d) {
      me.sentences = d;
      me.totalSentences = (<any>d).length;
      me.checkSentence();
    });
  }

  ngOnDestroy () {
    window.localStorage.setItem('lastIndexMwe', this.mweCounter.toString());
    window.localStorage.setItem('lastIndexSent', this.sentenceCounter.toString());
  }

  checkSentence() {
    const lastSentIndex = window.localStorage.getItem('lastIndexSent');

    const rejectionListSent = [];
    if (lastSentIndex) {
      const idx = parseInt(lastSentIndex, 10) - 1;
      while (rejectionListSent.length < idx) {
        rejectionListSent.push(this.sentences.shift());
      }
      this.sentenceCounter = idx;
    }
  }

  checkMwe() {
    const lastMweIndex = window.localStorage.getItem("lastIndexMwe");

    const rejectionListMwe = [];
    if (lastMweIndex) {
      const idx = parseInt(lastMweIndex, 10) - 1;
      while (rejectionListMwe.length < idx) {
        const elem = this.mwes.shift();
        rejectionListMwe.push(elem);
      }
      this.mweCounter = idx;
    }
  }

  start() {
    this.rater = $('#rater option:selected').text();
    const stringMode = $('input[name=mode]:checked').val();

    this.mode = parseInt(<string>stringMode, 10);

    this.aggregator.setAggregator({'exercise': 'xrater'});
    this.aggregator.addInformation("mode", this.mode);
    this.currentItem = this.mode === 0 ? this.mwes.shift() : this.sentences.shift();
    if (this.mode === 0) {
      this.mweCounter++;
    } else if (this.mode === 1) {
      this.sentenceCounter++;
    }
    this.ongoing = true;
  }

  next () {

    const val = $('input[name=cefr]:checked').val();
    this.aggregator.addInformation('rater', this.rater);
    this.aggregator.addInformation('item', this.currentItem['item']);
    //this.aggregator.addInformation('pos', this.currentWord['pos']);
    //this.aggregator.addInformation('predicted', this.currentWord['cefr']);
    this.aggregator.addInformation('manual', val);
    this.aggregator.closeAggregator();
    if (this.mode === 0) {
      if (this.mwes.length === 0) {
        return;
      }
    } else if (this.mode === 1) {
      if (this.sentences.length === 0) {
        return;
      }
    }


    this.currentItem = this.mode === 0 ? this.mwes.shift() : this.sentences.shift();
    this.aggregator.setAggregator({'exercise': 'xrater'});
    this.aggregator.addInformation("mode", this.mode);
    if (this.mode === 0) {
      this.mweCounter++;
    } else if (this.mode === 1) {
      this.sentenceCounter++;
    }
  }

  exit() {
    const confirmation = window.confirm("Do you really want to stop?");
    if (!confirmation) {
      return;
    }
    const val = $('input[name=cefr]:checked').val();

    //this.aggregator.addInformation('item', this.currentItem['item']);
    //this.aggregator.addInformation('pos', this.currentWord['pos']);
    //this.aggregator.addInformation('predicted', this.currentWord['cefr']);
    //this.aggregator.addInformation('manual', val);

    //this.aggregator.closeAggregator();

    this.ongoing = false;

    window.localStorage.setItem('lastIndexMwe', this.mweCounter.toString());
    window.localStorage.setItem('lastIndexSent', this.sentenceCounter.toString());
  }
}
