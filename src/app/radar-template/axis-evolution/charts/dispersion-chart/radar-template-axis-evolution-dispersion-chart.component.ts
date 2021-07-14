import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {RadarTemplate} from 'src/model/radarTemplate';
import {Chart} from 'chart.js';
import {Radar} from 'src/model/radar';
import {RadarTemplateContainer} from "../../../../../model/radarTemplateContainer";
import {CHART_COLORS, getTheme} from "../../../../theme-and-colors";

@Component({
  selector: 'app-axis-evolution-dispersion-chart',
  templateUrl: './radar-template-axis-evolution-dispersion-chart.component.html',
  styleUrls: ['../radar-template-axis-chart-styles.scss', './radar-template-axis-evolution-dispersion-chart.component.scss']
})
export class RadarTemplateAxisEvolutionDispersionChartComponent implements OnChanges {

  @ViewChild('axisEvolutionDispersionChartId') dispersionCanvasRef: ElementRef;
  @Input() radarTemplate: RadarTemplate;
  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() selectedAxisId: Number;
  @Input() selectedRadar: Radar;
  axisEvolutionDispersionChart = {destroy: () => {}, update: () => {}, clear: () => {}};
  selectedRadarChartIndex = 0;

  constructor() {
  }

  private static mapPointToColor(point) {
    switch (point) {
      case 1: return CHART_COLORS.red;
      case 2: return CHART_COLORS.lightRed;
      case 3: return CHART_COLORS.orange;
      case 4: return CHART_COLORS.lightOrange;
      case 5: return CHART_COLORS.yellow;
      case 6: return CHART_COLORS.lightYellow;
      case 7: return CHART_COLORS.lightGreen;
      case 8: return CHART_COLORS.green;
      case 9: return CHART_COLORS.lightBlue;
      case 10: return CHART_COLORS.blue;
    }
  }

  private static mapPointToBackgroundColor(point) {
    switch (point) {
      case 1: return CHART_COLORS.transparentRed;
      case 2: return CHART_COLORS.transparentLightRed;
      case 3: return CHART_COLORS.transparentOrange;
      case 4: return CHART_COLORS.transparentLightOrange;
      case 5: return CHART_COLORS.transparentYellow;
      case 6: return CHART_COLORS.transparentLightYellow;
      case 7: return CHART_COLORS.transparentLightGreen;
      case 8: return CHART_COLORS.transparentGreen;
      case 9: return CHART_COLORS.transparentLightBlue;
      case 10: return CHART_COLORS.transparentBlue;
    }
  }

  private static generateDatasetConfigurationFor(data, point) {
    return {
      label: point.toString(),
      data: data,
      spanGaps: true,
      borderColor: RadarTemplateAxisEvolutionDispersionChartComponent.mapPointToColor(point),
      backgroundColor: RadarTemplateAxisEvolutionDispersionChartComponent.mapPointToBackgroundColor(point),
      fill: true,
      lineTension: 0,
      pointHitRadius: 20,

    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes.selectedAxisId) {
        this.updateChart(this.selectedAxisId);
      }
      if (changes.selectedRadar) {
        const labels = this.radarTemplate.radars.map( radar => radar.name );
        this.selectedRadarChartIndex = labels.indexOf(this.selectedRadar.name);
        // @ts-ignore
        this.axisEvolutionDispersionChart.options.annotation.annotations[0].value = this.selectedRadarChartIndex;
        this.axisEvolutionDispersionChart.update();
      }
    });
  }

  updateChart(axisId) {
    this.selectedAxisId = axisId;
    this.axisEvolutionDispersionChart.clear();
    this.axisEvolutionDispersionChart.destroy();
    this.createAxisEvolutionDispersionChart();
  }

  private createAxisEvolutionDispersionChart() {
    const ctx = this.dispersionCanvasRef.nativeElement.getContext('2d');
    const axisEvolutionLineChartData = this.parseAxisEvolutionDispersionChartData();
    this.axisEvolutionDispersionChart = new Chart(ctx, {
      type: 'line',
      fillOpacity: .3,
      data: axisEvolutionLineChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          align: 'middle'
        },
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
            },
          }],
          xAxes: [{
            display: false,
          }]
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: this.selectedRadarChartIndex,
            borderColor: getTheme().radarColor,
            borderWidth: 2
          }]

        },
        tooltips: {
          displayColors: true,
          titleFontSize: 18,

        }
      }
    });
  }

  private parseAxisEvolutionDispersionChartData() {
    const dataset = this.radarTemplate.radars.map( radar => {
      const radarAnswersForSelectedAxis = radar.axes.filter(axis => axis.id === this.selectedAxisId)[0].answers;
      const groupedAnswers = Array.from({length: this.radarTemplateContainer.max_points}, _ => 0);

      radarAnswersForSelectedAxis.forEach( answer => {
        groupedAnswers[answer.points - 1] = groupedAnswers[answer.points - 1] + 1;
      });
      const amountOfAnswers = radarAnswersForSelectedAxis.length;
      return groupedAnswers.map(summedAnswers => summedAnswers * 100 / amountOfAnswers);
    });

    const labels = this.radarTemplate.radars.map( radar => radar.name );
    const finalDataset = this.transposeDataset(dataset)
      .map((pointData, index) =>
        RadarTemplateAxisEvolutionDispersionChartComponent.generateDatasetConfigurationFor(pointData, index + 1));
    return {
      labels: labels,
      datasets: finalDataset,
    };
  }

  private getDatasetFor(originalDataset, datasetIdentifier) {
    return originalDataset.map(data => data[datasetIdentifier]);
  }

  private transposeDataset(dataset) {
    return dataset[0].map((x, i) => dataset.map(point => point[i]));
  }

}
