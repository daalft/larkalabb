/**
 * Created by David on 9/29/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'diagnostic-test',
    templateUrl: '../../templates/diagnostic.html',
    styleUrls: ['../../css/diagnostic.css']
})

export class DiagnosticTestComponent {
    private a1words;
    private a2words;
    private b1words;
    private b2words;
    private c1words;

    private words;

    private currentLowerBound = 1;
    private currentUpperBound = 5;

    constructor(private http: HttpClient) {
        let me = this;
        this.http.get("app/data/cefr_vnj_wf_fx_C1.json").subscribe(function(data) {
            me.c1words = data;
            me.http.get("app/data/cefr_vnj_wf_fx_B2.json").subscribe(function(data) {
                me.b2words = data;
                me.http.get("app/data/cefr_vnj_wf_fx_B1.json").subscribe(function(data) {
                    me.b1words = data;
                    me.http.get("app/data/cefr_vnj_wf_fx_A2.json").subscribe(function(data) {
                        me.a2words = data;
                        me.http.get("app/data/cefr_vnj_wf_fx_A1.json").subscribe(function(data) {
                            me.a1words = data;
                            me.words = me.getWords();
                        });
                    });
                });
            });
        });
    }

    select (word) {
        this.words.forEach(function(w) {
            if(w === word) {
                w["selected"] = !w["selected"];
            }
        })
    }

    getWord(level) {
        if (this.a1words && this.a2words && this.b1words && this.b2words && this.c1words) {
            let array = [];
            if (level === 1) array = this.a1words;
            if (level === 2) array = this.a2words;
            if (level === 3) array = this.b1words;
            if (level === 4) array = this.b2words;
            if (level === 5) array = this.c1words;
            return array[Math.floor(Math.random()*array.length)];
        } else {
            return;
        }
    }

    /**
     * Return five words between the current lower and upper bound
     */
    getWords () {
        let currentLevel = this.currentLowerBound;
        let words = [];
        for (let i = 0; i < 5; i++) {
            words.push({"word":this.getWord(currentLevel), "level": currentLevel});
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
        if (this.currentLowerBound == 1) return;
        this.currentLowerBound--;
    }
    setUpperBound (level) {
        this.currentUpperBound = level;
    }

    increaseUpperBound () {
        if (this.currentUpperBound == 5) return;
        this.currentUpperBound++;
    }

    updateBounds () {
        let knownLevels = [];
        let meanLevel = (this.currentLowerBound+this.currentUpperBound)/2;
        let meanKnownLevel = 0;
        this.words.forEach(function(word) {
            let level = word["level"];
            let selected = word["selected"];
            if (selected) {
                knownLevels.push(level);
            }
        });
        meanKnownLevel = knownLevels.reduce(function(pv,cv) {return pv+cv;},0)/knownLevels.length;

        console.log(knownLevels);
        console.log(meanLevel);
        console.log(meanKnownLevel);

    }
}
