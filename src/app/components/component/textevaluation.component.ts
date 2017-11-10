/**
 * Created by David on 6/1/2016.
 */
import {Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {Http} from "@angular/http";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "./pleasewait.component";
import {EasterEggService} from "../../services/easteregg.service";

@Component({
    selector: 'textevaluation',
    templateUrl: 'app/templates/textevaluation.html',
    styleUrls: ['app/css/texteval.css'],
    providers: [PleaseWaitComponent]
})

export class TextEvaluationComponent {

    @ViewChild('userinput') userinput: HTMLTextAreaElement;
    @ViewChild('waiter') waiter: PleaseWaitComponent;

    // TODO remove
    private devMode = false;

    private assessText: boolean;
    private assessEssay: boolean = true;

    private mode: number;
    
    private unprocessed = true;
    private processed = !this.unprocessed;

    private ca1: boolean;
    private ca2: boolean;
    private cb1: boolean;
    private cb2: boolean;
    private cc1: boolean;

    private cunk: boolean;
    private csch: boolean;

    private words;

    private responseObject: ResponseObject;

    private text;

    constructor(private localizer: LocalizerService, private http: Http, private larka: LarkaService, private eggs: EasterEggService) {
        this.words = [];
        this.responseObject = new ResponseObject();
    }

    setAssessmentMode(mode: number) {
        this.mode = mode;
        if (mode == 1) {
            this.assessText = true;
            this.assessEssay = false;
        }
        if (mode == 2) {
            this.assessText = false;
            this.assessEssay = true;
        }
    }

    runAssessment () {
        this.waiter.on();
        let me = this;

        let textarea = this.userinput["nativeElement"];

        this.text = textarea.value;
        let ttt = this.text.split(" ");
        if (ttt.includes("höst") || ttt.includes("Höst") || ttt.includes("hösten") || ttt.includes("Hösten")) {
            this.eggs.magicFunction2();
        }
        this.larka.texteval("complexity",(this.assessText?"expert":"learner"),true,this.text).subscribe(function(data) {
            //console.log(data);
            me.parseResponse(data);
            me.unprocessed = false;
            me.waiter.off();
        });
        // this.http.get("app/data/example_text_augment.json").map(data => data.json()).
        //     subscribe(function (data) {
        //     me.extractWords(data,false);
        //     me.unprocessed = false;
        // });
    }

    parseResponse(data: string) {
        // Overall predicted levels
        let cefrLevelML = data["CEFR_ML"]; // check whether this exists
        let cefrLevelKelly = data["CEFR_kelly_avg"];
        let cefrLevelSvalex = data["CEFR_svalex_avg"];
        let cefrLevelSwell = data["CEFR_swell_avg"];

        this.responseObject.cefrML = cefrLevelML;
        this.responseObject.cefrKelly = cefrLevelKelly;
        this.responseObject.cefrSvalex = cefrLevelSvalex;
        this.responseObject.cefrSwell = cefrLevelSwell;

        // Different scores
        let lixScore = data["LIX"];
        let pntonn = data["PNtoNN"];

        this.responseObject.lixScore = lixScore;
        this.responseObject.lixMapping = this.mapLixScore(lixScore);
        this.responseObject.pntonn = pntonn;

        let avg_dep_len = data["avg_dep_len"];
        let avg_sent_len = data["avg_sent_len"];
        let avg_token_len = data["avg_tok_len"];

        this.responseObject.avgDepLen = avg_dep_len;
        this.responseObject.avgSentLen = avg_sent_len;
        this.responseObject.avgTokLen = avg_token_len;

        let nominal_ratio = data["nominal_ratio"];
        let non_lemmatized = data["non-lemmatized"];
        let nr_sents = data["nr_sents"];
        let nr_tokens = data["nr_tokens"];

        this.responseObject.nominalRatio = nominal_ratio;
        this.responseObject.nonLemmatized = non_lemmatized;
        this.responseObject.nrSents = nr_sents;
        this.responseObject.nrTokens = nr_tokens;

        // Frequency distributions over word lists
        let kelly_cefr = data["kelly_CEFR"];
        let svalex_cefr = data["svalex_CEFR"];
        let swell_cefr = data["swell_CEFR"];

        this.responseObject.kellyCefr = kelly_cefr;
        this.responseObject.svalexCefr = svalex_cefr;
        this.responseObject.swellCefr = swell_cefr;

        // Text with (wordform,svalex,swell) annotation
        let levelled_text = data["levelled_text"];

        // TODO remove; replaced by this.words?
        this.responseObject.levelledText = levelled_text;

        this.words = levelled_text;
    }

    mapLixScore (score) {
        let numScore = parseInt(score);
        /*
        < 30	Mycket lättläst, barnböcker
        30 - 40	Lättläst, skönlitteratur, populärtidningar
        40 - 50	Medelsvår, normal tidningstext
        50 - 60	Svår, normalt värde för officiella texter
        > 60	Mycket svår, byråkratsvenska
        */
        if (numScore < 30) return 'lix-interpretation-very-easy';
        if (numScore >= 30 && numScore < 40) return 'lix-interpretation-easy';
        if (numScore >= 40 && numScore < 50) return 'lix-interpretation-normal';
        if (numScore >= 50 && numScore < 60) return 'lix-interpretation-hard';
        if (numScore >= 60) return 'lix-interpretation-very-hard';
        return "could not map lix score";
    }

    renderJson(text: string) {

        let json = JSON.parse(text);
        this.extractWords(json, true);
        this.unprocessed = false;

    }

    extractWords (json: string, hasResultNode: boolean = true) {
        let sentences;
        if (hasResultNode) {
            sentences = json["result"]["corpus"]["paragraph"]["sentence"];
        } else {
            sentences = json["corpus"]["paragraph"]["sentence"];
        }
        for (let i = 0; i < sentences.length; i++) {
            let words = sentences[i]["w"];

            for (let j = 0; j < words.length; j++) {
                //console.log(words[j]["$t"]);
                //this.words.push(words[j]["$t"]);
                this.words.push(words[j]);
            }
        }
    }

    isColor (word, pos, level) {
        let cefr = level.value.toUpperCase();
        let wordpos = word + "_" + pos;
        return (wordpos["-receptive"] == cefr || wordpos["-productive"] == cefr) && level.checked;
    }

    isBlue (word,pos,cb) {
        return this.isColor(word,pos,cb);
    }

    isGreen (word, pos, cb) {
        return this.isColor(word,pos,cb);
    }

    isYellow (word, pos, cb) {
        return this.isColor(word,pos,cb);
    }

    isOrange (word, pos, cb) {
        return this.isColor(word,pos,cb);
    }

    isRed (word, pos, cb) {
        return this.isColor(word,pos,cb);
    }

    isReceptive (word) {
        return word.hasOwnProperty("-receptive");
    }

    isProductive (word) {
        return word.hasOwnProperty("-productive");
    }

    isPotentiallyIncorrect (word) {
        return word.hasOwnProperty("out-of-saldo");
    }

    getStyle(word) {

        
        let classes = "";
        if (word[1]) {

            let level = word[1];
            if (level === "A1" && this.ca1) {
                classes += "receptive ";
                classes += "blue";
            }
            if (level === "A2" && this.ca2) {
                classes += "receptive ";
                classes += "green";
            }
            if (level === "B1" && this.cb1) {
                classes += "receptive ";
                classes += "yellow";
            }
            if (level === "B2" && this.cb2) {
                classes += "receptive ";
                classes += "orange";
            }
            if (level === "C1" && this.cc1) {
                classes += "receptive ";
                classes += "red";
            }
            if (level === "-" && this.cunk) {
                classes += "out-of-saldo";
            }
        }
        if (this.assessText) { // TODO premature return; only process receptive for expert texts?
            return classes;
        }
        // productive should *always* overwrite receptive
        if (word[2]) {
            //style = "opacity: 0.8;";
            let level = word[2];

            if (level === "A1" && this.ca1) {
                classes = "productive ";
                classes += "blue";
            }
            if (level === "A2" && this.ca2) {
                classes = "productive ";
                classes += "green";
            }
            if (level === "B1" && this.cb1) {
                classes = "productive ";
                classes += "yellow";
            }
            if (level === "B2" && this.cb2) {
                classes = "productive ";
                classes += "orange";
            }
            if (level === "C1" && this.cc1) {
                classes = "productive ";
                classes += "red";
            }
            // should not need to add out-of-saldo here
            // since if it is out of saldo in svalex, it
            // ought to be out of saldo in swell as well
        }

        //style += color;


        return classes;
    }

    editText() {
        this.unprocessed = true;
        //this.userinput["nativeElement"].value = this.text;
    }

    reset () {
        this.ca1 = false;
        this.ca2 = false;
        this.assessEssay = true;
        this.assessText = false;
        this.cb1 = false;
        this.cb2 = false;
        this.cc1 = false;
        this.csch = false;
        this.cunk = false;
        this.unprocessed = true;
        this.userinput["nativeElement"].value = "";
    }

}

class ResponseObject {
    cefrML: string;
    cefrKelly: string;
    cefrSvalex: string;
    cefrSwell: string;

    lixScore: string;
    lixMapping: string;

    pntonn: string;
    avgDepLen: string;
    avgSentLen: string;
    avgTokLen: string;
    nominalRatio: string;
    nonLemmatized: string;
    nrSents: string;
    nrTokens: string;

    kellyCefr: any;
    svalexCefr: any;
    swellCefr: any;

    levelledText: any
}