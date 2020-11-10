import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';
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

      let pinContainersStatusRequest : Observable<boolean>[] = this.radarTemplateContainers.map(container => this.radarTemplateContainerService.isPinned(container.id))
      forkJoin(pinContainersStatusRequest).subscribe((pinContainersStatus) => {
        const pinnedContainers = this.radarTemplateContainers.filter((c, index) => pinContainersStatus[index] )
        this.pinnedTemplateContainers = pinnedContainers;
        this.orderContainersByPinned()
      })
    });
  }

  radarTemplateContainerPinToggle(container){
    this.isRadarTemplateConainerPinned(container) ? this.unpinContainer(container) : this.pinContainer(container)
    this.orderContainersByPinned()
  }

  pinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.pin(container.id).subscribe(()=>{
      this.pinnedTemplateContainers.push(container)
    })
  }

  unpinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.unpin(container.id).subscribe(()=>{
      const indexOfUnpinnedContaier = this.pinnedTemplateContainers.indexOf(container)
      this.pinnedTemplateContainers.splice(indexOfUnpinnedContaier);
    })
  }

  isRadarTemplateConainerPinned(container){
    return this.pinnedTemplateContainers.includes(container)
  }

  orderContainersByPinned(){
    this.radarTemplateContainers = this.radarTemplateContainers.sort((a : RadarTemplateContainer, b : RadarTemplateContainer)=>{
        if(this.pinnedTemplateContainers.includes(a) && !this.pinnedTemplateContainers.includes(b)){
          return 1
        }else if(this.pinnedTemplateContainers.includes(a) && this.pinnedTemplateContainers.includes(b)){
          return -1
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
