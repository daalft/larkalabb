/**
 * Created by David on 3/17/2016.
 */
import {Injectable} from "@angular/core";

import {Http, Headers, URLSearchParams} from "@angular/http";
import {RegisterComponent} from "../components/pages/register.component";
import {HashService} from "./hash.service";

@Injectable()
export class LoginService {
    private baseUrl = "https://ws.spraakbanken.gu.se/ws/larkadev/icall.cgi?";

    private loggedIn: boolean;

    private randomId;
    private userId;

    constructor(private http: Http) {}

    isLoggedIn () {
        return this.loggedIn;
    }

    userExists(username) {

        let url = this.baseUrl + "command=exists&username=" + username;
        return this.http.get(url).map(res => res.json());

    }

    createUser (udata) {

        let command = "command=create_user";
        //this.baseUrl;
        let url = this.baseUrl + command;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let usp = new URLSearchParams();
        for (let property in udata) {
            if (udata.hasOwnProperty(property)) {
                usp.append(property, udata[property]);
            }
        }
        this.http.post(url, usp, {headers: headers}).subscribe(function(data) {

        });

    }

    logout () {
        alert("Logging out");
        this.loggedIn = false;
        this.userId = null;
    }

    login (username:string, password: string, remember: boolean) {

        let url = this.baseUrl + "command=login";
        let hpw = HashService.hashCode(password+username);
        let usp = new URLSearchParams();
        usp.append('username', username);
        usp.append('chash', hpw+"");
        let me = this;

        return this.http.post(url, usp).map(res => res.json());

    }

    getRandomId() {
        if (!this.randomId) {
            this.randomId = "guestsession" + this.randomNumber();
        }

        return this.randomId;
    }

    randomNumber () {
        return Math.round(Math.random() * 1000000);
    }

    createAuthorizationHeader(headers:Headers, userstring: string) {
        headers.append('Authorization', 'Basic ' +
            btoa(userstring));
    }

    getUserId () {
        return this.userId;
    }

    setUserId(uid) {
        this.userId = uid;
        this.loggedIn = true;
    }

}