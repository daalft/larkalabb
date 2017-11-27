/**
 * Created by David on 1/31/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "./pleasewait.component";

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

  public index;
  public indexcounter = 1;

    constructor(private larka: LarkaService) {}

    //{"target":"t\u00e5rades","distractors":{"t\u00e5rades":"correct","utvecklades":"distractor","genomfors":"distractor","h\u00f6rdes":"distractor","erh\u00f6lls":"distractor"},
    // "target_item":"VB.PRT.SFO","sent_index":51133,"corpus":"SUC3","sentence_left":"Klistret satt ordentligt och han k\u00e4nde hur det ",
    // "sentence_right":"i \u00f6gonen , men han teg och led . ","target_index":8,"exetype":"multi"}

    generate (domain?, pos?, level?) {
        this.waiter.on();
        if (!domain) {
            domain = "kelly";
        }
        if (!pos) {
            pos = ["NN", "VB", "JJ", "AB"]; // defaults taken from old-old Lärka
        }
        if (!level) {
            level = "B1";
        }
        this.distractors = [];
        let me = this;
        this.larka.generateMulti(domain,pos,level).subscribe(function(data) {
            me.parse(data);
        });
    }

    parse (data) {
        this.target = data["target"];
        let distractors = data["distractors"];
        let target_item = data["target_item"];
        let sent_index = data["sent_index"];
        let corpus = data["corpus"];
        this.sentence_left = data["sentence_left"];
        this.sentence_right = data["sentence_right"];
        let target_index = data["target_index"];
        let exetype = "multi"; // TODO needed for logging??
        for (var property in distractors) {
            if (distractors.hasOwnProperty(property)) {
                this.distractors.push(property);
            }
        }
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
