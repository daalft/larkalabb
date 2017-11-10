/**
 * Created by David on 16-Aug-17.
 */
import {Component} from "@angular/core";

@Component({
    selector: 'enelett',
    templateUrl: 'app/templates/enelett.html'
})

export class EnelettComponent {
    private dictionary = {
        "hund": "en",
        "katt": "en",
        "bord": "ett",
        "centrum": "ett"
    };

    private result = null;

    demo(val) {
        let g = this.dictionary[val];
        this.result = g + " " + val;
    }

    keyhandler(event,val) {
        if (event.keyCode == 13) {
            this.demo(val);
        }
    }
}