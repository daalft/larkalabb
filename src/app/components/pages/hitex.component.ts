/**
 * Created by David on 10/24/2016.
 */
import {Component, ViewChild, QueryList, ViewChildren} from '@angular/core';
import {LocalizerService} from '../../services/localizer.service';
import {SwitchToggleComponent} from '../component/switch-toggle.component';
import {PleaseWaitComponent} from '../component/pleasewait.component';
import {LarkaService} from '../../services/larka.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'hitex',
  templateUrl: '../../templates/hitex.html',
  styleUrls: ['../../css/hitex.css'],
  providers: [SwitchToggleComponent]
})

export class HitexComponent {
  @ViewChild('waiter') waiter: PleaseWaitComponent;
  @ViewChildren(SwitchToggleComponent) switchtoggles: QueryList<SwitchToggleComponent>;

  public searchmode = 0;
  public cqpmode = false;

  public useDefaults = true;

  public sensitiveVocab = false;

  public showAdvancedOptions = false;

  public pos_names = [
    'AB', 'HA', 'JJ', 'RG', 'KN', 'DT', 'IE',
    'IN', 'NN', 'RO', 'PC', 'PL', 'PP', 'PN', 'PM',
    'PS', 'SN', 'VB'
  ];

  public currentPos;

  // advanced menu toggle flags for showing and hiding menu
  public menuToggle = [false, false, false, false, false, false, false];

  public searchtermPosition = 0;

  public hits = [];
  public badhits = [];

  // selected CEFR level
  public cefr = "B1";

  // has a search already been run or are we virgin?
  public searchRun = false;
  // keep previous search results?
  public keepPrevious = false; // TODO add GUI checkbox

  public corpora;
  public sensitiveTopics = [
    'Death', 'Discrimination', 'Drugs', 'Religion', 'Secretion', 'Sex', 'Violence', 'Other'
  ];
  constructor(public localizer: LocalizerService, private larka: LarkaService, private http: HttpClient) {
    const me = this;
    this.http.get('app/data/hitex-corpora.json').subscribe(function(data) {
      me.corpora = data;
    });
  }

  changeMode (val) {
    this.searchmode = val;
    this.cqpmode = val == 2;
  }

  changePos(event) {
    if (event.target.value === 'any') {
      this.currentPos = '';
      return;
    }
    this.currentPos = event.target.value.split('(')[1].split(')')[0];
  }

  searchmodeString () {
    if (this.searchmode === 0) {
      return 'hitex-lemma';
    }
    if (this.searchmode === 1) {
      return 'hitex-wordform';
    }
    if (this.searchmode === 2) {
      return 'hitex-cqp';
    }
    return 'error';
  }

  toggle (position) {
    this.menuToggle[position] = !this.menuToggle[position];
  }

  setSearchtermPosition (pos) {
    this.searchtermPosition = pos;
  }

  searchtermPositionString() {
    if (this.searchtermPosition == 0) {
      return 'hitex-of-start';
    }
    if (this.searchtermPosition == 1) {
      return 'hitex-of-end';
    }
    return 'error';
  }

  run () {
    this.searchRun = false;
    this.waiter.on();

    // TODO reset lists? Keep previous results? -> changing CEFR level can result in sentences being both hit and badhit
    if (!this.keepPrevious) {
      this.hits = [];
      this.badhits = [];
    }

    const query_w = $('#searchfield').val();

    const use_defaults = $('#usedefaults').is(':checked');

    let query_type = '';
    if (this.searchmode == 0) {
      query_type = 'lemma';
    }
    if (this.searchmode == 1) {
      query_type = 'wordform';
    }
    if (this.searchmode == 2) {
      query_type = 'cqp';
    }

    let query_pos = '';
    if (this.searchmode == 0 || this.searchmode == 1) {
      if (this.currentPos != 'any') { // or the SWE version?
        query_pos = this.currentPos;
      }
    }

    const max_kwics = $('#max_kwics').val();

    const corpus_list_string = this.get_checked_string($('#hitex-corpus-list').find('input'));

    const sensitive_voc_cats = this.get_checked_string($('#sensitive_voc_cats').find('input'));

    const maxhit = $('#maxhit').val();

    const random_seed = '';
    let target_cefr = 'B1';
    const tc = $('#cefrs').find('input[type="radio"]:checked').val();

    if (tc && tc !== 'all') {
      target_cefr = '' + tc;
      this.cefr = '' + tc;
    }

    const preserve_bad = $('#preserve_bad').is(':checked');

    // get all active filters/rankers
    const other_params = [];
    this.switchtoggles.forEach(function(f) {
      if (f.getValue()) {
        other_params.push(f.getValue());
      }
    });

    if (sensitive_voc_cats) {
      other_params.push('sensitive_voc_cats=' + sensitive_voc_cats);
    }
    const proportion = $('#kw_pos_percent').val();
    if (proportion) {
      other_params.push('proportion=' + proportion);
      const target_edge = (this.searchtermPosition == 0) ? 'start' : 'end';
      other_params.push('target_edge=' + target_edge);
    }
    const non_lemmatized_thr = $('#non_lemmatized_thr').val();
    if (non_lemmatized_thr) {
      other_params.push('non_lemmatized_thr=' + non_lemmatized_thr);
    }
    const non_alpha_thr = $('#non_alpha_thr').val();
    if (non_alpha_thr) {
      other_params.push('non_alpha_thr=' + non_alpha_thr);
    }
    const min_len = $('#min_len').val();
    if (min_len) {
      other_params.push('min_len=' + min_len);
    }
    const max_len = $('#max_len').val();
    if (max_len) {
      other_params.push('max_len=' + max_len);
    }

    const ops = other_params.join('&');

    const me = this;
    this.larka.hitex(query_w, query_type, use_defaults, query_pos, max_kwics, corpus_list_string, maxhit, random_seed, target_cefr, preserve_bad, ops).subscribe(function(data) {
        if (!data) {
          me.waiter.off();
          alert('Something went wrong!');
          return;
        }
        if (data['Error']) {
          me.waiter.off();
          alert('Something went wrong: ' + data['Error']);
          return;
        }
        data.forEach(function(d) {
          const b = {'sentence_left': d['sent_left'],
            'target': d['keyword']['word'],
            'sentence_right': d['sent_right'],
            'score': d['score'],
            'rank': d['rank'],
            'id': d['kwic_position'],
            'typicality': d['match_info']['typicality'][0],
            'svalex_fr': d['match_info']['svalex_fr'][0],
            'showInfo': false
          };
          b['violations'] = [];
          if (d['match_info']['readability']) {
            b['cefr'] = d['match_info']['readability'][1];
            b['violations'].push({'message': 'Different CEFR level:', 'data': d['match_info']['readability'][1]});
          }
          if (d['match_info']['proper_name']) {
            if (d['match_info']['proper_name'][1] !== 'no violations') {
              b['proper_name'] = d['match_info']['proper_name'][1];
              b['violations'].push({'message': 'Contains proper names:', 'data': d['match_info']['proper_name'][1]});
            }
          }
          if (d['match_info']['participle']) {
            b['participle'] = d['match_info']['participle'][1];
            b['violations'].push({'message': 'Contains participles:', 'data': d['match_info']['participle'][1]});
          }
          if (d['match_info']['modal_verb']) {
            b['modal_verb'] = d['match_info']['modal_verb'][1];
            b['violations'].push({'message': 'Contains modal verb:', 'data': d['match_info']['modal_verb'][1]});
          }
          if (d['match_info']['elliptic']) {
            b['elliptic'] = d['match_info']['elliptic'];
            b['violations'].push({'message': 'Contains ellipsis:', 'data': d['match_info']['elliptic'][1]});
          }
          if (d['match_info']['diff_voc_kelly']) {
            b['diff_voc_kelly'] = d['match_info']['diff_voc_kelly'];
            b['violations'].push({'message': 'Difficult words:', 'data': d['match_info']['diff_voc_kelly'][1]});
          }
          if (d['match_info']['anaphora-AB1']) {
            b['anaphora'] = d['match_info']['anaphora-AB1'][0][1];
            b['violations'].push({'message': 'Contains adverbial anaphora.', 'data': d['match_info']['anaphora-AB1'][0][1]});
          }
          if (d['match_info']['neg_form']) {
            b['negation'] = d['match_info']['neg_form'][1];
            b['violations'].push({'message': 'Contains negation:', 'data': d['match_info']['neg_form'][1]});
          }
          if (d['match_info']['out_of_svalex']) {
            b['out_of_svalex'] = d['match_info']['out_of_svalex'][1];
            b['violations'].push({'message': 'Out-of-Svalex:', 'data': d['match_info']['out_of_svalex'][1]});
          }
          if (d['match_info']['interrogative']) {
            b['interrogative'] = d['match_info']['interrogative'][1];
            b['violations'].push({'message': 'Interrogative form.', 'data': ''});
          }
          if (d['match_info']['no_root']) {
            b['no_root'] = d['match_info']['no_root'][1];
            b['violations'].push({'message': 'Missing dependency root.', 'data': d['match_info']['no_root'][1]});
          }
          if (d['match_info']['sent_tokenization']) {
            b['sent_tokenization'] = d['match_info']['sent_tokenization'][1];
            b['violations'].push({'message': 'Wrong sentence segmentation.', 'data': d['match_info']['sent_tokenization'][1]});
          }
          if (d['match_info']['non_alpha']) {
            b['non_alpha'] = d['match_info']['non_alpha'][1];
            b['violations'].push({'message': 'Contains non-alphabetical tokens.', 'data': d['match_info']['non_alpha'][1]});
          }
          if (d['match_info']['non_lemmatized']) {
            b['non_lemmatized'] = d['match_info']['non_lemmatized'][1];
            b['violations'].push({'message': 'Non-lemmatized tokens:', 'data': d['match_info']['non_lemmatized'][1]});
          }
          if (d['match_info']['struct_conn']) {
            b['struct_conn'] = d['match_info']['struct_conn'][1];
            b['violations'].push({'message': 'Structural connective.', 'data': d['match_info']['struct_conn'][1]});
          }
          if (d['match_info']['yn_answer']) {
            b['yn_answer'] = d['match_info']['yn_answer'][1];
            b['violations'].push({'message': 'Yes-No type answer.', 'data': d['match_info']['yn_answer'][1]});
          }
          if (d['match_info']['anaphora-PN']) {
            b['anaphora-PN'] = d['match_info']['anaphora-PN'][1];
            b['violations'].push({'message': 'Contains pronominal anaphora:', 'data': d['match_info']['anaphora-PN'][1]});
          }
          if (d['match_info']['anaphora-AB']) {
            b['anaphora-AB'] = d['match_info']['anaphora-AB'][1];
            b['violations'].push({'message': 'Contains adverbial anaphora.', 'data': d['match_info']['anaphora-AB'][1]});
          }
          if (d['match_info']['sensitive_voc']) {
            b['sensitive_voc'] = d['match_info']['sensitive_voc'][1];
            b['violations'].push({'message': 'Sensitive vocabulary:', 'data': d['match_info']['sensitive_voc'][1]});
          }
          if (d['match_info']['length']) {
            b['length'] = d['match_info']['length'][1];
            b['violations'].push({'message': 'Wrong length:', 'data': d['match_info']['length'][1]});
          }
          if (d['match_info']['repkw']) {
            b['repkw'] = d['match_info']['repkw'][1];
            b['violations'].push({'message': 'Search pattern repetition:', 'data': d['match_info']['repkw'][1]});
          }
          if (d['match_info']['kw_position']) {
            b['kw_position'] = d['match_info']['kw_position'][1];
            b['violations'].push({'message': 'Position of search pattern:', 'data': d['match_info']['kw_position'][1]});
          }
          if (d['match_info']['sverb']) {
            b['sverb'] = d['match_info']['sverb'][1];
            b['violations'].push({'message': 'S-verb:', 'data': d['match_info']['sverb'][1]});
          }
          if (d['match_info']['abbrev']) {
            b['abbrev'] = d['match_info']['abbrev'][1];
            b['violations'].push({'message': 'Abbreviation:', 'data': d['match_info']['abbrev'][1]});
          }
          if (d['match_info']['direct_speech']) {
            b['direct_speech'] = d['match_info']['direct_speech'][1];
            b['violations'].push({'message': 'Direct speech.', 'data': d['match_info']['direct_speech'][1]});
          }
          if (d['match_info']['typicality']) {
            b['typicality'] = d['match_info']['typicality'][0];
            b['violations'].push({'message': 'Typicality:', 'data': d['match_info']['typicality'][0]});
          }
          if (parseFloat(b['score']) < 0) {
            me.badhits.push(b);
          } else {
            me.hits.push(b);
          }
        });
        me.waiter.off();
        me.searchRun = true;
      },
      function(err) {
        me.waiter.off();
        alert('Something went wrong! ' + err);
      },
      function() {
        console.log('Completed.');
      });
  }

  get_checked_string(list) {
    const chosen = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if ($(item).is(':checked')) {
        chosen.push(item.value); // TODO map to values
      }
    }
    return chosen.join(',');
  }

  keyhandler(keycode) { // run search on ENTER in search field
    if (keycode == 13) {
      this.run();
    }
  }
}

interface MyData {
  data: any[];
}
