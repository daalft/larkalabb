/**
 * Created by David on 3/17/2016.
 */
import {Injectable} from "@angular/core";
import {HashService} from "./hash.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class LoginService {
    private baseUrl = "https://ws.spraakbanken.gu.se/ws/larkadev/icall.cgi?";

    private loggedIn: boolean;

    private randomId;
    private userId;

    constructor(private http: HttpClient) {}

    isLoggedIn () {
        return this.loggedIn;
    }

    userExists(username) {

        let url = this.baseUrl + "command=exists&username=" + username;
        return this.http.get(url);

    }

    createUser (udata) {

        let command = "command=create_user";
        //this.baseUrl;
        let url = this.baseUrl + command;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let usp = new HttpParams();
        for (let property in udata) {
            if (udata.hasOwnProperty(property)) {
                usp = usp.append(property, udata[property]);
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
        let url = this.baseUrl + 'command=login';
        let hpw = HashService.hashCode(password + username);
        let hpws = hpw + '';

        const params: HttpParams = new HttpParams()
          .append('username', username)
          .append('chash', hpws);

        return this.http.post(url, params);
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

    getUserId () {
        return this.userId;
    }

    setUserId(uid) {
        this.userId = uid;
        this.loggedIn = true;
    }

}
