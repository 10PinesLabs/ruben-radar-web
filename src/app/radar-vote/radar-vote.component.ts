import {Component, Inject, OnInit} from '@angular/core';
import {Radar} from '../../model/radar';
import {ActivatedRoute} from '@angular/router';
import {Axis} from '../../model/axis';
import { RadarTemplateContainerService } from 'src/services/radarTemplateContainer.service';

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss']
})
export class RadarVoteComponent implements OnInit {
  radar: Radar;
  axes: Axis[];
  voted: boolean;

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService, private route: ActivatedRoute) {
    this.voted = false;
  }

  ngOnInit() {
    let container = history.state.data;
    if(!container){
      const code:string = this.route.snapshot.paramMap.get('code');
      this.radarTemplateContainerService.getByAccessCode(code).subscribe( 
        container => this.parseContainer(container),
        error => console.log("Ocurrio un error"))
        return;
    }
    this.parseContainer(container)
  }

  parseContainer(container){
    console.log(container);
    const template_result = container.radar_templates[0];
    console.log(template_result.axes)

    this.axes = this.parseAxes(template_result.axes)
    this.radar = new Radar(template_result.id, template_result.name, template_result.description, this.axes, template_result.active);
    
  }

  parseAxes(axes_results): any {
    return axes_results.map(axis => new Axis(axis.id, axis.name, axis.description, null));
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
