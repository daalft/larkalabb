import {Component} from '@angular/core';

declare var MediaRecorder: any;

@Component({
  selector: 'callector',
  templateUrl: '../../templates/callector.html'
})

export class CallectorComponent {

  public languages = ['English', 'German', 'French', 'Swedish'];

  public games = ['Arithmetic', 'Animal noises', 'Language identification', 'Movie quotes', 'Spelling'];

  public started: boolean;

  public dummyAnswers = ['x'];

  public gameMode; // textual, recording, upload
  public gameName;
  public tasknum = 0;
  public pluralize = 's';

  private language;
  private taskDescriptions;

  private mediaRecorder;
  private chunks = [];

  start(lang, gmode) {
    this.started = true;
    this.language = lang;
    this.gameName = gmode;
    if (gmode === 'Arithmetic' || gmode === 'Spelling') {
      this.gameMode = 'textual';
    } else if (gmode === 'Animal noises' || gmode === 'Movie quotes') {
      this.gameMode = 'upload';
    } else if (gmode === 'Language identification') {
      this.gameMode = 'recording';
    }
    this.taskDescriptions = ['In this task, add a prompt such as \'three plus four\' ' +
    'and enter one or more possible answers, e.g. \'seven\'',
      'In this task, enter a prompt such as \'Name a word beginning with the letter L\' ' +
      'and one or more possible answers',
      'In this task, upload an audio file of an animal noise and enter the name of the corresponding animal',
      'In this task, upload an audio file of a movie quote and enter the name of the corresponding movie',
      'In this task, record yourself saying a word, expression or paragraph in ' + this.language];
  }

  addAnswer() {
    this.dummyAnswers.push('x');
  }

  next() {
    this._resetFields();
    this.tasknum++;
    if (this.tasknum > 1 || this.tasknum === 0) {
      this.pluralize = 's';
    } else if (this.tasknum === 1) {
      this.pluralize = '';
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
    $('#recordbutton').prop('disabled', false);
    $('#stopbutton').prop('disabled', true);
    console.log(this.mediaRecorder.state);
  }
  record() {
    const me = this;
    $('#recordbutton').prop('disabled', true);
    $('#stopbutton').prop('disabled', false);
    const constraints = {
      audio: true,
      echoCancellation: true
    };
    const audioElement = document.getElementById('audio');
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      me.mediaRecorder = new MediaRecorder(stream);
      console.log(me.mediaRecorder.state);
      me.mediaRecorder.start();
      console.log(me.mediaRecorder.state);

      /*
      record.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";
        record.style.color = "black";
      };
      var chunks = [];
      */
      me.mediaRecorder.ondataavailable = function(e) {
        me.chunks.push(e.data);
      };
      me.mediaRecorder.onstop = function(e) {
        const blob = new Blob(me.chunks, {'type': 'audio/ogg; codecs=opus'});
        me.chunks = [];
        (<any>audioElement).src = (<any>URL).createObjectURL(blob);
      };
      /*
      stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
      }
      */
    }).catch(function(err) {
      console.log('An error occurred:' + err);
    });
  }

  exit() {
    this.started = false;
    this._resetFields();
    this.tasknum = 0;
  }

  _resetFields () {
    this.dummyAnswers = ['x'];
    $('#gupload').val('');
    const answers = $('.ganswers');
    for (let i = 0; i < answers.length; i++) {
      $(answers[i]).val('');
    }
    $('#gprompt').val('');
  }

  getTaskDescription() {
    if (this.gameName === 'Arithmetic') {
      return this.taskDescriptions[0];
    } else if (this.gameName === 'Spelling') {
      return this.taskDescriptions[1];
    } else if (this.gameName === 'Animal noises') {
      return this.taskDescriptions[2];
    } else if (this.gameName === 'Movie quotes') {
      return this.taskDescriptions[3];
    } else if (this.gameName === 'Language identification') {
      return this.taskDescriptions[4];
    }
  }
}
