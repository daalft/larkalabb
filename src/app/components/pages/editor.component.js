System.register(["../../services/localizer.service", "@angular/core", "@angular/http", "../../services/larka.service", "../component/pleasewait.component"], function (exports_1, context_1) {
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
    var localizer_service_1, core_1, http_1, larka_service_1, pleasewait_component_1, CorpusEditorComponent;
    return {
        setters: [
            function (localizer_service_1_1) {
                localizer_service_1 = localizer_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (larka_service_1_1) {
                larka_service_1 = larka_service_1_1;
            },
            function (pleasewait_component_1_1) {
                pleasewait_component_1 = pleasewait_component_1_1;
            }
        ],
        execute: function () {
            CorpusEditorComponent = /** @class */ (function () {
                function CorpusEditorComponent(localizer, http, larka) {
                    this.localizer = localizer;
                    this.http = http;
                    this.larka = larka;
                    this.openTags = [];
                    this.taglist = [];
                    this.levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
                    this.skills = [{ "text": "Listening", "val": "listening" },
                        { "text": "Reading", "val": "reading" },
                        { "text": "Speaking", "val": "speaking" },
                        { "text": "Writing", "val": "writing" }];
                    this.competences = [{ "text": "Grammar", "val": "grammar" },
                        { "text": "Pronunciation", "val": "pronunciation" },
                        { "text": "Spelling", "val": "spelling" },
                        { "text": "Vocabulary", "val": "vocabulary" }];
                    this.lessoncounter = 0;
                    this.textcounter = 0;
                    this.activitycounter = 0;
                    this.listcounter = 0;
                    this.langexcounter = 0;
                    this.currentLevel = "";
                    var me = this;
                    http.get("app/data/cedit-topics.json").map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.topics = data;
                    });
                    http.get("app/data/cedit-activity.json").map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.activitytypes = data;
                    });
                    http.get("app/data/cedit-formats.json").map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.formats = data;
                    });
                    http.get("app/data/cedit-units.json").map(function (res) { return res.json(); }).subscribe(function (data) {
                        me.units = data;
                    });
                }
                CorpusEditorComponent.prototype.ngAfterViewInit = function () {
                    if (!this.ce) {
                        this.ce = this.cedit.nativeElement;
                    }
                };
                CorpusEditorComponent.prototype.createTag = function (event) {
                    var target = event.target.text.trim().toLowerCase();
                    var parent = $(event.target).parent("div");
                    var superclass = $(parent).prev()[0].text.trim().toLowerCase();
                    var commaregex = /,/;
                    if (target.match(commaregex)) {
                        target = target.split(",")[0].trim();
                    }
                    return 'main="' + superclass + '" secondary="' + target + '"';
                };
                CorpusEditorComponent.prototype.insertGenre = function (event) {
                    if (this.openTags[this.openTags.length - 1] != "text") {
                        alert("Please add a text first!");
                        return;
                    }
                    var tag = "<genre " + this.createTag(event) + "/>\n";
                    this.insertAtCaret(tag);
                };
                CorpusEditorComponent.prototype.closeTags = function () {
                    if (this.openTags.length > 0) {
                        this.insertClosingTag(this.openTags.pop());
                    }
                };
                CorpusEditorComponent.prototype.insertOpeningTag = function (name) {
                    if (!this.coursebookExists) {
                        alert("Please add a coursebook first!");
                        return;
                    }
                    this.closeTags();
                    var tag = "<" + name + ">";
                    this.insertAtCaret(tag);
                    this.openTags.push(name);
                };
                CorpusEditorComponent.prototype.insertClosingTag = function (name) {
                    var tag = "</" + name + ">\n";
                    this.insertAtCaret(tag);
                };
                CorpusEditorComponent.prototype.insertSubheading = function () {
                    if (this.openTags[this.openTags.length - 1] != "text") {
                        alert("Please add a text first");
                        return;
                    }
                    var tag = "<subheading></subheading>\n";
                    this.insertAtCaret(tag);
                };
                CorpusEditorComponent.prototype.insertActivityInstruction = function () {
                    if (this.openTags[this.openTags.length - 1] != "task") {
                        alert("Please add a task first!");
                        return;
                    }
                    var tag = "<ai></ai>\n";
                    this.insertAtCaret(tag);
                };
                CorpusEditorComponent.prototype.insertCoursebook = function () {
                    var title = $('#cbtitle');
                    var author = $('#cbauthor');
                    var year = $('#cbyear');
                    var publisher = $('#cbpublisher');
                    var isbn = $('#cbisbn');
                    var content = $('#cedit-content').val();
                    var tag = "<coursebook>\n\n";
                    tag += "<title>" + title.val() + "</title>\n";
                    tag += "<author>" + author.val() + "</author>\n";
                    tag += "<year>" + year.val() + "</year>\n";
                    tag += "<publisher>" + publisher.val() + "</publisher>\n";
                    tag += "<isbn>" + isbn.val() + "</isbn>\n\n";
                    if (content) {
                        tag += content + "\n\n";
                    }
                    tag += "</coursebook>";
                    $('#cedit-content').val(tag);
                    // Reset values
                    title.val("");
                    author.val("");
                    year.val("");
                    publisher.val("");
                    isbn.val("");
                    this.setCaretBeforeEndingCoursebookTag();
                    this.coursebookExists = true;
                };
                CorpusEditorComponent.prototype.focusCoursebook = function () {
                    $('#cbtitle').focus();
                };
                CorpusEditorComponent.prototype.insertLesson = function () {
                    this.closeTags();
                    if (this.lessoncounter > 1) {
                        this.insertAtCaret("</lesson>\n");
                        this.taglist.unshift("----------");
                    }
                    var cefr = $('#lecefr option:selected');
                    var id = $('#leid');
                    var title = $('#letitle');
                    this.setLevel(cefr.val());
                    var tag = '<lesson id="' + id.val() + '" level="' + cefr.val() + '"';
                    if (title.val()) {
                        tag += ' title="' + title.val() + '"';
                    }
                    tag += ">\n";
                    this.taglist.unshift("lesson_" + id.val());
                    this.insertAtCaret(tag);
                    // Reset values
                    // cefr is automatically set to last level
                    // id is automatically set
                    title.val("");
                    // reset counters
                    this.activitycounter = 0;
                    this.langexcounter = 0;
                    this.listcounter = 0;
                    this.textcounter = 0;
                };
                CorpusEditorComponent.prototype.finalize = function () {
                    if (confirm("Are you sure you want to finalize?")) {
                        this.closeTags();
                        this.setCaretBeforeEndingCoursebookTag();
                        this.insertAtCaret("</lesson>\n");
                        this.saveProgress();
                    }
                };
                CorpusEditorComponent.prototype.focusLesson = function (modal) {
                    if (!this.coursebookExists) {
                        alert("Please add a coursebook first!");
                        modal.dismiss();
                        return;
                    }
                    this.lessoncounter++;
                    $('#lecefr').focus();
                };
                CorpusEditorComponent.prototype.insertText = function () {
                    this.closeTags();
                    var id = $('#tid');
                    var ref = $('#tref');
                    var title = $('#ttitle');
                    var topics = $('#ttopics');
                    var cbx = topics.find("input[type='checkbox']");
                    var topicarray = [];
                    for (var i = 0; i < cbx.length; i++) {
                        var cb = cbx[i];
                        if (cb.checked) {
                            topicarray.push(cb.value);
                        }
                    }
                    var topiclist = topicarray.join(",");
                    //<text id="text_0_3" ref="#1_1" title="title" topic="arts,clothes and appearances">
                    var tag = '<text id="' + id.val() + '"';
                    if (ref.val()) {
                        tag += ' ref="#' + ref.val() + '"';
                    }
                    if (title.val()) {
                        tag += ' title="' + title.val() + '"';
                    }
                    tag += ' topic="' + topiclist + '">\n';
                    this.openTags.push("text");
                    this.taglist.unshift(id.val());
                    this.insertAtCaret(tag);
                    // Reset values
                    // id set auto
                    ref.val("");
                    title.val("");
                    // loop over topics, uncheck all checkboxes
                    for (var i = 0; i < cbx.length; i++) {
                        cbx[i].checked = false;
                    }
                };
                CorpusEditorComponent.prototype.focusText = function (modal) {
                    if (this.lessoncounter == 0) {
                        alert("Please insert a lesson first");
                        modal.dismiss();
                        return;
                    }
                    this.textcounter++;
                    $('#tid').focus();
                };
                CorpusEditorComponent.prototype.insertActivity = function () {
                    this.closeTags();
                    var id = $('#aid');
                    var ref = $('#aref');
                    var skills = $('#askills');
                    var competences = $('#acompetences');
                    var types = $('#atypes');
                    var formats = $('#aformats');
                    var skillinput = skills.find("input[type='checkbox']");
                    var competencesinput = competences.find("input[type='checkbox']");
                    var sac = [];
                    for (var i = 0; i < skillinput.length; i++) {
                        sac.push(skillinput[i]);
                    }
                    for (var i = 0; i < competencesinput.length; i++) {
                        sac.push(competencesinput[i]);
                    }
                    var taf = [];
                    var typesinput = types.find("input[type='checkbox']");
                    var formatinput = formats.find("input[type='checkbox']");
                    for (var i = 0; i < typesinput.length; i++) {
                        taf.push(typesinput[i]);
                    }
                    for (var i = 0; i < formatinput.length; i++) {
                        taf.push(formatinput[i]);
                    }
                    var sacarray = [];
                    for (var i = 0; i < sac.length; i++) {
                        if (sac[i].checked) {
                            sacarray.push(sac[i].value);
                        }
                        sac[i].checked = false;
                    }
                    // <task id="task_0_1" skill="reading,speaking" format="dialogue">
                    var skilllist = sacarray.join(",");
                    var tafarray = [];
                    for (var i = 0; i < taf.length; i++) {
                        if (taf[i].checked) {
                            tafarray.push(taf[i].value);
                        }
                        taf[i].checked = false;
                    }
                    var formatlist = tafarray.join(",");
                    var tag = '<task id="' + id.val() + '"';
                    if (ref.val()) {
                        tag += ' ref="#' + ref.val() + '"';
                    }
                    tag += ' skills="' + skilllist + '"';
                    tag += ' format="' + formatlist + '">\n';
                    this.openTags.push("task");
                    this.taglist.unshift(id.val());
                    ref.val("");
                    this.insertAtCaret(tag);
                };
                CorpusEditorComponent.prototype.focusActivity = function (modal) {
                    if (this.lessoncounter == 0) {
                        alert("Please insert a lesson first");
                        modal.dismiss();
                        return;
                    }
                    this.activitycounter++;
                    $('#aid').focus();
                };
                CorpusEditorComponent.prototype.insertList = function () {
                    this.closeTags();
                    var id = $('#liid');
                    var ref = $('#liref');
                    var title = $('#lititle');
                    var skills = $('#liskills');
                    var competences = $('#licompetences');
                    var skillinput = skills.find("input[type='checkbox']");
                    var competencesinput = competences.find("input[type='checkbox']");
                    var sac = [];
                    for (var i = 0; i < skillinput.length; i++) {
                        sac.push(skillinput[i]);
                    }
                    for (var i = 0; i < competencesinput.length; i++) {
                        sac.push(competencesinput[i]);
                    }
                    var sacarray = [];
                    for (var i = 0; i < sac.length; i++) {
                        if (sac[i].checked) {
                            sacarray.push(sac[i].value);
                        }
                        sac[i].checked = false;
                    }
                    var units = $('#liunits');
                    var skilllist = sacarray.join(",");
                    var unitscbs = units.find("input[type='checkbox']");
                    var unitarray = [];
                    for (var i = 0; i < unitscbs.length; i++) {
                        if (unitscbs[i].checked) {
                            unitarray.push(unitscbs[i].value);
                        }
                        unitscbs.checked = false;
                    }
                    var unitlist = unitarray.join(",");
                    var tag = '<list id="' + id.val() + '"';
                    if (ref.val()) {
                        tag += ' ref="#' + ref.val() + '"';
                    }
                    if (title.val()) {
                        tag += ' title="' + title.val() + '"';
                    }
                    tag += ' skills="' + skilllist + '"';
                    tag += ' unit="' + unitlist + '">\n';
                    this.openTags.push("list");
                    this.taglist.unshift(id.val());
                    this.insertAtCaret(tag);
                    ref.val("");
                    title.val("");
                };
                CorpusEditorComponent.prototype.focusList = function (modal) {
                    if (this.lessoncounter == 0) {
                        alert("Please insert a lesson first");
                        modal.dismiss();
                        return;
                    }
                    this.listcounter++;
                    $('#liid').focus();
                };
                CorpusEditorComponent.prototype.insertLangex = function () {
                    this.closeTags();
                    var id = $('#laid');
                    var ref = $('#laref');
                    var title = $('#latitle');
                    var skills = $('#laskills');
                    var competences = $('#lacompetences');
                    var skillinput = skills.find("input[type='checkbox']");
                    var competencesinput = competences.find("input[type='checkbox']");
                    var sac = [];
                    for (var i = 0; i < skillinput.length; i++) {
                        sac.push(skillinput[i]);
                    }
                    for (var i = 0; i < competencesinput.length; i++) {
                        sac.push(competencesinput[i]);
                    }
                    var sacarray = [];
                    for (var i = 0; i < sac.length; i++) {
                        if (sac[i].checked) {
                            sacarray.push(sac[i].value);
                        }
                        sac[i].checked = false;
                    }
                    var units = $('#launits');
                    var skilllist = sacarray.join(",");
                    var unitscbs = units.find("input[type='checkbox']");
                    var unitarray = [];
                    for (var i = 0; i < unitscbs.length; i++) {
                        if (unitscbs[i].checked) {
                            unitarray.push(unitscbs[i].value);
                        }
                        unitscbs.checked = false;
                    }
                    var unitlist = unitarray.join(",");
                    var tag = '<langex id="' + id.val() + '"';
                    if (ref.val()) {
                        tag += ' ref="#' + ref.val() + '"';
                    }
                    if (title.val()) {
                        tag += ' title="' + title.val() + '"';
                    }
                    tag += ' skills="' + skilllist + '"';
                    tag += ' unit="' + unitlist + '">\n';
                    this.openTags.push("langex");
                    this.taglist.unshift(id.val());
                    this.insertAtCaret(tag);
                    ref.val("");
                    title.val("");
                };
                CorpusEditorComponent.prototype.focusLangex = function (modal) {
                    if (this.lessoncounter == 0) {
                        alert("Please insert a lesson first");
                        modal.dismiss();
                        return;
                    }
                    this.langexcounter++;
                    $('#laid').focus();
                };
                CorpusEditorComponent.prototype.setLevel = function (level) {
                    this.currentLevel = level;
                };
                CorpusEditorComponent.prototype.keyhandler = function (event) {
                    var code = event.keyCode;
                    if (code == 13) {
                        // TODO
                        // get currently focused input element
                        // focus next input element
                        // if no next input, close form
                    }
                };
                CorpusEditorComponent.prototype.insertAtCaret = function (text) {
                    if (this.ce.selectionStart || this.ce.selectionStart === 0) {
                        // Others
                        var startPos = this.ce.selectionStart;
                        var endPos = this.ce.selectionEnd;
                        this.ce.value = this.ce.value.substring(0, startPos) +
                            text +
                            this.ce.value.substring(endPos, this.ce.value.length);
                        this.ce.selectionStart = startPos + text.length;
                        this.ce.selectionEnd = startPos + text.length;
                    }
                    else {
                        this.ce.value += text;
                    }
                    this.ce.focus();
                };
                CorpusEditorComponent.prototype.setSelectionRange = function (input, selectionStart, selectionEnd) {
                    if (input.setSelectionRange) {
                        input.focus();
                        input.setSelectionRange(selectionStart, selectionEnd);
                    }
                    else if (input.createTextRange) {
                        var range = input.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', selectionEnd);
                        range.moveStart('character', selectionStart);
                        range.select();
                    }
                };
                CorpusEditorComponent.prototype.setCaretBeforeEndingCoursebookTag = function () {
                    var elem = $('#cedit-content');
                    var index = elem.val().search("</coursebook>") - 1;
                    console.log(index);
                    this.setSelectionRange(this.ce, index, index);
                };
                CorpusEditorComponent.prototype.getCaretPosition = function () {
                    var cursorPosition = $('#cedit-content').prop("selectionStart");
                    return cursorPosition;
                };
                CorpusEditorComponent.prototype.saveProgress = function () {
                    this.lastsaved = new Date().toISOString();
                    var ukey = this.getUserkey();
                    var lastpos = this.getCaretPosition();
                    var content = $('#cedit-content').val();
                    this.larka.cedit_save(ukey, lastpos, content).subscribe(function (data) {
                        console.log(data);
                    });
                };
                CorpusEditorComponent.prototype.restoreSession = function () {
                    var ukey = $('#sessionid').val();
                    var me = this;
                    this.taglist = [];
                    this.waiter.on();
                    this.larka.cedit_restore(ukey).subscribe(function (data) {
                        if (data["error"]) {
                            alert("Could not load session " + ukey);
                            me.waiter.off();
                            return;
                        }
                        var content = data["content"];
                        var lastsaved = data["lastsaved"];
                        var lastpos = data["lastposition"];
                        me.setSelectionRange(me.ce, lastpos, lastpos);
                        $('#cedit-content').val(decodeURIComponent(content));
                        me.lastsaved = lastsaved;
                        me.userkey = ukey;
                        me.restoreIds();
                        me.waiter.off();
                    });
                };
                CorpusEditorComponent.prototype.restoreIds = function () {
                    var text = $('#cedit-content').val().replace(/\n/g, " ");
                    var gid = /id="(.+?)"/mg;
                    var digits = /^\d+$/;
                    var match;
                    while ((match = gid.exec(text)) !== null) {
                        var id = match[1];
                        if (digits.test(id)) {
                            this.lessoncounter = parseInt(id);
                            if (this.lessoncounter > 1) {
                                this.taglist.unshift("----------");
                            }
                            id = "lesson_" + id;
                        }
                        var parts = id.split("_");
                        var type = parts[0];
                        // discard parts[1] -> same as lesson counter
                        var counter = parseInt(parts[2]);
                        switch (type) {
                            case "text":
                                this.textcounter = counter;
                                break;
                            case "task":
                                this.activitycounter = counter;
                                break;
                            case "list":
                                this.listcounter = counter;
                                break;
                            case "langex": this.langexcounter = counter;
                        }
                        this.taglist.unshift(id);
                    }
                };
                CorpusEditorComponent.prototype.getUserkey = function () {
                    var me = this;
                    if (!this.userkey) {
                        this.userkey = Math.round(Math.random() * 100000);
                        this.larka.cedit_checkKey(this.userkey).subscribe(function (data) {
                            if (data["status"] == 0) {
                                // key in use; re-key
                                me.getUserkey();
                            }
                        });
                    }
                    return this.userkey;
                };
                CorpusEditorComponent.prototype.downloadFile = function () {
                    this.waiter.on();
                    var me = this;
                    var ukey = $('#sessionid').val();
                    var lastpos = this.getCaretPosition();
                    var content = $('#cedit-content').val();
                    this.larka.cedit_save(ukey, lastpos, content).subscribe(function (d) {
                        me.larka.cedit_restore(ukey).subscribe(function (data) {
                            if (data["error"]) {
                                alert("Could not load session " + ukey);
                                me.waiter.off();
                                return;
                            }
                            var content = data["content"];
                            me.waiter.off();
                            var element = document.createElement("a");
                            element.setAttribute("href", "data:text/xml;charset=utf-8," + decodeURIComponent(content));
                            element.setAttribute("download", "coursebook.xml");
                            element.style.display = "none";
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                        });
                    });
                };
                __decorate([
                    core_1.ViewChild('cedit'),
                    __metadata("design:type", core_1.ElementRef)
                ], CorpusEditorComponent.prototype, "cedit", void 0);
                __decorate([
                    core_1.ViewChild('waiter'),
                    __metadata("design:type", pleasewait_component_1.PleaseWaitComponent)
                ], CorpusEditorComponent.prototype, "waiter", void 0);
                CorpusEditorComponent = __decorate([
                    core_1.Component({
                        selector: 'corpus-editor',
                        templateUrl: 'app/templates/editor.html',
                        styleUrls: ['app/css/editor.css']
                    }),
                    __metadata("design:paramtypes", [localizer_service_1.LocalizerService, http_1.Http, larka_service_1.LarkaService])
                ], CorpusEditorComponent);
                return CorpusEditorComponent;
            }());
            exports_1("CorpusEditorComponent", CorpusEditorComponent);
        }
    };
});
//# sourceMappingURL=editor.component.js.map