import {KarpService} from "../../services/karp.service";
import {Http} from "@angular/http";
import {Component, ViewChild} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";

import {DataAggregatorService} from "../../services/dataAggregator.service";
import {LoginService} from "../../services/login.service";
import {PleaseWaitComponent} from "../component/pleasewait.component";
import {HttpClient} from "@angular/common/http";

/**
 * Created by David on 1/25/2017.
 */
@Component({
    selector: 'hangbird',
    templateUrl: '../../templates/hangbird-eesti.html',
    styleUrls: ['../../css/hangbird.css']
})

export class HangBirdEestiComponent {

  public numberOfTries = 0;
  public maxNumberOfTries = 7;

  public wordlist = ["tomat",  "roos", "lennuk", "jalgratas", "kana", "kamm", "rukkilill"];

  public currentWord;
  public currentWordVector;
  public previousWord;
  public description;
  public descriptions = [
        "pehme punane köögivili, mida kasutatakse salatites või soojades toitudes",
        "magusa lõhnaga lill, mis kasvab teravate okastega põõsa küljes",
        "tiibadega sõiduk, mis lendab õhus",
        "kahe rattaga sõiduk, mida sa liigutad jalgade abil",
        "emane lind, keda inimesed kasvatavad, et liha ja mune saada",
        "lame plastist või metallist ese, millega saab juukseid korda seada",
        "sinise õiega lill, mis kasvab põllu peal"
    ];
  public translation;
  public translations = [
        "tomato", "rose", "airplane", "bicycle", "chicken", "comb", "cornflower"
    ];

  public image;
  public images = [
        "app/img/wge/tomato.png",
        "app/img/wge/rose.png",
        "app/img/wge/aeroplanes.png",
        "app/img/wge/bicycle.png",
        "app/img/wge/chicken.png",
        "app/img/wge/comb.png",
        "app/img/wge/cornflower.png"
    ];

  public showHint = false;
  public usedHint = false;

  public showDescription = false;
  public showImage = false;

  public letters = [ "A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "Õ", "Ä", "Ö", "Ü"];

  public languages = ["English"];
  public language;

  public levels = ["A1", "A2", "B1", "B2", "C1"];
  public ongoing = false;

  public totalScore = 0;

  public sessionid;

  public inARow = 0;

  public index = -1;

  public eggindices = [1,2,3,4];

    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

    constructor(private karp: KarpService, private http: HttpClient, public localizer: LocalizerService, private aggregator: DataAggregatorService, private login: LoginService) {

    }

    setWord () {
        if (this.ongoing) {
            this.endGame(2);
        }

        this.numberOfTries = 0;
        this.showHint = false;
        this.usedHint = false;
        this.showDescription = false;
        this.showImage = false;
        this.letters = [ "A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "Õ", "Ä", "Ö", "Ü"];

        this.ongoing = true;
        this.previousWord = this.currentWord;

        this.index++;
        this.currentWord = this.wordlist[this.index].toUpperCase();
        this.image = this.images[this.index];
        this.currentWordVector = [];
        for (let i = 0; i < this.currentWord.length; i++) {
            this.currentWordVector[i] = "_";
        }
        console.log(this.currentWord);
        this.getWordInformation();
    }


    showTrans () {
        this.showHint = true;
        this.usedHint = true;
    }

    getWordInformation () {
        this.description = this.descriptions[this.index];
        this.translation = this.translations[this.index];
    }

    tryLetter(letter) {
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
            this.endGame(0);
            return;
        }
        // TODO if word vector equals word, end game
        if (this.currentWordVector.join("") == this.currentWord) {
            this.endGame(1);

        }

    }

    startGame () { // alias
        let me = this;
        this.waiter.on();
        setTimeout(function() {
            me.waiter.off();
            me.setWord();
        }, 2000);
    }

    endGame (status) {
        this.ongoing = false;
        let gscore = 0;
        if (status == 1) {
            this.inARow++;
            gscore = 4;
            if (this.usedHint) {
                gscore -= 1;
            }
            if (this.showDescription) {
                gscore -= 1;
            }
            if (this.showImage) {
                gscore -= 1;
            }
            this.totalScore += gscore;
            if (this.inARow>4) {
                //alert("Five in a row! Score multiplied by 2!");
                this.inARow = 0;
                this.totalScore *= 2;
            }

        } else if (status == 0) {
            this.inARow = 0;
            this.showHint = true;
            this.showDescription = true;
            this.showImage = true;
            this.currentWordVector = this.currentWord.split("");
            return;
        }

        if (status != 2) {
            this.startGame();
        }
    }

    getIndicesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

}
