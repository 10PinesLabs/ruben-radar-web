import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { RadarTemplate } from "src/model/radarTemplate";

@Component({
  selector: "wizzard-arrows",
  templateUrl: "./wizzard-arrows.component.html",
  styleUrls: ["./wizzard-arrows.component.scss"],
})
export class WizzardArrows {

  @Input() radarTemplates : RadarTemplate[]
  @Input() currentStep : number
  constructor() {

  }

}
