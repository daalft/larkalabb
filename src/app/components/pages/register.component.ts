/**
 * Created by David on 2/6/2017.
 */
import {Component, ViewChild} from '@angular/core';
import {LocalizerService} from '../../services/localizer.service';
import {LoginService} from '../../services/login.service';
import {HashService} from '../../services/hash.service';
import {PleaseWaitComponent} from '../component/pleasewait.component';

@Component({
  selector: 'register-component',
  templateUrl: '../../templates/register.html',
  styleUrls: ['../../css/register.css']
})

export class RegisterComponent {

  @ViewChild(PleaseWaitComponent) waiter: PleaseWaitComponent;

  public currentPage = 1;
  public uname;
  public chash;
  public allowNext = true;

  constructor(public localizer: LocalizerService, private login: LoginService) {}

  nextPage (usn, pw) {
    const me = this;
    if (!usn) {
      alert('Please choose a username!');
      return;
    }
    if (!pw) {
      alert('Please choose a password!');
      return;
    }
    this.waiter.on();
    this.login.userExists(usn).subscribe(function(res) {
      const status = res['uid'];
      if (status) {
        alert('This username is already taken!');
        me.waiter.off();
        return;
      }
      me.uname = usn;
      me.chash = HashService.hashCode(pw + usn);
      me.currentPage++;
      me.waiter.off();
    });
  }

  bubble (event) {
    this.allowNext = event;
  }

  createUser (udata) {
    if (this.allowNext) {
      this.waiter.on();
      udata['username'] = this.uname;
      udata['chash'] = this.chash;
      const me = this;
      this.login.createUser(udata).subscribe(function(d) {
        me.login.loginWithHash(udata['username'], udata['chash']).subscribe(function(f) {
          me.currentPage++;
          me.login.setUserId(f['userid']);
          me.waiter.off();
        });
      });
    }
  }
}
