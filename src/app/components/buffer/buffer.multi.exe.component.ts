/**
 * Created by David on 10/20/2016.
 */

import {Component} from '@angular/core';

@Component({
  selector: 'buffer-multi',
  template: "<div>buffer multi dummy</div>"
})
export class BufferMultiExeComponent {

  private bufferFunction;

  private domain;
  private pos;
  private level;
  private quarantine;

  private bufferSize: number;
  private buffer;

  private bufferRefreshRate = 30000; // in ms

  private parentContext;

  private id;

  constructor() {
    this.buffer = [];
  }

  setParams(bufferfunction: any,  domain, selectedPos, level, qstring, buffersize: number, parentcontext: any) {
    this.bufferFunction = bufferfunction;
    this.domain = domain;
    this.pos = selectedPos;
    this.level = level;
    this.quarantine = qstring;
    this.bufferSize = buffersize;
    this.buffer = [];
    this.parentContext = parentcontext;
    this.start();
  }

  start () {
    const me = this;
    this.bufferFunction.call(this.parentContext, this.domain, this.pos, this.level, this.quarantine).subscribe(function(d) {
      me.buffer.push(d);
    });
    this.id = setInterval(function() {
      if (me.buffer.length >= me.bufferSize) {
        return;
      } else {
        me.bufferFunction.call(me.parentContext, me.domain, me.pos, me.level, me.quarantine).subscribe(function(d) {
          me.buffer.push(d);
        });
      }
    }, this.bufferRefreshRate);
  }

  interrupt() {
    console.log("buffer interrupt");
    clearInterval(this.id);
  }

  empty() {
    this.buffer = [];
  }

  ready () {
    return this.buffer.length > 0;
  }

  next () {
    if (this.buffer.length === 0) {
      console.error("buffer empty!");
      return;
    }
    return this.buffer.pop();
  }
}
