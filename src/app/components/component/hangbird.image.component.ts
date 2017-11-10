import {KarpService} from "../../services/karp.service";
import {Http} from "@angular/http";
import {Component, ViewChild} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {PleaseWaitComponent} from "./pleasewait.component";
import {DataAggregatorService} from "../../services/dataAggregator.service";
import {LoginService} from "../../services/login.service";
import {LarkaService} from "../../services/larka.service";

/**
 * Created by David on 6/27/2017.
 */
@Component({
    selector: 'hangbird-image',
    templateUrl: 'app/templates/hangbird-image.html',
    styleUrls: ['app/css/hangbird.css']
})

export class HangBirdImageComponent {

    private numberOfTries = 0;
    private maxNumberOfTries = 7;

    private wordlist = {};
    private wordlistA1 = "app/data/A1_svalex_lexin.json";
    private wordlistA2 = "app/data/A2_svalex_lexin.json";
    private wordlistB1 = "app/data/B1_svalex_lexin.json";
    private wordlistB2 = "app/data/B2_svalex_lexin.json";
    private wordlistC1 = "app/data/C1_svalex_lexin.json";

    private wordlistBackup = ["villa","tjuv","kassa","process"];

    private currentWord;
    private currentWordVector;
    private previousWord;

    private description;
    private translation;

    private showHint = false;
    private usedHint = false;

    private letters;
    private levels = ["A1", "A2", "B1", "B2", "C1"];
    private level = "";

    private languages = ["hb-lang-sqi", "hb-lang-bos", "hb-lang-eng", "hb-lang-fin", "hb-lang-ell", "hb-lang-hrv", "hb-lang-kur_north", "hb-lang-fas",
        "hb-lang-rus", "hb-lang-srp", "hb-lang-srp_cyrillic", "hb-lang-som", "hb-lang-spa", "hb-lang-kur_south", "hb-lang-tur"];
    private language;

    private msd;

    private ongoing = false;

    private totalScore = 0;

    private sessionid;

    private inARow = 0;

    private eggindices = [1,2,3,4];

    private indexHistory = [];

    private images = [];
    private selectedArray = [];
    private showImages: boolean = false;
    private waimsPrefix = "https://ws.spraakbanken.gu.se/ws/icall/img/"; // /english/dog.png; /spanish/something.png

    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

    constructor(private karp: KarpService, private http: Http, private localizer: LocalizerService, private aggregator: DataAggregatorService, private login: LoginService, private larka: LarkaService) {
        let me = this;
        console.log("Loading wordlists");
        this.aggregator.getUserInfo();
        this.sessionid = this.login.getRandomId();
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
                        })
                    })
                })
            })
        });
    }

    startGame () {
        if (this.ongoing) {
            this.endGame(2);
        }
        this.waiter.on();
        this.showImages = false;
        let me = this;

        this.numberOfTries = 0;
        this.showHint = false;
        this.usedHint = false;
        this.ongoing = false;
        this.msd = "";
        this.letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Ö","Ä","Å","É"];

        console.log("starting game");
        this.ongoing = true;
        this.previousWord = this.currentWord;
        if (!this.language) {
            this.language = "sqi";
            //this.aggregator.aggregate("wordguess-lang", this.language, this.sessionid);
        }
        if (!this.level) {
            this.level = "A1";
            //this.aggregator.aggregate("wordguess-level", this.level, this.sessionid);
        }
        if (!this.wordlist) {
            return this.getBackupWord("Wordlist not loaded");
        }
        if (!this.wordlist[this.level]) {
            return this.getBackupWord("Requested level not loaded");
        }
        let words = this.wordlist[this.level];

        // Select random index
        let index = Math.floor(Math.random()*words.length);
        // Check whether index has been used before
        while ($.inArray(index,this.indexHistory) > -1) {
            // In order to avoid infinite loops, reset the history when it reaches a certain size
            // as a function of the current level's wordlist's length
            if (this.indexHistory.length >= this.wordlist[this.level].length/2) {
                console.log("clearing history");
                this.indexHistory = [];
            }
            console.log("re-index");
            index = Math.floor(Math.random()*words.length);
        }
        // Add index to history
        this.indexHistory.push(index);

        this.currentWord = words[index]["word"].toUpperCase();
        let pos = words[index]["pos"];
        this.aggregator.setAggregator({"exercise":"wordguess", "target":this.currentWord, "pos": pos, "sessionid":this.sessionid});
        this.aggregator.addInformation("language", this.language);
        this.aggregator.addInformation("level", this.level);

        this.larka.waims(words[index]["word"], pos).subscribe(function(data) {
            me.images.push(me.waimsPrefix+"english/"+data["img1"]);
            me.images.push(me.waimsPrefix+"english/"+data["img2"]);
            me.images.push(me.waimsPrefix+"spanish/"+data["img3"]);
            me.images.push(me.waimsPrefix+"spanish/"+data["img4"]);
            console.log(data);
        });

        //this.currentWord = this.wordlistBackup[0];
        this.currentWordVector = [];
        for (let i = 0; i < this.currentWord.length; i++) {
            this.currentWordVector[i] = "_";
        }
        console.log(this.currentWord);
        this.getWordInformation(this.currentWord.toLowerCase(),pos);
    }

    setLanguage(event) {
        let pl = event.target.value;
        this.language = pl.substr(8); // ignore hb-lang- prefix
        //this.aggregator.aggregate("wordguess-lang", this.language, this.sessionid);
    }

    setLevel(event) {
        this.level = event.target.value;
        //this.aggregator.aggregate("wordguess-level", this.level, this.sessionid);
    }

    showTrans () {
        this.showHint = true;
        this.usedHint = true;
        this.aggregator.addInformation("hint","translation");
    }


    getWordInformation (word,pos) {
        let me = this;

        this.karp.fetchFrom(word,pos,"lexin").map(res => res.json()).subscribe(function(data) {
            let pwords = data["hits"]["hits"];
            let pwordsf = pwords.filter(function(d) { return d["_source"]["FormRepresentations"].length > 15 && d["_source"]["FormRepresentations"][0]["baseform"] == word; });
            let sortedws = pwordsf.sort(function(a,b) {  // sort by sense IDs
                let ax = parseInt(a["_source"]["Sense"][0]["senseid"].slice(-1));
                let bx = parseInt(b["_source"]["Sense"][0]["senseid"].slice(-1));
                if (ax > bx) {
                    return 1;
                }
                if (ax < bx) {
                    return -1;
                }
                return 0;
            });

            let wlist = sortedws[0]["_source"]["FormRepresentations"];

            for (let j = 0; j < wlist.length; j++) {
                // get baseform and lang

                let bf = wlist[j]["baseform"];
                let l  = wlist[j]["lang"];
                if (l == "swe") {
                    //me.description = wlist[j]["text"]; // TODO delete (\d) from text
                    let desc = "";
                    if (wlist[j]["text"]) {
                        desc = wlist[j]["text"]; // if no "text" present, try "desc" from Sense?
                    } else {
                        console.log(wlist[j]);
                        // TODO what to do if no description present?
                    }

                    let digits = /(\(\d\))/;
                    if (desc.match(digits)) {
                        let digit = digits.exec(desc);
                        desc = desc.replace(digit[0], "");
                    }
                    me.description = desc;
                }
                if (l == me.language) {
                    me.translation = bf;
                }
            }

            // TODO catch if loop was ended without extracting information
            if (!me.currentWord || me.currentWord == me.previousWord) {
                console.error("Could not get information for " + word);
            }
            me.waiter.off();
        });
    }

    getBackupWord (reason) {
        console.log("Using backup list");
        console.log(reason);
        return this.wordlistBackup[Math.floor(Math.random()*this.wordlistBackup.length)];
    }

    tryLetter(letter) {
        this.aggregator.addInformation("letter", letter);

        let res = this.getIndicesOf(letter,this.currentWord);
        if (res.length == 0) {
            this.numberOfTries++;
        }
        this.letters.splice(this.letters.indexOf(letter),1); // Remove letter from array of letters
        for (let i = 0; i < res.length; i++) {
            this.currentWordVector[res[i]] = this.currentWord.charAt(res[i]);
        }
        // TODO if num tries > max tries, end game
        if (this.numberOfTries >= this.maxNumberOfTries) {
            this.aggregator.addInformation("end", "fail");
            this.endGame(0);

            return;
        }
        // TODO if word vector equals word, end game
        if (this.currentWordVector.join("") == this.currentWord) {
            this.aggregator.addInformation("end", "win");
            this.endGame(1);

        }

    }

    restartGame () { // alias
        this.images = [];
        this.selectedArray = [];
        this.startGame();
        /*
        let me = this;
        setTimeout(function() {
            me.startGame();
        }, 200);
        */
    }

    selectImage(index) {
        this.selectedArray[index] = !this.selectedArray[index];
    }

    endGame (status) {


        this.ongoing = false;
        let gscore = 0;
        if (status == 1) {
            this.inARow++;
            gscore = 1;
            if (this.usedHint) {
                gscore = 0.5;
            }
            this.totalScore += gscore;
            if (this.inARow>4) {
                //alert("Five in a row! Score multiplied by 2!");
                this.inARow = 0;
                this.totalScore *= 2;
            }
            this.aggregator.addInformation("score", this.totalScore);
            this.aggregator.addInformation("timestamp-end", new Date());
            this.aggregator.closeAggregator();
            this.showImages = true;
        } else if (status == 0) {
            this.inARow = 0;
            this.showHint = true;
            this.currentWordVector = this.currentWord.split("");
            this.aggregator.addInformation("timestamp-end", new Date());
            this.aggregator.closeAggregator();
            return;
        }

        console.log("ending game " + this.totalScore);
        // TODO set overall status based on total score

        if (status != 2) {
            //this.restartGame();
        }
    }

    getIndicesOf(searchStr, str) {
        let searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        let startIndex = 0, index, indices = [];

        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }

}