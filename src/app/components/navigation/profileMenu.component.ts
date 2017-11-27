/**
 * Created by David on 11/21/2016.
 */
import {Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'profile-menu',
    templateUrl: '../../templates/profile-menu.html',
    styleUrls: ['../../css/profile-menu.css']
})

export class ProfileMenuComponent {

    @Output() cp: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    changePage (page) {
        this.cp.emit({'page':page});
    }
}
