import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { RadarTemplateService } from './radarTemplate.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import {RadarTemplate} from "../model/radarTemplate";
import { Vote } from 'src/model/vote';

@Injectable({
  providedIn: 'root'
})

export class HttpRadarTemplateService implements RadarTemplateService {

  constructor (private http: HttpClient) { }

  getAll(): Observable<RadarTemplate[]> {
    return this.http.get<Array<RadarTemplate>>(environment.apiURL + '/api/radar_templates');
  }

  get(id: String): Observable<RadarTemplate> {
    return this.http.get<RadarTemplate>(environment.apiURL + '/api/radar_templates/' + id);
  }

  create(radarTemplate: RadarTemplate): any {
    return this.http.post(environment.apiURL + '/api/radar_templates', radarTemplate);
  }

  vote(radarTemplateId: string, vote: Vote): any {
    const voteURL = environment.apiURL + `/api/radar_templates/${radarTemplateId}/votes`;
    return this.http.post(voteURL, vote);
  }

  close(id: string) {
    return this.http.delete(environment.apiURL + `/api/radar_templates/${id}`);
  }

}
