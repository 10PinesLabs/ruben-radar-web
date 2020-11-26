import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Axis} from 'src/model/axis';
import {Statistics} from 'src/model/statistics';
import {Radar} from '../../../model/radar';

@Component({
  selector: 'app-axis-table-values',
  templateUrl: './axis-table-values.component.html',
  styleUrls: ['./axis-table-values.component.scss']
})
export class AxisTableValuesComponent implements OnInit, OnChanges {

  @Input() axis: Axis;
  @Input() radar: Radar;
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
    if (this.isComparingRadars()) {
      this.getValueStatistics(this.values[1], this.radarNames[1]);
    }
  }

  ngOnInit() {
    this.initialize();
  }

  getValueStatistics(values, radarName) {
    const statistics = new Statistics(values);
    this.axesStatistics.push({
      name: radarName,
      mean: statistics.mean(),
    });
  }

  private isComparingRadars() {
    return this.values.length === 2;
  }
}
