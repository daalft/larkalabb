/**
 * Created by David on 10/20/2016.
 */

import {Injectable} from "@angular/core";
@Injectable()
export class BufferService {

    private bufferFunction;
    private bufferSize: number;
    private buffer;

    constructor(bufferfunction: any, buffersize: number) {
        this.bufferFunction = bufferfunction;
        this.bufferSize = buffersize;
        this.buffer = [];
        this.init();
    }

    init () {
        let me = this;
        for (var i = 0; i < this.bufferSize; i++) {
            this.bufferFunction().subscribe(function(data) {
                me.buffer.push(data);
            });
        }
    }

    ready () {
        return this.buffer.length == this.bufferSize;
    }

    next () {
        if (!this.ready()) {
            console.error("buffer not ready!");
            return;
        }
        if (this.buffer.length == 0) {
            console.error("buffer empty!");
            return;
        }
        let nextElement = this.buffer.pop();
        this.buffer.push(this.bufferFunction());
        return nextElement;
    }
}