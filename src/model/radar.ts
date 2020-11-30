import {Axis} from './axis';

export class Radar {
  id: number;
  name: string;
  description: string;
  axes: Array<Axis>;
  active: boolean;
  global_average: number;

  constructor(id: number, name: string, description: string, axes, active: boolean, global_average: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.axes = axes;
    this.active = active;
    this.global_average = global_average;
  }

  isClosed() {
    return !this.active;
  }

  axisBelongsToRadar(axis: Axis) {
    let belongs = false;
    this.axes.forEach(radarAxis => {
      if (axis.name === radarAxis.name) {
        belongs =  true;
      }
    });

    return belongs;
  }

  axisPointsFor(axis: Axis) {
    let points = [];
    this.axes.forEach(radarAxis => {
      if (radarAxis.name === axis.name) {
        points = radarAxis.answers.map(answer => answer.points);
        return points;
      }
    });
    return points;
  }

  // This assumes that all axes have the same amount of votes
  amountOfVotes() {
    return !this.axes ? 0 : this.axes[0].answers.length;
  }

  hasVotes() {
    return this.axes[0].answers.length !== 0;
  }
}
