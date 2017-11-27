/**
 * Created by David on 11/21/2016.
 */
import {Component} from "@angular/core";
import {ProfileOverviewComponent} from "../component/profileOverview.component";
import {ProfileMenuComponent} from "../navigation/profileMenu.component";
import {LearnerProgressComponent} from "../component/learnerProgress.component";
import {ProfileDetailsComponent} from "../component/profileDetails.component";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'profile',
    templateUrl: '../../templates/profile.html',
    styleUrls: ['../../css/profile.css']
})

export class ProfileComponent implements CanActivate {
  public currentPage = 0;

    constructor(private login: LoginService) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean {
        return this.login.isLoggedIn();
    }

    changePage (page) {
        this.currentPage = page['page'];
    }


}
