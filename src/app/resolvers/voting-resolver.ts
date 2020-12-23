import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Voting} from '../../model/voting';
import {Observable, of} from 'rxjs';
import {VotingService} from '../../services/voting.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class VotingResolver implements Resolve<Voting> {
  constructor(@Inject('VotingService') private service: VotingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Voting> {
    return this.service.retrieveFromHistoryOrGet(route.paramMap.get('code')).pipe(
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
}
