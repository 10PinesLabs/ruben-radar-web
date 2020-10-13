import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { RadarTemplateService } from './radarTemplate.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import {RadarTemplate} from "../model/radarTemplate";

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

  getAllByAccessCode(accessCode: string): Observable<RadarTemplate> {
    const params = new HttpParams().set('#', accessCode)
    return this.http.get<RadarTemplate>(environment.apiURL + '/api/code', {params});
  }

  create(radarTemplate: RadarTemplate): any {
    return this.http.post(environment.apiURL + '/api/radar_templates', radarTemplate);
  }
}
