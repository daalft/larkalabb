/**
 * Created by David on 4/29/2017.
 */
import {Component} from "@angular/core";
@Component({
    selector: 'dia-test',
    templateUrl: 'app/templates/diagnostic-demo.html',
    styleUrls: ['app/css/molna.css', 'app/css/diagnostic.css']

    }
)

export class DiagnosticDemoComponent {
    private page = 1;
    private gap = 1;


    nextgap(event) {
        if (event.keyCode == 13) {
            if (this.gap == 1 || this.gap == 3) {
                this.gap++;
            }
        } else {
            if (this.gap == 1) {
                $('#ggg2').val($('#ggg1').val());
            }  else if (this.gap==3) {
                $('#ggg6').val($('#ggg5').val());
            }
        }
    }

    nextpage(event) {
        if (event.keyCode == 13) {
            if (this.gap == 2 || this.gap > 3) {
                this.gap++;
                this.page++;
            }
        } else if (this.gap==2) {
            $('#ggg4').val($('#ggg3').val());
        } else if (this.gap==4) {
            $('#ggg8').val($('#ggg7').val());
        }
    }

    gg1 (event) {
        console.log(event);
    }

    keyhandler(event) {
        // 37 <-
        // 39 ->
        console.log(event);
    }

    ngAfterViewInit () {
        $( "#sortable" ).sortable({
            placeholder: "ui-state-highlight",
            forcePlaceholderSize: true
        });
        $( "#sortable" ).disableSelection();
    }
}