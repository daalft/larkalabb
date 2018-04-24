/**
 * Created by David on 3/17/2016.
 */
import {Injectable} from '@angular/core';
import {HashService} from './hash.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class LoginService {
  private baseUrl = 'https://ws.spraakbanken.gu.se/ws/larkalabb/icall.cgi?';

  private loginUrl = this.baseUrl + 'command=login';

  private loggedIn: boolean;

  private randomId;
  private userId;

  constructor(private http: HttpClient) {}

  isLoggedIn () {
    return this.loggedIn;
  }

  userExists(username) {

    const url = this.baseUrl + 'command=exists&username=' + username;
    return this.http.get(url);

  }

  createUser (udata) {
    const command = 'command=create_user';
    const url = this.baseUrl + command;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let usp = new HttpParams();
    for (const property in udata) {
      if (udata.hasOwnProperty(property)) {
        usp = usp.append(property, udata[property]);
      }
    }
    return this.http.post(url, usp, {headers: headers});
  }

  logout () {
    this.loggedIn = false;
    this.userId = null;
    window.localStorage.removeItem('remember');
  }

  login (username: string, password: string, remember: boolean) {
    const hpw = HashService.hashCode(password + username);
    const hpws = hpw + '';

    const params: HttpParams = new HttpParams()
      .append('username', username)
      .append('chash', hpws);

    if (remember) {
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('chash', hpws);
      window.localStorage.setItem('remember', 'true');
    }

    return this.http.post(this.loginUrl, params);
  }

  loginWithHash(username: string, chash: string) {
    const params: HttpParams = new HttpParams()
      .append('username', username)
      .append('chash', chash);
    return this.http.post(this.loginUrl, params);
  }

  cookieLogin () {
    const me = this;
    if (window.localStorage.getItem('remember')) {
      const username = window.localStorage.getItem('username');
      const chash = window.localStorage.getItem('chash');
      const params: HttpParams = new HttpParams()
        .append('username', username)
        .append('chash', chash);
      return this.http.post(this.loginUrl, params).subscribe(function(d) {  // subscribe here for auto-login
        if (d['Status'] === 200) {
          me.setUserId(d['userid']);
        }
      });
    } else {
      console.log('No preference for remember found');
    }
  }

  getRandomId() {
    if (!this.randomId) {
      this.randomId = 'guestsession' + this.randomNumber();
    }

    return this.randomId;
  }

  randomNumber () {
    return Math.round(Math.random() * 1000000);
  }

  getUserId () {
    return this.userId;
  }

  setUserId(uid) {
    this.userId = uid;
    this.loggedIn = true;
    console.log(uid);
  }

}
