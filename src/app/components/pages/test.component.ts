/**
 * Created by David on 10/17/2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {LoggerService} from "../../services/logger.service";
import {NuanceService} from "../../services/nuance.service";
@Component({
    selector: 'testcomp',
    templateUrl: '../../templates/test.html',
    providers: [LoginService]
})

export class TestComponent {

  public id;

    constructor(private login: LoginService, private log: LoggerService, private tts: NuanceService) {

    }

    getId () {
        this.id = this.login.getRandomId();
    }

    getUserInfo () {
        this.log.getUserInfo();
    }

    ttstest () {

    }
}
