import {Radar} from './radar';
import {RadarTemplateContainer} from "./radarTemplateContainer";

export class Voting {
  id: number;
  code: string;
  ends_at: string;
  radar_template_container: RadarTemplateContainer;
  radars: Array<Radar>;

  constructor(id: number, code: string, ends_at: string, radar_template_container: RadarTemplateContainer, radars) {
    this.id = id;
    this.code = code;
    this.ends_at = ends_at;
    this.radar_template_container = radar_template_container;
    this.radars = radars.map(radar => new Radar(radar.id, radar.name, radar.description, radar.axes, radar.active));
  }
}
