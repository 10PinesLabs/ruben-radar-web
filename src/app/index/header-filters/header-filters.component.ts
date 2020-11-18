import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { RadarTemplateContainerFilter, filterType } from 'src/model/radarTemplateContainerFilter';
import { RadarTemplateContainerFilterService } from 'src/services/radarTemplateContainerFilter.service';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";


@Component({
  selector: 'app-header-filters',
  templateUrl: './header-filters.component.html',
  styleUrls: ['./header-filters.component.scss']
})
export class HeaderFiltersComponent {

  @Input() radarTemplateContainers: RadarTemplateContainer[];
  constructor(private radarTemplateContainerFilterService :  RadarTemplateContainerFilterService) {
  }
  filters = filterType
  searchText : string
  filter : filterType



  filterSelected(filterSelected : filterType){
    this.filter = filterSelected;
    this.updateSearch()
  }

  updateSearch(){
    const filter = new RadarTemplateContainerFilter(this.filter, this.searchText)
    this.radarTemplateContainerFilterService.sendMessage(filter)

  }
}
