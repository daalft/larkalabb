import {Component} from "@angular/core";

@Component({
  selector: 'sentence-rater',
  templateUrl: '../../templates/sentence-rater.html',
  styleUrls: ['../../css/cesera.css']
})

export class SentenceRaterComponent {

  public sentence = "Många gör hus av pepparkakor när det blir jul.";
  public ratedWords = [
    //['Många', 'B1'], ['gör', 'A1'], ['hus', 'A2'], ['av', 'XX'], ['pepparkakor', 'XX'], ['när', 'XX'], ['det', 'A1'], ['blir', 'B1'], ['jul', 'A2'], ['.', 'XX']
      //[['Lägg', 'A2'], ['i', 'XX'], ['skinkan', 'B2'], ['och', 'XX'], ['potatisen', 'A2'], ['och', 'XX'], ['stek', 'B1'], ['allt', 'B1'], ['ett', 'A1'], ['par', 'B1'], ['minuter', 'A1'], ['.', 'XX']]
    {"word": "Många", "cefr": "B1"},
    {"word": "gör", "cefr": "A1"},
    {"word": "hus", "cefr": "A2"},
    {"word": "av", "cefr": ""},
    {"word": "pepparkakor", "cefr": "A2"},
    {"word": "när", "cefr": ""},
    {"word": "det", "cefr": "A1"},
    {"word": "blir", "cefr": "B1"},
    {"word": "jul", "cefr": "A2"},
    {"word": ".", "cefr": ""},
    {}
  ];
  constructor() {}


}
