import {Injectable, OnInit} from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {ClientBrowserService} from './client.browser.service';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
/**
 * Created by David on 9/28/2016.
 */

@Injectable()
export class LoggerService {

    private backend = 'https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi';
    private ipbackend = 'https://ipinfo.io/json';

    private geodata;

    private clientbrowser;

    constructor (private http: HttpClient) {

    }

    getUserInfo () {
        const me = this;
        this.http.get(this.ipbackend).subscribe(function(data) {
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
        message['userclient'] = this.clientbrowser;

        // Inject geodata
        message['geodata'] = this.geodata;
        console.log(message);
        // TODO json encode string escape
        const jsonmessage = JSON.stringify(message);

        const reqStatus = 500;
        //let headers = new Headers({ 'content-type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //?command=log&log_type=exe_linguists&text=
        //?command=log&log_type=exe_linguists
        let command = 'log';
        if (mode) {
            command = mode;
        }
        const url = this.backend + '?command=' + command;
        // let hdr = new Headers();
        // hdr.append('Content-Type', 'application/x-www-form-urlencoded');
        let usp = new HttpParams();
        usp = usp.append('type', message['exercise']);
        usp = usp.append('log_type', message['exercise']); // for compatibility with previous labb logging
        for (const property in message) {
            if (message.hasOwnProperty(property)) {
                usp = usp.append(property, message[property]);
            }
        }

        this.http.post(url, usp, {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        }).subscribe(function(data) {

        });
        return reqStatus;
    }

    error (message: string) {

    }
}
