/**
 * Created by David on 12/20/2016.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


/**
 * Created by David on 4/25/2016.
 */
@Injectable()
export class EasterEggService {
    // eggs
    private eggArray: boolean[] = [];

    magicFunction1 () {
        this.eggArray[0] = true;
    }

    magicFunction2 () {
        this.eggArray[1] = true;
    }

    isChristmas () {
        return this.eggArray[0];
    }

    isAutumn () {
        return this.eggArray[1];
    }
}