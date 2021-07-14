import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {RadarTemplate} from 'src/model/radarTemplate';
import {RadarTemplateAxisEvolutionLineChartComponent} from './charts/line-chart/radar-template-axis-evolution-line-chart.component';
import {RadarTemplateAxisEvolutionDispersionChartComponent} from './charts/dispersion-chart/radar-template-axis-evolution-dispersion-chart.component';
import {Radar} from 'src/model/radar';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {getTheme} from "../../theme-and-colors";

@Component({
  selector: 'app-radar-template-axis-evolution',
  templateUrl: './radar-template-axis-evolution.component.html',
  styleUrls: ['./radar-template-axis-evolution.component.scss']
})
export class RadarTemplateAxisEvolutionComponent implements OnInit, OnChanges {
  @Input() radarTemplate: RadarTemplate;
  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() selectedAxisId: Number ;
  @Input() selectedRadar: Radar;
  @Output() selectedAxisIdChange: EventEmitter<Number> = new EventEmitter<Number>();
  selectedComparisonStatus: Boolean = false;
  selectedAxis;
  selectedComparisonRadar: Radar;

  chartsToggle: any = {
    onColor: 'success',
    offColor: 'secondary',
    onText: 'Radar Presente',
    offText: 'Históricos',
    disabled: false,
    size: '',
    value: true,
  };

  @ViewChild(RadarTemplateAxisEvolutionLineChartComponent) axisEvolutionLineChart: RadarTemplateAxisEvolutionLineChartComponent;
  @ViewChild(RadarTemplateAxisEvolutionDispersionChartComponent) axisEvolutionDispersionChart
    : RadarTemplateAxisEvolutionDispersionChartComponent;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if(changes.radarTemplate){
        this.selectedComparisonRadar = null;
        this.selectedComparisonStatus = false;
      }
      this.updateSelectedAxis();
      this.disabledToggleIfNeeded();
    });
  }

  getIconColor() {
    return getTheme().radarColor;
  }

  onComparisonContainerClick(){
    this.selectedComparisonStatus = !this.selectedComparisonStatus;
    this.onSelectedComparisonChange();
  }

  axisName() {
    if (this.selectedAxisId && this.radarTemplate.radars.length > 0) {
      return this.radarTemplate.radars[0].axes.filter(axis => axis.id === this.selectedAxisId)[0].name;
    }
  }

  private disabledToggleIfNeeded() {
    if (this.radarTemplate.radars.length <= 1) {
      this.chartsToggle.disabled = true;
      this.chartsToggle.value = true;
    } else {
      this.chartsToggle.disabled = false;
    }
  }

  selectRadarForComparisonClick(radar: Radar) {
    this.selectedComparisonRadar = radar;
    this.selectedComparisonStatus = true;
  }

  onSelectedComparisonChange(){
    if(!this.selectedComparisonStatus){
      this.selectedComparisonRadar = null;
    }
  }

  ngOnInit(): void {
    this.selectedComparisonRadar = null;
    this.updateSelectedAxis();
    this.disabledToggleIfNeeded();
  }

  onPreviousAxis(): void {
    if (!this.isFirstAxis()) {
      this.selectedAxisId = this.selectedRadar.axes[this.getSelectedAxisIndex() - 1].id;
      this.selectedAxisIdChange.emit(this.selectedAxisId);
      this.updateSelectedAxis();
    }
  }

  onNextAxis(): void {
    if (!this.isLastAxis()) {
      this.selectedAxisId = this.selectedRadar.axes[this.getSelectedAxisIndex() + 1].id;
      this.selectedAxisIdChange.emit(this.selectedAxisId);
      this.updateSelectedAxis();
    }
  }

  updateSelectedAxis() {
    this.selectedAxis = this.selectedRadar.axes.find(axis => axis.id === this.selectedAxisId);
  }

  isFirstAxis(): boolean {
    return this.getSelectedAxisIndex() === 0;
  }

  isLastAxis(): boolean {
    return this.getSelectedAxisIndex() === this.selectedRadar.axes.length - 1;
  }

  getSelectedAxisIndex(): number {
    return this.selectedRadar.axes.findIndex((axis) => axis.id === this.selectedAxisId);
  }

}
