/**
 * Created by David on 5/13/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
@Component({
    selector: 'tagger',
    templateUrl: '../../templates/tagger.html'
})

export class TaggerComponent {

  public sentences = [];
  public parallel = [];

  public resultsen = "";
  public resultpar = "";

  public tags = [];

  public index = 0;

  public target = /put(s|ten|ting)?\s((.+?)\s)?up/;

  public resulthidden = true;

    acquire (data, tagged) {
        this.sentences = data.split(/\n/);
        this.sentences.push("ooo put up ooo PRESS ENTER TO FINALIZE");
        this.parallel = tagged.split(/\n/);
    }

  public faulty = 0;

    process (sentence) {

        let match = this.target.exec(sentence);
        if (match == null) {
            this.faulty++;
            return "<span class='tagger-error'>Please press ESC to jump faulty sentence</span><br/>" + sentence;
        }
        let startpos = match.index;
        let endpos = startpos+match[0].length;

        let startingtag = "<span class='tagger-target'>";
        let closingtag = "</span>";

        // insert first at endpos, then startpos, so that endpos is not changed by inserting to startpos

        var withClosing = [sentence.slice(0, endpos), closingtag, sentence.slice(endpos)].join('');
        return [withClosing.slice(0, startpos), startingtag, withClosing.slice(startpos)].join('');
    }

    evaluate(key) {
        console.log(key.which);
    }

    getCurrent () {
        return this.process(this.sentences[this.index]);
    }

  public cooldown = false;

    activate (key) {
        if (this.cooldown) {
            return;
        }
        let tag = -1;
        switch(key.which) {
            case 37:
                tag = 0;
                this.tags.push(tag);
                break;
            case 39:
                tag = 1;
                this.tags.push(tag);
                break;
            case 27:
                this.deleteFaulty();
                this.index--;
                break;
            case 13:
                this.finalize();
                break;
            default:
                break;
        }

        this.index++;
        this.cooldown = true;
        let me = this;
        setTimeout(function() {me.cooldown = false}, 1500);
    }

    deleteFaulty () {
        this.sentences.splice(this.index, 1);
        this.parallel.splice(this.index, 1);
    }

    finalize ()  {
        this.index = 0;
        this.sentences.pop();
        for (let i = 0; i < this.sentences.length; i++) {
            let sent = this.sentences[i];
            let parr = this.parallel[i];
            let tag = this.tags[i];
            this.resultsen += sent + "\t" + tag + "\n";
            this.resultpar += parr + "\t" + tag + "\n";
        }

        this.resulthidden = false;
    }
}
