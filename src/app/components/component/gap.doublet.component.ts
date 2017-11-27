/**
 * Created by David on 5/2/2017.
 */
import {Component, Input, ViewChild, ElementRef} from "@angular/core";

@Component({
    selector: 'gap-doublet',
    templateUrl: '../../templates/gap-doublet.html',
    styleUrls: ['../../css/molna.css', '../../css/diagnostic.css']
})

export class GapDoubletComponent {
    @Input() s1l;
    @Input() s1r;
    @Input() s2l;
    @Input() s2r;

    @ViewChild('gap1') gap1: ElementRef;
    @ViewChild('gap2') gap2: ElementRef;

    keyhandler(event) {
        let source = event.target;
        let target = null;
        if (source == this.gap1.nativeElement) {
            target = this.gap2;
        } else if (source == this.gap2.nativeElement) {
            target = this.gap1;
        }
        //event.target = target;
        target.nativeElement.dispatchEvent(event);  // fire event on other gap
    }
}
