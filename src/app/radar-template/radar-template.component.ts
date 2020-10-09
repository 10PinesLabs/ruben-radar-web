import {Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { FitTextDirective } from '../commons/directives/fittext.directive';
import {Router} from "@angular/router";

const nullRadar = {
  name: 'No hay radares disponibles',
  axes: [{name: 'LALALAL', answers: [{name: "LALAL"}]}]
}

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit, OnChanges {
  //@ViewChild(FitTextDirective) textFitter : FitTextDirective;
  @Input() radarTemplate: RadarTemplate;
  selectedRadar = null
  selectedAxisId : Number = null

  constructor(private router: Router) {
  }

  isThereAnyRadars() {
    return this.radarTemplate.radars.length > 0
  }

  initializeRadar() {
    this.isThereAnyRadars() ? this.setSelectedRadar(this.radarTemplate.radars[0]) : this.setSelectedRadar(nullRadar);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeRadar();
    this.setSelectedAxis(this.selectedRadar.axes[0].id);
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

  ngOnInit(): void {
    if(this.radarTemplate.radars.length > 0){
      this.setSelectedRadar(this.radarTemplate.radars[0]);
      this.setSelectedAxis(this.selectedRadar.axes[0].id);
    }
  }

}
