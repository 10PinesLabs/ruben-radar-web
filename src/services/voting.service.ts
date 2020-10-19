export interface VotingService {
  create(radarTemplateContainerId: string, ends_at: string): any;
  get(code: string): any;
}
