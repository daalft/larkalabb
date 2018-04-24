/**
 * Created by David on 11/21/2016.
 */
import {Component} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
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
