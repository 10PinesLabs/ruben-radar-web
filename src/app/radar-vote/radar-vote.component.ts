import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Axis } from "../../model/axis";
import { RadarTemplate } from "src/model/radarTemplate";
import { RadarTemplateContainer } from "src/model/radarTemplateContainer";
import { VotingService } from "src/services/voting.service";
import { Voting } from "src/model/voting";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "app-radar-vote",
  templateUrl: "./radar-vote.component.html",
  styleUrls: ["./radar-vote.component.scss"],
})
export class RadarVoteComponent implements OnInit {
  radarContainer: RadarTemplateContainer;
  voting : Voting
  currentStep: number = 0;

  constructor(
    @Inject("VotingService")
    private votingService: VotingService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    const code: string = this.route.snapshot.paramMap.get("code");
    this.votingService.retrieveFromHistoryOrGet(code).subscribe((voting : Voting) =>{
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

  hasVotationEnded() : boolean{
    return this.votableRadarTemplates(this.radarContainer).length === this.currentStep
  }

  title() {
    return this.radarContainer.name;
  }

  templateVoted() {
    this.currentStep++;
    this.document.getElementsByClassName("view-scrollable-container")[0].scrollTop = 0
  }

  votableRadarTemplates(container: RadarTemplateContainer) {
    return container?.radar_templates.filter(
      (radarTemplate: RadarTemplate) => radarTemplate.active
    );
  }
}
