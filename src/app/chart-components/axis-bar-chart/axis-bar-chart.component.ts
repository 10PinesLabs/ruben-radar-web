import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {Axis} from 'src/model/axis';
import {Statistics} from 'src/model/statistics';
import {Radar} from '../../../model/radar';

@Component({
  selector: 'app-axis-bar-chart',
  templateUrl: './axis-bar-chart.component.html',
  styleUrls: ['./axis-bar-chart.component.css']
})
export class AxisBarChartComponent implements OnChanges {

  @ViewChild('chartId') canvasRef: ElementRef;
  @Input() axis: Axis;
  @Input() radar: Radar;
  @Input() values;
  @Input() radarNames;
  chart = { destroy: () => {}, update: () => {}, clear: () => {}};
  greenBorderColor = 'rgba(25, 179, 112, 1)';
  greenBackgroundColor = 'rgba(157, 217, 191, 0.6)';
  violetBorderColor = 'rgba(35, 25, 179, 1)';
  violetBackgroundColor = 'rgba(159, 155, 217, 0.6)';

  constructor() { }

  private static barDataset(values, radarTitle, backgroundColor: String, borderColor: String) {
    const arrayValues = AxisBarChartComponent.axisValuesObjToArray(values);
    return {
      label: radarTitle,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      data: arrayValues,
    };
  }

  private static chartOptions() {
    return {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            steps: 5,
            stepValue: 1,
          }
        }]
      },
      legend: {
        display: true,
      },
    };
  }

  private static axisValuesObjToArray(values) {
    const statistics = new Statistics(values);
    return statistics.axisValuesObjToArray();
  }

  initialize() {
    this.values = [this.radar.axisPointsFor(this.axis)];
    this.radarNames = [this.radar.name];
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.initialize();
      this.chart.clear();
      this.chart.destroy();
      this.createChart();
    });
  }

  createChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const chartDatasets = this.chartDatasets();
    const chartOptions = AxisBarChartComponent.chartOptions();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: chartDatasets,
      options: chartOptions,
    });
  }

  private chartDatasets() {
    return {
      labels: [1, 2, 3, 4, 5],
      datasets: this.generateDatasets(),
    };
  }

  private generateDatasets() {
    const datasets = [];
    datasets.push(AxisBarChartComponent.barDataset(this.values[0], this.radarNames[0], this.greenBackgroundColor, this.greenBorderColor));
    if (this.isComparingRadars()) {
      datasets.push(AxisBarChartComponent.barDataset(
        this.values[1], this.radarNames[1], this.violetBackgroundColor, this.violetBorderColor));
    }

    return datasets;
  }

  private isComparingRadars() {
    return this.values.length === 2;
  }
}
