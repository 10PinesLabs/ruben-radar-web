import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import { Filter } from 'src/model/filter';
import { CurrentPageService, pages } from 'src/services/currentPage.service';
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
  currentContainerFilter : Filter = new Filter()

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private router: Router, private currentPageService : CurrentPageService,
              private radarTemplateContainerFilterService : RadarTemplateContainerFilterService) {
    this.radarTemplateContainers = [];
    currentPageService.onPage$.emit(pages.INDEX)
  }

  ngOnInit() {
    this.radarTemplateContainerService.getAll().subscribe(radarTemplateContainers => {
      radarTemplateContainers.forEach( radarTemplateContainer => {
        this.radarTemplateContainers.push(new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
          radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
          radarTemplateContainer.active_voting_code));
      })
    });
    this.radarTemplateContainerFilterService.onFilterChange$.subscribe((filter : Filter)=>{
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

}
