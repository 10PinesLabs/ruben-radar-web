import {Observable} from 'rxjs';
import {User} from '../model/user';

export interface UserService {

  getAll(): Observable<Array<User>>;

  share(id: string, usersIds: Array<string>): any;

}
