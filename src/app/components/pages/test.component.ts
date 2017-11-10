/**
 * Created by David on 10/17/2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {LoggerService} from "../../services/logger.service";
import {NuanceService} from "../../services/nuance.service";
@Component({
    selector: 'testcomp',
    templateUrl: 'app/templates/test.html',
    providers: [LoginService]
})

export class TestComponent {

    private id;

    constructor(private login: LoginService, private log: LoggerService, private tts: NuanceService) {

    }

    getId () {
        this.id = this.login.getRandomId();
    }

    getUserInfo () {
        this.log.getUserInfo();
    }

    ttstest () {
        this.tts.tts("Det är en vacker dag idag.").subscribe(function() {
            console.log("Got data");
        });
    }
}