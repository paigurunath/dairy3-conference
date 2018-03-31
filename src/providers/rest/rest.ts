import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//import { ConferenceData } from '../conference-data';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  //private apiUrl_v1 = '/Users/guru/Documents/ibm-bluemix/ionic-hack/ionic-conference-app/src/providers/conference-data.json';

  data : any;

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
    this.data = null;
  }

  getCountries(): Observable<{}> {
    //console.log(this.http.get('../conference-data.json'));
    console.log(this.load);
    return this.http.get(this.apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  
  // public getJSONDataAsync(filePath: string) : Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(filePath).subscribe(res: => {
  //       if(!res.ok) {
  //         reject("Failed with status: " + res.status + " trying to find file at " + filePath);
  //       }

  //       var josnRes  = res.json();
  //     })

  //   }).catch((reason) => this.handleError(reason));
  // }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('./assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();

    this.data.tracks = [];

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              let speaker = this.data.speakers.find((s: any) => s.name === speakerName);
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }

          if (session.tracks) {
            session.tracks.forEach((track: any) => {
              if (this.data.tracks.indexOf(track) < 0) {
                this.data.tracks.push(track);
              }
            });
          }
        });
      });
    });

    return this.data;
  }
  // load() {
  //   if (this.data) {
  //     return Promise.resolve(this.data);
  //   }
 
  //   return new Promise(resolve => {
  //     this.http.get('path/to/data.json')
  //       .map(response => response.)
  //       .subscribe(data => {
  //         this.data = data;
  //         resolve(this.data);
  //       });
  //   });
  // }

  // getCountries(): Observable<{}> {
  //   return this.http.get(this.apiUrl_v1).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );

  //   return this.http.get(this.apiUrl_v1).map((response : Response) => <any> response.json()).catch(this.handleError);
  // }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
