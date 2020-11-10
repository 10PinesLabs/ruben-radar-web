import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
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
  pinnedTemplateContainers : RadarTemplateContainer[];
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

      let pinContainersStatusRequest : Observable<boolean>[] = this.radarTemplateContainers.map(container => this.radarTemplateContainerService.isPinned(container.id))
      forkJoin(pinContainersStatusRequest).subscribe((pinContainersStatus) => {
        const pinnedContainers = this.radarTemplateContainers.filter((c, index) => pinContainersStatus[index] )
        this.pinnedTemplateContainers = pinnedContainers;
      })
    });
    this.radarTemplateContainerFilterService.onFilterChange$.subscribe((filter : RadarTemplateContainerFilter)=>{
      this.currentContainerFilter = filter
    })
  }

  filteredRadarTemplateContainers(){
    return this.currentContainerFilter.filterContainers(this.radarTemplateContainers)
  }

  radarTemplateContainerPinToggle(container){
    this.isRadarTemplateConainerPinned(container) ? this.unpinContainer(container) : this.pinContainer(container)
  }

  pinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.pin(container.id).subscribe(()=>{
      this.pinnedTemplateContainers.push(container)
    })
  }

  unpinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.unpin(container.id).subscribe(()=>{
      const radarTemplateContainerToUnpin = this.pinnedTemplateContainers.indexOf(container);
      this.pinnedTemplateContainers.splice(radarTemplateContainerToUnpin,1)
    })
  }

  isRadarTemplateConainerPinned(container){
    return this.pinnedTemplateContainers.includes(container)
  }

  orderRadarContainersByPinned(containers : RadarTemplateContainer[]){
    return containers.sort((a : RadarTemplateContainer, b : RadarTemplateContainer)=>{
        if(this.pinnedTemplateContainers.includes(a) && !this.pinnedTemplateContainers.includes(b)){
          return -1
        }else if(!this.pinnedTemplateContainers.includes(a) && this.pinnedTemplateContainers.includes(b)){
          return 1
        }else{
          return 0
        }
    })
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
