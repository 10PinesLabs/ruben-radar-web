import {Component, Inject, OnInit} from '@angular/core';
import {Radar} from '../../model/radar';
import {ActivatedRoute} from '@angular/router';
import {Axis} from '../../model/axis';
import { RadarTemplateService } from 'src/services/radarTemplate.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss']
})
export class RadarVoteComponent implements OnInit {
  radar: Radar;
  axes: Axis[];
  voted: boolean;

  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService, private route: ActivatedRoute) {
    this.voted = false;
  }

  ngOnInit() {
    let radarTemplates = history.state.data;
    if(!radarTemplates){
      const code:string = this.route.snapshot.paramMap.get('code');
      this.radarTemplateService.getAllByAccessCode(code).subscribe( 
        templates => console.log(templates),
        error => console.log("error"))
        return;
    }

    // this.radarService.radar(id).subscribe(radarResult => {
    //   const radar = radarResult.radar;
    //   this.axes = this.parseAxes(radarResult.axes_results);
    //   this.radar = new Radar(radar.id, radar.name, radar.description, this.axes, radar.active);
    // });
  }

  parseAxes(axes_results): any {
    return axes_results.map(e => new Axis(e.axis.id, e.axis.name, e.axis.description, null));
  }

  isVoted() {
    return this.voted;
  }

  title() {
    return this.radar.name;
  }

  radarIsUndefined() {
    return this.radar === undefined;
  }
}
