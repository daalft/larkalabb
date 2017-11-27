import {Component, Input} from "@angular/core";
/**
 * Created by David on 10/25/2016.
 */
@Component({
    selector: 'switch-toggle',
    templateUrl: '../../templates/switch-toggle.html',
    styleUrls: ['../../css/switch-toggle.css']
})

export class SwitchToggleComponent {
    @Input() option1: string;
    @Input() option2: string;

    @Input() name: string;

  public toggleArray: boolean[];

    constructor() {
        this.toggleArray = [false, false];
    }

    toggle (position) {
        this.toggleArray[position] = !this.toggleArray[position];
        if (this.toggleArray[(position+1)%2]) {
            this.toggleArray[(position+1)%2] = false;
        }
    }

    getValue () {
        let value = (this.toggleArray[0]?this.option1:this.toggleArray[1]?this.option2:"");
        if (value) {
            return this.name + "=" + value.toLowerCase();
        }
        return "";
    }

    getName() {
        return this.name;
    }

    setValue (val: number) {
        this.toggleArray[val] = true;
        if (this.toggleArray[(val+1)%2]) {
            this.toggleArray[(val+1)%2] = false;
        }
    }
}
