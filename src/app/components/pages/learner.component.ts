/**
 * Created by David on 3/9/2016.
 */
import {Component} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";


@Component({
    selector: 'tab-out',
    templateUrl: '../../templates/learner-component.html'
})

export class LearnerComponent {

    constructor(public localizer: LocalizerService) {
        this.calculateResume();
    }

    localize(key: string) {
        return this.localizer.localize(key);
    }

    public disableMulti1 = false;
    public useCustom = false;

    public labels1: Label[] = <Label[]>[
    {name: "trainVOC_multi", selected: true},
    {name: "trainVOC_infl"},
    {name: "train_spelling"}
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
                    {name:"adverbs", selected: false},
                    {name:"participles", selected: false},
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
                    {name:"determiners", selected: false},
                    {name:"conjunctions", selected: false},
                    {name:"prepositions", selected: false},
                    {name:"pronouns", selected: false},
                    {name:"subjunctions", selected: false},
                    {name:"numerals", selected: false}
                ]
            }
        ]
    };


    public multi2: MultiSelectChoice = <MultiSelectChoice>{
        title: "selectProficiencyLevel",
        data: [
            {
                labels: [
                    {name: "cefrA1", selected: true},
                    {name: "cefrA2", selected: true},
                    {name: "cefrB1", selected: true},
                    {name: "cefrB2", selected: true},
                    {name: "cefrC1", selected: true},
                    {name: "cefrC2", selected: true}
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
            this.labels1[i]["selected"] = (this.labels1[i].name == label.name);
        }
        this.disableMulti1 = ((this.currentWordlist!="general")&&(this.currentWordlist!="academic"))||(this._getSelectedExerciseIndex()==2);
    }

    _getSelectedExerciseIndex() {
        for (var i = 0; i < this.labels1.length; i++) {
            if(this.labels1[i]["selected"]) {

                return i;
            }
        }
    }


    getChoiceForSelected () {
        switch(this._getSelectedExerciseIndex()) {
            case 0:
            case 1:
                return this.multi1;
            case 2:
                return;
            default: return;
        }
    }

    public exerciseName: string;
    public numberOfWordChoices: number[];
    public exerciseParticle: string;
    private exerciseParticles = ["pos_selectionNote","pos_selectionNote"];
    private levelParticle = "level_selectNote";
    public numberOfLevelChoices: number[];
    public wordListOrUserSearch: string = "...";

    public customWordCount = 0;

    private currentWordlist = "...";

    calculateResume () {
        var index = this._getSelectedExerciseIndex();
        this.exerciseName = this.labels1[index].name;
        this.numberOfWordChoices = this._countSelected(this.getChoiceForSelected());
        this.exerciseParticle = this.exerciseParticles[index];
        this.numberOfLevelChoices = this._countSelected(this.multi2);

    }

    handleUserSearchNumberChange (event) {
        this.customWordCount = event;
    }

    handleWordlistChange (event) {
        this.currentWordlist = event;
        this.disableMulti1 = ((this.currentWordlist!="general")&&(this.currentWordlist!="academic"))||(this._getSelectedExerciseIndex()==2);

    }

    _countSelected (object : MultiSelectChoice) {
        var count = 0;
        var total = 0;
        if (!object) {
            return [0,0];
        }
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

    pluralize(phrase: string) {
        // -> for custom words, change english 'words' to 'word' if custom word count == 1
        if (this.localizer.getLanguage()==='sv') return phrase;
        if (this.customWordCount != 1) return phrase;
        return phrase.replace("words", "word");
    }

    getCurrentWordlist () {
        return this.currentWordlist;
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
