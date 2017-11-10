/**
 * Created by David on 3/8/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {LocalizerService} from '../../services/localizer.service';

//import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {LoginService} from "../../services/login.service";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {Router} from "@angular/router";
import {OverlayMenuComponent} from "./overlayMenu.component";
import {PleaseWaitComponent} from "../component/pleasewait.component";


@Component({
    selector: 'top-navbar',
    providers: [LoginService],
    templateUrl:'app/templates/top-navbar-dev.html',
    styleUrls: ['app/css/topnavbar.css']
})


export class TopNavbarComponent implements AfterViewInit {
    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

    private keep_checkbox: boolean;

    private currentSelected;

    private currentRole;

    private menuLeft;
    private menuRight;

    private wrongup;

    constructor(private localizer: LocalizerService, private login: LoginService, private router: Router) {

    }

    ngAfterViewInit () {
        // check what the browser url is
        let url = window.location.pathname;
        let segments = url.split(/\//);
        let segment = segments[segments.length-1];

        // TODO do not hardwire this

        switch(segment) {
            case "linguist":
            case "learner": this.currentSelected = 1; break;
            case "hitex": this.currentSelected = 2; break;
            case "editor": this.currentSelected = 3; break;
            case "texteval": this.currentSelected = 4; break;
            default: break;
        }

    }

    toggleMenu (which: number) {
        if (which == 1) {
            this.menuLeft = !this.menuLeft;
        }
        if (which == 2) {
            this.menuRight = !this.menuRight;
        }
    }

    close () {
        if (this.menuLeft) {
            this.menuLeft = false;
        }
        if (this.menuRight) {
            this.menuRight = false;
        }
    }

    localize(key: string) {
        return this.localizer.localize(key);
    }

    setLanguage(lang: string) {
        this.localizer.setLanguage(lang);
    }

    getLanguage() {
        return this.localizer.getLanguage();
    }

    loggedIn () {
        return this.login.isLoggedIn();
    }

    isAdmin() {
        return this.login.isLoggedIn() && (this.login.getUserId() == 1 || this.login.getUserId() == 2);
    }

    logout () {
        this.login.logout();
    }

    tryLogin (username, password) {
        this.waiter.on();
        let remember = this.keep_checkbox;
        if (remember) {
            document.cookie = username + ":" + password;
        }
        let me = this;
        let loginModal = $('#loginModal');
        this.login.login(username, password, remember).subscribe(function(data) {
            if (data["Status"] == 200) {
                me.login.setUserId(data["userid"]);
                loginModal.modal('hide');
                me.wrongup = false;
                me.waiter.off();
            } else {
                me.wrongup = true;
                me.waiter.off();
            }
        });

    }

    isSelected(value: number) {
        return this.currentSelected == value;
    }

    setSelected(value: number) {
        this.currentSelected = value;
    }
}