import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { RadarTemplateService } from './radarTemplate.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import {RadarTemplate} from "../model/radarTemplate";
import { Vote } from 'src/model/vote';
import {UserService} from './user.service';
import {User} from '../model/user';
import {RadarTemplateContainer} from '../model/radarTemplateContainer';

@Injectable({
  providedIn: 'root'
})

export class HttpUserService implements UserService {

  constructor (private http: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.apiURL + '/api/users');
  }

  share(id: string, usersIds: Array<string>) {
    return this.http.post<RadarTemplateContainer>(environment.apiURL + `/api/radar_template_containers/${id}/share`,
      {users_ids: usersIds});
  }
}
