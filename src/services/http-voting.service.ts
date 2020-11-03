import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {VotingService} from "./voting.service";
import { Voting } from 'src/model/voting';

@Injectable({
  providedIn: 'root'
})
export class HttpVotingService implements VotingService {

  constructor (private http: HttpClient) { }

  retriveFromHistoryOrGet(code: string) : Promise<Voting> {
    return new Promise((resolve, reject) => {
        let voting : Voting = history.state?.data?.voting;
        if (!voting) {
          this.get(code).subscribe(
            (votingResult : Voting) => {
              resolve(votingResult)
            },
          );
          return;
        }
        resolve(voting);
    })
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
}
