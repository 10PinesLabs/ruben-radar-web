import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {Axis} from 'src/model/axis';
import {Statistics} from 'src/model/statistics';
import {Radar} from '../../../model/radar';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {getTheme} from "../../theme-and-colors";

@Component({
  selector: 'app-axis-bar-chart',
  templateUrl: './axis-bar-chart.component.html',
  styleUrls: ['./axis-bar-chart.component.css']
})
export class AxisBarChartComponent implements OnChanges {

  @ViewChild('chartId') canvasRef: ElementRef;
  @Input() axis: Axis;
  @Input() radar: Radar;
  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() comparisonRadar: Radar;
  @Input() values;
  @Input() radarNames;
  chart = { destroy: () => {}, update: () => {}, clear: () => {}};

  constructor() { }

  private static barDataset(values, radarTitle, backgroundColor: String, borderColor: String, maxPoints: number) {
    const arrayValues = AxisBarChartComponent.axisValuesObjToArray(values, maxPoints);
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

  private static axisValuesObjToArray(values, maxPoints) {
    const statistics = new Statistics(values, maxPoints);
    return statistics.axisValuesObjToArray();
  }

  initialize() {
    this.values = [this.radar.axisPointsFor(this.axis)];
    this.radarNames = [this.radar.name];
    if(this.comparisonRadar){
      this.values.push(this.comparisonRadar.axisPointsFor(this.axis));
      this.radarNames.push(this.comparisonRadar.name);
    }
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
    // this generates an array of [1, 2, .., N], where N is max_points
    const labels = Array.from({length: this.radarTemplateContainer.max_points}, (_, i) => i + 1);
    return {
      labels: labels,
      datasets: this.generateDatasets(),
    };
  }

  private generateDatasets() {
    const datasets = [];
    datasets.push(AxisBarChartComponent.barDataset(this.values[0], this.radarNames[0],
      getTheme().transparentRadarColor, getTheme().radarColor, this.radarTemplateContainer.max_points));
    if (this.isComparingRadars()) {
      datasets.push(AxisBarChartComponent.barDataset(
        this.values[1], this.radarNames[1], getTheme().secondaryTransparentRadarColor, getTheme().secondaryRadarColor,
        this.radarTemplateContainer.max_points)
      );
    }

    return datasets;
  }

  private isComparingRadars() {
    return this.values.length === 2;
  }
}
