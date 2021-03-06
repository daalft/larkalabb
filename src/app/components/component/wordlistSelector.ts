/**
 * Created by David on 3/14/2016.
 */
import {Component, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Http} from "@angular/http";
import {LocalizerService} from "../../services/localizer.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'wordlist-selector',
    templateUrl: '../../templates/wordlist-selector.html'
})

export class WordlistSelectorComponent {

    @Output() wordlistChange: EventEmitter<any> = new EventEmitter();

    constructor(public localizer: LocalizerService, private http: HttpClient) {

        this.loadList();
    }

    public showAll: boolean = false;

    private data;

    private mainList;
    private otherList;

    private loadList() {
        let me = this;
        this.http.get('app/data/wordlist.json').map(res => (res as any).json())
          .subscribe(function(data) {
                me.data = data;
                me.mainList = data.slice(0,2);
                me.otherList = data.slice(2);
                me.mainList[0]["selected"] = true;
                me.wordlistChange.emit(me.mainList[0].name);
            });
    }

    public getMainLists () {
        return this.mainList;
    }

    public getOtherLists () {
        return this.otherList;
    }

    getSelectedIndex () {
        if (!this.data) {
            return -1;
        }
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i]["selected"]) {
                return i;
            }
        }
    }

    getSelected (index) {
        return this.data[index];
    }

    setSelected (wl) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i]["selected"] = (this.data[i].name == wl.name);
        }
        this.wordlistChange.emit(this.data[this.getSelectedIndex()].name);
    }
}
