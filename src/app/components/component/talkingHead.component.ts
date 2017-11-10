/**
 * Created by David on 11/22/2016.
 */
import {Component} from "@angular/core";
@Component({
    selector: 'talking-head',
    templateUrl: 'app/templates/talking-head-frame.html',
    styleUrls: ['app/css/talking-head.css']
})

export class TalkingHeadComponent {
    private string = '';

    say (text) {
        sayText('Vi säger inte så. Det var ganska dåligt.',2,9)
    }
}