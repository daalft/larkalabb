import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LarkaService} from '../../services/larka.service';

import {MatSnackBar} from '@angular/material';
import {DataAggregatorService} from '../../services/dataAggregator.service';
import {PleaseWaitComponent} from '../component/pleasewait.component';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'l2p-annot',
  templateUrl: '../../templates/l2p-annot.html'
})

export class L2pAnnotatorComponent {
  @ViewChild('waiter') waiter: PleaseWaitComponent;

  public field_names = [];
  public taskTypeUpper;
  public taskType = null;
  public taskCat = null;
  public data;
  public predefs;

  public decorated_predefs = {};

  public currentItem;
  public counter: number;
  public total: number;
  public editSense: boolean;
  public editPos: boolean;

  public started: boolean;
  public ended: boolean;

  private name_map = {};
  private annotationMode;
  private currentAnnotator;

  public skipList = [];
  public showSkipList = true;

  public myControl = new FormControl();

  public options = [];
  private filteredOptions: Observable<string[]>;

  static _resetCheckboxes() {
    const cbx = $('#predef-grid').find(':checked');
    for (let i = 0; i < cbx.length; i++) {
      const cb = (<any>cbx[i]);
      cb.checked = false;
    }
  }

  static _resetInputFields() {
    $('#istext').val('');
    $('#imtext').val('');
    $('#pssel').find('option:eq(0)').prop('selected', true);
  }

  constructor(private http: HttpClient, private larka: LarkaService, private snackBar: MatSnackBar, private log: DataAggregatorService) {
    const me = this;
    this.counter = 0;
    this.log.setLogType('log_db');
    this.log.setAutoFlush(false);
    this.larka.l2p_fetchCat().subscribe(function(d) {
      const e = d['result'];
      for (let i = 0; i < e.length; i++) {
        const cn = e[i]['COLUMN_NAME'];
        /*
        if (cn.startsWith('m1') || cn.startsWith('m2')) { // ignore morphology fields
          continue;
        }
        */
        if (cn.startsWith('sense') || cn.startsWith('pos') || cn.startsWith('saldo') || cn.startsWith('cefr')) { // ignore some more fields
          continue;
        }
        if (cn === 'example' || cn === 'example_level') { // ignore example + example level
          continue;
        }
        //  modifiy name : split on _, title case
        const cnm = cn.split('_').join(' ').toUpperCase();
        if (cn === 'morphology2') { // reorder things so that MORPHOLOGY2 is on top
          me.field_names.unshift(cnm);
        } else {
          me.field_names.push(cnm);
        }
        me.name_map[cnm] = cn;
      }
    });
    this.decorated_predefs['nominal_declension'] = [
      '1 deklinationen (-or, utrum)',
      '2 deklinationen (-ar, utrum)',
      '3 deklinationen (-er, oftast utrum)',
      '4 deklinationen (-r, oftast utrum)',
      '5 deklinationen (-n, neutrum)',
      '6 deklinationen (-∅, oftast neutrum)',
      '7 deklinationen (-s)',
      'Övriga (substantiv som fakta, ögon, huvuden)'
    ];
    this.decorated_predefs['verbal_conjugation'] = [
      '1 konj. (visar, pratar)',
      '2 konj. (fäster, vänder, påminner)',
      '3 konj. (når, brer/breder, klär/kläder, gnider)',
      '4 konj. (ABLAUT-verbs; binder, river, kommer)',
      'Irregular verbs'
    ];
    this.decorated_predefs['adjectival_declension'] = [
      '1 declension (grön, grönare, grönast)',
      '2 declension (tung, tyngre, tyngst)',
      'Suppletive (irregular; gammal, äldre, äldst)',
      'Indeclinable'
    ];
  }

  showHide () {
    this.showSkipList = !this.showSkipList;
  }

  getDecoratedPredef(i) {
    if (this.decorated_predefs.hasOwnProperty(this.taskCat)) {
      return this.decorated_predefs[this.taskCat][i].toUpperCase();
    } else {
      return this.predefs[i].toUpperCase();
    }
  }

  startTask(taskCat, annotationMode, annotatorId) {
    const me = this;
    this.larka.l2p_check_annot(annotatorId).subscribe(function(d) {
      if (d['status'] === 200) {
        me.startTask2(taskCat, annotationMode, annotatorId);
      } else {
        me.snackBar.open('The provided annotator ID is not valid!', 'OK', {duration: 5000});
      }
    });
  }

  startTask2(taskCat, annotationMode, annotatorId) {
    this.waiter.on();
    this.currentAnnotator = annotatorId;
    this.taskTypeUpper = taskCat;
    this.taskCat = this.name_map[taskCat];
    this.annotationMode = annotationMode;
    this.log.setAggregator({'log_type': 'l2pannot', 'rater': this.currentAnnotator, 'annotMode': this.annotationMode});
    // fetch previous values

    const me = this;

    this.larka.l2p_get_field_type_values(this.taskCat).subscribe(function(d) {
      me.taskType = d['result']['field_type'].toLowerCase();
      me.predefs = d['result']['field_values'];

      me.log.addInformation('taskType', me.taskType);
      me.log.addInformation('taskCat', me.taskCat);
      if (me.predefs != null) {
        me.predefs = me.predefs.split(';');
      }
      me.larka.l2p_fetch_all_by_field(me.taskCat).subscribe(function(e) {
        me.data = e['result'];
        me.total = me.data.length;
        //me.counter++;
        me.currentItem = me.data[0];
        me.fillOptionList(me.data);
        me.larka.l2p_fetch_by_annotator(me.currentAnnotator, me.taskCat, me.annotationMode).subscribe(function(f) {
          // retrieve annotator values
          // populate skiplist

          const reslist = f['result'];
          if (reslist.length > 0) {
            for (let j = 0; j < reslist.length; j++) {
              const cj = reslist[j];
              const rsense = cj['sense'];
              const rskip = parseInt(cj['skipped'], 10);
              const rtv = cj['taskval'];
              if (rskip === 1) {
                me.skipList.push({'sense': rsense, 'index': -1});
              }
              const rdx = me.findIndexBySense(rsense);
              me.data[rdx][me.taskCat] = rtv;
              me.data[rdx]['ownvalue'] = true;
            }

          }

          const ls_key = me.currentAnnotator + ';' + me.taskCat + ';' + me.annotationMode;
          const prev = window.localStorage.getItem(ls_key);

          let restorePrevious = false;
          let prevVal = 0;

          if (prev != null) {
            restorePrevious = true;
            prevVal = parseInt(prev, 10);
            console.log("Prev val " + prevVal);
          }
          if (restorePrevious) {
            me.waiter.off();
            if (prevVal + 1 >= me.total) {
              if (me.skipList.length === 0) {
                const snackBarRef = me.snackBar.open('You have completed all the tasks in this category.', 'Start again', {duration: 5000});

                snackBarRef.onAction().subscribe(function() {
                  console.log('Do it anyway');

                  window.localStorage.removeItem(ls_key);
                  me.startTask2(taskCat, annotationMode, annotatorId);
                });

                return;
              }
            }
            for (let i = 1; i < prevVal; i++) {
              me.currentItem = me.data[i];
              me.counter++;
            }
          }
          me.started = true;
          me.waiter.off();

            window.setTimeout(function() {
              me.populate_fields();
            }, 100);

        });
      });
    });
  }

  populate_fields() {

    L2pAnnotatorComponent._resetInputFields();
    L2pAnnotatorComponent._resetCheckboxes();
    const retrievedValues = this.currentItem[this.taskCat];

    if ((this.annotationMode === 'manual' && this.currentItem.hasOwnProperty('ownvalue') && this.currentItem['ownvalue'])||this.annotationMode==='auto') {
      console.log("populating");
    if (retrievedValues != null) {
      if (this.taskType === 'is') {
        $('#istext').val(retrievedValues);
      }
      if (this.taskType === 'im') {
        $('#imtext').val(retrievedValues);
      }
      if (this.taskType === 'ps') {
        $('#pssel').val(retrievedValues);
      }
      if (this.taskType === 'pm') {
        const values = retrievedValues.split(',');
        for (let i = 0; i < values.length; i++) {
          const v = values[i];
          (<any>$('#predef-grid').find('input[value="' + v + '"]')).prop('checked', true);
        }
      }
    }
    }
  }


  enablePos() {
    this.editPos = true;
  }

  enableSense() {
    this.editSense = true;
  }

  skipListTryRemove() {
    const currentSense = this.currentItem['sense'];
    for (let i = 0; i < this.skipList.length; i++) {
      const ci = this.skipList[i];
      if (ci['sense'] === currentSense) {
        this.skipList.splice(i, 1);
      }
    }
  }

  save(num) {
    this.aggregate();
    this.log.closeAggregator();
    this.log.setAggregator({'log_type': 'l2pannot', 'rater': this.currentAnnotator, 'taskCat': this.taskCat,
      'taskType': this.taskType, 'annotMode': this.annotationMode});
    if (num === 0) {
      this.skipListTryRemove();
    }
  }

  revisit() {
    this.ended = false;
    this.goto(this.skipList[0]);
  }

  skipListContains(mobj) {
    if (this.skipList.length === 0) {
      return false;
    }
    for (let i = 0; i < this.skipList.length; i++) {
      const mob = this.skipList[i];
      if (mob['sense'] === mobj['sense']) {
        return true;
      }
    }
    return false;
  }

  skip () {
    this.log.addInformation('skipped', 1);
    const mobj = {'sense': this.currentItem['sense'], 'index': this.counter};
    if (!this.skipListContains(mobj)) {
      this.skipList.push(mobj);
    }
    this.next(1);
  }

  findIndexBySense(sense) {
    for (let i = 0; i < this.data.length; i++) {
      const ci = this.data[i];
      if (ci['sense'] === sense) {
        return i;
      }
    }
    return -1;
  }
  goto(skitem) {
    L2pAnnotatorComponent._resetCheckboxes();
    L2pAnnotatorComponent._resetInputFields();
    let idx = skitem['index'];
    if (idx < 0) {
      idx = this.findIndexBySense(skitem['sense']);
    }
    this.currentItem = this.data[idx];
    this.counter = idx;
  }

  next(num) {
    this.save(num);

    const me = this;
    if (this.counter < this.data.length - 1) {
      this.currentItem = this.data[++this.counter];
    } else {
      // TODO check whether skilist empty

      this.ended = true;
      //this.started = false;
      return;
    }
    L2pAnnotatorComponent._resetCheckboxes();
    L2pAnnotatorComponent._resetInputFields();
    window.setTimeout(function() {
      me.populate_fields();
    }, 100);
  }

  prev() {
    if (this.counter > 0) {
      this.save(1);
      this.currentItem = this.data[--this.counter];
      this.populate_fields();
    }
  }

  exit() {
    const ls_key = this.currentAnnotator + ';' + this.taskCat + ';' + this.annotationMode;
    window.localStorage.setItem(ls_key, '' + (this.counter+1));

    //this.aggregate();
    //this.log.closeAggregator();

    this.started = false;
    this.ended = false;
    this.data = null;
    this.currentItem = null;
    this.counter = 0;
    this.total = 0;
    this.skipList = [];
  }

  relink() {
    /*
    $('#currentSense');
    $('#currentPos');
    */
    this.snackBar.open('This functionality is not available.', 'OK', {duration: 5000});
  }

  aggregate() {
    this.log.addInformation('sense', this.currentItem['sense']);
    this.log.addInformation('pos', this.currentItem['pos']);
    let save_val;

    if (this.taskType === 'is') {
      //console.log(val);
      save_val = $('#istext').val();
    }
    if (this.taskType === 'im') {
      //console.log(val);
      save_val = $('#imtext').val();
    }
    if (this.taskType === 'ps') {
      //console.log(val);
      save_val = $('#pssel').find('option:selected').val();
    }
    if (this.taskType === 'pm') {
      // fetch all values where checkbox is checked
      // join all with ";"
      const cbx = $('#predef-grid').find(':checked');
      //console.log(cbx);
      const cvals = [];
      for (let i = 0; i < cbx.length; i++) {
        const cb = (<any>cbx[i]);
        const val = cb.value;
        cvals.push(val);
      }
      //console.log(cstring);
      save_val = cvals.join(',');
    }
    // sense, pos, field_name, field_value
    //
    if (save_val == null || save_val === '') {
      save_val = 'NULL';
    } else {
      save_val = save_val.toLowerCase();
    }
    this.log.addInformation('save_val', save_val);
    this.currentItem[this.taskCat] = save_val;
  }

  fillOptionList(data) {
    for (let i = 0; i < data.length; i++) {
      const sense = data[i]['sense'];
      const key = sense + " (" + data[i]['cefr'] + ")";
      const mobj = {'sense': sense, 'key': key, 'index': i};
      this.options.push(mobj);
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option['key'].toLowerCase().includes(filterValue));
  }
}
