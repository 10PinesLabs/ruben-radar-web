import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {VotingService} from "./voting.service";

@Injectable({
  providedIn: 'root'
})
export class HttpVotingService implements VotingService {

  constructor (private http: HttpClient) { }

  get(code: string): any {
    return this.http.get(environment.apiURL + '/api/votings?code=' + code);
  }

  create(radarTemplateContainerId: string, ends_at: string): any {
    return this.http.post(
      environment.apiURL + '/api/radar_template_containers/' + radarTemplateContainerId + '/votings',
      { ends_at: ends_at }
      );
  }
}
