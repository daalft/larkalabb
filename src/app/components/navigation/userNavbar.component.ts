/**
 * Created by David on 3/9/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {LocalizerService} from "../../services/localizer.service";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'user-navbar',
    templateUrl: 'app/templates/user-navbar.html',
    directives: [ROUTER_DIRECTIVES],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserNavbarComponent {

    constructor(private localizer: LocalizerService) {}

    localize(key: string) {
        return this.localizer.localize(key);
    }

    public roles = [
        {'name': 'linguists', route: '/linguist'},
        {'name': 'lang_learners', route: '/learner'}
    ];

    selectRole(newRole: Object) {
        this.roles.forEach(function(role) {
            role['active'] = (newRole == role);
        });
    }


}