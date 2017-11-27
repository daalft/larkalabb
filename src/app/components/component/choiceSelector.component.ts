/**
 * Created by David on 3/10/2016.
 */
import {Component, Input, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
@Component({
    selector: 'choice-selector',
    templateUrl: '../../templates/choice-selector.html'
})

export class ChoiceSelectorComponent {
    @Input() choices;
    @Input() disabled;

    constructor(public localizer: LocalizerService) {}

    sense (array) {
        for (let i = 0; i < array.length; i++) {
            let labels = array[i].labels;
            let selected = this.countSelected(labels);
            let total = labels.length;
            if (selected/total > 0.5) {
                this.setSelected(labels, false);
            } else {
                this.setSelected(labels, true);
            }
        }
    }

    sense2 (labels) {
        let selected = this.countSelected(labels);
        let total = labels.length;
        if (selected/total > 0.5) {
            this.setSelected(labels, false);
        } else {
            this.setSelected(labels, true);
        }
    }

    countSelected (labels) {
        let count = 0;
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].selected) {
                count++;
            }
        }
        return count;
    }

    setSelected(labels, value) {
        for (let i = 0; i < labels.length; i++) {
            labels[i].selected = value;
        }
    }
}
