import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


/**
 * Created by David on 4/25/2016.
 */
@Injectable()
export class StateService {
    private states = {};

    persist (origin: string, state: any) {
        this.states[origin] = state;
    }

    retrieve (origin: string) {
        var me = this;
        return Observable.create(function(obs) {
            obs.next(me.states[origin]);
            obs.complete();
        });
    }

    hasState (origin: string) {
        return this.states[origin] !== undefined;
    }
}