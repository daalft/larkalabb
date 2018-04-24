/**
 * Created by David on 3/8/2016.
 */
import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {LocalizerService} from '../../services/localizer.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {OverlayMenuComponent} from './overlayMenu.component';
import {PleaseWaitComponent} from '../component/pleasewait.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'top-navbar',
    templateUrl: '../../templates/top-navbar-dev.html',
    styleUrls: ['../../css/topnavbar.css']
})
export class TopNavbarComponent implements AfterViewInit {
    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

    public keep_checkbox: boolean;

    private currentSelected;

    private currentRole;

    public menuLeft;
    public menuRight;

    public wrongup;

    private modalRef: BsModalRef;

    constructor(public localizer: LocalizerService, private login: LoginService, private router: Router) {

    }

    ngAfterViewInit () {
        // check what the browser url is
        let url = window.location.pathname;
        let segments = url.split(/\//);
        let segment = segments[segments.length - 1];

        // TODO do not hardwire this

        switch (segment) {
            case 'linguist':
            case 'learner': this.currentSelected = 1; break;
            case 'hitex': this.currentSelected = 2; break;
            case 'editor': this.currentSelected = 3; break;
            case 'texteval': this.currentSelected = 4; break;
            default: break;
        }

        this.login.cookieLogin();

        const prefLang = window.localStorage.getItem('lang');
        if (prefLang) {
            this.setLanguage(prefLang);
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
        window.localStorage.setItem('lang', lang);
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

    tryLogin (username, password, modal) {
      this.modalRef = modal;
        this.waiter.on();
        /*
        if (remember) {
            document.cookie = username + ':' + password;
        }
        */
        const me = this;
        this.login.login(username, password, this.keep_checkbox).subscribe(function(data) {
            if (data['Status'] === 200) {
                me.login.setUserId(data['userid']);
                me.modalRef.hide();
                me.wrongup = false;
                me.waiter.off();
            } else {
                me.wrongup = true;
                me.waiter.off();
            }
        });

    }

    isSelected(value: number) {
        return this.currentSelected === value;
    }

    setSelected(value: number) {
        this.currentSelected = value;
    }
}
