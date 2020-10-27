import {Observable} from 'rxjs/index';
import {RadarTemplateContainer} from "../model/radarTemplateContainer";

export interface RadarTemplateContainerService {

  getAll(): Observable<Array<RadarTemplateContainer>>;

  get(id: String): Observable<RadarTemplateContainer>

  create(name: string, description: string);

}
