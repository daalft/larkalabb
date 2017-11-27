/**
 * Created by David on 6/3/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit} from '@angular/core';
import {LarkaService} from '../../services/larka.service';

@Component({
    selector: 'home',
    templateUrl: '../../templates/home-component.html',
    styleUrls: ['../../css/home.css']
})

export class HomeComponent implements AfterViewInit {

    constructor(private larka: LarkaService) {
        this.larka.wakeup().subscribe(function(d) {console.log(d); });
    }

    ngAfterViewInit () {
      document.getElementById('twitterfeed').innerHTML = '<a class="twitter-timeline" data-width="300" data-height="600" data-link-color="#E95F28" href="https://twitter.com/larka_sb">Tweets by larka_sb</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
        const twttr = 'undefined';
        if (twttr === 'undefined') {
            (function() {
                !function(d, s, id){let js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test((d as any).location) ? 'http' : 'https'; if (!d.getElementById(id)){js = d.createElement(s); js.id = id; js.src = p + '://platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs); }}(document, 'script', 'twitter-wjs');
            })();
        } else {
            (twttr as any).widgets.load();
        }

    }

}
