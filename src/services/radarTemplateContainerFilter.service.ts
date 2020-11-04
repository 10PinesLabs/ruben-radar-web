import { EventEmitter, Injectable, Output } from "@angular/core";
import { Filter } from "src/model/filter";

@Injectable({
  providedIn: "root",
})
export class RadarTemplateContainerFilterService {
  @Output() onFilterChange$: EventEmitter<Filter> = new EventEmitter();

  sendMessage(filter: Filter) {
    this.onFilterChange$.emit(filter);
  }
}

