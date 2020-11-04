import {Component, Input, OnInit} from '@angular/core';
import { Filter, filterType } from 'src/model/filter';
import { RadarTemplateContainerFilterService } from 'src/services/radarTemplateContainerFilter.service';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";


@Component({
  selector: 'app-header-filters',
  templateUrl: './header-filters.component.html',
  styleUrls: ['./header-filters.component.scss']
})
export class HeaderFiltersComponent implements OnInit {

  @Input() radarTemplateContainers: RadarTemplateContainer[];
  constructor(private radarTemplateContainerFilterService :  RadarTemplateContainerFilterService) {
  }
  filters = filterType

  ngOnInit() {
  }

  filterSelected(filterSelected : filterType){
    const filter = new Filter(filterSelected)
    this.radarTemplateContainerFilterService.sendMessage(filter)
  }
}
