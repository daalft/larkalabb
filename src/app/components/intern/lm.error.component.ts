import {Component, ViewChild} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "../component/pleasewait.component";

@Component({
  selector: 'lm-error',
  templateUrl: '../../templates/lm-error.html'
})

export class LmErrorComponent {
  public threshold = 7;

  public min_slider_val = 0;
  public max_slider_val = 13;

  public words_with_probs = [];

  public processed = false;

  private mode = 2;

  @ViewChild('waiter') waiter: PleaseWaitComponent;

  constructor(public localizer: LocalizerService, private larka: LarkaService) {}

  setThreshold(val: number) {
    this.threshold = val;
  }

  setMode(val: number) {
    console.log("mode now " + val);
    if (val > 2 || val < 0) {
      return;
    }
    this.mode = val;
  }

  analyze(text) {
    this.waiter.on();
    const me = this;
    this.larka.ngram_lm_prob(text).subscribe(function(d) {
          me.max_slider_val = Math.ceil(d["max"]);
          me.words_with_probs = me.parse(d["result"]);
          me.processed = true;
          me.waiter.off();
    });
  }

  parse(d) {
    let res = [];
    for (let i = 0; i < d.length; i++) {
      const wwp = d[i];
      const key = Object.keys(wwp)[0];
      const values = wwp[key];
      let obj = {};
      obj["key"] = key;
      obj["values"] = values;
      res.push(obj);
    }
    return res;
  }

  checkMark(vals) {
    if (this.mode === 0) { // unigram
      return vals[0] > this.threshold;
    } else if (this.mode === 1) { // bigram
      return vals[1] > this.threshold;
    } else if (this.mode === 2) { // trigram
      return vals[2] > this.threshold;
    }
    return false;
  }

  edit() {
    this.processed = false;
  }

  reset() {
    this.processed = false;
    $('#text').text('');
  }
}
