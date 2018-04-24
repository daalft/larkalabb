/**
 * Created by David on 10/11/2016.
 */
import {Component} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";

@Component({
    selector: 'pleasewait',
    templateUrl: '../../templates/pleasewait.html',
    styleUrls: ['../../css/pleasewait.css']
})

export class PleaseWaitComponent {
    public waiting: boolean = false;
    private magicVariable: boolean = true;

    constructor(public localizer: LocalizerService) {

    }

    on () {
        this.magicVariable = Math.random() > 0.1;
        this.waiting = true;
    }

    off () {
        this.waiting = false;
    }

    showLark () {
        return this.magicVariable;
    }
}
