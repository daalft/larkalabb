import {Component} from "@angular/core";
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'talking',
  templateUrl: '../../templates/talking-head.html'
})

export class TalkingHead {

/*
  constructor() {
    (<any>window).AC_VHost_Embed(6717965,300,400,'',1,1, 2611195, 0,1,0,'72632338c25c2594d5c219ee9ff32693',0);
  }
*/
  test(t , i , j , k) {

    (<any>window).sayText(t, i, j, k);
  }
}
