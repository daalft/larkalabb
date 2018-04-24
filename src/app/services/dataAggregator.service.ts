/**
 * Created by David on 10/3/2016.
 */
import {Injectable, AfterViewInit} from "@angular/core";
import {LoggerService} from "./logger.service";
import {DatetimeService} from "./datetime.service";
@Injectable()
export class DataAggregatorService {

    private dataBuffer = [];

    private autoFlushIntervalSeconds: number;
    private autoFlushProcessID;

    private currentAggregator;

    private mode;

    constructor (private logger: LoggerService) {
        // turn on autoFlush with default interval of 1 minute
        this.setAutoFlush(true);

    }

    getUserInfo () {
        this.logger.getUserInfo();
    }

    aggregate (type,data, id) {
        // automatically add timestamp
        let now = DatetimeService.currentTimestamp();
        let obj = {
            'type': type,
            'data': data,
            'id': id,
            'timestamp': now
        };
        this.dataBuffer.push(obj);
    }

    setAggregator(obj) {
        obj['timestamp'] = DatetimeService.currentTimestamp();
        this.currentAggregator = obj;
    }

    addInformation (key,val) {
        if (!this.currentAggregator[key]) {
            this.currentAggregator[key] = val;
        } else {
            let buffer = this.currentAggregator[key];
            if (typeof buffer === 'string' || buffer instanceof String) {
                this.currentAggregator[key] = [];
                this.currentAggregator[key].push(buffer);
                this.currentAggregator[key].push(val);
            } else {
                this.currentAggregator[key].push(val);
            }
        }
    }

    closeAggregator() {
        this.dataBuffer.push(this.currentAggregator);
        this.currentAggregator = null;
        this.flush();
    }

    flush () {
        if (this.dataBuffer.length == 0) {
            //console.log("Nothing to flush");
            return;
        }

        // send buffered data via logger service to database

        for (let i = 0; i < this.dataBuffer.length; i++) {

            this.logger.log(this.dataBuffer[i], this.mode);
        }
        this.dataBuffer = [];
    }

    setAutoFlush (autoflush: boolean, intervalSeconds: number = 60) {
        if (!autoflush && !this.autoFlushProcessID) {
            console.error("Autoflush already off");
            return;
        }
        if (autoflush) {
            this.autoFlushProcessID = window.setInterval((function(self) {
                return function () {
                    self.flush();
                }
            })(this), 1000*intervalSeconds);
        } else {
            clearInterval(this.autoFlushProcessID);
        }
    }

    setLogType(s: string) {
        this.mode = s;
    }
}
