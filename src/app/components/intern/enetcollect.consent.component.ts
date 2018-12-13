import {Component, ViewChild} from "@angular/core";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "../component/pleasewait.component";

@Component({
  selector: 'enetcollect-consent',
  templateUrl: '../../templates/enetcollect-consent.html'
  }
)

export class EnetcollectConsentComponent {
  @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

  public info = {'email': ''};
  public emt: string; // values: yes/no

  public showOther: boolean;

  public alreadyDone = false;

  constructor(private larka: LarkaService) {
    this.alreadyDone = (window.localStorage.getItem('alreadyDone') === 'true');
  }

  validate(agree, a1, a2, a3, a4, a5, a6, a7) {
    if (!agree) {
      window.alert('You have to accept the terms and conditions to continue!');
      return;
    }

    const me = this;
    let roles = '';
    if (a1) {
      roles += 'TeacherESL';
    }
    if (a2) {
      if (roles.length > 0) {
        roles += ',';
      }
      roles += 'TeacherAssessor';
    }
    if (a3) {
      if (roles.length > 0) {
        roles += ',';
      }
      roles += 'NLP';
    }
    if (a4) {
      if (roles.length > 0) {
        roles += ',';
      }
      roles += 'SLA';
    }
    if (a5) {
      if (roles.length > 0) {
        roles += ',';
      }
      roles += 'Linguist';
    }
    if (a6) {
      if (roles.length > 0) {
        roles += ',';
      }
      roles += 'SoftwareEngineer';
    }
    if (a7 !== null) {
      if (roles.length > 0) {
        roles += ',';
      }
      roles += a7;
    }
    this.waiter.on();
    this.larka.collect(this.info['email'], this.emt, roles).subscribe(function(f) {
      (<any>$('#referModal')).modal();
      me.waiter.off();
      me.alreadyDone = true;
      window.localStorage.setItem('alreadyDone', 'true');
    });
  }
}
