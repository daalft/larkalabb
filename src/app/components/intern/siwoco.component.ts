/**
 * Created by David on 11-Jul-17.
 */
import {Component, ViewChild} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "../component/pleasewait.component";

@Component({
    selector: 'siwoco',
    templateUrl: '../../templates/siwoco.html',
    styleUrls: ['../../css/siwoco.css']
})

export class SiwocoComponent {
    @ViewChild('waiter') waiter: PleaseWaitComponent;

    constructor(private larka: LarkaService) {}

  public analyses = [];
  public tempData;

    predict(word,pos,rop) {
        this.waiter.on();
        let me = this;
        this.larka.siwoco(word,pos,rop).subscribe(function(data) {
            let w = data["word"];
            let p = data["pos"];
            let rop = data["receptiveOrProductive"];
            let l = data["level"];

            me.analyses.unshift({'word': w, 'pos': p, 'rop': rop, 'level': l});

            me.waiter.off();
        });
    }

    keyhandler(event,word,pos,rop) {
        if (event.keyCode == 13) {
            this.predict(word,pos,rop);
        }
    }
}
