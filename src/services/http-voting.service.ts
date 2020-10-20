import { Injectable } from '@angular/core';
import { Radar } from '../model/radar';
import { Vote } from '../model/vote';
import { Observable } from 'rxjs/index';
import { RadarService } from './radar.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {VotingService} from "./voting.service";
import {Voting} from "../model/voting";

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
