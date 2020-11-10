import {Component, Input, EventEmitter, ViewChild, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Radar } from 'src/model/radar';
import { RadarChartComponent } from '../radar-chart/radar-chart.component';
@Component({
  selector: 'app-template-visualizer',
  templateUrl: './template-visualizer.component.html',
  styleUrls: ['./template-visualizer.component.scss']
})
export class RadarTemplateVisualizerComponent implements OnInit, OnChanges {
  @ViewChild('radarChart') chart: RadarChartComponent;
  @Input() radars: Radar[];
  @Input() isPreview: Boolean = true;
  @Input() showLabels: Boolean = true;
  @Output() onRadarSelected = new EventEmitter<Radar>();
  @Output() onAxisSelected = new EventEmitter<number>();
  @Input() selectedAxisId: Number ;
  selectedRadarIndex = 0;
  selectorDotSize = 1.3
  selectorDotTop = 0
  selectorWidth =  15
  selectorLabelPaddingTop = 1
  hideSelector=false

  constructor() {
   }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.initialize();
    })
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    const numberOfRadars = this.radars.length
    if(numberOfRadars <= 1){
      this.hideSelector = true;
    } else {
      this.hideSelector = false;
      this.selectorWidth = this.selectorWidth + numberOfRadars * 5
      this.selectorDotSize = this.selectorDotSize - 0.02 * numberOfRadars
      this.selectorWidth = this.selectorWidth>80 ? 80 : this.selectorWidth
      this.selectorDotSize = this.selectorDotSize<0.5 ? 0.5 : this.selectorDotSize
      this.selectorLabelPaddingTop = this.selectorDotSize + .6
      this.selectorDotTop = -this.selectorDotSize/2.5
    }
  }

  selectedRadar(){
    return this.radars[this.selectedRadarIndex]
  }
  selectRadar(index){
    this.selectedRadarIndex = index
    this.chart?.update([this.selectedRadar()], null);
    this.onRadarSelected.emit(this.selectedRadar())
  }

  isRadarSelected(radar){
    return this.selectedRadarIndex < this.radars.length && radar.id === this.radars[this.selectedRadarIndex].id
  }

  setRadarAxisIndexSelection(axisIndex){
    this.selectedAxisId = this.selectedRadar().axes[axisIndex].id;
    this.onAxisSelected.emit(this.selectedRadar().axes[axisIndex].id)
  }
}
