import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Axis} from 'src/model/axis';
import {Statistics} from 'src/model/statistics';
import {Radar} from '../../../model/radar';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";

@Component({
  selector: 'app-axis-table-values',
  templateUrl: './axis-table-values.component.html',
  styleUrls: ['./axis-table-values.component.scss']
})
export class AxisTableValuesComponent implements OnChanges {

  @Input() axis: Axis;
  @Input() radar: Radar;
  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() comparisonRadar: Radar;
  @Input() values;
  @Input() radarNames;
  axesStatistics = [];
  mean: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.initialize();
    });
  }

  initialize() {
    this.axesStatistics = [];
    this.values = [this.radar.axisPointsFor(this.axis)];
    this.radarNames = [this.radar.name];
    this.getValueStatistics(this.values[0], this.radarNames[0]);
    if (this.comparisonRadar) {
      this.values.push(this.comparisonRadar.axisPointsFor(this.axis));
      this.radarNames.push(this.comparisonRadar.name);
      this.getValueStatistics(this.values[1], this.radarNames[1]);
    }
  }

  getValueStatistics(values, radarName) {
    const statistics = new Statistics(values, this.radarTemplateContainer.max_points);
    this.axesStatistics.push({
      name: radarName,
      mean: statistics.mean(),
    });
  }

  private isComparingRadars() {
    return this.values.length === 2;
  }
}
