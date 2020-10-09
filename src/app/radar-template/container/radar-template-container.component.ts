import {Component, OnInit, Input, Inject, OnChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {RadarTemplateContainerService} from "../../../services/radarTemplateContainer.service";

@Component({
  selector: 'app-radar-template-container',
  templateUrl: './radar-template-container.component.html',
  styleUrls: ['./radar-template-container.component.scss']
})
export class RadarTemplateContainerComponent implements OnInit {
  @Input() radarTemplateContainer: any;
  id: String;
  selectedRadarTemplate = null

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private route: ActivatedRoute,  private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.radarTemplateContainerService.get(this.id).subscribe(radarTemplateContainer => {
      this.radarTemplateContainer = new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
        radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates)
      this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[0]);
    });
  }

  radarTemplates() {
    return this.radarTemplateContainer.radar_templates;
  }

  onRadarTemplateCardClick(radarTemplate){
    this.setSelectedRadarTemplate(radarTemplate);
  }

  setSelectedRadarTemplate(radarTemplate){
    this.selectedRadarTemplate = radarTemplate
  }

}
