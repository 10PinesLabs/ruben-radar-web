import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
  @Output() selectedAxisIdChange: EventEmitter<Number> = new EventEmitter<Number>();

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

  onPreviousAxis(): void {
    if(!this.isFirstAxis()){
      this.selectedAxisId = this.selectedRadar.axes[this.getSelectedAxisIndex() - 1].id;
      this.selectedAxisIdChange.emit(this.selectedAxisId);
    }
  }

  onNextAxis(): void {
    if(!this.isLastAxis()){
      this.selectedAxisId = this.selectedRadar.axes[this.getSelectedAxisIndex() + 1].id;
      this.selectedAxisIdChange.emit(this.selectedAxisId);
    }
  }

  isFirstAxis(): boolean {
    return this.getSelectedAxisIndex() === 0;
  }

  isLastAxis(): boolean {
    return this.getSelectedAxisIndex() === this.selectedRadar.axes.length - 1
  }

  getSelectedAxisIndex(): number {
    return this.selectedRadar.axes.findIndex((axis) => axis.id === this.selectedAxisId);
  }

}
