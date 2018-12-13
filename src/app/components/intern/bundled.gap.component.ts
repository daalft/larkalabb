import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as _ from "lodash";

@Component({
  selector: 'bundle-gap',
  templateUrl: '../../templates/bundle-gap.html'
})

export class BundledGapComponent {

  private filepath = 'app/data/bundles3.json';

  private bundles;

  public bundle;
  public showInfo: boolean;

  constructor(private http: HttpClient) {
    const me = this;
    this.http.get(this.filepath).subscribe(function(d) {
      me.bundles = d;
      me.bundle = me.bundles.pop();
    });
  }


  unquote(s) {
    s = s.replace(/\+/g, '%20');
    return decodeURIComponent(s);
  }

  showAdd () {
    this.showInfo = true;
  }

  next () {
    this.showInfo = false;
    if (this.bundles.length > 0) {
      this.bundle = this.bundles.pop();
    }
  }

}
