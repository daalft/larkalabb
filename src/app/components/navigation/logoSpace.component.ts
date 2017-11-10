/**
 * Created by David on 3/8/2016.
 */
import {Component} from '@angular/core';
import {LocalizerService} from "../../services/localizer.service";
import {EasterEggService} from "../../services/easteregg.service";

@Component({
    selector: 'logo-space',
    templateUrl: 'app/templates/logo-space.html'
})

export class LogoSpaceComponent {

    private currentLogo;
    private imageName = "lark4_t2"; // base file name. requires an equivalent file with "d" ending for localization
    private fileEnding = ".png";

    private currentLogoSmall = "app/img/lark4_t2s.png";
    
    constructor(private localizer: LocalizerService, private eggs: EasterEggService) {}

    localize(key: string) {
        return this.localizer.localize(key);
    }

    getLanguage() {
        return this.localizer.getLanguage();
    }

    getCurrentLogo () {
        let swedish = this.localizer.getLanguage()=='sv';
        let christmas = this.eggs.isChristmas();
        let autumn = this.eggs.isAutumn();
        if (christmas) {
            return "app/img/" + this.imageName + "c" + this.fileEnding;
        } else if (autumn) {
            return "app/img/" + this.imageName + "h2" + this.fileEnding;
        }
        return "app/img/" + this.imageName + (swedish?"d":"") + this.fileEnding;
    }
    
    getCurrentLogoSmall() {
        return this.currentLogoSmall;
    }
}