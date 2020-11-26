import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {Radar} from 'src/model/radar';
import {Statistics} from 'src/model/statistics';
import {Answer} from 'src/model/answer';


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnChanges {

  @ViewChild('radarChartId') canvasRef: ElementRef;
  @Input() radars: Radar[];
  @Input() axesNames: String[];
  @Input() isPreview: Boolean = true;
  @Input() showLabels: Boolean = true;
  @Input() widthInEm: Number;
  @Input() heightInEm: Number;
  @Input() selectedAxisId: Number;
  @Output() radarAxisSelected: EventEmitter<number> = new EventEmitter<number>();

  radarChart: Chart = {destroy: () => {}, data: () => {}, update: () => {}, clear: () => {}};
  selectedAxisIndex: Number = null;

  greenBorderColor = 'rgba(25, 179, 112, 1)';
  greenBackgroundColor = 'rgba(157, 217, 191, 0.6)';
  violetBorderColor = 'rgba(35, 25, 179, 1)';
  violetBackgroundColor = 'rgba(159, 155, 217, 0.6)';
  selectedAxisBorderColor = '#1C7CD5';
  selectedAxisBackgroundColor = '#DCEDF6';
  maxLabelLineLength = 25;

  constructor() { }

  private static parseAxisPoints(answers: Array<Answer>) {
    return answers.map(answer => answer.points);
  }

  private static meanFor(axisValues) {
    const statistics = new Statistics(axisValues);
    return statistics.mean();
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.update(this.radars,  changes);
    });
  }

  update(radars, changes) {
    this.radars = radars;
    this.destroyChart();
    this.createRadarChart();
    if (changes !== null && changes.selectedAxisId) {
      this.selectAxisById(changes.selectedAxisId.currentValue);
    } else {
      this.selectAxisByIndex(0, false);
    }
  }

  private selectDefaultAxis() {
    this.selectAxisByIndex(0);
  }

  private destroyChart() {
    this.radarChart.clear();
    this.radarChart.destroy();
  }

  createRadarChart() {
    if (!this.radars[0]) { return; }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const radarData = this.parseRadarData();
    const radarOptions = this.parseRadarOptions();
     this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: radarData,
      options: radarOptions,
    });
  }

  private parseRadarData() {
    const radarDatasets = [];

    const firstRadarDataset = this.datasetFromRadar(this.radars[0], this.greenBackgroundColor, this.greenBorderColor);
    radarDatasets.push(firstRadarDataset);
    if (this.isComparingRadars()) {
      const secondRadarDataset = this.datasetFromRadar(this.radars[1], this.violetBackgroundColor, this.violetBorderColor);
      radarDatasets.push(secondRadarDataset);
    }

    return {
      labels: this.axesNames || this.radars[0].axes.map(axis => this.createLabel(axis.name, this.maxLabelLineLength)),
      datasets: radarDatasets
    };
  }

  private createLabel(text: String, thershold) {
    const words = text.split(' ');
    const label = [];
    let labelLine = '';

    words.forEach(word => {
      if (word.length + labelLine.length > thershold) {
        label.push(labelLine);
        labelLine = '';
      }
      labelLine = labelLine + word + ' ';
    });
    label.push(labelLine);
    return label;
  }

  private isComparingRadars() {
    return this.radars.length === 2;
  }

  private datasetFromRadar(radar: Radar, backgroundColor: String, borderColor: String) {
    const radarLabel = radar.name + ' (Media)';
    const radarBackgroundColor = backgroundColor;
    const radarBorderColor = borderColor;
    const axisValues = radar.axes.map(axis => {
      if (!this.axesNames || this.axesNames.includes(axis.name)) {
        return {
          name: axis.name,
          points: RadarChartComponent.parseAxisPoints(axis.answers),
        };
      }
    });

    const axisLabels = [];
    const axisMean = [];
    axisValues.forEach(axisValue => {
      const axisName = axisValue.name;
      const mean = RadarChartComponent.meanFor(axisValue.points);
       axisLabels.push(axisName);
      axisMean.push(mean);
    });

    return {
      label: radarLabel,
      backgroundColor: radarBackgroundColor,
      borderColor: radarBorderColor,
      fill: true,
      radius: 7,
      pointHitRadius: 25,
      borderWidth: 2.5,
      pointBorderWidth: 2.5,
      pointHoverBorderWidth: 2.5,
      pointHoverRadius: 9.3,
      pointBackgroundColor: [],
      pointBorderColor: [],
      pointRadius: [],
      data: axisMean,
    };
  }

  private onAxisSelected = (event, chartElements) => {
    const axis = chartElements[0];
    if (axis) {
      const axisIndex = axis._index;
      this.selectAxisByIndex(axisIndex);
    }
  }

  canvasStyle() {
    return this.widthInEm || this.heightInEm ? {'width': `${this.widthInEm}em`, 'height': `${this.heightInEm}em`} : '';
  }

  private selectAxisById(axisId) {
    if (this.radars && this.radars.length > 0) {
      this.selectAxisByIndex(this.radars[0].axes.findIndex(axis => axis.id === axisId), false);
    }
  }

  private selectAxisByIndex(axisIndex, shouldEmit = true) {
    this.selectedAxisIndex = axisIndex;
    this.radarAxisSelected.emit(axisIndex);
    this.radarChart.data.datasets[0].pointBorderColor = [];
    this.radarChart.data.datasets[0].pointBackgroundColor = [];
    this.radarChart.data.datasets[0].pointRadius = [];
    this.radarChart.data.datasets[0].pointBorderWidth = [];

    this.radarChart.data.datasets[0].pointBorderColor[axisIndex] = this.selectedAxisBorderColor;
    this.radarChart.data.datasets[0].pointBackgroundColor[axisIndex] = this.selectedAxisBackgroundColor;

    this.radarChart.data.datasets[0].pointRadius[axisIndex] = this.radarChart.data.datasets[0].radius * 1.2;

    this.radarChart.options.scale.pointLabels.fontColor = [];
    this.radarChart.options.scale.pointLabels.fontColor[axisIndex] = this.selectedAxisBorderColor;
    this.radarChart.update();
  }

  private parseRadarOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      onClick: this.onAxisSelected,
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 5,
          stepSize: 1,
        },
        pointLabels: {
          fontSize: 10,
          display: this.showLabels,

        }
      },
      legend: {
        display: false,
      },
      animation: {
        duration: 500,
      },
      tooltips: {
        enabled : false
      },
      events: !this.isPreview ? ['click', 'mousemove', 'mouseout', ] : []
    };
  }
}
