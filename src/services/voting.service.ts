import {Observable} from 'rxjs';
import {Voting} from '../model/voting';

export interface VotingService {
  create(radarTemplateContainerId: string, name: string, ends_at: string): any;
  get(code: string): any;
  close(radarTemplateContainerId: string): Observable<Voting>;
}
