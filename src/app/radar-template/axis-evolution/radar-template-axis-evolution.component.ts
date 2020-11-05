import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { RadarTemplateAxisEvolutionLineChartComponent } from './charts/line-chart/radar-template-axis-evolution-line-chart.component';
import {RadarTemplateAxisEvolutionDispersionChartComponent} from "./charts/dispersion-chart/radar-template-axis-evolution-dispersion-chart.component";
import { Radar } from 'src/model/radar';

@Component({
  selector: 'app-radar-template-axis-evolution',
  templateUrl: './radar-template-axis-evolution.component.html',
  styleUrls: ['./radar-template-axis-evolution.component.scss']
})
export class RadarTemplateAxisEvolutionComponent implements OnInit{
  @Input() radarTemplate: RadarTemplate;
  @Input() selectedAxisId: Number ;
  @Input() selectedRadar: Radar;
  @ViewChild(RadarTemplateAxisEvolutionLineChartComponent) axisEvolutionLineChart : RadarTemplateAxisEvolutionLineChartComponent
  @ViewChild(RadarTemplateAxisEvolutionDispersionChartComponent) axisEvolutionDispersionChart : RadarTemplateAxisEvolutionDispersionChartComponent

  constructor() {
  }

  axisName() {
    if(this.selectedAxisId && this.radarTemplate.radars.length > 0) {
      return this.radarTemplate.radars[0].axes.filter(axis => axis.id === this.selectedAxisId)[0].name;
    }
  }

  ngOnInit(): void {
  }

}
