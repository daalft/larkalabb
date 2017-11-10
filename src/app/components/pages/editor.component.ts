import {LocalizerService} from "../../services/localizer.service";
import {Component, ViewChild, ElementRef} from "@angular/core";
import {CeditFormComponent} from "../component/cedit.form.component";
import {Http} from "@angular/http";
import {LarkaService} from "../../services/larka.service";
import {PleaseWaitComponent} from "../component/pleasewait.component";

/**
 * Created by David on 2/13/2017.
 */
@Component({
    selector: 'corpus-editor',
    templateUrl: 'app/templates/editor.html',
    styleUrls: ['app/css/editor.css']
})

export class CorpusEditorComponent {

    @ViewChild('cedit') cedit: ElementRef;
    @ViewChild('waiter') waiter: PleaseWaitComponent;

    private showExtras: boolean;
    private showText: boolean;
    private showGenre: boolean;

    private ce;

    private openTags = [];

    private taglist = [];

    private levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    private topics;
    private activitytypes;
    private formats;
    private units;
    private skills = [{"text":"Listening","val":"listening"},
        {"text":"Reading","val":"reading"},
        {"text":"Speaking","val":"speaking"},
        {"text":"Writing","val":"writing"}];
    private competences = [{"text": "Grammar", "val": "grammar"},
        {"text": "Pronunciation", "val": "pronunciation"},
        {"text": "Spelling", "val": "spelling"},
        {"text": "Vocabulary", "val": "vocabulary"}];

    private lessoncounter = 0;
    private textcounter = 0;
    private activitycounter = 0;
    private listcounter = 0;
    private langexcounter = 0;

    private currentLevel = "";

    private userkey;
    private lastsaved;

    private coursebookExists;

    constructor(private localizer: LocalizerService, private http: Http, private larka: LarkaService) {
        let me = this;
        http.get("app/data/cedit-topics.json").map(res => res.json()).subscribe(function(data) {
           me.topics = data;
        });
        http.get("app/data/cedit-activity.json").map(res => res.json()).subscribe(function(data) {
            me.activitytypes = data;
        });
        http.get("app/data/cedit-formats.json").map(res => res.json()).subscribe(function(data) {
            me.formats = data;
        });
        http.get("app/data/cedit-units.json").map(res => res.json()).subscribe(function(data) {
            me.units = data;
        });
    }

    ngAfterViewInit () {
        if (!this.ce) {
            this.ce = this.cedit.nativeElement;
        }
    }

    createTag(event) {
        let target = event.target.text.trim().toLowerCase();
        let parent = $(event.target).parent("div");
        let superclass = $(parent).prev()[0].text.trim().toLowerCase();
        let commaregex = /,/;
        if (target.match(commaregex)) {
            target = target.split(",")[0].trim();
        }
        return 'main="' + superclass + '" secondary="' + target + '"';
    }


    insertGenre(event) {
        if (this.openTags[this.openTags.length-1] != "text") {
            alert("Please add a text first!");
            return;
        }
        let tag = "<genre " + this.createTag(event) + "/>\n";
        this.insertAtCaret(tag);
    }

    closeTags() {
        if (this.openTags.length > 0) {
            this.insertClosingTag(this.openTags.pop());
        }
    }

    insertOpeningTag(name) {
        if (!this.coursebookExists) {
            alert("Please add a coursebook first!");
            return;
        }
        this.closeTags();
        let tag = "<" + name + ">";
        this.insertAtCaret(tag);
        this.openTags.push(name);
    }

    insertClosingTag(name) {
        let tag = "</" + name + ">\n";
        this.insertAtCaret(tag);
    }

    insertSubheading () {
        if (this.openTags[this.openTags.length-1] != "text") {
            alert("Please add a text first");
            return;
        }
        let tag = "<subheading></subheading>\n";

        this.insertAtCaret(tag);
    }

    insertActivityInstruction() {
        if (this.openTags[this.openTags.length-1] != "task") {
            alert("Please add a task first!");
            return;
        }
        let tag = "<ai></ai>\n";

        this.insertAtCaret(tag);
    }

    insertCoursebook () {
        let title = $('#cbtitle');
        let author = $('#cbauthor');
        let year = $('#cbyear');
        let publisher = $('#cbpublisher');
        let isbn= $('#cbisbn');

        let content = $('#cedit-content').val();

        let tag = "<coursebook>\n\n";

        tag += "<title>"+title.val()+"</title>\n";
        tag += "<author>"+author.val()+"</author>\n";
        tag += "<year>"+year.val()+"</year>\n";
        tag += "<publisher>"+publisher.val()+"</publisher>\n";
        tag += "<isbn>"+isbn.val()+"</isbn>\n\n";
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
    }

    focusCoursebook() {
        $('#cbtitle').focus();
    }

    insertLesson() {
        this.closeTags();

        if (this.lessoncounter > 1) {
            this.insertAtCaret("</lesson>\n");
            this.taglist.unshift("----------");
        }

        let cefr = $('#lecefr option:selected');
        let id = $('#leid');
        let title = $('#letitle');

        this.setLevel(cefr.val());

        let tag = '<lesson id="' + id.val() + '" level="' + cefr.val() + '"';
        if (title.val()) {
            tag += ' title="' + title.val() + '"';
        }
        tag += ">\n";

        this.taglist.unshift("lesson_"+id.val());

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
    }

    finalize () {
        if (confirm("Are you sure you want to finalize?")) {
            this.closeTags();

            this.setCaretBeforeEndingCoursebookTag();
            this.insertAtCaret("</lesson>\n");

            this.saveProgress();
        }
    }

    focusLesson(modal) {
        if (!this.coursebookExists) {
            alert("Please add a coursebook first!");
            modal.dismiss();
            return;
        }
        this.lessoncounter++;
        $('#lecefr').focus();
    }


    insertText() {

        this.closeTags();

        let id = $('#tid');
        let ref = $('#tref');
        let title = $('#ttitle');
        let topics = $('#ttopics');

        let cbx = topics.find("input[type='checkbox']");

        let topicarray = [];

        for (let i = 0; i < cbx.length; i++) {
            let cb = cbx[i];
            if (cb.checked) {
                topicarray.push(cb.value);
            }
        }

        let topiclist = topicarray.join(",");

        //<text id="text_0_3" ref="#1_1" title="title" topic="arts,clothes and appearances">

        let tag = '<text id="' + id.val() + '"';
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
        for (let i = 0; i < cbx.length; i++) {
            cbx[i].checked = false;
        }
    }

    focusText(modal) {
        if (this.lessoncounter == 0) {
            alert("Please insert a lesson first");
            modal.dismiss();
            return;
        }
        this.textcounter++;
        $('#tid').focus();
    }

    insertActivity() {

        this.closeTags();

        let id = $('#aid');
        let ref = $('#aref');

        let skills = $('#askills');
        let competences = $('#acompetences');
        let types = $('#atypes');
        let formats = $('#aformats');

        let skillinput = skills.find("input[type='checkbox']");
        let competencesinput = competences.find("input[type='checkbox']");

        let sac = [];
        for (let i = 0; i < skillinput.length; i++) {
            sac.push(skillinput[i]);
        }
        for (let i = 0; i < competencesinput.length; i++) {
            sac.push(competencesinput[i]);
        }

        let taf = [];

        let typesinput = types.find("input[type='checkbox']");
        let formatinput = formats.find("input[type='checkbox']");
        for (let i = 0; i < typesinput.length; i++) {
            taf.push(typesinput[i]);
        }
        for (let i = 0; i < formatinput.length; i++) {
            taf.push(formatinput[i]);
        }

        let sacarray = [];

        for (let i = 0; i < sac.length; i++) {
            if (sac[i].checked) {
                sacarray.push(sac[i].value);
            }
            sac[i].checked = false;
        }
        // <task id="task_0_1" skill="reading,speaking" format="dialogue">

        let skilllist = sacarray.join(",");

        let tafarray = [];
        for (let i = 0; i < taf.length; i++) {
            if (taf[i].checked) {
                tafarray.push(taf[i].value);
            }
            taf[i].checked = false;
        }

        let formatlist = tafarray.join(",");

        let tag = '<task id="' + id.val() + '"';
        if (ref.val()) {
            tag += ' ref="#' + ref.val() + '"';
        }
        tag += ' skills="' + skilllist + '"';
        tag += ' format="' + formatlist + '">\n';

        this.openTags.push("task");
        this.taglist.unshift(id.val());

        ref.val("");
        
        this.insertAtCaret(tag);
    }

    focusActivity(modal) {
        if (this.lessoncounter == 0) {
            alert("Please insert a lesson first");
            modal.dismiss();
            return;
        }
        this.activitycounter++;
        $('#aid').focus();
    }

    insertList() {

        this.closeTags();

        let id = $('#liid');
        let ref = $('#liref');
        let title = $('#lititle');

        let skills = $('#liskills');
        let competences = $('#licompetences');

        let skillinput = skills.find("input[type='checkbox']");
        let competencesinput = competences.find("input[type='checkbox']");

        let sac = [];
        for (let i = 0; i < skillinput.length; i++) {
            sac.push(skillinput[i]);
        }
        for (let i = 0; i < competencesinput.length; i++) {
            sac.push(competencesinput[i]);
        }

        let sacarray = [];

        for (let i = 0; i < sac.length; i++) {
            if (sac[i].checked) {
                sacarray.push(sac[i].value);
            }
            sac[i].checked = false;
        }
        let units = $('#liunits');
        let skilllist = sacarray.join(",");

        let unitscbs = units.find("input[type='checkbox']");
        let unitarray = [];
        for (let i = 0; i < unitscbs.length; i++) {
            if (unitscbs[i].checked) {
                unitarray.push(unitscbs[i].value);
            }
            unitscbs.checked = false;
        }

        let unitlist = unitarray.join(",");
        
        let tag = '<list id="' + id.val() + '"';
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
        

    }

    focusList(modal) {
        if (this.lessoncounter == 0) {
            alert("Please insert a lesson first");
            modal.dismiss();
            return;
        }
        this.listcounter++;
        $('#liid').focus();
    }

    insertLangex() {

        this.closeTags();

        let id = $('#laid');
        let ref = $('#laref');
        let title = $('#latitle');

        let skills = $('#laskills');
        let competences = $('#lacompetences');
        let skillinput = skills.find("input[type='checkbox']");
        let competencesinput = competences.find("input[type='checkbox']");

        let sac = [];
        for (let i = 0; i < skillinput.length; i++) {
            sac.push(skillinput[i]);
        }
        for (let i = 0; i < competencesinput.length; i++) {
            sac.push(competencesinput[i]);
        }
        let sacarray = [];

        for (let i = 0; i < sac.length; i++) {
            if (sac[i].checked) {
                sacarray.push(sac[i].value);
            }
            sac[i].checked = false;
        }
        let units = $('#launits');
        let skilllist = sacarray.join(",");

        let unitscbs = units.find("input[type='checkbox']");
        let unitarray = [];
        for (let i = 0; i < unitscbs.length; i++) {
            if (unitscbs[i].checked) {
                unitarray.push(unitscbs[i].value);
            }
            unitscbs.checked = false;
        }

        let unitlist = unitarray.join(",");

        let tag = '<langex id="' + id.val() + '"';
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


    }

    focusLangex(modal) {
        if (this.lessoncounter == 0) {
            alert("Please insert a lesson first");
            modal.dismiss();
            return;
        }
        this.langexcounter++;
        $('#laid').focus();
    }

    setLevel (level) {
        this.currentLevel = level;
    }

    keyhandler(event) {
        let code = event.keyCode;
        if (code == 13) {
            // TODO
            // get currently focused input element
            // focus next input element
            // if no next input, close form
        }
    }
    insertAtCaret(text) {
        if (this.ce.selectionStart || this.ce.selectionStart === 0) {
            // Others
            var startPos = this.ce.selectionStart;
            var endPos = this.ce.selectionEnd;
            this.ce.value = this.ce.value.substring(0, startPos) +
                text +
                this.ce.value.substring(endPos, this.ce.value.length);
            this.ce.selectionStart = startPos + text.length;
            this.ce.selectionEnd = startPos + text.length;
        } else {
            this.ce.value += text;
        }
        this.ce.focus();
    }

    setSelectionRange(input, selectionStart, selectionEnd) {
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
    }

    setCaretBeforeEndingCoursebookTag () {
        let elem = $('#cedit-content');
        let index = elem.val().search("</coursebook>") - 1;

        console.log(index);
        this.setSelectionRange(this.ce,index,index);
    }

    getCaretPosition () {
        var cursorPosition = $('#cedit-content').prop("selectionStart");
        return cursorPosition;
    }

    saveProgress() {
        this.lastsaved = new Date().toISOString();
        let ukey = this.getUserkey();
        let lastpos = this.getCaretPosition();
        let content = $('#cedit-content').val();
        this.larka.cedit_save(ukey, lastpos, content).subscribe(function(data) {
            console.log(data);
        });
    }

    restoreSession() {
        let ukey = $('#sessionid').val();
        let me = this;
        this.taglist = [];
        this.waiter.on();
        this.larka.cedit_restore(ukey).subscribe(function(data) {
            if (data["error"]) {
                alert("Could not load session " + ukey);
                me.waiter.off();
                return;
            }
            let content = data["content"];
            let lastsaved = data["lastsaved"];
            let lastpos = data["lastposition"];
            me.setSelectionRange(me.ce, lastpos, lastpos);
            $('#cedit-content').val(decodeURIComponent(content));
            me.lastsaved = lastsaved;
            me.userkey = ukey;
            me.restoreIds();
            me.waiter.off();
        });
    }

    restoreIds () {
        let text = $('#cedit-content').val().replace(/\n/g, " ");
        let gid = /id="(.+?)"/mg;
        let digits = /^\d+$/;
        let match;
        while ((match = gid.exec(text)) !== null) {
            let id = match[1];
            if (digits.test(id)) {
                this.lessoncounter = parseInt(id);
                if (this.lessoncounter > 1) {
                    this.taglist.unshift("----------");
                }
                id = "lesson_" + id;
            }
            let parts = id.split("_");
            let type = parts[0];
            // discard parts[1] -> same as lesson counter
            let counter = parseInt(parts[2]);
            switch (type) {
                case "text": this.textcounter = counter;
                    break;
                case "task": this.activitycounter = counter;
                    break;
                case "list": this.listcounter = counter;
                    break;
                case "langex": this.langexcounter = counter;
            }
            this.taglist.unshift(id);
        }
    }

    getUserkey () {
        let me = this;
        if (!this.userkey) {
            this.userkey = Math.round(Math.random()*100000);
            this.larka.cedit_checkKey(this.userkey).subscribe(function(data) {
                if (data["status"] == 0) {
                    // key in use; re-key
                    me.getUserkey();
                }
            });
        }
        return this.userkey;
    }

    downloadFile () {
        this.waiter.on();
        let me = this;
        let ukey = $('#sessionid').val();
        let lastpos = this.getCaretPosition();
        let content = $('#cedit-content').val();
        this.larka.cedit_save(ukey, lastpos, content).subscribe(function(d) {
            me.larka.cedit_restore(ukey).subscribe(function(data) {
                if (data["error"]) {
                    alert("Could not load session " + ukey);
                    me.waiter.off();
                    return;
                }
                let content = data["content"];
                me.waiter.off();
                let element = document.createElement("a");
                element.setAttribute("href", "data:text/xml;charset=utf-8," + decodeURIComponent(content));
                element.setAttribute("download", "coursebook.xml");
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            });
        });
    }
}