/**
 * Created by David on 4/5/2016.
 */
/**
 Connect to the old Lärka version
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";
@Injectable()
export class LarkaAdapter {

    private baseUrl: string = "https://ws.spraakbanken.gu.se/ws/icall/icall.cgi?";

    constructor(private http: HttpClient) {};


    generateMulti (domains, param, levels) {
        //exe=multi&lang=sv&poslist=KN,SN,DT,PP,PN,JJ,AB,NN,VB&domain=kelly&level=A1,A2,B1,B2,C1,C2
        let exetype = "exetype=multi";
        let particleQ = "pos";
        let paramQ = particleQ + "=" + (this.map(param) as any).join(",");
        let domain = "domain=" + domains;
        let level = "level=" + this.map(levels);
        //let lang = "lang=sv";
        let url = this.baseUrl + exetype + "&" + paramQ + "&" + level;
        console.log(url);
        let response = this.http.get(url);
        try {
            response = response;
        } catch (e) { // sometimes the call returns an error
            console.log(e);
            return this.generateMulti(domain, param, level);
        }
        return response;
    }

    generate (exetype: string, param: string, carantine?, indent?) {
        //exetype=pos1&pos=NN&carantine=0&indent=2

        let exetypeShort = this.map(exetype);

        let exetypeQ = "exetype=" + exetypeShort;

        let particleQ =
            exetypeShort=='pos1'?"pos":
                exetypeShort=='pos2'?"pos":
                    exetypeShort=='synt1'?'deprel':
                        exetypeShort=='synt2'?'deprel':
                            exetypeShort=='sem'?'semroles':
                                "";
        let paramQ = particleQ+"=" + (this.map(param) as any).join(",");
        let carantineQ = "carantine=" + carantine;
        let indentQ = "indent=" + indent;

        let url = this.baseUrl + exetypeQ + "&" + paramQ + "&" + carantineQ + "&" + indentQ;
        //console.log(url);
        return this.http.get(url);
    }

    map (key: any) {

        if (typeof key == "string") {
            if (key == "trainSemanticRoles")
                return "sem";
            if (key.match("train")) {
                return key.substr(5).toLowerCase();
            } else {
                return key;
            }
        }
        else {
            if ({}.toString.call(key) == "[object Array]") {
                let mappedOut = [];
                for (let i = 0; i < key.length; i++) {
                    mappedOut.push(this.posMap(key[i]));
                }
                return mappedOut;
            }
        }
    }

    posMap (pos) {
        switch(pos) {
            case "adjectives":
                return "JJ";
            case "adverbs":
                return "AB";
            case "participles":
                return "PC";
            case "nouns":
                return "NN";
            case "verbs":
                return "VB";
            case "determiners":
                return "DT";
            case "conjunctions":
                return "KN";
            case "prepositions":
                return "PP";
            case "pronouns":
                return "PN";
            case "subjunctions":
                return "SN";
            case "numerals":
                return "RG";

            case "subject": return "SS";
            case "adverbial": return "AA";
            case "finite verb": return "FV";
            case "indirect object": return "IO";
            case "nonfinite verb": return "IV";
            case "object": return "OO";
            case "predicate": return "OP";

            case "agent_sem":
                    return "Agent";
            case "experiencer_sem":
                return "Experiencer";
            case "theme_sem":
                return "Theme";
            case "instrument_sem": return "Instrument";
            case "location_sem": return "Location";
            case "direction_sem": return "Direction";
            case "recipient_sem": return "Recipient";
            case "origin_sem": return "Origin";
            case "time_sem": return "Time";
            case "manner_sem": return "Manner";
            case "purpose_sem": return "Purpose";
            case "cause_sem": return "Cause";

            default:
                return pos;
        }
    }
}
