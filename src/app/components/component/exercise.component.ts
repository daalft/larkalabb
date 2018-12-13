/**
 * Created by David on 4/5/2016.
 */

import {Component, ViewChild, OnDestroy, AfterViewInit} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {EventEmitter} from "@angular/core";
import {Output} from "@angular/core";
import {Router, Route, Routes} from "@angular/router";
import {DataAggregatorService} from "../../services/dataAggregator.service";
import {LoginService} from "../../services/login.service";
import {LarkaService} from "../../services/larka.service";
import {KarpService} from "../../services/karp.service";
import {isDevMode} from '@angular/core';
import {VersionControllerService} from "../../services/version.controller.service";

@Component({

    selector: 'exercise-component',
    templateUrl: '../../templates/exercise-component.html',
    styleUrls: ['../../css/exercise.css'],
    providers: [DataAggregatorService]
})

export class ExerciseComponent implements OnDestroy,AfterViewInit {

    @Output() nextRequester: EventEmitter<any>;
    @Output() reloadRequester: EventEmitter<any>;

    //@ViewChild('reportModal') modal: ModalComponent<any>;

    private data = undefined;
    public visible: boolean;
    private current: Exercise;
    private previousExamples = [];

    private mode;
    private canChangeMode: boolean = true;

    private reported_sentence = [];

    private user;

    private exerciseStatistics;

    private no_information: string;

    public hideHelp = false;

    // flags for toggle side menu
  public showSaldom = false;
  public showWikipedia = false;
  public showWiktionary = false;

    constructor(public localizer: LocalizerService, private _router: Router, private aggregator: DataAggregatorService, private login: LoginService, private larka: LarkaService, private karp: KarpService) {
        this.nextRequester = new EventEmitter();
        this.reloadRequester = new EventEmitter();
        //console.log("ex comp const");
        this.visible = false; // should default to false anyway
        this.user = login.isLoggedIn() ? this.login.getUserId() : '';

        this.no_information = '<b>' + this.localizer.localize('linguist-no-information') + '</b>';
    }

    ngOnDestroy () {
        // when destroying, flush data
        this.aggregator.flush();
    }

    ngAfterViewInit () {

    }

    isDev () {
      return isDevMode();
    }

    reinitialize (ex : ExerciseComponent) {
        console.log(ex.data);
        if (!ex) return;
        //this.data = ex.data;
        this.current = ex.current;
        this.previousExamples = ex.previousExamples;
        this.mode = ex.mode;
        this.data = ex.data;
        this._parse2(ex.data);

        setTimeout(() => {
            //trigger your update
            this.visible = true;
        },0);
        // TODO what about previous examples?

    }

    public setData (data) {
        this.visible = true;
        this.data = data;
        this.current = new Exercise();
        this._parse(data);
        //console.log(this.current.target_pos);
    }

    _parse (data) {

        this.current.corpus = this.data["corpus"];
        this.current.distractors = this.data["distractors"];
        this.current.exetype = this.data["exetype"];
        this.current.korp_url = this.data["korp_url_link"];
        this.current.larka_url = this.data["larka_url_link"];
        this.current.sent_index = this.data["sent_index"];
        this.current.sentence_id = this.data["sentence_id"];
        this.current.sentence_left = this.special(this.data["sentence_left"]);
        this.current.sentence_right = this.special(this.data["sentence_right"]);
        this.current.target = this.special(this.data["target"]);
        this.current.target_index = this.data["target_index"];
        this.current.target_pos = this.data["target_pos"];
        this.current.target_deprel = this.data["target_deprel"];
        this.current.target_semrole = this.data["target_role"];
        //console.log(this.current.target_semrole);
        this.current.index = this.previousExamples.length+1;
        this.current.json = this.data;
        this.current["time_start"] = Date.now();
    }
    _parse2 (data) {
        this.current.corpus = data["corpus"];
        this.current.distractors = data["distractors"];
        this.current.exetype = data["exetype"];
        this.current.korp_url = data["korp_url_link"];
        this.current.larka_url = data["larka_url_link"];
        this.current.sent_index = data["sent_index"];
        this.current.sentence_id = data["sentence_id"];
        this.current.sentence_left = data["sentence_left"];
        this.current.sentence_right = data["sentence_right"];
        this.current.target = data["target"];
        this.current.target_index = data["target_index"];
        this.current.target_pos = data["target_pos"];
        this.current.target_deprel = data["target_deprel"];
        this.current.target_semrole = data["target_role"];
        //console.log(this.current.target_semrole);
        this.current.index = this.previousExamples.length+1;
        console.log(data);
        console.log(data["target"]);

    }

    aggregate (type, data) {
        this.aggregator.aggregate(type,data,
            this.login.isLoggedIn()?
                this.login.getUserId():
            this.login.getRandomId());
    }

    time_diff(obj, now) {
      // assume obj["time_start"] exists
      const ms = now - obj['time_start'];
      return ms / 1000;
    }

    archive() {
        // TODO prevent buggy behavior!
        this.aggregate("exercise", this.minimize(this.current));
        this.current["time_taken"] = this.time_diff(this.current, Date.now());
        this.previousExamples.unshift(this.current);
        this.current = new Exercise();
        this.nextRequester.emit("generate");
    }

    getHistory() {
      return this.previousExamples;
    }

    minimize (exercise:Exercise) {
        let answer = exercise.answer;
        let distractors = exercise.distractors;
        let exetype = exercise.exetype;
        let target = this.targetForExetype(exetype,exercise.target_pos,exercise.target_deprel,exercise.target_semrole);
        let sentence = this.concat(exercise.sentence_left,exercise.target,exercise.sentence_right);
        let obj = {
            "answer": answer,
            "distractors": distractors,
            "exetype": exetype,
            "target": target,
            "sentence": sentence
        };
        //console.log(obj);
        return obj;
    }

    targetForExetype (exetype,pos,deprel,sem) {
        switch(exetype) {
            case "pos1":
            case "pos2": return pos;
            case "synt1":
            case "synt2": return deprel;
            case "sem": return sem;
            default: console.log(exetype);
        }
    }

    isPosExe(ex: Exercise) {
      return ex.exetype === 'pos1' || ex.exetype === 'pos2';
    }

    isSyntExe(ex: Exercise) {
      return ex.exetype === 'synt1' || ex.exetype === 'synt2';
    }

    isSemExe(ex: Exercise) {
      return ex.exetype === 'sem';
    }

    concat (left, target, right) {
        let sentence = "";
        for (let i = 0; i < left.length; i++) {
            sentence += left[i]["word"] + " ";
        }
        for (let i = 0; i < target.length; i++) {
            sentence += target[i]["word"] + " ";
        }
        for (let i = 0; i < right.length; i++) {
            sentence += right[i]["word"] + " ";
        }
        return sentence;
    }

    getTarget() {
      if (this.isPosExe(this.current)) {
        return this.current.target_pos;
      }
      if (this.isSemExe(this.current)) {
        return this.current.target_semrole;
      }
      if (this.isSyntExe(this.current)) {
        return this.current.target_deprel;
      }
    }

    evaluate(value,exercise: Exercise) {
        if (!exercise) {
            this.current.answer = value;
        } else {
            exercise.answer = value;
        }
        //console.log(this.current.target_pos);
        //console.log(answer);
        this.aggregate("exercise-answer",value);
    }

    setCurrent(value: string) {
        //console.log(value);
        this.current.answer = value;
    }

    isCorrect(exercise: Exercise) {
        if (exercise.exetype == 'pos1' || exercise.exetype == 'pos2') {

            return exercise.answer == exercise.target_pos;
        }
        if (exercise.exetype == 'synt1' || exercise.exetype == 'synt2')
            return exercise.answer == exercise.target_deprel;
        if (exercise.exetype == 'sem_roles') { // how about rename?
            return exercise.answer == exercise.target_semrole;
        }
    }

    setCanChangeMode(value: boolean) {
      this.canChangeMode = value;
    }

    requestModeChange (mode) {
        // TODO on mode change, clear current exercise?
        // TODO on mode change and clear, save history?
        console.log(mode);
      this.hideHelp = (this.mode === 'selfstudy_checkbox'); // TODO this doesn't work as expected!!
      /*
      When self-study, infobox is shown. When test mode, infobox hidden
      BUT when diagnostic, infobox shown!!
       */
      console.log(this.hideHelp);
        if (!this.mode) {
            this.mode = mode;
        } else {
            if (!this.canChangeMode) {
                return;
            }
            // TODO check if we are allowed to change mode
            this.mode = mode;
        }
        // TODO archive + log
        this.previousExamples = [];
        this.current = undefined;
        this.visible = false;
        //this.aggregator.
    }

    public wiki_html;

    showInformation(word) {

      const wordLemma = word['lemma'].substr(1, word['lemma'].length - 2);


      if (this.mode !== 'selfstudy_checkbox') {  // disable show information except if mode is selfstudy
        return;
      }
      $('#saldomWordHere').html(' <b>'+wordLemma+'</b>');
      $('#wikiWordHere').html(' <b>'+wordLemma+'</b>');
      $('#wiktWordHere').html(' <b>'+wordLemma+'</b>');
      const me = this;
      let lemgram = word["lex"].split("|")[1];

      this.karp.fetchWordInfo(lemgram).subscribe(function(d) {
        let saldom_string = "<table class='chromalt'>";
        let hits = d["hits"]["hits"];

        if (hits.length === 0) {
          console.log("No HITS for word");
          $('#saldom').html(me.no_information);
          return;
        }

        for (let i = 0; i < hits.length; i++) {
          let fr = hits[i]["_source"]["FormRepresentations"][0];
          saldom_string += "<tr><td colspan='2'><b>"+fr["baseform"]+"</b></td></tr>";
          saldom_string += "<tr><td>lemgram</td><td>"+fr['lemgram']+"</td></tr>";
          saldom_string += "<tr><td>ordklass</td><td>"+fr['partOfSpeech']+"</td></tr>";
          saldom_string += "<tr><td>saldo-paradigm</td><td>"+fr['paradigm']+"</td></tr>";

          saldom_string += "<tr class='spacer-row'><td colspan='2'></td></tr>";
          //saldom_string += "<tr><td>"++"</td><td>"++"</td></tr>";

          let wfs = hits[i]["_source"]["WordForms"];
          let oddOrEven = false;
          for (let i = 0; i < wfs.length; i++) {
            let wf = wfs[i];
            saldom_string += "<tr class='chromalt-row'><td>"+wf["msd"]+"</td><td>"+wf["writtenForm"]+"</td></tr>";
            oddOrEven = !oddOrEven;
          }

        }
        saldom_string += "</table>";
        $('#saldom').html(saldom_string);
      });
        const wikt = this.larka.wiktionary(word).subscribe(function(data) {
          let wiktionary_string = "";
          if (data.hasOwnProperty('parse')) {
            const result = data["parse"]["text"];

            $.each(result, function(element2, content2){
              element2 = element2.replace(/\>edit</g, "><");
              content2 = content2.replace(/\>edit</g, "><");
              wiktionary_string = wiktionary_string + element2 + content2;
            });
            if (wiktionary_string.length > 10) {
              wiktionary_string = wiktionary_string.replace(/\*/gi, "");
              wiktionary_string = wiktionary_string.replace(/redigera/gi, "");
              wiktionary_string = wiktionary_string.replace(/\[</gi, "<");
              wiktionary_string = wiktionary_string.replace(/>\]/gi, ">");
              wiktionary_string = wiktionary_string.replace(/<a /gi, "<ank ");
              wiktionary_string = wiktionary_string.replace(/<\/a>/gi, "<aank> ");
              /*wiktionary_string = wiktionary_string.replace(/<strong class="selflink">/gi, "");
			  wiktionary_string = wiktionary_string.replace(/<\/strong>/gi, "");*/
              wiktionary_string = wiktionary_string.replace(/<table /gi, "<table style=\"text-align: left; font-size: 90%;background:#f6f6f6; margin-left: -5px;");
            }

          } else {
            $('#wikt').html(me.no_information);
          }
          if (wiktionary_string.length > 0) {
            // me.wiki_html = wiktionary_string;
            $('#wikt').html(wiktionary_string);
          }

        });
        this.larka.wikipedia(word).subscribe(function(data) {
          console.log(data);
          let wiki_string = "";
          if (data.hasOwnProperty('parse')) {
            console.log("parse found");
            let result = data["parse"]["text"];

            $.each(result, function (element, content) {
              element = element.replace(/\>edit</g, "><");
              content = content.replace(/\>edit</g, "><");
              wiki_string = wiki_string + element + content;

            });
            if (wiki_string.length > 10) {
              wiki_string = wiki_string.replace(/\*/gi, "");
              wiki_string = wiki_string.replace(/redigera/gi, "");
              wiki_string = wiki_string.replace(/\[</gi, "<");
              wiki_string = wiki_string.replace(/>\]/gi, ">");
              wiki_string = wiki_string.replace(/<a /gi, "<ank ");
              wiki_string = wiki_string.replace(/<\/a>/gi, "<aank> ");
              wiki_string = wiki_string.replace(/edit</gi, "<");
              $("#wiki").html(wiki_string);

            }
          } else if (data.hasOwnProperty('error')) {
            console.log("error found");
            $("#wiki").html(me.no_information);
          }
        });
        let lex = word["lex"].slice(1,-1);
        let lemmaRest = lex.split(/\.{2}/);
        let lemma = lemmaRest[0];
        if (!lemma) {
            let altLemma = word["lemma"];
            if (altLemma) {
                lemma = altLemma;
            } else {
            console.log("ERROR: no lemma found!");
            console.log(word);
            console.log("Aborting");
                return;
            }
        }
        let posRest = lemmaRest[1].split(/\./);
        let pos = posRest[0];
        let sense = posRest[1];

        //this._router.navigate( ['.',{ lemma: lemma, pos: pos, sense: sense }] );
        this.aggregate("show-info",word);
    }

    tree (exercise) {
        console.log(exercise);
    }

    special (input: any) {
        if ({}.toString.apply(input) == "[object Array]")
            return input;

        let array = input.split(/ /);
        let other = [];
        for (let i = 0; i < array.length; i++) {
            other.push({"word": array[i]});
        }
        return other;
    }

    hideLinks() {
      return this.mode !== 'selfstudy_checkbox';
    }
    showjson(json) {
        //console.log(json);
        let w = window.open();
        let windowHTML = "<!DOCTYPE HTML><html><head><title>Lärka - JSON result</title></head><body><pre id=\"json_result\">"+JSON.stringify(json, null, 2)+"</pre></body></html>";
        w.document.write(windowHTML);
        w.document.close();
        this.aggregate("show-json",json);
    }

    report (exercise: Exercise) {
        //console.log(exercise);
/*
        this.modal.prompt()
            .size('lg')
            .isBlocking(true)
            .keyboard(27)
            .title('Hello World')
            .body('A Customized Modal')
            .open();
*/
        let exercise_sentence = "";

        for (let i = 0; i < exercise.sentence_left.length; i++) {
            this.reported_sentence.push({"word":exercise.sentence_left[i]["word"]});
        }
        this.reported_sentence.push({"word":exercise.target[0]["word"]});
        for(let i = 0; i < exercise.sentence_right.length; i++) {
            this.reported_sentence.push({"word":exercise.sentence_right[i]["word"]});
        }



        // TODO aggregate only when user clicks on "save"
        this.aggregate("report", this.reported_sentence);
    }

    mark (index: number) {

        this.reported_sentence[index]["selected"] = !this.reported_sentence[index]["selected"];
    }

    isLabb() {
    return VersionControllerService.isLabb();
  }
}

class Exercise {
    corpus: string;
    distractors: string[];
    exetype: string;
    korp_url: string;
    larka_url: string;
    sent_index: number;
    sentence_id: string;
    sentence_left: string[];
    sentence_right: string[];
    target: Target[];
    target_index: number;
    target_pos: string;
    target_deprel: string;
    target_semrole: string;
    index: number;
    answer: any;
    links: any;
    json: string;
    constructor() {
        this.distractors= [];
        this.sentence_left = [];
        this.sentence_right = [];
        this.target = [new Target()];
    }
}

class Target {
    word: string;

    constructor() {
        this.word = "...";
    }
}
