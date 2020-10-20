import {RadarTemplate} from "./radarTemplate";

export class RadarTemplateContainer {
  id: number;
  name: string;
  description: string;
  radar_templates: Array<RadarTemplate>;
  active: boolean;

  constructor(id: number, name: string, description: string, active: boolean, radarTemplates: Array<RadarTemplate>) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.radar_templates = radarTemplates.map(radarTemplate =>
      new RadarTemplate(radarTemplate.id, radarTemplate.name, radarTemplate.description,
        radarTemplate.axes, radarTemplate.active, radarTemplate.radars));
    this.active = active;
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
