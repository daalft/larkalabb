/**
 * Created by David on 3/14/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class KarpService {

    private baseUrl: string =       "https://ws.spraakbanken.gu.se/ws/karp/v2/";
    private userQuery: string =     "query?q=extended||and|baseformC|equals|"; // append word to search for
    private posQuery: string =      "||and|pos|equals|";
    private userResource: string =  "&resource=saldom";
    private lexin: string =         "&resource=lexin";
    private miniEntry: string =     "minientry?q=extended||and|wf|equals|";

    private restriction: string =   "&show=lemgram";

    constructor(private http: HttpClient) {

    }

    public fetchFrom (word: string, pos: string, resource: string) {
        console.log(this.baseUrl + this.userQuery + word + this.posQuery + pos + "&resource=" + resource);
        return this.http.get(this.baseUrl + this.userQuery + word + this.posQuery + pos + "&resource=" + resource);
    }

    public fetch (word: string) {
        return this.http.get(this.baseUrl + this.userQuery + word + this.userResource);
    }

    /**
     * Fetch mini entry with default restriction (pos,lemgram)
     * @param word
     */
    public fetchMini (word: string) {
        return this.http.get(this.baseUrl + this.miniEntry + word + this.userResource + this.restriction);
    }
}
