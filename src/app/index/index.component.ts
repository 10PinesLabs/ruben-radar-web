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
  unpinnedTemplateConteinars : RadarTemplateContainer[];

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
        const unpinnedContainers = this.radarTemplateContainers.filter( contianer => !pinnedContainers.includes(contianer))
        this.pinnedTemplateContainers = pinnedContainers;
        this.unpinnedTemplateConteinars = unpinnedContainers;
      })
    });
  }

  pinToggle(container){
    this.isRadarTemplateConainerPinned(container) ? this.unpinContainer(container) : this.pinContainer(container)
  }

  pinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.pin(container.id).subscribe(()=>{
      const indexOfPinnedContaier = this.unpinnedTemplateConteinars.indexOf(container)
      this.unpinnedTemplateConteinars.splice(indexOfPinnedContaier);
      this.pinnedTemplateContainers.push(container)
    })
  }

  unpinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.unpin(container.id).subscribe(()=>{
      const indexOfUnpinnedContaier = this.pinnedTemplateContainers.indexOf(container)
      this.pinnedTemplateContainers.splice(indexOfUnpinnedContaier);
      this.unpinnedTemplateConteinars.push(container)
    })
  }

  isRadarTemplateConainerPinned(c){
    return this.pinnedTemplateContainers.includes(c)
  }

  orderContainers(){
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
