import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {VotingService} from "./voting.service";
import {Voting} from '../model/voting';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpVotingService implements VotingService {

  constructor (private http: HttpClient) { }

  retrieveFromHistoryOrGet(code: string) : Observable<Voting> {
        let voting : Voting = history.state?.data?.voting;
        if (!voting) {
          return this.get(code);
        }else{
          return new Observable<Voting>(subscriber => { 
            subscriber.next(voting);
            subscriber.complete();
          });
        }
        
  }

  get(code: string): any {
    return this.http.get(environment.apiURL + '/api/votings?code=' + code);
  }

  create(radarTemplateContainerId: string, name: string, ends_at: string): any {
    return this.http.post(
      environment.apiURL + '/api/radar_template_containers/' + radarTemplateContainerId + '/votings',
      { name: name, ends_at: ends_at }
      );
  }

  close(radarTemplateContainerId: string): Observable<Voting> {
    return this.http.put<Voting>(
      environment.apiURL + '/api/votings/' + radarTemplateContainerId,
      {}
    );
  }
}
