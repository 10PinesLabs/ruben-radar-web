import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {RadarTemplateContainer} from "../../model/radarTemplateContainer";
import {RadarTemplateContainerService} from "../../services/radarTemplateContainer.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  radarTemplateContainers: RadarTemplateContainer[];

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private router: Router) {
    this.radarTemplateContainers = [];
  }

  ngOnInit() {
    this.radarTemplateContainerService.getAll().subscribe(radarTemplateContainers => {
      radarTemplateContainers.forEach( radarTemplateContainer => {
        this.radarTemplateContainers.push(new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
          radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
          radarTemplateContainer.active_voting_code));
      })
    });
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }

  onCreate = (name: string, description: string) => {
    this.radarTemplateContainerService
      .create(name, description)
      .subscribe( radarTemplateContainer => {
        this.radarTemplateContainers.push(new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
          radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
          radarTemplateContainer.active_voting_code));
      })
  }

}
