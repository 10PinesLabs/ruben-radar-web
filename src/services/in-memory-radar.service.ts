import {Injectable} from '@angular/core';
import {Radar} from '../model/radar';
import {RADARS} from '../mock-radars';
import {Vote} from '../model/vote';
import {Observable, of} from 'rxjs';
import {RadarService} from './radar.service';
import {Axis} from 'src/model/axis';

@Injectable({
  providedIn: 'root'
})
export class InMemoryRadarService implements RadarService {
  // constructor(private http: HttpClient) { }

  private static parseAxesResult(axes: Array<Axis>) {
    return axes.map(axis => {
      return {
        axis,
        points: axis.answers.map(answer => answer.points),
      };
    });
  }

  radar(radarId: number): any {
    // const radarToVoteURL = 'http://localhost:3000/api/radars/' + radarId + '/result';
    // return this.http.get<Radar>(radarToVoteURL);
    const radarToReturn = RADARS.find(radar => ( radar.id === radarId));

    const radarResult = {
      radar: radarToReturn,
      axes_results: InMemoryRadarService.parseAxesResult(radarToReturn.axes),
    };

    return of(radarResult);
  }

  getAll(): Observable<Array<Radar>> {
    // return this.http.get<Array<Radar>>('http://localhost:3000/api/radars');
    return of(RADARS);
  }

  vote(radarId: number, vote: Vote): any {
    // const voteURL = 'http://localhost:3000/api/radars/' + radarId + '/votes';
    // return this.http.post(voteURL, vote);
    const votedRadar = RADARS.find(radar => ( radar.id === radarId));
    vote.answers.forEach(answer => {
      votedRadar.axes.forEach(axis => {
        if (axis.id === answer.axis.id) {
          axis.answers.push(answer);
        }
      });
    });

    return of(vote);
  }

  close(radarId: number): any {
    // const closeURL = 'http://localhost:3000/api/radars/' + radarId + '/close';
    // return this.http.post(closeURL, {});
    const radarToClose = RADARS.find(radar => radar.id === radarId);
    radarToClose.active = false;
    return of(radarToClose);
  }

}
