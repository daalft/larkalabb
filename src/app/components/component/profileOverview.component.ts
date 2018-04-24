/**
 * Created by David on 11/21/2016.
 */
import {Component} from "@angular/core";
import {ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {LearnerModelService} from "../../services/learnerModel.service";
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../services/login.service";
@Component({
    selector: 'profile-overview',
    templateUrl: '../../templates/profile-overview.html',
    styleUrls: ['../../css/profile-overview.css']
})

export class ProfileOverviewComponent implements CanActivate {


  public learner: LearnerModelService;
  public profileId;

    constructor(private route: ActivatedRoute, private login: LoginService) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
        return this.login.getUserId() == this.profileId;
    }

    loadInfo (id) {
        // connect to DB
        // -> defer call to model service
        this.profileId = id;
        console.log("Loading user " + id);
    }

    getId () {
        if (!this.profileId) {
            this.profileId = this.login.getUserId();
        }
        return this.profileId;
    }
}
