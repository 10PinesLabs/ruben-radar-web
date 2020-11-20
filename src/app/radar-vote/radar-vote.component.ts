import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Axis } from "../../model/axis";
import { RadarTemplate } from "src/model/radarTemplate";
import { RadarTemplateContainer } from "src/model/radarTemplateContainer";
import { Voting } from "src/model/voting";
import { DOCUMENT } from '@angular/common';
import { VotingService } from "src/services/voting.service";

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss'],
})
export class RadarVoteComponent implements OnInit {
  radarContainer: RadarTemplateContainer;
  voting : Voting
  currentStep: number = 0;
  code : string
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject('VotingService') private votingService : VotingService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("code");
    this.votingService.get(this.code).subscribe((voting : Voting) =>{
      this.voting = voting
      this.radarContainer = voting.radar_template_container;
    })
  }

  canContainerBeVoted(container: RadarTemplateContainer): boolean {
    return this.votableRadarTemplates(container)?.length > 0;
  }

  parseAxes(axes_results): any {
    return axes_results.map(
      (axis) => new Axis(axis.id, axis.name, axis.description, null)
    );
  }

  currentStepRadarTemplate(): any {
    return this.votableRadarTemplates(this.radarContainer)[this.currentStep];
  }

  isContainerClosed(): boolean {
    return false;
  }

  hasNextStep(): boolean {
    return this.votableRadarTemplates(this.radarContainer)
      .slice(this.currentStep + 1)
      .some((radar: RadarTemplate) => radar.active);
  }

  hasVotationEnded(): boolean {
    return this.votableRadarTemplates(this.radarContainer).length === this.currentStep;
  }

  title() {
    return this.radarContainer.name;
  }

  templateVoted() {
    this.currentStep++;
    this.document.getElementsByClassName("view-scrollable-container")[0].scrollTop = 0

    if(this.hasVotationEnded()){
      this.redirectToResults()
    }
  }

  redirectToResults() {
    const code = this.route.snapshot.paramMap.get('code');
    this.router.navigate(['/results/' + code],{state:{data:{voting:this.voting}}});
  }

  votableRadarTemplates(container: RadarTemplateContainer) {
    return container?.radar_templates.filter(
      (radarTemplate: RadarTemplate) => radarTemplate.active
    );
  }
}
