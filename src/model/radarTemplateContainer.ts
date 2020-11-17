import {RadarTemplate} from "./radarTemplate";

export class RadarTemplateContainer {

  id: string;
  name: string;
  description: string;
  radar_templates: Array<RadarTemplate>;
  active: boolean;
  active_voting_code?: string;
  pinned: boolean;

  constructor(id: string, name: string, description: string, active: boolean, radarTemplates: Array<RadarTemplate>,
              active_voting_code: string, pinned: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.radar_templates = radarTemplates.map(radarTemplate =>
      new RadarTemplate(radarTemplate.id, this.id, radarTemplate.name, radarTemplate.description,
        radarTemplate.axes, radarTemplate.active, radarTemplate.radars));
    this.active = active;
    this.active_voting_code = active_voting_code;
    this.pinned = pinned;
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

  addRadarTemplate(radarTemplate) {
    this.radar_templates.push(radarTemplate);
  }

  isPinned(){
    return this.pinned;
  }

  pin(){
    this.pinned = true;
  }

  unpin(){
    this.pinned = false;
  }
}
