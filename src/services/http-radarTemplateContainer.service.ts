import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<RadarTemplateContainer>(environment.apiURL + `/api/radar_template_containers/${id}`);
  }

  create(name: string, description: string): any {
    return this.http.post(environment.apiURL + '/api/radar_template_containers', {name: name, description: description});
  }

  clone(id: string, name: string, description: string, shouldShare: boolean): Observable<RadarTemplateContainer> {
    return this.http.post<RadarTemplateContainer>(environment.apiURL + `/api/radar_template_containers/${id}/clone`,
      {name: name, description: description, share: shouldShare});
  }

  share(id: string, userId: string) {
    return this.http.post<RadarTemplateContainer>(environment.apiURL + `/api/radar_template_containers/${id}/share`,
      {user_id: userId});
  }

  isPinned(id:string){
    return this.http.get<boolean>(environment.apiURL + `/api/radar_template_containers/${id}/pin`);
  }

  pin(id: string) {
    return this.pinRequest(id, true)
  }

  unpin(id: string) {
    return this.pinRequest(id, false)
  }

  private pinRequest(id:string, pinStauts : boolean){
    return this.http.post(environment.apiURL + `/api/radar_template_containers/${id}/pin`, {pin: pinStauts});
  }
}
