/**
 * Created by David on 4/5/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, URLSearchParams} from '@angular/http';
import {LarkaAdapter} from "./larka.adapter.service";
import {encode} from "@angular/router/src/url_tree";
import {TTSEngine} from "./tts.engine.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {LocalizerService} from "./localizer.service";
import {DatetimeService} from "./datetime.service";

@Injectable()
export class LarkaService {


    private devUrl: string = "https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi?indent=4&";
private quarantine = "";
    constructor(private http: HttpClient, private tts: TTSEngine, private adapter: LarkaAdapter, private localizer: LocalizerService) {

    }

    generateMultiInfl (domain, pos, level, quarantine) {
      const url = this.devUrl +
        "command=multi_infl&" +
        "pos=" + pos + "&" +
        "level=" + level + "&" +
        "quarantine=" + quarantine;

      console.log(url);
      return this.http.get(url);
    }

    generateMulti (domain, pos, level, quarantine, seedWord?) {
        //return this.adapter.generateMulti(domain,pos,level);
      let url = this.devUrl +
        "command=multi_voc&" +
        "level=" + level +
        "&quarantine=" + quarantine;
      if (seedWord) {
        url += "&seedWord=" + encodeURIComponent(seedWord);
      }
      console.log(url);
      return this.http.get(url);
    }

    generate (exetype, pos, quarantine, indent) {
        // delegate http call to adapter for now
        return this.adapter.generate(exetype, pos, quarantine, indent);
    }

    texteval (command, producedBy, useML, text) {
        //let text = encodeURIComponent("Det har kommit många flyktingar till Sverige de senaste åren. Förra året kom 160 tusen flyktingar hit. Men en del av dem somkom stannar inte. Allt fler väljer att åka tillbaka till sina hemländer. Fler än tio tusen flyktingar har lämnat Sverige frivilligt i år. De som reser hem får pengar av svenska staten. En familj kan få 75 tusen kronor.");
        //console.log("Testing mode; ignoring CEFR_ML");
        //console.log("Testing mode; hard-coded text");
        let url = this.devUrl +
            "command=" + command + "&" + // for now, the only command is complexity
            "produced_by=" + producedBy + "&" +
            "CEFR_ML=" + (useML?1:0) + "&" +
            "text=" + encodeURIComponent(text)
            ;
        console.log(url);
        return this.http.get(url);
    }

    hitex (query_w, query_type, use_defaults, query_pos, max_kwics, corpus_list, maxhit, random_seed, target_cefr, preserve_bad, other_params) {
        let url = this.devUrl + "command=hitex&"
            + "query_w=" + encodeURIComponent(query_w) + "&"
            + "query_type=" + query_type + "&"
            + "use_defaults=" + use_defaults;
        if (query_pos) {
            url += "&query_pos=" + query_pos;
        }
        if (max_kwics) {
            url += "&max_kwics=" + max_kwics;
        }
        if (corpus_list) {
            url += "&corpus_list=" + corpus_list;
        }
        if (maxhit) {
            url += "&maxhit=" + maxhit;
        }
        if (random_seed) {
            url += "&random_seed=" + random_seed;
        }
        if (target_cefr) {
            url += "&target_cefr=" + target_cefr;
        }
        if (preserve_bad) {
            url += "&preserve_bad=true";
        }
        if (other_params) {
            url += "&"+other_params;
        }
        console.log(url);
        return this.http.get<any[]>(url);
    }

    ptk (sent1, sent2) {
        let url = this.devUrl + "command=ptk&sent1="+encodeURIComponent(sent1)+"&sent2="+encodeURIComponent(sent2);
        console.log(url);
        return this.http.get(url);
    }

    cedit_save (userkey, lastpos, content) {
        let url = this.devUrl + "command=cedit_save";
        let usp = new HttpParams();
        usp = usp.append('userkey', userkey);
        usp = usp.append('lastposition', lastpos);
        usp = usp.append('content', encodeURIComponent(content));

        return this.http.post(url, usp);
    }

    cedit_restore (userkey) {
        let url = this.devUrl + "command=cedit_restore&" +
                "userkey=" + userkey;

        return this.http.get(url);
    }

    cedit_checkKey(key) {
        let url = this.devUrl + "command=cedit_checkkey&" +
            "userkey=" + key;

        return this.http.get(url);
    }

    speak (text, spell) {
        return this.tts.textToSpeech(text, spell);
    }

    waims (word, pos) {
        let url = this.devUrl + "command=waims" +
                "&word=" + encodeURIComponent(word) +
                "&pos=" + pos;
        console.log(url);
        return this.http.get(url);
    }

    siwoco (word, pos, rop) {
        let url = this.devUrl + "command=siwoco" +
                "&word=" + encodeURIComponent(word) +
                "&pos=" + pos +
            (rop?"&receptiveOrProductive="+rop:'');
        console.log(url);
        return this.http.get(url);
    }

    wakeup () {
        let url = this.devUrl + "command=hello";
        console.log("wake up call");
        return this.http.get(url);
    }

    retrieve_ec() {
      let url = this.devUrl + "command=get_ec";
      return this.http.get(url);
    }

    wiktionary(page) {
      //console.log(page);
      const pagina = (page["lemma"].split("|"))[1];
      const lang = this.localizer.getLanguage();
      const url = "https://"+lang+".wiktionary.org/w/api.php?action=parse&prop=text&origin=*&format=json&page=" + pagina;
      return this.http.get(url);
    }

    wikipedia(page) {
      const pagina = (page["lemma"].split("|"))[1];
      const url = "https://"+this.localizer.getLanguage()+".wikipedia.org/w/api.php?action=parse&origin=*&format=json&section=0&prop=text&page=" + pagina;
      return this.http.get(url);
    }

    enhance(rc, obj) {
      let url = this.devUrl + "command=enhance";
      let usp = new HttpParams();
      const obj_json = JSON.stringify(obj);
      usp = usp.append('receiver', rc);
      usp = usp.append('object', obj_json);

      return this.http.post(url, usp);
    }

    ngram_lm_prob(text) {
      const url = this.devUrl + "command=sentence_word_prob&sentence=" + encodeURIComponent(text);
      console.log(url);
      return this.http.get(url);
    }

    collect(whereTo, emt, roles: string) {
      const url = this.devUrl + "command=ecce";
      let usp = new HttpParams();
      usp = usp.append('receiver', whereTo);
      usp = usp.append('native', emt);
      if (roles.includes('&')) {
        roles.replace(/&/g, ';');
      }
      usp = usp.append('roles', roles);

      return this.http.post(url, usp);
    }

    l2p_fetchCat() {
      const url = this.devUrl + "command=l2p_fetchcat";
      return this.http.get(url);
    }

  l2p_fetch_all_by_field (field_name) {

    const url = this.devUrl + "command=l2p_get_all_by_field&field_name=" + field_name;
    console.log(url);
    return this.http.get(url);
  }

  l2p_get_field_type_values(field_name) {
      const url = this.devUrl + "command=l2p_get_field_type_values&field_name=" + field_name;
    console.log(url);
      return this.http.get(url);
  }

  l2p_save(sense, pos, field_name, field_val) {

      const url = this.devUrl + "command=l2p_save" + "&sense=" + sense
      + "&pos=" + pos + "&field_name=" + field_name + "&field_value=" + field_val ;


      console.log(url);
      return this.http.get(url);
  }

  l2p_check_annot(annotatorId) {
      const url = this.devUrl + "command=l2p_check_annot&annotatorId=" + annotatorId;
      return this.http.get(url);
  }

  l2p_fetch_by_annotator(annotatorId, taskcat, annotmode) {
      const url = this.devUrl + "command=l2p_get_by_annotator&annotatorId=" + annotatorId
      + "&taskcat=" + taskcat + "&annotmode=" + annotmode;
      console.log(url);
      return this.http.get(url);
  }
}
