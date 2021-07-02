import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Voting} from '../../model/voting';
import {Observable, of} from 'rxjs';
import {VotingService} from '../../services/voting.service';
import {catchError} from 'rxjs/operators';
import {TokenService} from "../../services/token.service";
import {User} from "../../model/user";

@Injectable()
export class CurrentUserResolver implements Resolve<User> {
  constructor(private tokenService: TokenService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<User> {
      return this.tokenService.getCurrentUser();
  }
}
