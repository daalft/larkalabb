import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
/**
 * Created by David on 12/21/2016.
 */
@Injectable()
export class NuanceService {

    private url = "https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi?command=tts&prompt=";

    constructor(private http: Http) {}

    speak (text: string, mode?: string, voice?: string) {
        let url = this.url + text;

        if (voice) {
            url += "&voice="+voice;
        }

        if (mode) {
            url += "&mode="+mode;
        }

        console.log(url);

        return this.http.get(url)
            //.map((res:Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if a
    }

}