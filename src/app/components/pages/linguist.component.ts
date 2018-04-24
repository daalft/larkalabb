/**
 * Created by David on 3/9/2016.
 */

import {Component, ViewChild} from '@angular/core';
import {LocalizerService} from '../../services/localizer.service';
import {ModeSelectorComponent} from '../component/modeSelector.component';
import {LarkaService} from '../../services/larka.service';
import {LarkaAdapter} from '../../services/larka.adapter.service';

import {ExerciseComponent} from '../component/exercise.component';
import {StateService} from '../../services/state.service';


@Component({
  selector: 'tab-out',
  templateUrl: '../../templates/linguist-component.html',
  styleUrls: ['../../css/linguist.css'],
  providers: [LarkaService, LarkaAdapter, StateService]
})

export class LinguistComponent {
  @ViewChild(ModeSelectorComponent)
  modeSelector: ModeSelectorComponent;
  @ViewChild(ExerciseComponent)
  exercise: ExerciseComponent;

  public showOptions = false;

  public currentMode;
  public quarantineList: string[] = [];

  public exerciseName: string;
  public exState;
  public numberOfChoices: number[] = [0, 0];
  public exerciseParticle: string;
  public exerciseParticles = ['pos_selectionNote', 'pos_selectionNote', 'synt_selectionNote', 'synt_selectionNote', 'sem_selectionNote'];

  public dia_counter = 0;

  public historyObj = [];
  public summary = {"corr": 0, "inc": 0};
  public summary2 = {};
  public summaryKeys = [];

  private smap = [];
  private num_per_item = 3;
  public num_dia_items = 0;

  public showSummary: boolean;

  public sendingEnhancement: boolean;
  public sentEnhancement: boolean;

  constructor(public localizer: LocalizerService, private larka: LarkaService, private state: StateService) {
    this.calculateResume();
    if (this.state.hasState('linguist')) {
      const me = this;
      this.state.retrieve('linguist').subscribe(function(state) {
        me.currentMode = state['currentMode'];
        me.exerciseName = state['exerciseName'];
        me.labels1 = state['labels1'];
        me.multi1 = state['multi1'];
        me.multi2 = state['multi2'];
        me.multi3 = state['multi3'];
        me.exerciseParticle = state['exerciseParticle'];
        me.numberOfChoices = state['numberOfChoices'];
      });
    }

  }


  // ngAfterViewInit() {
  //     if (this.state.hasState("linguist")) {
  //         var me = this;
  //
  //         this.state.retrieve("linguist").subscribe(function(state) {
  //             me.exState = state["exState"];
  //             me.exercise.reinitialize(me.exState);
  //         });
  //
  //         //this.calculateResume ();
  //     } else {
  //         this.calculateResume ();
  //     }
  //     setTimeout(function() {
  //         console.log("after view init");
  //     }, 0);
  // }

  routerOnActivate () {

  }

  /*ngOnDestroy () {
	  console.log("saving state");
	  let currentState = {};
	  currentState["currentMode"] = this.currentMode;
	  currentState["exerciseName"]= this.exerciseName;
	  currentState["exState"]= this.exercise;
	  currentState["currentMode"]= this.currentMode;
	  currentState["labels1"]= this.labels1;
	  currentState["multi1"]= this.multi1;
	  currentState["multi2"]= this.multi2;
	  currentState["multi3"]= this.multi3;
	  currentState["exerciseParticle"] = this.exerciseParticle;
	  currentState["numberOfChoices"]= this.numberOfChoices;
	  //console.log(currentState);
	  this.state.persist("linguist", currentState);
  }*/


  floor(num) {
    return Math.floor(num);
  }

  localize(key: string) {
    return this.localizer.localize(key);
  }

  handleModeChange(event) {
    //console.log("mode changed " + event);
    this.currentMode = event;
    this.exercise.requestModeChange(this.currentMode);
    if (this.currentMode === "diagnostic_test") {
      this.modeSelector.setCanChangeMode(false);
    }
  }

  calculateSummary() {
    for (let i = 0; i < this.historyObj.length; i++) {
      const ex = this.historyObj[i];
      const etype = ex["exetype"];
      const ans = ex["answer"];
      let target = "";
      if (etype === "pos1") {
        target = ex["target_pos"];
      }
      if (etype === "pos2") {
        target = ex["target_pos"];
      }
      if (etype == 'synt1' || etype == 'synt2') {
        target = ex["target_deprel"];
      }
      if (etype == 'sem_roles') {
        target = ex["target_semrole"];
      }
      if (!(target in this.summary2)) {
        this.summary2[target] = {};
        this.summary2[target]["corr"] = 0;
        this.summary2[target]["inc"] = 0;
      }
      if (ans === target) {
        this.summary["corr"]++;
        this.summary2[target]["corr"]++;
      } else {
        this.summary["inc"]++;
        this.summary2[target]["inc"]++;
      }
    }
    this.summaryKeys = Object.keys(this.summary2);
    this.showSummary = true;
  }

  closeSummary() {
    this.dia_counter = 0;
    this.showSummary = false;
    this.sentEnhancement = false;
  }

  concat (left, target, right) {
    let sentence = "";
    for (let i = 0; i < left.length; i++) {
      sentence += left[i]["word"] + " ";
    }
    sentence += "** ";
    for (let i = 0; i < target.length; i++) {
      sentence += target[i]["word"] + " ";
    }
    sentence += "** ";
    for (let i = 0; i < right.length; i++) {
      sentence += right[i]["word"] + " ";
    }
    return sentence;
  }

  enhance(tf) {
    this.sendingEnhancement = true;
    let obj = [];
    for (let i = 0; i < this.historyObj.length; i++) {
      const o = this.historyObj[i];
      let q = {};
      const sentence = this.concat(o["sentence_left"], o["target"], o["sentence_right"]);
      q["sentence"] = sentence;
      const tt = o["time_taken"];
      q["tt"] = tt;
      const sa = o["answer"];
      q["sa"] = sa;
      const ta = o['target_pos'] ? o['target_pos'] : o['target_deprel'] ? o['target_deprel'] : o['target_semrole'];
      q["ta"] = ta;
      const dist = o["distractors"];
      q["dist"] = dist;

      obj.push(q);

    }
    obj.push({"summary": this.summary, "summary2": this.summary2});
    const me = this;
    this.larka.enhance(tf, obj).subscribe(function(d) {
      console.log("Enhancement complete");
      me.sendingEnhancement = false;
      me.sentEnhancement = true;
    });

  }

  print_page() {
    window.print();
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
  generate_diagnostic() {

    if (this.dia_counter === 0) {
      const sels = this._getSelected(this.getChoiceForSelected());
      for (let i = 0; i < this.num_per_item; i++) {
        this.smap = this.smap.concat(sels);
      }
      this.shuffle(this.smap);
      this.num_dia_items = this.smap.length;
    }
    if (this.dia_counter === this.num_dia_items) {
      this.modeSelector.releaseButton();
      this.historyObj = this.exercise.getHistory();
      this.calculateSummary();
      //this.exercise.setCanChangeMode(true);
      this.modeSelector.setCanChangeMode(true);
      return;
    }
    if (this.smap.length === 0) {
      console.log("Error. No selection in smap for diagnostic.");
      return;
    }
    const csel = this.smap.shift();

    const me = this;
    this.larka.generate(this.exerciseName,[csel], this.quarantineList.join(','), 2).subscribe(function(data) {
        me.modeSelector.waiterOff();
        me.exercise.setData(data);
        me.quarantineList.push(data['sentence_id']);
        me.dia_counter++;
    });
  }

  showjson() {
    //console.log(json);
    let w = window.open();
    let windowHTML = "<!DOCTYPE HTML><html><head><title>Lärka - JSON result</title></head><body><pre id=\"json_result\">"+JSON.stringify(this.historyObj, null, 2)+"</pre></body></html>";
    w.document.write(windowHTML);
    w.document.close();

  }

  generate(event) {
    //console.log("generation request");
    this.modeSelector.lockButton();
    //console.log("current mode: " + this.currentMode);
    //console.log("current exercise: " + this.exerciseName);
    //console.log("params: " + this._getSelected(this.getChoiceForSelected()));
    const me = this;
    if (this.currentMode === 'diagnostic_test') {
      return this.generate_diagnostic();
    }

    this.larka.generate(this.exerciseName, this._getSelected(this.getChoiceForSelected()), this.quarantineList.join(','), 2).subscribe(function(data) {
      // release generating button
      me.modeSelector.releaseButton();
      me.exercise.setData(data);
      me.quarantineList.push(data['sentence_id']);
    });
  }

  public labels1: Label[] = <Label[]>[
    {name: 'trainPOS1', selected: true},
    {name: 'trainPOS2'},
    {name: 'trainSYNT1'},
    {name: 'trainSYNT2'},
    {name: 'trainSemanticRoles'}
  ]; // TODO load labels dynamically?

  public multi1: MultiSelectChoice = <MultiSelectChoice>{
    title: 'selectWordClasses_plural',
    data: [
      {
        header: {
          name: 'contentWords',
          selected: false,
          isHeader: true
        },
        labels: [
          {name: 'adjectives', selected: true},
          {name: 'adverbs', selected: true},
          {name: 'participles', selected: true},
          {name: 'nouns', selected: true},
          {name: 'verbs', selected: true}
        ]
      },
      {
        header: {
          name: 'functionWordClasses',
          selected: false,
          isHeader: true
        },
        labels: [
          {name: 'determiners', selected: true},
          {name: 'conjunctions', selected: true},
          {name: 'prepositions', selected: true},
          {name: 'pronouns', selected: true},
          {name: 'subjunctions', selected: true},
          {name: 'numerals', selected: true}
        ]
      }
    ]
  };


  public multi2: MultiSelectChoice = <MultiSelectChoice>{
    title: 'selectSyntRoles_plural',
    data: [
      {
        labels: [
          {name: 'adverbial', selected: true},
          {name: 'finite verb', selected: true},
          {name: 'indirect object', selected: true},
          {name: 'nonfinite verb', selected: true},
          {name: 'object', selected: true},
          {name: 'predicate', selected: true},
          {name: 'subject', selected: true}
        ]
      }
    ]
  };


  public multi3: MultiSelectChoice = <MultiSelectChoice>{
    title: 'selectSemRoles_plural',
    data: [
      {
        labels: [
          {name: 'agent_sem', selected: true},
          {name: 'experiencer_sem', selected: true},
          {name: 'theme_sem', selected: true},
          {name: 'instrument_sem', selected: true},
          {name: 'location_sem', selected: true},
          {name: 'direction_sem', selected: true},
          {name: 'recipient_sem', selected: true},
          {name: 'origin_sem', selected: true},
          {name: 'time_sem', selected: true},
          {name: 'manner_sem', selected: true},
          {name: 'purpose_sem', selected: true},
          {name: 'cause_sem', selected: true}
        ]
      }
    ]
  };


  setSelected(label: Label) {
    for (let i = 0; i < this.labels1.length; i++) {
      const condition: boolean = (this.labels1[i].name == label.name);
      this.labels1[i]['selected'] = condition;
      if (condition) {
        this.exerciseName = this.labels1[i].name;
      }
    }
    this.calculateResume();
  }

  _getSelectedIndex() {
    for (let i = 0; i < this.labels1.length; i++) {
      if (this.labels1[i]['selected']) {
        return i;
      }
    }
  }

  getChoiceForSelected () {
    switch (this._getSelectedIndex()) {
      case 0:
      case 1:
        return this.multi1;
      case 2:
      case 3:
        return this.multi2;
      case 4:
        return this.multi3;
      default: return;
    }
  }


  calculateResume () {
    const index = this._getSelectedIndex();
    this.exerciseName = this.labels1[index].name;
    this.numberOfChoices = this._countSelected(this.getChoiceForSelected());
    this.exerciseParticle = this.exerciseParticles[index];
  }

  _getSelected (object: MultiSelectChoice) {
    const out = [];
    object.data.forEach(function(a) {
      a.labels.forEach(function(b) {
        if (b.selected) {
          out.push(b.name);
        }
      });
    });

    return out;
  }

  _countSelected (object: MultiSelectChoice) {
    let count = 0;
    let total = 0;
    object.data.forEach(function(a) {
      a.labels.forEach(function(b) {
        if (b.selected) {
          count++;
        }
        total++;
      });
    });
    return [count, total];
  }
}

interface Label {
  name: string;
  selected: boolean;
}

interface HeaderLabel extends Label {
  isHeader: boolean;
}

interface MultiSelectChoice {
  title: string;
  data: SelectChoice[];
}

interface SelectChoice {
  header?: HeaderLabel;
  labels: Label[];
}
