import {Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import {Router} from "@angular/router";

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit, OnChanges {
  @Input() radarTemplate: RadarTemplate;
  selectedRadar = null;
  selectedAxisId: Number = null;

  constructor(private router: Router) {
  }

  templateHasAnyRadars() {
    return this.radarTemplate && this.radarTemplate.radars.length > 0;
  }

  setSelectedRadarFromRadarTemplate(){
    this.setSelectedRadar(this.templateHasAnyRadars() ? this.radarTemplate.radars[0] : null);
  }

  setSelectedAxisFromSelectedRadar() {
    this.setSelectedAxis((this.selectedRadar && this.selectedRadar.axes) ? this.selectedRadar.axes[0].id : null);
  }

  onRadarAxisChange(selectedAxisId) {
    this.selectedAxisId = selectedAxisId;
  }

  initialize() {
    this.setSelectedRadarFromRadarTemplate();
    this.setSelectedAxisFromSelectedRadar();
  }

  shouldDisplayTemplateRadars() {
    return this.templateHasAnyRadars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initialize();
  }

  radars() {
    return this.radarTemplate.radars;
  }

  setSelectedRadar(radar) {
    this.selectedRadar = radar;
    this.selectedAxisId = radar.axes[0].id;
  }

  setSelectedAxis(id) {
    this.selectedAxisId = id;
  }

  viewRadar = () => {
    const radarUrl = `radar/${this.selectedRadar.id}/results`;
    this.router.navigate([radarUrl]);
  }

  ngOnInit(): void {
    this.initialize();
  }

}
