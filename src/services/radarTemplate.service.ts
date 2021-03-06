import {RadarTemplate} from '../model/radarTemplate';
import {Observable} from 'rxjs';
import {Vote} from 'src/model/vote';

export interface RadarTemplateService {

  getAll(): Observable<Array<RadarTemplate>>;

  get(id: String): Observable<RadarTemplate>;

  create(radarTemplate: RadarTemplate);

  vote(radarId: string, vote: Vote): any;

  close(id: string);

}
