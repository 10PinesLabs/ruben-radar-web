import {Component, Input} from '@angular/core';
import {RadarTemplate} from 'src/model/radarTemplate';

@Component({
  selector: 'app-wizzard-arrows',
  templateUrl: './wizzard-arrows.component.html',
  styleUrls: ['./wizzard-arrows.component.scss'],
})
export class WizzardArrowsComponent {

  @Input() radarTemplates: RadarTemplate[];
  @Input() currentStep: number;
  constructor() {

  }

}
