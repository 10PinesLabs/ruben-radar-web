import {Axis} from './axis';
import {Radar} from './radar';

export class RadarTemplate {
  id: string;
  name: string;
  description: string;
  axes: Array<Axis>;
  radars: Array<Radar>;
  active: boolean;
  radar_template_container_id: string;

  constructor(id: string, radarContainerId: string, name: string, description: string, axes, active: boolean, radars) {
    this.id = id;
    this.radar_template_container_id = radarContainerId;
    this.name = name;
    this.description = description;
    this.axes = axes;
    this.radars = radars.map(radar => new Radar(radar.id, radar.name, radar.description, radar.axes, radar.active, radar.globalAverage));
    this.active = active;
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

  hasRadarInformation() : boolean {
    return this.radars.some(radar => radar.hasVotes());
  }
}
