/**
 * Created by David on 26-Oct-17.
 */
import {Component} from "@angular/core";

@Component({
    selector: 'enetcollect',
    templateUrl: '../../templates/enetcollect.html',
    styleUrls: ['../../css/enetcollect.css']
})

export class EnetCollectDemoComponent {
  public isLoggedIn = false;
  public isAdmin = false;

  public showAddEntry = false;
  public showLitlist = true;
  public showReview = false;

  public litlist = [
        {
            'author': 'Alfter David',
            'year': '2017',
            'title': 'Demonstration of work in progress',
            'journal': 'Journal of meteorolinguics',
            "keywords": "demo, work, tags",
            "summary": "This is a very interesting paper. I suggest everyone read it.",
            "file": ""
        },
        {
            'author': 'Cibej Jaka',
            'year': '2016',
            'title': 'Taming wolves',
            'journal': 'Proceedings of the first international workshop on animal taming'
            ,
            "keywords": "wolves, taming, NLP",
            "summary": "This is not such a good paper although the author shows great potential.",
            "file": ""
        },
        {
            'author': 'Milosevska Lina',
            'year': '2018',
            'title': 'Writing good academic Macedonian',
            'journal': 'Journal of modern languages',
            "keywords": "CALL, linguistics, writing",
            "summary": "Haven't read this paper yet. Will do that later.",
            "file": ""
        }
    ];

  public revlist = [
        {
            'author': 'No author',
            'year': '9999',
            'title': 'No title',
            'journal': 'No journal',
            "keywords": "no, key, words, provided",
            "summary": "This is a really bad suggestion. It should be rejected.",
            "file": ""
        }
    ];

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
}
