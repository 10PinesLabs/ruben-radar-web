import {RadarTemplate} from './radarTemplate';

export const DEFAULT_RADAR_TEMPLATE_CONTAINER_MAX_VOTING_VALUE = 5

export class RadarTemplateContainer {

  id: string;
  name: string;
  description: string;
  radar_templates: Array<RadarTemplate>;
  active: boolean;
  active_voting_code?: string;
  pinned: boolean;
  max_points: number;

  constructor(id: string, name: string, description: string, active: boolean, radarTemplates: Array<RadarTemplate>,
              active_voting_code: string, pinned: boolean, max_points: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.radar_templates = radarTemplates.map(radarTemplate =>
      new RadarTemplate(radarTemplate.id, this.id, radarTemplate.name, radarTemplate.description,
        radarTemplate.axes, radarTemplate.active, radarTemplate.radars));
    this.active = active;
    this.active_voting_code = active_voting_code;
    this.pinned = pinned;
    this.max_points = max_points;
  }

  isClosed() {
    return !this.active;
  }

  hasRadarTemplateInformation() {
    return this.votedRadarTemplates().length > 0;
  }

  votedRadarTemplates() {
    return this.radar_templates.filter(radarTemplate => radarTemplate.hasRadarInformation());
  }

  addRadarTemplate(radarTemplate) {
    this.radar_templates.push(radarTemplate);
  }

  isPinned() {
    return this.pinned;
  }

  pin() {
    this.pinned = true;
  }

  unpin() {
    this.pinned = false;
  }

  deleteRadar(id: string) {
    this.radar_templates = this.radar_templates.filter(radarTemplate => radarTemplate.id !== id);
  }

  setName(newName: string) {
    this.name = newName;
  }
}
