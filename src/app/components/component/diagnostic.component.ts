/**
 * Created by David on 9/29/2016.
 */
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

    public words;

    private currentLowerBound = 1;
    private currentUpperBound = 5;

    constructor(private http: HttpClient) {
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

    select (word) {
        this.words.forEach(function(w) {
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
            return array[Math.floor(Math.random() * array.length)]['word'];
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
            words.push({'word': this.getWord(currentLevel), 'level': currentLevel});
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
}
