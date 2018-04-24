/**
 * Created by David on 1/31/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "./pleasewait.component";
import {LocalizerService} from "../../services/localizer.service";
import {KarpService} from "../../services/karp.service";
import {BufferService} from "../../services/buffer.service";
import {BufferMultiExeComponent} from "../buffer/buffer.multi.exe.component";

@Component({
    selector: 'infl-mc',
    templateUrl: '../../templates/infl-mc.html',
    styleUrls: ['../../css/voc-mc.css', '../../css/exercise.css']
})

export class InflectionMultipleExerciseComponent {

  @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

  private buffer: BufferMultiExeComponent;

  public sentence_left;
  public sentence_right;
  public target;
  public distractors = [];

  public answer;

  public previous = [];

  public index = 0;
  public indexcounter = 1;

  private levels = ["A1", "A2", "B1", "B2", "C1"];
  private level = 2;

  public buttonToggle: boolean;
  public buttonToggle2: boolean;

  private selectedPos;

  public quarantine: string[] = ["0"];

    constructor(private larka: LarkaService, public localizer: LocalizerService, private karp: KarpService) {
      this.buffer = new BufferMultiExeComponent();
    }

    //{"target":"t\u00e5rades","distractors":{"t\u00e5rades":"correct","utvecklades":"distractor","genomfors":"distractor","h\u00f6rdes":"distractor","erh\u00f6lls":"distractor"},
    // "target_item":"VB.PRT.SFO","sent_index":51133,"corpus":"SUC3","sentence_left":"Klistret satt ordentligt och han k\u00e4nde hur det ",
    // "sentence_right":"i \u00f6gonen , men han teg och led . ","target_index":8,"exetype":"multi"}

  get_checked_string(list) {
    const chosen = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if ($(item).is(':checked')) {
        chosen.push(item.value); // TODO map to values
      }
    }
    return chosen.join(',');
  }

  setPos() {
    const pos_sel = this.get_checked_string($('#pos-grid').find('input'));
    this.selectedPos = pos_sel;
    this.buttonToggle2 = true;
  }
  resetButton() {
      this.buttonToggle = false;

    }

  resetButton2() {
    this.buttonToggle2 = false;
  }
  setLevel(lvl) {
      this.level = lvl;
      this.buttonToggle = true;
  }

    generate (domain?, pos?, level?) {
      if (this.buffer.ready()) {
        return this.parse(this.buffer.next());
      }
        this.waiter.on();
        if (!domain) {
            domain = "kelly";
        }
        if (!this.selectedPos) {
            this.selectedPos = "NN,VB,JJ"; // defaults taken from old-old Lärka
        }
        level = this.levels[this.level];
        this.distractors = [];
        const me = this;
        const qstring = this.quarantine;
        this.buffer.setParams(this.larka.generateMultiInfl, domain, this.selectedPos, level, qstring, 5, this.larka);
        const pid = setInterval(function() {
          if (me.buffer.ready.call(me.buffer)) {
            me.parse.call(me, me.buffer.next.call(me.buffer));
            clearInterval(pid);
            me.waiter.off();
          }
        }, 2000);


    }

  shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
  }

  linearize(arr) {
      let s = '';
      for (let i = 0; i < arr.length; i++) {
        const o = arr[i];
        s += o['word'] + ' ';
      }
      return s;
  }
    parse (data) {
      if (data["msg"]) {
        console.log(data);
        this.waiter.off();

        return this.generate();
      }
      //console.log(data);
        this.target = data["target"]["word"];
        let prelim_dist = data["distractors"];
        this.shuffle(prelim_dist);
        this.distractors = prelim_dist;
        //let sent_index = data["sent_index"];
        //let corpus = data["corpus"];
        this.sentence_left = data["sentence_left"];
        this.sentence_right = data["sentence_right"];
        this.answer = this.distractors[0];
        let exetype = "multi_infl"; // TODO needed for logging??
        let sentence_id = data["sentence_id"];
        this.quarantine.push(sentence_id);
        this.index = this.indexcounter++;
        console.log(this.target);
        this.waiter.off();
    }

    setAnswer(event) {
        this.answer = event.target.value;
    }

    reviseAnswer(obj,event) {
        obj["answer"] = event.target.value;
    }
    checkAnswer() {
        if (this.answer == this.target) {

        }
        this.archive();
        this.reset();
        this.generate();
    }

    reset () {
        this.sentence_left = "";
        this.sentence_right = "";
        this.target = "...";
        this.distractors = [];
    }

    isCorrect(obj) {
        if (!obj) {
            console.error("Expected object. Received none.");
        }
        return obj["target"] == obj["answer"];
    }

    archive() {
        let obj = {
          'target': this.target,
            'distractors': this.distractors,
            'sentence_left': this.sentence_left,
            'sentence_right': this.sentence_right,
            'answer': this.answer,
            'index': this.index
        };
        this.previous.unshift(obj);
    }
}
