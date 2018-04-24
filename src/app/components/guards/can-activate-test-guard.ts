import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {LoginService} from "../../services/login.service";


@Injectable()
export class CanActivateTestGuard implements CanActivate {

  constructor(private login: LoginService) {}

  canActivate() {
    //console.log(this.login.getUserId());
    //return this.login.getUserId() == 1;
    return true;
  }
}
