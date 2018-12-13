import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DataAggregatorService} from "../../services/dataAggregator.service";

@Component({
  selector: 'wordrater',
  templateUrl: '../../templates/wordrater.html'
})

export class WordraterComponent {

  private fileurl = 'app/data/sample_50_lexical_3.json';

  private words;
  public currentWord;

  public counter = 0;
  public totalWords = 0;

  private rater: string;

  constructor(private http: HttpClient, private aggregator: DataAggregatorService) {
    this.aggregator.setLogType('log_db');
    const me = this;
    this.http.get(this.fileurl).subscribe(function(d) {
      me.words = d;
      me.totalWords = (<any>d).length;
    });
  }

  start() {
    this.rater = $('#rater option:selected').text();
    this.aggregator.setAggregator({'exercise': 'wordrater'});
    this.currentWord = this.words.shift();
    this.counter++;
  }

  next () {

    const val = $('input[name=cefr]:checked').val();
    this.aggregator.addInformation('rater', this.rater);
    this.aggregator.addInformation('word', this.currentWord['word']);
    this.aggregator.addInformation('pos', this.currentWord['pos']);
    this.aggregator.addInformation('predicted', this.currentWord['cefr']);
    this.aggregator.addInformation('manual', val);
    this.aggregator.closeAggregator();
    if (this.words.length === 0) {
      return; // End exercise
    }

    this.currentWord = this.words.shift();
    this.aggregator.setAggregator({'exercise': 'wordrater'});

    this.counter++;
  }

  exit() {
    const confirmation = window.confirm("Do you really want to stop?");
    if (!confirmation) {
      return;
    }
    const val = $('input[name=cefr]:checked').val();

    this.aggregator.addInformation('word', this.currentWord['word']);
    this.aggregator.addInformation('pos', this.currentWord['pos']);
    this.aggregator.addInformation('predicted', this.currentWord['cefr']);
    this.aggregator.addInformation('manual', val);

    this.aggregator.closeAggregator();
  }
}
