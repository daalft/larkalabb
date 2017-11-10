/**
 * Created by David on 11/1/2016.
 */
import {Component} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
@Component({
    selector: 'overlay-menu',
    templateUrl: 'app/templates/overlay-menu.html',
    styleUrls: ['app/css/overlay-menu.css']
})

export class OverlayMenuComponent {

    private showOne: boolean = false;
    private showTwo: boolean = false;

    constructor(private localizer: LocalizerService) {

    }

    open(which: number) {
        if (which == 1) {
            this.showOne = !this.showOne;
        }
        if (which == 2) {
            this.showTwo = !this.showTwo;
        }
    }

    close () {
        if (this.showOne) {
            this.showOne = false;
        }
        if (this.showTwo) {
            this.showTwo = false;
        }
    }
}