import {Component, Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { FitTextDirective } from '../commons/directives/fittext.directive';
import {Router} from "@angular/router";

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnChanges {
  @ViewChild(FitTextDirective) textFitter : FitTextDirective;
  @Input() radarTemplate: RadarTemplate;
  selectedRadar = null
  selectedAxisId : Number = null

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.radarTemplate = changes.radarTemplate.currentValue;
    this.setSelectedRadar(this.radarTemplate.radars[0]);
  }

  radars(){
    return this.radarTemplate.radars
  }

  setSelectedRadar(radar){
    this.selectedRadar = radar
  }

  setSelectedAxis(id){
    this.selectedAxisId = id;
  }

  viewRadar(){
    const radarUrl = `radar/${this.selectedRadar.id}/results`
    this.router.navigate([radarUrl]);
  }

}
