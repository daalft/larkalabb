import {Component} from "@angular/core";

@Component({
  selector: 'nonwords',
  templateUrl: '../../templates/nonwords.html'
})

export class NonwordComponent {

  public showOptions = false;

  public useL1 = false;
  public useNumbf = false;
  public nofilter = false;

  generate(nwlen) {
    console.log(nwlen);
  }

  noop() {}

}
