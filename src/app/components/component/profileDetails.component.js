System.register(["@angular/core", "@angular/http", "./lang-select.component", "../../services/login.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, lang_select_component_1, login_service_1, ProfileDetailsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (lang_select_component_1_1) {
                lang_select_component_1 = lang_select_component_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }
        ],
        execute: function () {
            ProfileDetailsComponent = /** @class */ (function () {
                function ProfileDetailsComponent(http, login) {
                    var _this = this;
                    this.http = http;
                    this.login = login;
                    this.emitter = new core_1.EventEmitter();
                    this.status = new core_1.EventEmitter();
                    this.noTeacher = true;
                    this.selfVisible = true;
                    this.educationLevels = [
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
                    http.get('app/data/countries.json').map(function (res) { return res.json(); }).subscribe(function (data) { return _this.countries = data; });
                    http.get('app/data/langs.json').map(function (res) { return res.json(); }).subscribe(function (data) { return _this.languages = data; });
                }
                ProfileDetailsComponent.prototype.handleValue = function (val) {
                    console.log("got " + val);
                };
                ProfileDetailsComponent.prototype.teacherToggle = function () {
                    this.noTeacher = !this.noTeacher;
                };
                ProfileDetailsComponent.prototype.loggedIn = function () {
                    return this.login.isLoggedIn();
                };
                ProfileDetailsComponent.prototype.retrieveData = function () {
                    var obj = {};
                    var firstname = $('#firstname').val();
                    var middlename = $('#middlename').val();
                    var lastname = $('#lastname').val();
                    obj["firstname"] = firstname;
                    obj["middlename"] = middlename;
                    obj["lastname"] = lastname;
                    var yob = $('#yob').val();
                    obj["yob"] = yob;
                    var sex = $('input:radio[name=sex]:checked').val();
                    obj["sex"] = sex;
                    var hel = $('#hel').val();
                    var tles = $('#tles').val();
                    var tlesu = $('#tlesu option:selected').val();
                    var tlis = $('#tlis').val();
                    var tlisu = $('#tlisu option:selected').val();
                    obj["hel"] = hel;
                    obj["tles"] = tles;
                    obj["tlesu"] = tlesu;
                    obj["tlis"] = tlis;
                    obj["tlisu"] = tlisu;
                    var cefr = $('input:radio[name=cefr]:checked').val();
                    obj["cefr"] = cefr;
                    var mothertongues = this.langselect.getMothertongues();
                    // external 'required' check on mothertongue component
                    if (mothertongues.length == 0) {
                        alert("Please select a mothertongue!");
                        this.status.emit(false);
                        return;
                    }
                    var othertongues = this.langselect.getOthertongues();
                    var othertonguelevels = [];
                    for (var i = 0; i < this.langselect.getOthertongues().length; i++) {
                        var cefr_1 = $('input:radio[name=otcefr' + i + ']:checked').val();
                        othertonguelevels.push(cefr_1);
                    }
                    obj["mothertongues"] = mothertongues;
                    obj["othertongues"] = othertongues;
                    obj["othertonguelevels"] = othertonguelevels;
                    var roleVector = [];
                    var learner = $('#learner').is(':checked');
                    var sweteacher = $('#sweteacher').is(':checked');
                    var teacher = $('#teacher').is(':checked');
                    var linguist = $('#linguist').is(':checked');
                    var researcher = $('#researcher').is(':checked');
                    roleVector.push(learner);
                    roleVector.push(sweteacher);
                    roleVector.push(teacher);
                    roleVector.push(linguist);
                    roleVector.push(researcher);
                    // check that at least one role has been selected
                    var roleSum = roleVector.reduce(function (a, b) { return a + b; }, 0);
                    if (roleSum == 0) {
                        alert("Please select a role!");
                        this.status.emit(false);
                        return;
                    }
                    obj["roles"] = roleVector;
                    var teachingsubject = $('#teachingsubject').val();
                    var teachinglevel = $('#teachinglevel').val();
                    obj["teachingsubject"] = teachingsubject;
                    obj["teachinglevel"] = teachinglevel;
                    var teacherid = $('#teacherid').val();
                    obj["teacherid"] = teacherid;
                    return obj;
                };
                ProfileDetailsComponent.prototype.validateSave = function () {
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
                };
                __decorate([
                    core_1.ViewChild('langselect'),
                    __metadata("design:type", lang_select_component_1.LanguageSelectionComponent)
                ], ProfileDetailsComponent.prototype, "langselect", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], ProfileDetailsComponent.prototype, "emitter", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], ProfileDetailsComponent.prototype, "status", void 0);
                ProfileDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'profile-fillout',
                        templateUrl: 'app/templates/profile-fillout.html',
                        styleUrls: ['app/css/profile-fillout.css'],
                    }),
                    __metadata("design:paramtypes", [http_1.Http, login_service_1.LoginService])
                ], ProfileDetailsComponent);
                return ProfileDetailsComponent;
            }());
            exports_1("ProfileDetailsComponent", ProfileDetailsComponent);
        }
    };
});
//# sourceMappingURL=profileDetails.component.js.map