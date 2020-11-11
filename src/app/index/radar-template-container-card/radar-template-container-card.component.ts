import {Component, OnInit, Input, Inject, Output, EventEmitter} from '@angular/core';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {Router} from "@angular/router";
import {RadarTemplateContainerService} from '../../../services/radarTemplateContainer.service';
import {Radar} from '../../../model/radar';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-radar-template-container-card',
  templateUrl: './radar-template-container-card.component.html',
  styleUrls: ['./radar-template-container-card.component.scss']
})
export class RadarTemplateContainerCardComponent implements OnInit {

  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Output() onRadarDeleted = new EventEmitter<string>();

  constructor(private router: Router,
              @Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private toastService: ToastService,) {
  }

  ngOnInit() {
  }

  shouldShowChartPreview() {
    return this.radarTemplateContainer.hasRadarTemplateInformation();
  }

  radarTemplatesWithInformation() {
    return this.radarTemplateContainer.votedRadarTemplates();
  }

  radarTemplatesCount() {
    this.radarTemplateContainer.radar_templates ? this.radarTemplateContainer.radar_templates.length.toString() : null;
  }

  navigateToRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/' + this.radarTemplateContainer.id]);
  }

  deleteContainer = () => {
    this.radarTemplateContainerService.close(this.radarTemplateContainer.id).subscribe(container => {
      this.onRadarDeleted.emit(container.id);
      this.toastService.showSuccess('El container se borró con éxito');
      },
      error => {
        this.toastService.showError('Ocurrió un problema al intentar borrar el container');
      });
  }
}
