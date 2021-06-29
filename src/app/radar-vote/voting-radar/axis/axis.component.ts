import {Component, Input, OnInit} from '@angular/core';
import {Answer} from 'src/model/answer';
import {RadarTemplateContainer} from "../../../../model/radarTemplateContainer";

@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss']
})
export class AxisComponent implements OnInit {
  @Input() radarContainer: RadarTemplateContainer;
  @Input() answer: Answer;
  @Input() lastElemtnt: boolean;
  possibleOptions: Array<number>;
  voted = false;

  constructor() {}

  ngOnInit() {
    this.possibleOptions = [...Array(this.radarContainer.max_points).keys()].map(item => item + 1);
  }

  vote(points: number): void {
    this.answer.registerPoints(points);
  }

  optionSelected(value: number) {
    this.voted = true;
    this.vote(value);
  }
}
