import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Artist } from './../artist/artist';

@Injectable()
export class SpotifyArtistService {

  constructor (private http: Http) {}

  getArtist(url:string): Observable<Artist[]> {
      return this.http.get(url)
          .map(this.extractData)
          .do(data => console.log('All: ' +  JSON.stringify(data)))
          .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.artists.items || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
