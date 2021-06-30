import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Radar} from 'src/model/radar';
import {RadarChartComponent} from '../radar-chart/radar-chart.component';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";

@Component({
  selector: 'app-template-visualizer',
  templateUrl: './template-visualizer.component.html',
  styleUrls: ['./template-visualizer.component.scss']
})
export class RadarTemplateVisualizerComponent implements OnInit, OnChanges {
  @ViewChild('radarChart') chart: RadarChartComponent;
  @Input() radars: Radar[];
  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() isPreview: Boolean = true;
  @Input() showLabels: Boolean = true;
  @Output() radarSelected = new EventEmitter<Radar>();
  @Output() axisSelected = new EventEmitter<number>();
  @Input() selectedAxisId: Number ;


  cssDefaults = {
    selectorDotSize: 1.3,
    selectorDotTop: 0,
    selectorWidth: 15,
    selectorLabelPaddingTop: 1
  };

  selectorDotSize =  this.cssDefaults.selectorDotSize;
  selectorDotTop =  this.cssDefaults.selectorDotTop;
  selectorWidth =  this.cssDefaults.selectorWidth;
  selectorLabelPaddingTop =  this.cssDefaults.selectorLabelPaddingTop;

  selectedRadarIndex = 0;
  hideSelector = false;

  constructor() {
   }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.initialize();
      if (changes.radars && changes.radars.previousValue
        && changes.radars.previousValue.length !== changes.radars.currentValue.length) {
        this.initializeSelectedRadarToLastOne(changes.radars.currentValue);
      }
    });
  }

  ngOnInit(): void {
    this.initialize();
    this.initializeSelectedRadarToLastOne();
  }

  private initialize() {
    this.hideSelector = true;
    const numberOfRadars = this.radars.length;

    if (numberOfRadars > 1) {
      this.selectorDotSize = this.cssDefaults.selectorDotSize - 0.02 * numberOfRadars;
      this.selectorDotSize = this.selectorDotSize < 0.5 ? 0.5 : this.selectorDotSize;

      this.selectorWidth = 7 * numberOfRadars;
      this.selectorWidth = this.cssDefaults.selectorWidth > 80 ? 80 : this.selectorWidth;

      this.selectorLabelPaddingTop = this.selectorDotSize + .6;
      this.selectorDotTop = -this.selectorDotSize / 2.5;
      this.hideSelector = false;
    }
  }

  private initializeSelectedRadarToLastOne(newRadars = this.radars) {
    this.selectedRadarIndex = newRadars.length - 1;
    this.selectRadar(this.selectedRadarIndex);
  }

  selectedRadar() {
    return this.radars[this.selectedRadarIndex];
  }

  selectRadar(index) {
    this.selectedRadarIndex = index;
    this.chart?.update([this.selectedRadar()], null);
    this.radarSelected.emit(this.selectedRadar());
  }

  isRadarSelected(radar) {
    return this.selectedRadarIndex < this.radars.length && radar.id === this.radars[this.selectedRadarIndex].id;
  }

  setRadarAxisIndexSelection(axisIndex) {
    this.selectedAxisId = this.selectedRadar().axes[axisIndex].id;
    this.axisSelected.emit(this.selectedRadar().axes[axisIndex].id);
  }
}
