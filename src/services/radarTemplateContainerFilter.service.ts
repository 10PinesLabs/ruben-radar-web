import {EventEmitter, Injectable, Output} from '@angular/core';
import {RadarTemplateContainerFilter} from 'src/model/radarTemplateContainerFilter';

@Injectable({
  providedIn: 'root',
})
export class RadarTemplateContainerFilterService {
  @Output() filterChange$: EventEmitter<RadarTemplateContainerFilter> = new EventEmitter();

  sendMessage(filter: RadarTemplateContainerFilter) {
    this.filterChange$.emit(filter);
  }
}

