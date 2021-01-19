import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RadarTemplateContainer} from '../../../model/radarTemplateContainer';
import {Router} from '@angular/router';
import {RadarTemplateContainerService} from '../../../services/radarTemplateContainer.service';
import {ToastService} from '../../../services/toast.service';
import {ConfirmActionModalComponent} from "../../commons/modals/confirm-action-modal/confirm-action-modal.component";

@Component({
  selector: 'app-radar-template-container-card',
  templateUrl: './radar-template-container-card.component.html',
  styleUrls: ['./radar-template-container-card.component.scss']
})
export class RadarTemplateContainerCardComponent implements OnInit {

  @Input() radarTemplateContainer: RadarTemplateContainer;
  @Input() small = false;
  @Output() pinClick  = new EventEmitter<RadarTemplateContainer>();
  @Output() radarDeleted = new EventEmitter<string>();
  @ViewChild('deleteContainerModal') public deleteContainerModal: ConfirmActionModalComponent;


  constructor(private router: Router,
              @Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private toastService: ToastService, ) {
  }

  ngOnInit() {
  }

  openDeleteContainerModal(){
    this.deleteContainerModal.openModal();
  }

  pinClicked() {
    this.pinClick.emit(this.radarTemplateContainer);
  }

  shouldShowChartPreview() {
    return this.radarTemplateContainer.hasRadarTemplateInformation();
  }

  radarTemplatesWithInformation() {
    return this.radarTemplateContainer.votedRadarTemplates();
  }

  radarTemplatesCount() {
    return this.radarTemplateContainer.radar_templates ? this.radarTemplateContainer.radar_templates.length.toString() : null;
  }

  navigateToRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/' + this.radarTemplateContainer.id]);
  }

  deleteContainer = () => {
    return this.radarTemplateContainerService.close(this.radarTemplateContainer.id);
  }

  handleDeleteContainerError() {
    this.toastService.showError('Ocurrió un problema al intentar borrar el container');
  }

  handleDeleteContainerSuccess(container) {
    this.radarDeleted.emit(container.id);
    this.toastService.showSuccess('El container se borró con éxito');
  }
}
