import { Component, OnInit, Input, Output, Inject, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Vote } from 'src/model/vote';
import { Answer } from 'src/model/answer';
import { RadarTemplate } from 'src/model/radarTemplate';
import { RadarTemplateService } from 'src/services/radarTemplate.service';


@Component({
  selector: 'app-voting-radar',
  templateUrl: './voting-radar.component.html',
  styleUrls: ['./voting-radar.component.css']
})
export class VotingRadarComponent implements OnChanges {

  @Input() radarTemplate: RadarTemplate;
  @Input() isANextRadarTemplateToVote : boolean;
  @Output() voted = new EventEmitter();
  answers: Array<Answer>;

  constructor(@Inject('RadarTemplateService') private radarService: RadarTemplateService) { }

  ngOnChanges(changes: SimpleChanges){
    this.answers = this.radarTemplate.axes.map(axis => new Answer(axis, 0));
    console.log("Hay un radar mas para votar?", this.isANextRadarTemplateToVote)
  }

  cannotVote() {
    let cannotVote = false;
    this.answers.forEach(answer => {
      if (answer.points === 0) {
        cannotVote = true;
      }
    });
    return cannotVote;
  }

  vote() {
    const vote = new Vote(this.answers);
    this.radarService.vote(this.radarTemplate.id, vote).subscribe(
      () => {
      this.voted.emit(true);
    },
    ()=> console.log("Hubo un error que no permitio votar y deberia ser reflejado en el front"));
  }
}
