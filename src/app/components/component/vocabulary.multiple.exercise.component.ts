/**
 * Created by David on 1/31/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "./pleasewait.component";
import {BufferMultiExeComponent} from "../buffer/buffer.multi.exe.component";

@Component({
    selector: 'voc-mc',
    templateUrl: '../../templates/voc-mc.html',
    styleUrls: ['../../css/voc-mc.css', '../../css/exercise.css']
})

export class VocabularyMultipleChoiceExerciseComponent {

    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

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

  public buffer;

  private quarantine = ["0"];
    constructor(private larka: LarkaService) {
      this.buffer = new BufferMultiExeComponent();
    }

    //{"target":"t\u00e5rades","distractors":{"t\u00e5rades":"correct","utvecklades":"distractor","genomfors":"distractor","h\u00f6rdes":"distractor","erh\u00f6lls":"distractor"},
    // "target_item":"VB.PRT.SFO","sent_index":51133,"corpus":"SUC3","sentence_left":"Klistret satt ordentligt och han k\u00e4nde hur det ",
    // "sentence_right":"i \u00f6gonen , men han teg och led . ","target_index":8,"exetype":"multi"}

  resetButton() {
      this.buttonToggle = false;
      this.buffer.interrupt();
      this.buffer.empty();
      this.quarantine = ["0"];
  }
  setLevel(lvl) {
      this.level = lvl;
      this.buttonToggle = true;
  }

    generate (domain?, pos?, level?) {
      if (this.buffer.ready()) {
        let data = this.buffer.next();
        let sentence_id = data['sentence_id'];
        while (this.quarantine.indexOf(sentence_id) > -1 && this.buffer.ready()) {
          data = this.buffer.next();
          sentence_id = data['sentence_id'];
        }
        return this.parse(data);
      }
        this.waiter.on();
        if (!domain) {
            domain = "kelly";
        }
        if (!pos) {
            pos = ["NN", "VB", "JJ", "AB"]; // defaults taken from old-old Lärka
        }
        level = this.levels[this.level];
        this.distractors = [];
        const me = this;
      const qstring = this.quarantine;
      this.buffer.setParams(this.larka.generateMulti, domain, pos.join(','), level, qstring, 5, this.larka);
      const pid = setInterval(function() {
        if (me.buffer.ready.call(me.buffer)) {
          me.parse.call(me, me.buffer.next.call(me.buffer));
          clearInterval(pid);
          me.waiter.off();
        }
      }, 2000);
      /*
        this.larka.generateMulti(domain, pos, level).subscribe(function(data) {
            me.parse(data);
        });
        */
    }

    parse (data) {
      if (data["msg"]) {
        console.log(data);
        this.waiter.off();

        return this.generate();
      }
        this.target = data["target"]["word"];
        this.distractors = data["distractors"];
        //let target_item = data["target_item"];
        let sent_index = data["sentence_id"];
        this.quarantine.push(sent_index);
        //let corpus = data["corpus"];
        this.sentence_left = data["sentence_left"];
        this.sentence_right = data["sentence_right"];
        //let target_index = data["target_index"];
        let exetype = "multi_voc"; // TODO needed for logging??
      /*
        for (var property in distractors) {
            if (distractors.hasOwnProperty(property)) {
                this.distractors.push(property);
            }
        }
        */
        this.index = this.indexcounter++;
        this.answer = this.distractors[0]; // answer only set on explicit change, assume first choice to avoid null answer
        this.waiter.off();
        console.log(this.target);
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
