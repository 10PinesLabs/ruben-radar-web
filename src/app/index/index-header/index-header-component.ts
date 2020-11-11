import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { RadarTemplateContainer } from 'src/model/radarTemplateContainer';
import { RadarTemplateContainerService } from 'src/services/radarTemplateContainer.service';
import {RadarTemplateService} from '../../../services/radarTemplate.service';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss']
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers : RadarTemplateContainer[];
  constructor(private router: Router,
    @Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService) {}

  ngOnInit(): void {

    }

  unpinContainer(container : RadarTemplateContainer){
    this.radarTemplateContainerService.unpin(container.id).subscribe(()=>{
      container.pinned = false;
    })
  }

  pinnedRadarTemplateContaiers(){
    return this.radarTemplateContainers.filter(radarTemplateContainer => radarTemplateContainer.isPinned())
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

}
