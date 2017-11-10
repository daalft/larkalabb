import {Injectable, OnInit} from "@angular/core";
import {Http, RequestOptions, Headers, URLSearchParams} from "@angular/http";
import {ClientBrowserService} from "./client.browser.service";
/**
 * Created by David on 9/28/2016.
 */

@Injectable()
export class LoggerService {

    private backend = "https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi";
    private ipbackend = "https://ipinfo.io/json";

    private geodata;

    private clientbrowser;

    constructor (private http: Http) {

    }

    getUserInfo () {
        let me = this;
        this.http.get(this.ipbackend).map(data => data.json()).subscribe(function(data) {
            me.geodata = data;
        });
    }


    log (message, mode?) {
        //console.log("logging " + message);
        if (!message) {
            return;
        }
        // Inject browser data
        if (!this.clientbrowser) {
            this.clientbrowser = ClientBrowserService.getInfo();
        }
        message["userclient"] = this.clientbrowser;

        // Inject geodata
        message["geodata"] = this.geodata;
        console.log(message);
        // TODO json encode string escape
        let jsonmessage = JSON.stringify(message);

        let reqStatus = 500;
        //let headers = new Headers({ 'content-type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //?command=log&log_type=exe_linguists&text=
        //?command=log&log_type=exe_linguists
        let command = "log";
        if (mode) {
            command = mode;
        }
        let url = this.backend + "?command="+command;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let usp = new URLSearchParams();
        usp.append("type", message["exercise"]);
        usp.append("log_type", message["exercise"]); // for compatibility with previous labb logging
        for (let property in message) {
            if (message.hasOwnProperty(property)) {
                usp.append(property, message[property]);
            }
        }
        this.http.post(url,usp).map(data => data.json()).subscribe(function(data) {

        });
        return reqStatus;
    }

    error (message: string) {

    }
}