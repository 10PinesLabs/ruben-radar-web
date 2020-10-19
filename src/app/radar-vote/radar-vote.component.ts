import { Component, Inject, OnInit } from "@angular/core";
import { Radar } from "../../model/radar";
import { ActivatedRoute } from "@angular/router";
import { Axis } from "../../model/axis";
import { RadarTemplateContainerService } from "src/services/radarTemplateContainer.service";
import { RadarTemplate } from "src/model/radarTemplate";
import { RadarTemplateContainer } from "src/model/radarTemplateContainer";

@Component({
  selector: "app-radar-vote",
  templateUrl: "./radar-vote.component.html",
  styleUrls: ["./radar-vote.component.scss"],
})
export class RadarVoteComponent implements OnInit {
  radarContainer: RadarTemplateContainer;
  currentStep: number = 0;

  constructor(
    @Inject("RadarTemplateContainerService")
    private radarTemplateContainerService: RadarTemplateContainerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let container = history.state.data;
    if (!container) {
      const code: string = this.route.snapshot.paramMap.get("code");
      this.radarTemplateContainerService.getByAccessCode(code).subscribe(
        (containerResult) => {
          this.radarContainer = containerResult;
          console.log(containerResult);
        },
        (error) => console.log("Ocurrio un error")
      );
      return;
    }
    this.radarContainer = container;
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

  isANextRadarTemplateToVote(): boolean {
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
  }

  votableRadarTemplates(container: RadarTemplateContainer) {
    return container?.radar_templates.filter(
      (radarTemplate: RadarTemplate) => radarTemplate.active
    );
  }
}
