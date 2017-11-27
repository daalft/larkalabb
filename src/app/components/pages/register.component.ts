/**
 * Created by David on 2/6/2017.
 */
import {Component, ViewChild} from "@angular/core";
import {LocalizerService} from "../../services/localizer.service";
import {LoginService} from "../../services/login.service";
import {ProfileDetailsComponent} from "../component/profileDetails.component";
import {HashService} from "../../services/hash.service";

@Component({
    selector: 'register-component',
    templateUrl: '../../templates/register.html',
    styleUrls: ['../../css/register.css']
})

export class RegisterComponent {

  public currentPage = 1;
  public uname;
  public chash;
  public allowNext = true;

    constructor(public localizer: LocalizerService, private login: LoginService) {}

    nextPage (usn,pw) {
        let me = this;
        if (!usn) {
            alert("Please choose a username!");
            return;
        }
        if (!pw) {
            alert("Please choose a password!");
            return;
        }
        this.login.userExists(usn).subscribe(function(res) {
            let status = res["Status"];
            if (status == true) {
                alert("This username is already taken!");
                return;
            }
            me.uname = usn;
            me.chash = HashService.hashCode(pw+usn);
            me.currentPage++;
        });
    }

    bubble (event) {
        this.allowNext = event;
    }

    createUser (udata) {
        if (this.allowNext) {
            udata["username"] = this.uname;
            udata["chash"] = this.chash;
            this.login.createUser(udata);
            this.currentPage++;
        }
    }
}
