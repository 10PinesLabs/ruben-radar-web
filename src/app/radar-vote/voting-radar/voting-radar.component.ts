import { Component, Input, Output, Inject, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Vote } from 'src/model/vote';
import { Answer } from 'src/model/answer';
import { RadarTemplate } from 'src/model/radarTemplate';
import { RadarTemplateService } from 'src/services/radarTemplate.service';


@Component({
  selector: "app-voting-radar",
  templateUrl: "./voting-radar.component.html",
  styleUrls: ["./voting-radar.component.scss"],
})
export class VotingRadarComponent implements OnChanges {
  @Input() radarTemplate: RadarTemplate;
  @Input() hasNextStep: boolean;
  @Output() voted = new EventEmitter();
  answers: Array<Answer>;
  error: boolean = false;

  constructor(
    @Inject("RadarTemplateService") private radarService: RadarTemplateService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.answers = this.radarTemplate.axes.map((axis) => new Answer(axis, 0));
  }

  cannotVote() {
    let cannotVote = false;
    this.answers.forEach((answer) => {
      if (answer.points === 0) {
        cannotVote = true;
      }
    });
    return cannotVote;
  }

  vote = () => {
    const vote = new Vote(this.answers);
    this.radarService.vote(this.radarTemplate.id, vote).subscribe(
      () => {
        this.voted.emit(true);
      },
      () => {
        this.error = true;
        this.voted.emit(true);
      }
    );
  }

  buttonLabel(){
    return this.hasNextStep ? "Siguiente" : "Finalizar"
  }
}
