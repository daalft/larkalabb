/**
 * Created by David on 3/14/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class KarpService {

    private baseUrl =       'https://ws.spraakbanken.gu.se/ws/karp/v4/';
    private userQuery =     'query?q=extended||and|baseformC|equals|'; // append word to search for
    private userQueryWordform = 'query?q=extended||and|wfC|equals|';
    private userQueryMsd = 'query?q=extended||and|msd|equals|';
    private posQuery =      '||and|pos|equals|';
    private userResource =  '&resource=saldom';
    private lexin =         '&resource=lexin';
    private miniEntry =     'minientry?q=extended||and|wf|equals|';

    private restriction =   '&show=lemgram';

    constructor(private http: HttpClient) {

    }

    public fetchFrom (word: string, pos: string, resource: string, baseform?: boolean) {
      const qq = baseform ? this.userQuery : this.userQueryWordform;
        console.log(this.baseUrl + qq + word + this.posQuery + pos + '&resource=' + resource);
        return this.http.get(this.baseUrl + qq + word + this.posQuery + pos + '&resource=' + resource);
    }

    public fetch (word: string, mode?: string) {
      const qq = (mode !== '') ? (mode === 'wf' ? this.userQueryWordform : (mode === 'msd' ? this.userQueryMsd : '')) : this.userQuery;
      console.log(this.baseUrl + qq + word + this.userResource);
        return this.http.get(this.baseUrl + qq + word + this.userResource);
    }

    public fetchWordInfo(lemgram) {
      const uq = 'query?q=extended||and|lemgram|equals|' + lemgram;
      console.log(this.baseUrl + uq + this.userResource);
      return this.http.get(this.baseUrl + uq + this.userResource);
    }
    /**
     * Fetch mini entry with default restriction (pos,lemgram)
     * @param word
     */
    public fetchMini (word: string) {
      console.log(this.baseUrl + this.miniEntry + word + this.userResource + this.restriction);
        return this.http.get(this.baseUrl + this.miniEntry + word + this.userResource + this.restriction);
    }
}
