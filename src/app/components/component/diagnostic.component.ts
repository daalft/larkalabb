/**
 * Created by David on 9/29/2016.
 */
import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LarkaService} from "../../services/larka.service";
import {CefrToolsService} from "../../services/cefr.tools.service";
import * as _ from 'lodash';
import {PleaseWaitComponent} from "./pleasewait.component";
import {TreeKernelComponent} from "../intern/treekernel.component";

@Component({
    selector: 'diagnostic-test',
    templateUrl: '../../templates/diagnostic.html',
    styleUrls: ['../../css/diagnostic.css']
})

export class DiagnosticTestComponent {

  @ViewChild('waiter') waiter: PleaseWaitComponent;

    private a1words;
    private a2words;
    private b1words;
    private b2words;
    private c1words;

    // TODO remove
    public words;

    private currentLowerBound = 1;
    private currentUpperBound = 5;

    private currentPredictedLevel = 3;
    public currentView = 0;

    public vkwords: string[];
    public mcdata = {};
    public rdata = [];

    private lexicalPos = ["NN", "VB", "JJ"];

    constructor(private http: HttpClient, private larka: LarkaService) {
        const me = this;
        this.http.get('app/data/A1_svalex_lexin.json').subscribe(function(data) {
            me.a1words = data;
            me.http.get('app/data/A2_svalex_lexin.json').subscribe(function(data) {
                me.a2words = data;
                me.http.get('app/data/B1_svalex_lexin.json').subscribe(function(data) {
                    me.b1words = data;
                    me.http.get('app/data/B2_svalex_lexin.json').subscribe(function(data) {
                        me.b2words = data;
                        me.http.get('app/data/C1_svalex_lexin.json').subscribe(function(data) {
                            me.c1words = data;
                            me.words = me.getWords();
                        });
                    });
                });
            });
        });
    }

    // afterViewInit, launch queries for different exercise types

    startTest() {
      if (this.a1words && this.a2words && this.b1words && this.b2words && this.c1words) {
        this.generateByLevel(this.currentPredictedLevel);
      } else {
        console.log("Word lists not loaded yet!");
      }
    }


    generateByLevel(lvl) {
      const domain = "kelly"; // domain is ignored by ported function
      /*
      Maybe use "ao" and "kelly" with Math.random() to select;
      ao could be weighted more heavily than kelly?
       */

      const exerciseTypeLimit = lvl < 3 ? 3 : 4;
      let type = Math.floor(Math.random() * exerciseTypeLimit);
      console.log(type);
      type = 3;
      const me = this;

      if (type === 0) {

        this.waiter.on();
        const seedWord = this.getWord(lvl);
        const pos = seedWord['pos'];
        const seed = seedWord['word'] + '_' + pos;

        this.larka.generateMulti(domain, pos, CefrToolsService.numericToCefr(lvl, 1), seed).subscribe(function(d) {
          me.mcdata['target'] = d['target'];
          me.mcdata['sent_left'] = d['sentence_left'];
          me.mcdata['sent_right'] = d['sentence_right'];
          me.mcdata['answers'] = _.shuffle(d['distractors']);
          me.currentView = 1;
          me.waiter.off();
        });
      } else if (type === 1) {

      } else if (type === 2) {
        this.vkwords = this.getWords();
        this.currentView = 3;
      } else if (type === 3) {
        this.waiter.on();
        this.larka.generateMulti("kelly", _.sample(this.lexicalPos), CefrToolsService.numericToCefr(lvl, 1)).subscribe(function(d) {
          const sleft = d['sentence_left'];
          const sright = d['sentence_right'];
          const target = d['target']['word'];
          const sentence = sleft + " " + target + " " + sright;
          const words = sentence.split(" ");
          //words.pop(); // remove punctuation
          const chunkSize = Math.ceil(words.length / 6);
          let chunks = [];
          console.log(chunkSize);
          console.log(sentence);
          for (let i = 0; i < words.length; i += chunkSize) {
            let chunk = words[i]; //.toLowerCase();
            for (let j = i + 1; j < i + chunkSize; j++) {
              if (j >= words.length) {
                break;
              }
              chunk += ' ' + words[j];
            }
            chunks.push({'text': chunk, 'id': i});
          }
          console.log(chunks);
          me.rdata['chunks'] = _.shuffle(chunks);
          me.rdata['target'] = words;
          me.currentView = 4;
          me.makeSortable();
          me.waiter.off();
        });
      } else {
        console.log("Something went wrong. Too high exercise type.");
      }
    }

    makeSortable() {
      ($( "#sortable" ) as any).sortable({
        placeholder: {
          element: function(clone, ui) {
            return $('<li class="ui-state-highlight">Drop selection here...</li>');
          },
          update: function() {
            return;
          }
        },
        forcePlaceholderSize: true,
        container: '#rdroptarget',
        helper: 'clone',
        forceHelperSize: true,

      });
      ($( "#sortable" ) as any).disableSelection();
    }

    select (word) {
        this.vkwords.forEach(function(w) {
            if (w === word) {
                w['selected'] = !w['selected'];
            }
        });
    }

    getWord(level) {
        if (this.a1words && this.a2words && this.b1words && this.b2words && this.c1words) {
            let array = [];
            if (level === 1) { array = this.a1words; }
            if (level === 2) { array = this.a2words; }
            if (level === 3) { array = this.b1words; }
            if (level === 4) { array = this.b2words; }
            if (level === 5) { array = this.c1words; }
            return array[Math.floor(Math.random() * array.length)];
        } else {
            return;
        }
    }

    /**
     * Return five words between the current lower and upper bound
     */
    getWords () {
        let currentLevel = this.currentLowerBound;
        const words = [];
        for (let i = 0; i < 5; i++) {
            words.push({'word': this.getWord(currentLevel)['word'], 'level': currentLevel});
            currentLevel = this.updateLevel(currentLevel);
        }
        return words;
    }

    updateLevel (level) {
        let nextLevel = ++level;
        if (nextLevel > this.currentUpperBound) {
            nextLevel = this.currentLowerBound;
        }
        return nextLevel;
    }

    setLowerBound (level) {
        this.currentLowerBound = level;
    }

    decreaseLowerBound () {
        if (this.currentLowerBound === 1) { return; }
        this.currentLowerBound--;
    }
    setUpperBound (level) {
        this.currentUpperBound = level;
    }

    increaseUpperBound () {
        if (this.currentUpperBound === 5) { return; }
        this.currentUpperBound++;
    }

    updateBounds () {
        const knownLevels = [];
        const meanLevel = (this.currentLowerBound + this.currentUpperBound) / 2;
        let meanKnownLevel = 0;
        this.words.forEach(function(word) {
            const level = word['level'];
            const selected = word['selected'];
            if (selected) {
                knownLevels.push(level);
            }
        });
        meanKnownLevel = knownLevels.reduce(function(pv, cv) {return pv + cv; }, 0) / knownLevels.length;

        console.log(knownLevels);
        console.log(meanLevel);
        console.log(meanKnownLevel);
    }

    validateRearrangement() {
        // collect chunks in order
        const idOrder = (<any>$('#sortable')).sortable('toArray');
        console.log(idOrder);
        const isInAscendingOrder = idOrder.every((val, i, arr) => !i || (parseInt(val, 10) >= parseInt(arr[i - 1], 10)));
        console.log(isInAscendingOrder);
    }

    moveOn() {
      // validate
      if (this.currentView === 1) {
        console.log("validating 1");
      } else if (this.currentView === 2) {
        console.log("validating 2");
      } else if (this.currentView === 3) {
        console.log("validating 3");
      } else if (this.currentView === 4) {
        console.log("validating 4");
        this.validateRearrangement();
      }
      // update prediction

      // generate
      console.log("Moving on");
    }
}
