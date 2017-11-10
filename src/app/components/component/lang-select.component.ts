/**
 * Created by David on 3/18/2016.
 */
import {Component, Input, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AutocompleteComponent} from "./autocomplete.component";

@Component({
    selector: 'lang-select',
    templateUrl: 'app/templates/lang-select.html',
    directives: [AutocompleteComponent],
    styleUrls: ['app/css/autocomplete.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LanguageSelectionComponent {
    @Input() langs;

    // mock arrays for number of fields
    private mothertongues = [1];
    private othertongues = [1];

    // real values
    private mothertonguesReal: string[] = [];
    private othertonguesReal = [];

    private levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

    addMothertongue () {
        this.mothertongues.push(1);
    }

    addOthertongue () {
        this.othertongues.push(1);
    }

    handleMtSet(value)  {

        this.mothertonguesReal.push(value);
    }

    handleOtSet(value) {
        this.othertonguesReal.push(value);
    }

    getMothertongues () {
        return this.mothertonguesReal;
    }

    getOthertongues () {
        return this.othertonguesReal;
    }
}