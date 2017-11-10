/**
 * Created by David on 4/1/2016.
 */

import {Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, ViewChild} from "@angular/core";

import {LocalizerService} from "../../services/localizer.service";
import {PleaseWaitComponent} from "./pleasewait.component";

@Component({
    selector: 'mode-selector',
    templateUrl: "app/templates/mode-selector.html",
    providers: [PleaseWaitComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ModeSelectorComponent {
    @Input() options: string;
    @Output() modeChangeEmitter: EventEmitter;
    @Output() generateEmitter: EventEmitter;

    private selectedMode;
    private modes;

    private busyGenerating = false;

    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

    constructor(private localizer: LocalizerService) {
        this.modeChangeEmitter = new EventEmitter();
        this.generateEmitter = new EventEmitter();

    }

    ngOnInit() {
        this.modes = this.options.split(/,/);
        this.selectedMode = this.modes[0];
        this.modeChangeEmitter.emit(this.selectedMode);
    }

    isActive(modus) {
        return this.selectedMode == modus;
    }

    setMode(modus) {
        this.selectedMode = modus;
        this.modeChangeEmitter.emit(modus);
    }

    generate() {
        this.waiter.on();
        this.generateEmitter.emit("generate");
        this.busyGenerating = true;
    }

    releaseButton () {
        this.waiter.off();
        this.busyGenerating = false;
    }

    lockButton () {
        this.waiter.on();
        this.busyGenerating = true;
    }
}