/**
 * Created by David on 26-Oct-17.
 */
import {Component} from "@angular/core";
import {LarkaService} from "../../services/larka.service";

@Component({
    selector: 'enetcollect',
    templateUrl: '../../templates/enetcollect.html',
    styleUrls: ['../../css/enetcollect.css']
})

export class EnetCollectDemoComponent {
  public isLoggedIn = true;
  public isAdmin = false;

  public showAddEntry = false;
  public showLitlist = true;
  public showReview = false;

  public litlist: any = [];
  public originalList = [];

  public revlist = [];

  public canReset: boolean;

  private offset = 735;
  constructor(private larka: LarkaService) {
    const me = this;

    larka.retrieve_ec().subscribe(function(d) {
      for (let i = 1; i < Object.keys(d).length; i++) {
        const j = i + me.offset;

        me.litlist.push(d[j]);
        me.originalList.push(d[j]);
      }
      console.log("loaded literature list");
    });

    //larka.retrieve_ec_taken().subscribe(function(d) {

    //});
  }
    nav (i) {
        if (i == 1) {
            this.showAddEntry = false;
            this.showReview = false;
            this.showLitlist = true;
        }
        if (i == 2) {
            this.showAddEntry = true;
            this.showLitlist = false;
            this.showReview = false;
        }
        if (i == 3) {
            this.showAddEntry = true;
            this.showLitlist = false;
            this.showReview = false;
        }
        if (i == 4) {
            this.showLitlist = false;
            this.showAddEntry = false;
            this.showReview = true;
        }
    }

    suggest(a,y,t,j,k,s) {
        let o = {
            "author": a,
            "year": y,
            "title": t,
            "journal": j,
            "keywords": k,
            "summary": s,
            "file": ""
        };

        this.revlist.push(o);
    }

    accept(entry) {
        this.litlist.push(entry);
        let idx = this.revlist.indexOf(entry);
        this.revlist.splice(idx,1);
    }

    reject(entry) {
        let idx = this.revlist.indexOf(entry);
        this.revlist.splice(idx,1);
    }

    addEntry(a,y,t,j,k,s) {
        let o = {
            "author": a,
            "year": y,
            "title": t,
            "journal": j,
            "keywords": k,
            "summary": s,
            "file": ""
        };

        this.litlist.push(o);
    }

    mockSearch(by) {
      this.litlist = this.litlist.filter(function(d) {
        if (d.hasOwnProperty("keywords")) {
          return d["keywords"].includes(by);
        }
        return false;
      });
      this.canReset = true;
    }

    mockResetSearch() {
      this.litlist = this.originalList;
      this.canReset = false;
    }

    ec_login() {
      const uname = window.prompt("Enter email address:");
      const me = this;
      /*
      this.larka.try_ec_logn(uname).subscribe(function(d) {
        me.isLoggedIn = true;
      });
*/
    }

    hasKeywords(i) {
    if (this.litlist.length === 0) {
      return false;
    }
      return this.litlist[i].hasOwnProperty("keywords");
    }

    iwant(i) {
      this.revlist.push(i);
    }

    ssave(i, kw, ss) {
      console.log(i);
      console.log(kw);
      console.log(ss);
    }

    takenSelf(i) {
      return this.revlist.indexOf(i) > -1;
    }

    takenOther(i) {
    if (i === 1) {
      return true;
    }
    return false;
    }
}
