import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RadarTemplateContainerFilter} from 'src/model/radarTemplateContainerFilter';
import {RadarTemplateContainerFilterService} from 'src/services/radarTemplateContainerFilter.service';
import {RadarTemplateContainer} from '../../model/radarTemplateContainer';
import {RadarTemplateContainerService} from '../../services/radarTemplateContainer.service';
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../../model/user";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  radarTemplateContainers: RadarTemplateContainer[];
  currentContainerFilter: RadarTemplateContainerFilter = new RadarTemplateContainerFilter();
  user: User;

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private radarTemplateContainerFilterService: RadarTemplateContainerFilterService) {
    this.radarTemplateContainers = [];
  }

  ngOnInit() {
    this.user = this.route.snapshot.data.user; // fetched by current user resolver;
    console.log(this.user);
    this.spinner.show();
    this.radarTemplateContainerService.getAll().subscribe(radarTemplateContainers => {
      radarTemplateContainers.forEach( radarTemplateContainer => {
        this.radarTemplateContainers.push(new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
          radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
          radarTemplateContainer.active_voting_code, radarTemplateContainer.pinned, radarTemplateContainer.max_points));
      });
      this.spinner.hide();
    });
    this.radarTemplateContainerFilterService.filterChange$.subscribe((filter: RadarTemplateContainerFilter) => {
      this.currentContainerFilter = filter;
    });
  }

  filteredRadarTemplateContainers() {
    return this.currentContainerFilter.filterContainers(this.radarTemplateContainers);
  }

  radarTemplateContainerPinToggle(container: RadarTemplateContainer) {
    container.isPinned() ? this.unpinContainer(container) : this.pinContainer(container);
  }

  pinContainer(container: RadarTemplateContainer) {
    this.radarTemplateContainerService.pin(container.id).subscribe(() => {
      container.pin();
    });
  }

  unpinContainer(container: RadarTemplateContainer) {
    this.radarTemplateContainerService.unpin(container.id).subscribe(() => {
      container.pinned = false;
    });
  }


  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }

  //TODO: Check this function. I think it's not being used anywhere
  onCreate = (name: string, description: string, max_points: number) => {
    this.radarTemplateContainerService
      .create(name, description, max_points)
      .subscribe( radarTemplateContainer => {
        this.radarTemplateContainers.push(new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
          radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
          radarTemplateContainer.active_voting_code, radarTemplateContainer.pinned, radarTemplateContainer.max_points));
      });
  }

  deleteContainer($id) {
    this.radarTemplateContainers = this.radarTemplateContainers.filter(container => container.id !== $id);
    this.user.remaining_containers = this.user.remaining_containers + 1;
  }
}
