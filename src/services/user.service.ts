import {RadarTemplate} from '../model/radarTemplate';
import {Observable} from 'rxjs/index';
import { Vote } from 'src/model/vote';
import {User} from '../model/user';

export interface UserService {

  getAll(): Observable<Array<User>>;

  share(id: string, usersIds: Array<string>): any;

}
