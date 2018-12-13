import {Injectable} from '@angular/core';

@Injectable()
export class VersionControllerService {
  /*
  Helper class to make changes and transitions between Lärka and Labb (and dev) easier
   */

  private static currentTarget = 'LABB'; // LARKA or LABB; possibly DEV

  static isLabb () {
    return VersionControllerService.currentTarget === 'LABB';
  }

  static isDev() {
    return VersionControllerService.currentTarget === 'DEV';
  }
}
