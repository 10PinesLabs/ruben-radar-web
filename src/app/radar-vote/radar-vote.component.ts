import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Axis} from '../../model/axis';
import {RadarTemplate} from 'src/model/radarTemplate';
import {RadarTemplateContainer} from 'src/model/radarTemplateContainer';
import {Voting} from 'src/model/voting';
import {DOCUMENT} from '@angular/common';
import {ToastService} from '../../services/toast.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-radar-vote',
  templateUrl: './radar-vote.component.html',
  styleUrls: ['./radar-vote.component.scss'],
})
export class RadarVoteComponent implements OnInit {
  radarContainer: RadarTemplateContainer = null;
  voting: Voting = null;
  currentStep = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private tokenService: TokenService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.route.data.subscribe( (data: Data) => {
      this.voting = data['voting'];
      if (this.voting) {
        this.radarContainer = data.voting.radar_template_container;
      } else {
        this.toastService.showError('La votacion ha finalizado');
        this.router.navigate([this.tokenService.isLoggedIn() ? '/radarTemplates' : `/`]);
      }
    });
  }

  canContainerBeVoted(container: RadarTemplateContainer): boolean {
    return this.votableRadarTemplates(container)?.length > 0;
  }

  parseAxes(axes_results): any {
    return axes_results.map(
      (axis) => new Axis(axis.id, axis.name, axis.description, null)
    );
  }

  currentStepRadarTemplate(): any {
    return this.votableRadarTemplates(this.radarContainer)[this.currentStep];
  }

  isContainerClosed(): boolean {
    return false;
  }

  hasNextStep(): boolean {
    return this.votableRadarTemplates(this.radarContainer)
      .slice(this.currentStep + 1)
      .some((radar: RadarTemplate) => radar.active);
  }

  hasVotationEnded(): boolean {
    return this.votableRadarTemplates(this.radarContainer).length === this.currentStep;
  }

  title() {
    return this.radarContainer.name;
  }

  templateVoted() {
    this.currentStep++;
    this.document.getElementsByClassName('view-scrollable-container')[0].scrollTop = 0;
  }

  votableRadarTemplates(container: RadarTemplateContainer) {
    return container?.radar_templates.filter(
      (radarTemplate: RadarTemplate) => radarTemplate.active
    );
  }
}
