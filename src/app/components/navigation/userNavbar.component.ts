/**
 * Created by David on 3/9/2016.
 */
import {Component} from '@angular/core';
import {LocalizerService} from "../../services/localizer.service";

@Component({
    selector: 'user-navbar',
    templateUrl: '../../templates/user-navbar.html'
})

export class UserNavbarComponent {

    constructor(public localizer: LocalizerService) {}

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
