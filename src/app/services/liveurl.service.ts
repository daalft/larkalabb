import {Injectable, Component, Inject} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouteConfig,
    Location
} from '@angular/router-deprecated';

/**
 * Created by David on 4/25/2016.
 */

@Injectable()
export class LiveUrl {

    private params = {};


    constructor() {

    }

    get (param: string) {
        return this.params[param];
    }

    set (param: string, value: string) {
        this.params[param] = value;
        this.update("");
    }

    update (baseurl: string) {
        let url = this.linearize(baseurl);

    }

    linearize (baseurl: string) {
        let linearized = "";
        for (let key in this.params) {
            if (this.params.hasOwnProperty(key)) {
                linearized += key + "=" + this.params[key] + ";";
            }
        }
        
        return baseurl + linearized.substring(0,linearized.length-1);
    }

    parse (url: string) {
        let paramss = url.split(/\?/);
        if (paramss.length < 2) {
            fail("could not find parameters in url " + url);
        }
        let parts = paramss[1].split(/;/);
        for (let i = 0; i < parts.length; i++) {
            let keyVal = parts[i].split(/=/);
            this.params[keyVal[0]] = keyVal[1];
        }

    }
}