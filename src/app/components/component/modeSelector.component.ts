/**
 * Created by David on 4/1/2016.
 */

import {Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, ViewChild} from "@angular/core";

import {LocalizerService} from "../../services/localizer.service";
import {PleaseWaitComponent} from "./pleasewait.component";

@Component({
    selector: 'mode-selector',
    templateUrl: "../../templates/mode-selector.html",
    providers: [PleaseWaitComponent]
})

export class ModeSelectorComponent {
    @Input() options: string;
    @Output() modeChangeEmitter: EventEmitter<any>;
    @Output() generateEmitter: EventEmitter<any>;

    private selectedMode;
    public modes;

    private canChangeMode: boolean = true;

    public busyGenerating = false;

    @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

    constructor(public localizer: LocalizerService) {
        this.modeChangeEmitter = new EventEmitter();
        this.generateEmitter = new EventEmitter();

    }

    ngOnInit() {
        this.modes = this.options.split(/,/);
        this.selectedMode = this.modes[0];
        this.modeChangeEmitter.emit(this.selectedMode);
    }

    setCanChangeMode(value: boolean) {
      this.canChangeMode = value;
    }

    isActive(modus) {
        return this.selectedMode == modus;
    }

    setMode(modus) {
      if (this.canChangeMode) {
        this.selectedMode = modus;
        this.modeChangeEmitter.emit(modus);
      } else {
        alert("Cannot change mode. Complete diagnostic test first.");
      }
    }

    generate() {
      if (this.busyGenerating) {
        return;
      }
        this.waiter.on();
        this.generateEmitter.emit("generate");
        this.busyGenerating = true;
    }

    waiterOff() {
      this.waiter.off();
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
