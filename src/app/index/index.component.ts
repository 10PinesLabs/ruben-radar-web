import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import { RadarTemplateContainerFilter } from 'src/model/radarTemplateContainerFilter';
import { RadarTemplateContainerFilterService } from 'src/services/radarTemplateContainerFilter.service';
import {RadarTemplateContainer} from "../../model/radarTemplateContainer";
import {RadarTemplateContainerService} from "../../services/radarTemplateContainer.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  radarTemplateContainers: RadarTemplateContainer[];
  currentContainerFilter : RadarTemplateContainerFilter = new RadarTemplateContainerFilter()

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private router: Router,
              private radarTemplateContainerFilterService : RadarTemplateContainerFilterService) {
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
    this.radarTemplateContainerFilterService.onFilterChange$.subscribe((filter : RadarTemplateContainerFilter)=>{
      this.currentContainerFilter = filter
    })
  }

  filteredRadarTemplateContainers(){
    return this.currentContainerFilter.filterContainers(this.radarTemplateContainers)
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

  deleteContainer($id) {
    this.radarTemplateContainers = this.radarTemplateContainers.filter(container => container.id !== $id);
  }
}
