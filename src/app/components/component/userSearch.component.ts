/**
 * Created by David on 3/10/2016.
 */
import {Component, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {KarpService} from "../../services/karp.service";
import {EasterEggService} from "../../services/easteregg.service";


@Component({
    selector: 'user-search',
    templateUrl: '../../templates/user-search.html',
    providers: [KarpService]
})

export class UserSearchComponent {
    @Output() numberChange: EventEmitter<any> = new EventEmitter();

    constructor(public localizer: LocalizerService, private karp: KarpService, private eggs: EasterEggService) {
        this.words = [];
    }

    public words;
    public currentUserSearch;

    private wordBackup = [];

    public everythingFine = true;

    addWord(word: string) {
        this.words.push(word);
    }


    private _lemgramSplitter (lemgram: string) {
        var wfRest = lemgram.split(/\.{2}/);
        var wordform = wfRest[0];
        var posRest = wfRest[1].split(/\.{1}/);
        var pos = posRest[0];
        // throw away information about senses
        // TODO: unless this information can be used when querying?
        return wordform + " (" + this.localizer.localize(pos) + ")";
    }

    private _errorInput () {
        this.everythingFine = false;
    }

    fetch (userinput) {
        var me = this;
        this.everythingFine = true;
        this.currentUserSearch = userinput;
        if (this.currentUserSearch == "god jul") {
            this.eggs.magicFunction1();
        }
        this.karp.fetchMini(this.currentUserSearch).subscribe(function(data) {
            var hits = data["hits"]["hits"];
            if (hits.length == 0) {
                console.log("No HITS for " + me.currentUserSearch);
                me._errorInput();
                return;
            }
            hits.reverse(); // reversal necessary due to unshift on "sorted by relevance" order
            for (var i = 0; i < hits.length; i++) {
                var lemgram = hits[i]["sort"][3];
                var parsedLemgram = me._lemgramSplitter(lemgram);
                if (me.wordBackup.indexOf(parsedLemgram) <= -1) {
                    me.words.unshift({"word":parsedLemgram, "active": true});
                    me.wordBackup.unshift(parsedLemgram);
                }
            }
            me.getSelected();
        });

    }


    remove (option) {
        var index = this.wordBackup.indexOf(option.word);
        if (index < 0) {
            console.log("ERROR: Could not find word " + option.word); // <-- this should never happen
        } else {
            this.wordBackup.splice(index,1);
            this.words.splice(index,1);
        }
        this.numberChange.emit(this.wordBackup.length);
    }

    clearWordlist () {
        this.words = [];
        this.wordBackup = [];
        this.numberChange.emit(0);
    }

    getStaticCurrentUserSearch () {
        return this.currentUserSearch;
    }

    getSelected () {
        var count = 0;
        for (var i = 0; i < this.words.length; i++) {
            if (this.words[i]["active"]) {
                count++;
            }
        }
        this.numberChange.emit(count);
        return count;
    }

    updateCount() {
        this.getSelected();
    }
}
