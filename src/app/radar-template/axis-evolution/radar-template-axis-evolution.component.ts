import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { RadarTemplateAxisEvolutionLineChartComponent } from './charts/line-chart/radar-template-axis-evolution-line-chart.component';
import {RadarTemplateAxisEvolutionDispersionChartComponent} from "./charts/dispersion-chart/radar-template-axis-evolution-dispersion-chart.component";

@Component({
  selector: 'app-radar-template-axis-evolution',
  templateUrl: './radar-template-axis-evolution.component.html',
  styleUrls: ['./radar-template-axis-evolution.component.scss']
})
export class RadarTemplateAxisEvolutionComponent implements OnInit, OnChanges{
  @Input() radarTemplate: RadarTemplate;
  @Input() selectedAxisId: Number ;
  @ViewChild(RadarTemplateAxisEvolutionLineChartComponent) axisEvolutionLineChart : RadarTemplateAxisEvolutionLineChartComponent
  @ViewChild(RadarTemplateAxisEvolutionDispersionChartComponent) axisEvolutionDispersionChart : RadarTemplateAxisEvolutionDispersionChartComponent

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if(changes.selectedAxisId && !changes.selectedAxisId.firstChange) {
        this.axisEvolutionLineChart?.updateChart(this.selectedAxisId)
        this.axisEvolutionDispersionChart?.updateChart(this.selectedAxisId)
      }
    })
  }

  axisName() {
    if(this.selectedAxisId && this.radarTemplate.radars.length > 0) {
      return this.radarTemplate.radars[0].axes.filter(axis => axis.id === this.selectedAxisId)[0].name;
    }
  }

  ngOnInit(): void {
  }

}
