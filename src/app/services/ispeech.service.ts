/**
 * Created by David on 6/7/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";
@Injectable()
export class iSpeechTTSEngine {

    private key = "b00454523491d770b4bebe76b09aa218";
    // API modes: rest/xml/json
    private url = "https://api.ispeech.org/api/rest"; //?apikey= action=convert &text=something &format=mp3 &voice=swswedishfemale


    constructor(private http: HttpClient) {

    }

    speak(text) {
        let curl = this.url + "?apikey=" + this.key + "&action=convert&text=" + encodeURIComponent(text) + "&format=mp3&voice=swswedishfemale";
        this.http.get(curl).subscribe(function(d) {
            console.log(d);
        });
    }
}
