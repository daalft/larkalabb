/**
 * Created by David on 3/17/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {RequiredValidator} from "@angular/forms";

@Component({
    selector: 'autocomplete-field',
    templateUrl: '../../templates/autocomplete-field.html',
    styleUrls: ['../../css/autocomplete.css']
})

export class AutocompleteComponent {

    @Input() values: string[];
    @Input() label: string;
    @Input() limitTo: number;
    @Input() colwidth: number;
    @Output() selectedValueEmitter: EventEmitter<any> = new EventEmitter();

  public currentProps;
  public currentIndex = -1;
  public selectedValue = '';

  public noPropositions: boolean = true;

    onKeyup(event, value) {

        // 40 -> down
        // 38 -> up
        // 13 -> enter
        if (event.which == 40) {
            if (this.currentIndex > -1) {
                this.currentProps[this.currentIndex]["highlight"] = false;
            }
            this.currentIndex = (this.currentIndex+1)%(this.currentProps.length);
            this.currentProps[this.currentIndex]["highlight"] = true;
        }
        else if (event.which == 38) {
            if (this.currentIndex > 0) {
                this.currentProps[this.currentIndex]["highlight"] = false;
                this.currentIndex = (this.currentIndex-1);
                this.currentProps[this.currentIndex]["highlight"] = true;
            }
        } else if (event.which == 13) {
            this.setField(this.currentProps[this.currentIndex]);

        } else {
            if (value == "") {
                this.noPropositions = true;
                return;
            }
            var me = this;
            this.currentProps = [];
            this.values.forEach(function(val) {
                if (val.match(new RegExp("^"+value, "i"))) {
                    if (me.limitTo && me.currentProps.length >= me.limitTo) {
                        return;
                    }
                    me.currentProps.push({"name":val});
                }
            });
            this.currentProps.sort();
        }
        this.noPropositions = (this.currentProps.length == 0);
    }

    setField(event) {
        this.selectedValue = event.name;
        if (this.currentIndex > -1) {
            this.currentProps[this.currentIndex]["highlight"] = false;
        }
        this.currentProps = [];
        this.currentIndex = -1;
        this.noPropositions = true;
        this.selectedValueEmitter.emit(this.selectedValue);
    }
}

