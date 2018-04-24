/**
 * Created by David on 3/15/2016.
 */
import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {AutocompleteComponent} from './autocomplete.component';
import {LanguageSelectionComponent} from './lang-select.component';
import {LoginService} from '../../services/login.service';
import {HttpClient} from '@angular/common/http';






@Component({
    selector: 'profile-fillout',
    templateUrl: '../../templates/profile-fillout.html',
    styleUrls: ['../../css/profile-fillout.css'],
})

export class ProfileDetailsComponent {

    @ViewChild('langselect') langselect: LanguageSelectionComponent;
    @Output() emitter: EventEmitter<any> = new EventEmitter();
    @Output() status: EventEmitter<boolean> = new EventEmitter();

    private countries;
    public languages;

    public noTeacher = true;

    private selfVisible = true;

    public educationLevels = [
        'None',
        'Compulsory school, max 1 year',
        'Compulsory school, 2 years',
        'Compulsory school, 3-4 years',
        'Compulsory school, 5-7 years',
        'Compulsory school, 8-9 years',
        'Compulsory school, 10-12 years',
        'Upper-secondary (gymnasiet), 1 year',
        'Upper-secondary school, 2 years',
        'Upper-secondary school, 3-4 years',
        'University, 1-3 years',
        'University, 4+ years',
        'Doctoral studies (PhD)',
        'Unknown'
    ];

    constructor(private http: HttpClient, private login: LoginService) {
        http.get('app/data/countries.json').subscribe(data => this.countries = data);
        http.get('app/data/langs.json').subscribe(data => this.languages = data);
    }

    handleValue(val) {
        console.log('got ' + val);
    }

    teacherToggle() {
        this.noTeacher = !this.noTeacher;

    }

    loggedIn () {
        return this.login.isLoggedIn();
    }

    retrieveData() {
        const obj = {};
        const firstname = $('#firstname').val();
        const middlename = $('#middlename').val();
        const lastname = $('#lastname').val();
        obj['firstname'] = firstname;
        obj['middlename'] = middlename;
        obj['lastname'] = lastname;

        const yob = $('#yob').val();
        obj['yob'] = yob;

        const sex = $('input:radio[name=sex]:checked').val();
        obj['sex'] = sex;

        const hel = $('#hel').val();
        const tles = $('#tles').val();
        const tlesu = $('#tlesu option:selected').val();
        const tlis = $('#tlis').val();
        const tlisu = $('#tlisu option:selected').val();
        obj['hel'] = hel;
        obj['tles'] = tles;
        obj['tlesu'] = tlesu;
        obj['tlis'] = tlis;
        obj['tlisu'] = tlisu;

        const cefr = $('input:radio[name=cefr]:checked').val();
        obj['cefr'] = cefr;

        const mothertongues = this.langselect.getMothertongues();
        // external 'required' check on mothertongue component
        if (mothertongues.length == 0) {
            alert('Please select a mothertongue!');
            this.status.emit(false);
            return;
        }
        const othertongues = this.langselect.getOthertongues();
        const othertonguelevels = [];
        for (let i = 0; i < this.langselect.getOthertongues().length; i++) {
            const cefr = $('input:radio[name=otcefr' + i + ']:checked').val();
            othertonguelevels.push(cefr);
        }
        obj['mothertongues'] = mothertongues;
        obj['othertongues'] = othertongues;
        obj['othertonguelevels'] = othertonguelevels;

        const roleVector = [];
        const learner = $('#learner').is(':checked');
        const sweteacher = $('#sweteacher').is(':checked');
        const teacher = $('#teacher').is(':checked');
        const linguist = $('#linguist').is(':checked');
        const researcher = $('#researcher').is(':checked');

        roleVector.push(learner);
        roleVector.push(sweteacher);
        roleVector.push(teacher);
        roleVector.push(linguist);
        roleVector.push(researcher);

        // check that at least one role has been selected
        const roleSum = roleVector.reduce(function(a, b) { return a + b; }, 0);
        if (roleSum == 0) {
            alert('Please select a role!');
            this.status.emit(false);
            return;
        }

        obj['roles'] = roleVector;

        const teachingsubject = $('#teachingsubject').val();
        const teachinglevel = $('#teachinglevel').val();

        obj['teachingsubject'] = teachingsubject;
        obj['teachinglevel'] = teachinglevel;

        const teacherid = $('#teacherid').val();

        obj['teacherid'] = teacherid;

        return obj;
    }

    validateSave() {
        this.status.emit(true);
        this.emitter.emit(this.retrieveData());
    }
}
