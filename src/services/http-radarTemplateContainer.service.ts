import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import {RadarTemplateContainerService} from "./radarTemplateContainer.service";
import {RadarTemplateContainer} from "../model/radarTemplateContainer";

@Injectable({
  providedIn: 'root'
})

export class HttpRadarTemplateContainerService implements RadarTemplateContainerService {

  constructor (private http: HttpClient) { }

  getAll(): Observable<RadarTemplateContainer[]> {
    return this.http.get<Array<RadarTemplateContainer>>(environment.apiURL + '/api/radar_template_containers');
  }

  get(id: String): Observable<RadarTemplateContainer> {
    return this.http.get<RadarTemplateContainer>(environment.apiURL + '/api/radar_template_containers/${id}/votings' + id);
  }

  getByAccessCode(accessCode: string): Observable<RadarTemplateContainer> {
    const params = new HttpParams().set('code', accessCode)
    return this.http.get<RadarTemplateContainer>(environment.apiURL + '/api/votings', {params});
  }

  create(radarTemplateContainer: RadarTemplateContainer): any {
    return this.http.post(environment.apiURL + '/api/radar_template_containers', radarTemplateContainer);
  }
}
