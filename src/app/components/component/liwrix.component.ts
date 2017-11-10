/**
 * Created by David on 6/19/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {Http} from "@angular/http";
import {LocalizerService} from "../../services/localizer.service";
import {LoginService} from "../../services/login.service";
import {PleaseWaitComponent} from "./pleasewait.component";
import {DataAggregatorService} from "../../services/dataAggregator.service";
import {KorpService} from "../../services/korp.service";
import {TreeKernelComponent} from "../intern/treekernel.component";

@Component({
    selector: "liwrix",
    templateUrl: "app/templates/liwrix.html",
    styleUrls: ["app/css/liwrix.css"]
})

/*****************************************************************************
 * BUGS AND OTHER STUFF
 * ***************************************************************************


 1. Score only keeps the original score: in self-study mode, the score is not
 updated when an incorrect answer is corrected to a correct answer.
 Irrelevant for test mode.

 2. Can only select one single CEFR level for training.
 Could be expanded to allow more than one level?

 3. Resources are linked in via http, change to https?
 */

export class LiwrixComponent {
    @ViewChild('waiter') waiter: PleaseWaitComponent;

    // specific params
    private type;
    private mode;
    private level;
    private spell: boolean = false;
    private mwe: boolean = true;

    // wordlists by level
    private wordlist = {};
    private phrases = [];

    // keeping track of words
    private previousWords = [];
    private currentWord = {'path': ''};

    private score = 0;

    // stuff
    private pathprefix = "https://ws.spraakbanken.gu.se/ws/icall/audio/";
    private sessionid;
    private idCounter = 1;
    private indexes = [];

    private showFirst:boolean = false;
    private showHint:boolean = false;

    private svc = 0; // special vowel count
    private scc = 0; // special consonant count

    private ready:boolean = false;

    private vowels = /[aeiouåöäüéy]/;
    private consonants = /[^aeiouåöäüéy]/;

    // wordlists
    private wordlistA1 = "app/data/A1_svalex_2.json";
    private wordlistA2 = "app/data/A2_svalex_2.json";
    private wordlistB1 = "app/data/B1_svalex_2.json";
    private wordlistB2 = "app/data/B2_svalex_2.json";
    private wordlistC1 = "app/data/C1_svalex_2.json";

    private phraselist = "app/data/lexin-phrases.json";

    constructor(private larka: LarkaService, private http: Http, private localizer: LocalizerService, private login: LoginService, private aggregator: DataAggregatorService, private korp: KorpService) {
        this.aggregator.setLogType("log_db");

        // load word lists
        let me = this;
        console.log("Loading wordlists");
        //this.waiter.on();
        if (this.login.isLoggedIn()) {
            this.sessionid = this.login.getUserId();
        } else {
            this.sessionid = this.login.getRandomId();
        }
        this.http.get(this.wordlistA1).map(res => res.json()).subscribe(function(data) {
            me.wordlist["A1"] = data;
            me.http.get(me.wordlistA2).map(res => res.json()).subscribe(function(data) {
                me.wordlist["A2"] = data;
                me.http.get(me.wordlistB1).map(res => res.json()).subscribe(function(data) {
                    me.wordlist["B1"] = data;
                    me.http.get(me.wordlistB2).map(res => res.json()).subscribe(function(data) {
                        me.wordlist["B2"] = data;
                        me.http.get(me.wordlistC1).map(res => res.json()).subscribe(function(data) {
                            me.wordlist["C1"] = data;
                            console.log("Loaded wordlists");
                            me.ready = true;
                        })
                    })
                })
            })
        });
        this.http.get(this.phraselist).map(res => res.json()).subscribe(function(data) {
            me.phrases = data;
            console.log("Loaded phrases");
        })
    }

    check (id) {
        let word = this.fetchById(id);
        //word["tries"]++;
        let newanswer = $('#answer-'+id).val();
        //word["answer"] = newanswer; // TODO problematic?? removes previous answer?
        return word["word"] == newanswer;
    }

    checkManual (id) {
        let word = this.fetchById(id);
        word["tries"]++;
        let newanswer = $('#answer-'+id).val();
        word["answers"].push(newanswer);

        // TODO add aggregator information about updated answer

        return word["word"] == newanswer;
    }

    fetchById (id) {
        for (let i = 0; i < this.previousWords.length; i++) {
            let cobj = this.previousWords[i];
            if (cobj["id"] == id) {
                return cobj;
            }
        }
    }

    getRandomWord(level) {
        if (this.type < 2) {
        let index = Math.floor(Math.random()*this.wordlist[this.level].length);
        while (this.indexes.indexOf(index)>-1) {
            index = Math.floor(Math.random()*this.wordlist[this.level].length);
        }
            this.indexes.push(index);
            return this.wordlist[this.level][index];
        } else {
            if (this.type == 2) {
                let index = Math.floor(Math.random()*this.phrases.length);
                while (this.indexes.indexOf(index)>-1) {
                    index = Math.floor(Math.random()*this.phrases.length);
                }
                this.indexes.push(index);
                return this.phrases[index];
            }
        }
    }

    generateWord(word) {
        let me = this;
        this.waiter.on();
        this.currentWord["word"] = word;
        this.currentWord["id"] = this.idCounter++;
        this.currentWord["tries"] = 0;
        this.currentWord["answers"] = [];
        if (this.score > 0) {
            if (this.type < 2) {
            let checkOne = Math.random()>0.85;
            if (checkOne) {
                this.currentWord["special-vowel"] = true;
                this.svc++;
            } else {
                let checkTwo = Math.random()>0.85;
                if (checkTwo) {
                    this.currentWord["special-consonant"] = true;
                    this.scc++;
                }
            }
            }
        }
        this.larka.speak(word, this.spell?'spell':'').subscribe(function(d) {
            if (d["Status"]) {
                if (d["Status"] == 200) {
                    me.currentWord["path"] = me.pathprefix+d["filename"];
                    me.waiter.off();

                    setTimeout(function() {
                        $("#answer-"+(me.idCounter-1)).focus();
                    }, 500);
                    if (me.type < 2) {
                        me.loadhints(word);
                    }
                    return 1;
                }
            }
            me.waiter.off();
            return 0; // should never happen anyway
        });
    }

    loadhints(word) {
        let me = this;
        this.korp.fetch(word).subscribe(function(d) {
            let sentences = d["kwic"];
            let hints = [[],[]];
            for (let i = 0; i < sentences.length; i++) {
                let sentence = sentences[i];
                let tokens = sentence["tokens"];
                let start_index = sentence["match"]["start"];
                let end_index = sentence["match"]["end"];
                // Looks a bit strange but the function is useable here too
                let words = TreeKernelComponent.extractWords(tokens);
                let words2 = TreeKernelComponent.extractWords(tokens);
                for (let i = start_index; i < end_index; i++) {
                    words[i] = "_____";
                    words2[i] =
                        words2[i][0] + // first letter of word
                        words2[i].slice(1).split("").reduce(function(acc,n){ return acc + "_";},""); // placeholders for each letter in word
                }
                let sent_left = words.slice(0,start_index);
                let target = words.slice(start_index,end_index);
                let target2 = words2.slice(start_index,end_index);
                let sent_right = words.slice(end_index);
                let obj = {
                    "sent_left": sent_left.join(" "),
                    "target": target.join(" "),
                    "sent_right": sent_right.join(" ")
                };
                let obj2 = {
                    "sent_left": sent_left.join(" "),
                    "target": target2.join(" "),
                    "sent_right": sent_right.join(" ")
                };

                hints[0].push(obj);
                hints[1].push(obj2);
            }
            me.currentWord["hints"] = hints;
        });
    }

    hint(id) {
        //let word = this.fetchById(id);
        this.showHint = true;
        this.currentWord["showSentences"] = 1;
        //this.hintCount++;
    }

    hint2 () {
        this.showFirst = true;
        this.currentWord["showInitialLetter"] = 1;
    }

    validate () {
        let lastAnswer = this.currentWord["answers"][this.currentWord["answers"].length-1];
        if (!lastAnswer) {
            return;
        }
        let target = this.currentWord["word"];
        let isSpecialVowel = this.currentWord["special-vowel"];
        let isSpecialConsonant = this.currentWord["special-consonant"];

        let me = this;

        if (isSpecialVowel) {
            if (lastAnswer === target) {
                this.score += 3;
                return;
            }
            let lav = lastAnswer.split("").filter(function(v) {
                return me.vowels.test(v);
            });
            let tav = target.split("").filter(function(v) {
                return me.vowels.test(v);
            });
            if (lav.length == tav.length) {
                for (let i = 0; i < lav.length; i++) {
                    if (lav[i] != tav[i]) {
                        return;
                    }
                }
            }
            this.score += 2;
        } else if (isSpecialConsonant) {
            if (lastAnswer === target) {
                this.score += 3;
                return;
            }
            let lav = lastAnswer.split("").filter(function(v) {
                return me.consonants.test(v);
            });
            let tav = target.split("").filter(function(v) {
                return me.consonants.test(v);
            });
            if (lav.length == tav.length) {
                for (let i = 0; i < lav.length; i++) {
                    if (lav[i] != tav[i]) {
                        return;
                    }
                }
            }
            this.score += 2;
        } else {
            if (lastAnswer === target) {
                this.score++;
            }
        }
    }

    next() {
        if (!this.currentWord["answers"]) {
            this.currentWord["answers"] = [];
            this.aggregator.setAggregator({'exercise': 'liwrix'});
        }
        this.currentWord["answers"].push($('#answer-'+this.currentWord["id"]).val());
        this.currentWord["tries"]++;

        this.validate(); // update score

        let temp = this.currentWord;
        if (temp['path']) {
            for (let key in temp) {
                if (temp.hasOwnProperty(key)) {
                    this.aggregator.addInformation(key, temp[key]);
                }
            }
            this.aggregator.addInformation("uid", this.sessionid);
            this.aggregator.addInformation("timestamp-end", new Date());
        }
        // new word
        this.currentWord = {'path': ''};
        this.generateWord(this.getRandomWord(this.level));
        if (temp['path']) { // catch first time archiving void object
            this.previousWords.unshift(temp);
            this.aggregator.closeAggregator();
            this.aggregator.setAggregator({'exercise': 'liwrix'});
        }
        // reset stuff
        this.showHint = false;
        this.showFirst = false;
    }

    setParams(type,mwe,level,mode) {
        if (type == 1) {
            this.spell = true;
        }
        this.type = type;
        this.mode = mode;
        this.mwe = mwe;
        this.level = this.mapToLevel(level);
        this.next();
    }

    mapToLevel(int) {
        switch(int) {
            case 0: return "A1";
            case 1: return "A2";
            case 2: return "B1";
            case 3: return "B2";
            case 4: return "C1";
            default:
                break;
        }
    }

    getTotal() {
        return this.previousWords.length;
    }

    getCorrect() {
        return this.previousWords.filter(function(d) {
            if (d["word"] == d["answers"][d["answers"].length-1]) {
                return 1;
            }
        }).length;
    }

    keyhandler(event, id?) {
        if (event.keyCode == 13) {
            if (!id) {
                this.next();
            } else {
                this.checkManual(id);
            }
        }
    }
}