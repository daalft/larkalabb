/**
 * Created by David on 10/20/2016.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KarpService} from "./karp.service";

@Injectable()
export class BufferService {

    private bufferFunction;
    private functionArguments;
    private bufferSize: number;
    private buffer;

    private bufferRefreshRate = 1000; // in ms

  private parentContext;

    private id;

    constructor() {

    }

    setParams(bufferfunction: any, functionarguments: any, buffersize: number, parentcontext: any) {
      this.bufferFunction = bufferfunction;
      this.functionArguments = functionarguments;
      this.bufferSize = buffersize;
      this.buffer = [];
      this.parentContext = parentcontext;
      console.log(bufferfunction);
      console.log(functionarguments);

      this.start();
    }

    start () {
      const me = this;
        this.id = setInterval(function() {
          if (me.buffer.length === me.bufferSize) {
            return;
          } else {
            me.bufferFunction.apply(me.parentContext, me.functionArguments).subscribe(function(d) {
              me.buffer.push(d);
            });
          }
        }, this.bufferRefreshRate);
    }

    interrupt() {
      console.log("buffer interrupt");
      clearInterval(this.id);
    }

  ready () {
        return this.buffer.length > 0;
    }

    next () {
        if (this.buffer.length == 0) {
            console.error("buffer empty!");
            return;
        }
        let nextElement = this.buffer.pop();

        return nextElement;
    }
}
