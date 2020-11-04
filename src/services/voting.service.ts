export interface VotingService {
  create(radarTemplateContainerId: string, name: string, ends_at: string): any;
  get(code: string): any;
}
