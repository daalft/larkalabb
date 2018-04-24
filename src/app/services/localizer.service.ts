/**
 * Created by David on 3/8/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocalizerService {

    private currentLanguage: string;

    private dictionary: Object;

    constructor (http: HttpClient) {
        this.dictionary = {};
        this.dictionary['sv'] = {};
        this.dictionary['en'] = {};
        if(!this.currentLanguage) {
            this.currentLanguage = 'sv';
        }
        http.get('./app/data/locale-sv.json')
            .subscribe(data => this.dictionary['sv'] = data);
        http.get('./app/data/locale-en.json')
            .subscribe(data => this.dictionary['en'] = data);
    }

    localize(key: string) {
        if (this.dictionary) {
            return this.dictionary[this.currentLanguage][key];
        }
    }

    getLanguage () {
        return this.currentLanguage;
    }

    setLanguage (language: string) {
        this.currentLanguage = language;
    }
}
