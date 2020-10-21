import {RadarTemplate} from "./radarTemplate";

export class RadarTemplateContainer {

  id: string;
  name: string;
  description: string;
  radar_templates: Array<RadarTemplate>;
  active: boolean;
  active_voting_code?: string;

  constructor(id: string, name: string, description: string, active: boolean, radarTemplates: Array<RadarTemplate>,
              active_voting_code: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.radar_templates = radarTemplates.map(radarTemplate =>
      new RadarTemplate(radarTemplate.id, radarTemplate.name, radarTemplate.description,
        radarTemplate.axes, radarTemplate.active, radarTemplate.radars));
    this.active = active;
    this.active_voting_code = active_voting_code;
  }

  isClosed() {
    return !this.active;
  }

  hasRadarTemplateInformation(){
    return this.votedRadarTemplates().length > 0;
  }

  votedRadarTemplates(){
    return this.radar_templates.filter(radarTemplate => radarTemplate.hasRadarInformation());
  }
}
