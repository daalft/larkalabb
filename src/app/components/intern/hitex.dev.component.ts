/**
 * Created by David on 10/24/2016.
 */
import {Component, ViewChild} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {SwitchToggleComponent} from "../component/switch-toggle.component";
import {PleaseWaitComponent} from "../component/pleasewait.component";
import {LarkaService} from "../../services/larka.service";

@Component({
    selector: 'hitexdev',
    templateUrl: 'app/templates/hitexdev.html',
    styleUrls: ['app/css/hitex.css'],
    providers: [SwitchToggleComponent]
})

export class HitexDevComponent {
    @ViewChild('waiter') waiter: PleaseWaitComponent;

    private maxsent;

    private searchmode: number = 0;
    private cqpmode = false;

    private useDefaults: boolean = true;

    private sensitiveVocab = false;

    private showAdvancedOptions = false;

    private pos_names = [
        "AB", "HA", "JJ", "RG", "KN", "DT", "IE",
        "IN", "NN", "RO", "PC", "PL", "PP", "PN", "PM",
        "PS", "SN", "VB"
    ];

    private currentPos;

    // advanced menu toggle flags for showing and hiding menu
    private menuToggle = [false, false, false, false, false];

    private searchtermPosition: number = 0;

    private hits = [];
    private badhits = [];

    // selected CEFR level
    private cefr;

    // has a search already been run or are we virgin?
    private searchRun: boolean = false;
    // keep previous search results?
    private keepPrevious: boolean = false; // TODO add GUI checkbox

    private oneHundred = [];

    constructor(private localizer: LocalizerService, private larka: LarkaService) {}
    
    resetOneHundred () {
        this.oneHundred = [];
    }
    
    changeMode (val) {
        this.searchmode = val;
        this.cqpmode = val == 2;
    }

    changePos(event) {
        if (event.target.value == "any") {
            this.currentPos = "";
            return;
        }
        this.currentPos = event.target.value.split("(")[1].split(")")[0];
    }

    searchmodeString () {
        if (this.searchmode == 0) {
            return 'hitex-lemma';
        }
        if (this.searchmode == 1) {
            return 'hitex-wordform';
        }
        if (this.searchmode == 2) {
            return 'hitex-cqp';
        }
        return 'error';
    }

    toggle (position) {
        this.menuToggle[position] = !this.menuToggle[position];
    }

    setSearchtermPosition (pos) {
        this.searchtermPosition = pos;
    }

    searchtermPositionString() {
        if (this.searchtermPosition == 0) {
            return 'hitex-of-start';
        }
        if (this.searchtermPosition == 1) {
            return 'hitex-of-end';
        }
        return 'error';
    }

    run () {
        this.searchRun = false;
        this.waiter.on();

        this.maxsent = parseInt($('#maxsent').val());

        // TODO reset lists? Keep previous results? -> changing CEFR level can result in sentences being both hit and badhit
        if (!this.keepPrevious) {
            this.hits = [];
            this.badhits = [];
        }

        let query_w = $('#searchfield').val();

        let use_defaults = $('#usedefaults').is(':checked');

        let query_type = "";
        if (this.searchmode == 0) {
            query_type = "lemma";
        }
        if (this.searchmode == 1) {
            query_type = "wordform";
        }
        if (this.searchmode == 3) {
            query_type = "cqp";
        }

        let query_pos = "";
        if (this.searchmode == 0 || this.searchmode == 1) {
            if (this.currentPos != "any") { // or the SWE version?
                query_pos = this.currentPos;
            }
        }

        let max_kwics = 100;
        let corpus_list = "suc3,gp1994,gp2001,gp2002,gp2003,gp2004,gp2005,gp2006,gp2007,gp2008,gp2009,gp2010,gp2011,gp2012,gp2013";
        let maxhit = 20;
        let random_seed = "";
        let target_cefr = "";
        let tc = $('input[type="radio"]:checked').val();
        if (tc != "all") {
            target_cefr = tc;
            this.cefr = tc;
        }
        let me = this;
        this.larka.hitex(query_w, query_type, use_defaults, query_pos, max_kwics, corpus_list, maxhit, random_seed, target_cefr).subscribe(function(data) {
            if (!data) {
                me.waiter.off();
                alert("Something went wrong!");
                return;
            }
            if (data["Error"]) {
                me.waiter.off();
                alert("Something went wrong: " + data["Error"]);
                return;
            }
            data.forEach(function(d) {
                let b = {"sentence_left": d["sent_left"],
                    "target": d["keyword"]["word"],
                    "sentence_right": d["sent_right"],
                    "score": d["score"],
                    "id": d["kwic_position"],
                    "showInfo": false
                };

                if (parseFloat(b["score"]) < 0) {
                    //me.badhits.push(b);
                } else {
                    //me.hits.push(b);
                    let found = false;
                    for (let i = 0; i < me.oneHundred.length; i++) {
                        if (me.oneHundred[i]["id"] == b["id"]) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        me.oneHundred.push(b);
                    }
                }
            });
            me.waiter.off();
            me.searchRun = true;
            if (me.oneHundred.length < me.maxsent) {
                console.log(me.oneHundred.length);
                me.run();
            } else {
                alert("Reached threshold");
            }
        },
        function(err) {
            me.waiter.off();
            alert("Something went wrong! " + err);
        },
        function() {
            console.log("Completed.");
        });
    }

    keyhandler(keycode) { // run search on ENTER in search field
        if (keycode == 13) {
            this.run();
        }
    }
}