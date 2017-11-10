/**
 * Created by David on 2/16/2017.
 */
import {Component, Input} from "@angular/core";

@Component({
    selector: 'cedit-form',
    templateUrl: 'app/templates/cedit-form.html',
    styleUrls: ['app/css/editor.css']
})

export class CeditFormComponent {
    @Input() params;

    private visible: boolean = false;

    show() {
        // init with values
        this.visible = true;
    }

    hide () {
        this.visible = false;
    }
}