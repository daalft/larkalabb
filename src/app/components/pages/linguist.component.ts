/**
 * Created by David on 3/9/2016.
 */

import {Component, OnDestroy, OnInit, AfterViewInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {ChoiceSelectorComponent} from "./../component/choiceSelector.component";
import {ModeSelectorComponent} from "../component/modeSelector.component";
import {LarkaService} from "../../services/larka.service";
import {LarkaAdapter} from "../../services/larka.adapter.service";

import {ExerciseComponent} from "../component/exercise.component";
import {StateService} from "../../services/state.service";
import {UserNavbarComponent} from "../navigation/userNavbar.component";

@Component({
    selector: 'tab-out',
    templateUrl: 'app/templates/linguist-component.html',
    directives: [ChoiceSelectorComponent, ModeSelectorComponent, ExerciseComponent, UserNavbarComponent],
    providers: [LarkaService, LarkaAdapter, StateService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LinguistComponent {
    //@ViewChild('target', {read: ViewContainerRef}) target;
    @ViewChild(ModeSelectorComponent)
    modeSelector: ModeSelectorComponent;
    @ViewChild(ExerciseComponent)
    exercise: ExerciseComponent;

    private currentMode;
    private quarantineList: string[] = [];

    private exerciseName: string;
    private exState;
    private numberOfChoices: number[] = [0,0];
    private exerciseParticle: string;
    private exerciseParticles = ["pos_selectionNote","pos_selectionNote", "synt_selectionNote", "synt_selectionNote", "sem_selectionNote"];
    
    constructor(private localizer: LocalizerService, private larka: LarkaService, private state: StateService) {
        this.calculateResume();
        if (this.state.hasState("linguist")) {
            let me = this;
            this.state.retrieve("linguist").subscribe(function(state) {
                me.currentMode = state["currentMode"];
                me.exerciseName = state["exerciseName"];
                me.labels1 = state["labels1"];
                me.multi1 = state["multi1"];
                me.multi2 = state["multi2"];
                me.multi3 = state["multi3"];
                me.exerciseParticle = state["exerciseParticle"];
                me.numberOfChoices = state["numberOfChoices"];
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


    localize(key: string) {
        return this.localizer.localize(key);
    }

    handleModeChange(event) {
        //console.log("mode changed " + event);
        this.currentMode = event;
        this.exercise.requestModeChange(this.currentMode);
    }

    generate(event) {
        //console.log("generation request");
        this.modeSelector.lockButton();
        //console.log("current mode: " + this.currentMode);
        //console.log("current exercise: " + this.exerciseName);
        //console.log("params: " + this._getSelected(this.getChoiceForSelected()));
        let me = this;
        this.larka.generate(this.exerciseName, this._getSelected(this.getChoiceForSelected()), this.quarantineList.join(","), 2).subscribe(function(data) {
            // release generating button
            me.modeSelector.releaseButton();

            me.exercise.setData(data);
            me.quarantineList.push(data["sentence_id"]);
        });
    }

    public labels1: Label[] = <Label[]>[
        {name: "trainPOS1", selected: true},
        {name: "trainPOS2"},
        {name: "trainSYNT1"},
        {name: "trainSYNT2"},
        {name: "trainSemanticRoles"}
    ];// TODO load labels dynamically?

    public multi1: MultiSelectChoice = <MultiSelectChoice>{
        title: "selectWordClasses_plural",
        data: [
            {
                header: {
                    name: "contentWords",
                    selected: false,
                    isHeader: true
                },
                labels: [
                    {name:"adjectives", selected: true},
                    {name:"adverbs", selected: true},
                    {name:"participles", selected: true},
                    {name:"nouns", selected: true},
                    {name:"verbs", selected: true}
                ]
            },
            {
                header: {
                    name: "functionWordClasses",
                    selected: false,
                    isHeader: true
                },
                labels: [
                    {name:"determiners", selected: true},
                    {name:"conjunctions", selected: true},
                    {name:"prepositions", selected: true},
                    {name:"pronouns", selected: true},
                    {name:"subjunctions", selected: true},
                    {name:"numerals", selected: true}
                ]
            }
        ]
    };


    public multi2: MultiSelectChoice = <MultiSelectChoice>{
        title: "selectSyntRoles_plural",
        data: [
            {
                labels: [
                    {name: "adverbial", selected: true},
                    {name: "finite verb", selected: true},
                    {name: "indirect object", selected: true},
                    {name: "nonfinite verb", selected: true},
                    {name: "object", selected: true},
                    {name: "predicate", selected: true},
                    {name: "subject", selected: true}
                ]
            }
        ]
    };


    public multi3: MultiSelectChoice = <MultiSelectChoice>{
        title: "selectSemRoles_plural",
        data: [
            {
                labels: [
                    {name: "agent_sem", selected: true},
                    {name: "experiencer_sem", selected: true},
                    {name: "theme_sem", selected: true},
                    {name: "instrument_sem", selected: true},
                    {name: "location_sem", selected: true},
                    {name: "direction_sem", selected: true},
                    {name: "recipient_sem", selected: true},
                    {name: "origin_sem", selected: true},
                    {name: "time_sem", selected: true},
                    {name: "manner_sem", selected: true},
                    {name: "purpose_sem", selected: true},
                    {name: "cause_sem", selected: true}
                ]
            }
        ]
    };


    setSelected(label: Label) {
        for (var i = 0; i < this.labels1.length; i++) {
            var condition: boolean = (this.labels1[i].name == label.name);
            this.labels1[i]["selected"] = condition;
            if (condition) {
                this.exerciseName = this.labels1[i].name;
            }
        }
        this.calculateResume();
    }

    _getSelectedIndex() {
        for (var i = 0; i < this.labels1.length; i++) {
            if(this.labels1[i]["selected"]) {
                return i;
            }
        }
    }

    getChoiceForSelected () {
        switch(this._getSelectedIndex()) {
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
        var index = this._getSelectedIndex();
        this.exerciseName = this.labels1[index].name;
        this.numberOfChoices = this._countSelected(this.getChoiceForSelected());
        this.exerciseParticle = this.exerciseParticles[index];
    }

    _getSelected (object: MultiSelectChoice) {
        var out = [];
        object.data.forEach(function(a) {
            a.labels.forEach(function(b) {
                if (b.selected) {
                    out.push(b.name);
                }
            })
        });

        return out;
    }

    _countSelected (object : MultiSelectChoice) {
        var count = 0;
        var total = 0;
        object.data.forEach(function(a) {
            a.labels.forEach(function(b) {
                if (b.selected) {
                    count++;
                }
                total++;
            })
        });
        return [count, total];
    }
}

interface Label {
    name: string,
    selected: boolean;
}

interface HeaderLabel extends Label {
    isHeader: boolean;
}

interface MultiSelectChoice {
    title: string,
    data: SelectChoice[]
}

interface SelectChoice {
    header?: HeaderLabel,
    labels: Label[]
}