/**
 * Created by David on 11/21/2016.
 */
import {Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'profile-menu',
    templateUrl: 'app/templates/profile-menu.html',
    styleUrls: ['app/css/profile-menu.css']
})

export class ProfileMenuComponent {

    @Output() cp: EventEmitter = new EventEmitter();

    constructor() {

    }

    changePage (page) {
        this.cp.emit({'page':page});
    }
}