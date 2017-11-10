/**
 * Created by David on 16-Aug-17.
 */
import {Component} from "@angular/core";
import {LarkaService} from "../../services/larka.service";

@Component({
    selector: "diagnostic-test",
    templateUrl: 'app/templates/diagnostic-test.html',
    styleUrls: ['app/css/diagnostic.css']
})

export class DiagnosticTestComponent {

    // current predicted level
    private cpl = 3;

    constructor(private larka: LarkaService) {

    }

    selectExerciseType() {

    }


}