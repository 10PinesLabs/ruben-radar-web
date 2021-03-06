import {Radar} from '../model/radar';
import {Observable} from 'rxjs';

export interface RadarService {

  radar(radarId: number): any;

  getAll(): Observable<Array<Radar>>;

  close(radarId: number): any;

  createRadar(radar: Radar): any;
}
