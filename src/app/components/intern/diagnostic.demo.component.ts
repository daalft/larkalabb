/**
 * Created by David on 4/29/2017.
 */
import {Component} from "@angular/core";
@Component({
    selector: 'dia-test',
    templateUrl: '../../templates/diagnostic-demo.html',
    styleUrls: ['../../css/molna.css', '../../css/diagnostic.css']

    }
)

export class DiagnosticDemoComponent {
  public page = 1;
  public gap = 1;


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
        ($( "#sortable" ) as any).sortable({
            placeholder: "ui-state-highlight",
            forcePlaceholderSize: true
        });
        ($( "#sortable" ) as any).disableSelection();
    }
}
