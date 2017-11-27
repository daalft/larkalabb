/**
 * Created by David on 3/14/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class KorpService {


    private baseUrl: string =       "https://spraakbanken.gu.se/ws/korp?";
    private userQuery: string =     "query?q=extended||and|wf|equals|"; // append word to search for
    private command: string =       "command=query";
    private userResource: string =  "&resource=saldom";
    private corpora: string =       "corpus=ROM99,GP2010,GP2011,GP2012,GP2013,GP2D,ATTASIDOR,LASBART,SUC3,TALBANKEN";
    private cut: string =           "cut=10";
    private miniEntry: string =     "minientry?q=extended||and|wf|equals|";

    private restriction: string =   "&show=lemgram";


    constructor(private http: HttpClient) {

    }

    public fetch (words) {
        if (!Array.isArray(words)) {
            words = words.split(" ");
        }
        let query = "";
        for (let i = 0; i < words.length; i++) {
            query += '[word = "'+words[i]+'"]'
        }
        let url = this.baseUrl + this.command + "&"
                                + "cqp=" + query + "&"
                + this.corpora + "&start=0&end=9&defaultcontext=1+sentence&"
            + this.cut;
        return this.http.get(url);
    }
}
