import {RadarTemplateContainer} from './radarTemplateContainer';

export class Voting {
  id: number;
  code: string;
  ends_at: string;
  radar_template_container: RadarTemplateContainer;

  constructor(id: number, code: string, ends_at: string, radar_template_container: RadarTemplateContainer) {
    this.id = id;
    this.code = code;
    this.ends_at = ends_at;
    this.radar_template_container = new RadarTemplateContainer(radar_template_container.id, radar_template_container.name
      , radar_template_container.description, radar_template_container.active, radar_template_container.radar_templates
      , radar_template_container.active_voting_code, radar_template_container.pinned, radar_template_container.max_points);
  }
}
