import {RadarTemplate} from '../model/radarTemplate';
import {Observable} from 'rxjs/index';

export interface RadarTemplateService {

  getAll(): Observable<Array<RadarTemplate>>;

  get(id: String): Observable<RadarTemplate>; 

  getByAccessCode(accessCode: String): Observable<RadarTemplate>;

  create(radarTemplate: RadarTemplate);

}
