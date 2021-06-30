import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {RadarTemplate} from 'src/model/radarTemplate';
import {Chart} from 'chart.js';
import {CHART_COLORS} from '../../../../app.component';
import * as annotation from 'chartjs-plugin-annotation';
import {colors} from '../../../../../assets/theme';
import {Radar} from 'src/model/radar';
import {RadarTemplateContainer} from "../../../../../model/radarTemplateContainer";

@Component({
  selector: 'app-axis-evolution-line-chart',
  templateUrl: './radar-template-axis-evolution-line-chart.component.html',
  styleUrls: ['../radar-template-axis-chart-styles.scss', './radar-template-axis-evolution-line-chart.component.scss' ]
})
export class RadarTemplateAxisEvolutionLineChartComponent implements OnChanges, OnInit {

  @ViewChild('axisEvolutionLineChartId') lineCanvasRef: ElementRef;
  @Input() radarTemplate: RadarTemplate;
  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() selectedAxisId: Number;
  @Input() selectedRadar: Radar;
  axisEvolutionLineChart = { destroy: () => {}, update: () => {}, clear: () => {}};
  selectedRadarChartIndex = 0;

  constructor() {
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
        this.axisEvolutionLineChart.options.annotation.annotations[0].value = this.selectedRadarChartIndex;
        this.axisEvolutionLineChart.update();
      }
    });
  }

  ngOnInit() {
    Chart.pluginService.register(annotation);
  }

  updateChart(axisId) {
    this.selectedAxisId = axisId;
    this.axisEvolutionLineChart.clear();
    this.axisEvolutionLineChart.destroy();
    this.createAxisEvolutionLineChart();
  }

  private createAxisEvolutionLineChart() {
    const ctx = this.lineCanvasRef.nativeElement.getContext('2d');
    const axisEvolutionLineChartData = this.parseAxisEvolutionLineChartData();
    this.axisEvolutionLineChart = new Chart(ctx, {
      type: 'line',
      data: axisEvolutionLineChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: this.radarTemplateContainer.max_points,
              stepSize: 1,
            },
          }],
          xAxes: [{
            display: false
          }]
        },
        annotation: {
              annotations: [{
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: this.selectedRadarChartIndex,
                borderColor: colors.selected,
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


  private parseAxisEvolutionLineChartData() {
    const dataset = this.radarTemplate.radars.map( radar => {
      const radarAnswers = radar.axes.filter(axis => axis.id === this.selectedAxisId)[0].answers;
      return this.average(radarAnswers.map(answer => answer.points));
    });
    const labels = this.radarTemplate.radars.map( radar => radar.name );
    return {
      labels: labels,
      datasets: [
        {
          data: dataset,
          spanGaps: true,
          borderColor: CHART_COLORS.radarGreen,
          backgroundColor: CHART_COLORS.transparentRadarGreen,
          fill: true,
          lineTension: 0,
          pointHitRadius: 20,
        }
      ],
    };
  }

  private average = arr => arr.length === 0 ? arr.length :  arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

}
