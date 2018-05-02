import {Injectable} from "@angular/core";

@Injectable()
export class CefrToolsService {
  static numericToCefr(num: number, lowestNumber?) {
    if (!lowestNumber) {
      lowestNumber = 0;
    }
    if (num === lowestNumber) {
      return "A1";
    } else if (num === (lowestNumber + 1)) {
      return "A2";
    } else if (num === (lowestNumber + 2)) {
      return "B1";
    } else if (num === (lowestNumber + 3)) {
      return "B2";
    } else if (num === (lowestNumber + 4)) {
      return "C1";
    } else if (num === (lowestNumber + 5)) {
      return "C2";
    }
  }

  static cefrToNumeric(cefr: string, lowestNumber?) {
    if (!lowestNumber) {
      lowestNumber = 0;
    }
    if (cefr === 'A1') {
      return lowestNumber;
    } else if (cefr === 'A2') {
      return lowestNumber + 1;
    } else if (cefr === 'B1') {
      return lowestNumber + 2;
    } else if (cefr === 'B2') {
      return lowestNumber + 3;
    } else if (cefr === 'C1') {
      return lowestNumber + 4;
    } else if (cefr === 'C2') {
      return lowestNumber + 5;
    }
  }
}
