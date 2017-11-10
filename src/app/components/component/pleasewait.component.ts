/**
 * Created by David on 10/11/2016.
 */
import {Component} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import random = require("core-js/fn/number/random");
@Component({
    selector: 'pleasewait',
    templateUrl: 'app/templates/pleasewait.html',
    styleUrls: ['app/css/pleasewait.css']
})

export class PleaseWaitComponent {
    private waiting: boolean = false;
    private magicVariable: boolean = true;

    constructor(private localizer: LocalizerService) {

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