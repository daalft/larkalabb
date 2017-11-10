/**
 * Created by David on 3/15/2016.
 */
import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, Output, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {AutocompleteComponent} from "./autocomplete.component";
import {LanguageSelectionComponent} from "./lang-select.component";
import {LogoSpaceComponent} from "../navigation/logoSpace.component";
import {LoginService} from "../../services/login.service";






@Component({
    selector: 'profile-fillout',
    templateUrl: 'app/templates/profile-fillout.html',
    directives: [AutocompleteComponent, LanguageSelectionComponent],
    styleUrls: ['app/css/profile-fillout.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProfileDetailsComponent {

    @ViewChild('langselect') langselect: LanguageSelectionComponent;
    @Output() emitter: EventEmitter<any> = new EventEmitter();
    @Output() status: EventEmitter<boolean> = new EventEmitter();

    private countries;
    private languages;

    private noTeacher: boolean = true;

    private selfVisible: boolean = true;

    private educationLevels = [
        "None",
        "Compulsory school, max 1 year",
        "Compulsory school, 2 years",
        "Compulsory school, 3-4 years",
        "Compulsory school, 5-7 years",
        "Compulsory school, 8-9 years",
        "Compulsory school, 10-12 years",
        "Upper-secondary (gymnasiet), 1 year",
        "Upper-secondary school, 2 years",
        "Upper-secondary school, 3-4 years",
        "University, 1-3 years",
        "University, 4+ years",
        "Doctoral studies (PhD)",
        "Unknown"
    ];

    constructor(private http: Http, private login: LoginService) {
        http.get('app/data/countries.json').map(res => res.json()).subscribe(data => this.countries = data);
        http.get('app/data/langs.json').map(res => res.json()).subscribe(data => this.languages = data);
    }

    handleValue(val) {
        console.log("got " + val);
    }

    teacherToggle() {
        this.noTeacher = !this.noTeacher;

    }

    loggedIn () {
        return this.login.isLoggedIn();
    }

    retrieveData() {
        let obj = {};
        let firstname = $('#firstname').val();
        let middlename = $('#middlename').val();
        let lastname = $('#lastname').val();
        obj["firstname"] = firstname;
        obj["middlename"] = middlename;
        obj["lastname"] = lastname;

        let yob = $('#yob').val();
        obj["yob"] = yob;

        let sex = $('input:radio[name=sex]:checked').val();
        obj["sex"] = sex;

        let hel = $('#hel').val();
        let tles = $('#tles').val();
        let tlesu = $('#tlesu option:selected').val();
        let tlis = $('#tlis').val();
        let tlisu = $('#tlisu option:selected').val();
        obj["hel"] = hel;
        obj["tles"] = tles;
        obj["tlesu"] = tlesu;
        obj["tlis"] = tlis;
        obj["tlisu"] = tlisu;

        let cefr = $('input:radio[name=cefr]:checked').val();
        obj["cefr"] = cefr;

        let mothertongues = this.langselect.getMothertongues();
        // external 'required' check on mothertongue component
        if (mothertongues.length == 0) {
            alert("Please select a mothertongue!");
            this.status.emit(false);
            return;
        }
        let othertongues = this.langselect.getOthertongues();
        let othertonguelevels = [];
        for (let i = 0; i < this.langselect.getOthertongues().length; i++) {
            let cefr = $('input:radio[name=otcefr'+i+']:checked').val();
            othertonguelevels.push(cefr);
        }
        obj["mothertongues"] = mothertongues;
        obj["othertongues"] = othertongues;
        obj["othertonguelevels"] = othertonguelevels;

        let roleVector = [];
        let learner = $('#learner').is(':checked');
        let sweteacher = $('#sweteacher').is(':checked');
        let teacher = $('#teacher').is(':checked');
        let linguist = $('#linguist').is(':checked');
        let researcher = $('#researcher').is(':checked');

        roleVector.push(learner);
        roleVector.push(sweteacher);
        roleVector.push(teacher);
        roleVector.push(linguist);
        roleVector.push(researcher);

        // check that at least one role has been selected
        let roleSum = roleVector.reduce(function(a,b) { return a+b;},0);
        if (roleSum == 0) {
            alert("Please select a role!");
            this.status.emit(false);
            return;
        }

        obj["roles"] = roleVector;

        let teachingsubject = $('#teachingsubject').val();
        let teachinglevel = $('#teachinglevel').val();

        obj["teachingsubject"] = teachingsubject;
        obj["teachinglevel"] = teachinglevel;

        let teacherid = $('#teacherid').val();

        obj["teacherid"] = teacherid;

        return obj;
    }

    validateSave() {
        //let userid = this.login.getUserId();
        // send data to server
        /*
        let firstname = $('#firstname').val();
        let middlename = $('#middlename').val();
        let lastname = $('#lastname').val();

        let yob = $('#yob').val();

        let sex = $('input:radio[name=sex]:checked').val();

        let hel = $('#hel').val();
        let tles = $('#tles').val();
        let tlesu = $('#tlesu option:selected').val();
        let tlis = $('#tlis').val();
        let tlisu = $('#tlisu option:selected').val();

        let cefr = $('input:radio[name=cefr]:checked').val();

        let mothertongues = this.langselect.getMothertongues();
        let othertongues = this.langselect.getOthertongues();
        let othertonguelevels = [];
        for (let i = 0; i < this.langselect.getOthertongues().length; i++) {
            let cefr = $('input:radio[name=otcefr'+i+']:checked').val();
            othertonguelevels.push(cefr);
        }

        let roleVector = [];
        let learner = $('#learner').is(':checked');
        let sweteacher = $('#sweteacher').is(':checked');
        let teacher = $('#teacher').is(':checked');
        let linguist = $('#linguist').is(':checked');
        let researcher = $('#researcher').is(':checked');

        roleVector.push(learner);
        roleVector.push(sweteacher);
        roleVector.push(teacher);
        roleVector.push(linguist);
        roleVector.push(researcher);

        let teachingsubject = $('#teachingsubject').val();
        let teachinglevel = $('#teachinglevel').val();

        let teacherid = $('#teacherid').val();

        console.log(tles);
        console.log(tlesu);
        */
        this.status.emit(true);
        this.emitter.emit(this.retrieveData());
    }
}