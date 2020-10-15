import { Component, OnInit, Input } from '@angular/core';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-radar-template-container-card',
  templateUrl: './radar-template-container-card.component.html',
  styleUrls: ['./radar-template-container-card.component.scss']
})
export class RadarTemplateContainerCardComponent implements OnInit {

  @Input() radarTemplateContainer: RadarTemplateContainer;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  shouldShowChartPreview() {
    return this.radarTemplateContainer.hasRadarTemplateInformation();
  }

  radarTemplatesWithInformation() {
    return this.radarTemplateContainer.votedRadarTemplates();
  }

  radarTemplatesCount() {
    this.radarTemplateContainer.radar_templates ? this.radarTemplateContainer.radar_templates.length.toString() : null;
  }

  navigateToRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/' + this.radarTemplateContainer.id]);
  }

}
