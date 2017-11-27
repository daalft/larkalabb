/**
 * Created by David on 1/18/2017.
 */
import {Component} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {DataAggregatorService} from "../../services/dataAggregator.service";
import {LoginService} from "../../services/login.service";
import {KorpService} from "../../services/korp.service";
@Component({
    selector: 'treekernel',
    templateUrl: '../../templates/treekernel-eval.html',
    styleUrls: ['../../css/treekernel.css']
})

export class TreeKernelComponent {

    public modelSentence = "";
  public tokens = [];
  public maxSentenceLength = 10;

    constructor(private korp: KorpService, private larka: LarkaService, private aggregator: DataAggregatorService, private login: LoginService) {

    }

    fetchSentence(query) {
        let me = this;
        this.korp.fetch(query).subscribe(function(data) {
            let sentences = data["kwic"];
            for (let i = 0; i < sentences.length; i++) {
                let sentence = sentences[i];
                let tokens = sentence["tokens"];
                if (tokens.length > me.maxSentenceLength) {
                    continue;
                }
                let words = TreeKernelComponent.extractWords(tokens);
                me.modelSentence = TreeKernelComponent.linearize(words);
                console.log(me.modelSentence);
                me.tokens = TreeKernelComponent.shuffle(words);
                break;
            }
            if (me.modelSentence === "") {
                console.error("No sentences retained. Relaunching query.");
                me.fetchSentence(query);
            }
        });
    }

    static extractWords (tokens) {
        let a = [];
        for (let i = 0; i < tokens.length; i++) {
            let w = tokens[i]["word"];
            a.push(w);
        }
        return a;
    }

    static linearize(tokens) {
        let p = tokens.pop();
        let phrase = tokens.join(" ");
        tokens.push(p);
        return phrase + p;
    }

    static shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
    }

    evaluate (composition) {
        //let composition = $('#composition').val();
        if (composition !== this.modelSentence) {
            this.larka.ptk(this.modelSentence,composition).subscribe(function(d) {
                console.log(d);
            });
        } else {
            console.log("exact match");
        }
        // else get next sentence
    }
}
