/**
 * Created by David on 1/11/2017.
 */
import {Component} from "@angular/core";
import {LoggerService} from "../../services/logger.service";
import {LoginService} from "../../services/login.service";
import {DataAggregatorService} from "../../services/dataAggregator.service";
import {VersionControllerService} from "../../services/version.controller.service";

@Component({
    selector: 'exetype',
    templateUrl: '../../templates/exetypes.html',
    styleUrls: ['../../css/molna.css']
    }
)

export class ExerciseTypeComponent {

  public currentEx = -2;

  public hasEx = true;

  public aboutyou = [];
  public states = [];
  public levels = [];

  public exename = ["Bundled gaps 1", "Bundled gaps 2", "Vocabulary 1", "Vocabulary 2", "Sentence rearrangement", "Sentence composition", "Multiple choice"];

    constructor(private logger: LoggerService, private aggregator: DataAggregatorService, private login: LoginService) {

    }

    continuv () {

        if (this.currentEx == -2) { // Do not save values from introductory page
            this.currentEx++;
            this.resetCheckboxes();
            this.resetCommentBox();
            this.hasEx = false; // disable evaluation form for next page
            return;
        }
        if (this.currentEx == -1) {
            let position = $('#select-position > :checked')[0];
            if (!position) {
                alert("Please indicate your position");
                return;
            }
            let position_s = (position as any).value;
            if (position_s == "other") {
                position_s = $('#input-other-position').val();
                if (!position_s) {
                    alert("Please indicate your position");
                    return;
                }
            }
            let swedish = $('#select-mothertongue > :checked')[0];
            if (!swedish) {
                alert("Please indicate whether you are a native speaker");
                return;
            }
            let swedish_s = (swedish as any).value;
            this.currentEx++;
            this.hasEx = true; // enable evaluation form
            this.aboutyou.push({'position': position_s, 'native': swedish_s});
            return;
        }

        let comments = $('#comments').val();
        let children = $($('#levels')[0]).children();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childOfChild = $(child).children()[0];
            let checked_b = (childOfChild as any).checked;
            if (checked_b) {
                let level = (childOfChild as any).value;
                this.levels.push(level);
            } else {
                this.levels.push(0);
            }
        }

        this.states[this.currentEx]={'comments': comments, 'levels': this.levels, 'index': this.currentEx};
        this.resetCommentBox();
        this.resetCheckboxes();
        this.levels = [];
        this.currentEx++;
        this.restoreState(this.currentEx);
    }

    backv () {
        this.currentEx--;
        this.restoreState(this.currentEx);
    }

    restoreState(index) {
        if (index < 0) {
            return;
        }
        if (!this.states[index]) {
            return;
        }
        let state = this.states[index];
        let comments = state.comments;
        let levels = state.levels;
        $('#comments').val(comments);
        let children = $($('#levels')[0]).children();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childOfChild = $(child).children()[0];
            (childOfChild as any).checked = levels[i] != 0;
        }
    }

    submitv() {
        let id = this.login.getRandomId();
        this.states.push(this.aboutyou[0]);
        let gcom = $('#general-comments').val();
        this.states.push({'general-comments': gcom});
        this.aggregator.aggregate("ex-eval", this.states, id);
        this.aggregator.flush();
        this.currentEx++;
    }

    summary () {
        return this.states;
    }

    resetCheckboxes () {
        let children = $($('#levels')[0]).children();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let childOfChild = $(child).children()[0];
            (childOfChild as any).checked = false;
        }
    }

    resetCommentBox () {
        $('#comments').val("");
    }

    ngAfterViewInit () {
        let me = this;
        $('.eselectable').on('click', function(d) {
            $(d.target).toggleClass('eselactive');
        });
        ($( "#sortable" ) as any).sortable({
            placeholder: "ui-state-highlight",
            forcePlaceholderSize: true
        });
        ($( "#sortable" ) as any).disableSelection();
    }
}
