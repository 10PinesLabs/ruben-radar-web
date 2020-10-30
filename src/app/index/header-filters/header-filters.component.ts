import {Component, Input, OnInit} from '@angular/core';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";

@Component({
  selector: 'app-header-filters',
  templateUrl: './header-filters.component.html',
  styleUrls: ['./header-filters.component.scss']
})
export class HeaderFiltersComponent implements OnInit {

  @Input() radarTemplateContainers: RadarTemplateContainer[];

  constructor() {
  }

  ngOnInit() {
  }
}
