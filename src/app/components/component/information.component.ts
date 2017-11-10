/**
 * Created by David on 4/12/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {LocalizerService} from "../../services/localizer.service";
@Component({
    selector: 'information-show',
    templateUrl: 'app/templates/information-show.html',
    styleUrls: ['app/css/information.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class InformationComponent {

    private isVisible: boolean = false;
    private currentWord: string;

    constructor(private localizer: LocalizerService, private _routeParams: RouteParams) {}

    ngOnInit() {
        this.isVisible = true;
        let lemma = this._routeParams.get('lemma');
        if (!lemma) return; // there was no word or we failed to get it

        let pos = this._routeParams.get('pos');
        let sense = this._routeParams.get('sense');

        console.log(lemma + " " + pos + " " + sense);
        
    }
}