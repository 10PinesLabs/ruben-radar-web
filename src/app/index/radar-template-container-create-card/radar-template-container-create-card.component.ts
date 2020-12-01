import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GeneralModalComponent} from 'src/app/commons/modals/general-modal/general-modal.component';
import {ToastService} from 'src/services/toast.service';

@Component({
  selector: 'app-radar-template-container-create-card',
  templateUrl: './radar-template-container-create-card.component.html',
  styleUrls: ['./radar-template-container-create-card.component.scss']
})
export class RadarTemplateContainerCreateCardComponent {

  showCreateRadarTemplateContainerForm = false;
  @ViewChild('createContaienrModal') public createContainerModal: GeneralModalComponent;
  @Input() selectedRadarTemplateContainerName = '';
  @Input() selectedRadarTemplateContainerDescription = '';
  constructor(private toastService: ToastService,
              private router: Router) {
  }

  onShowCreateRadarTemplateContainerModal = () => {
    this.createContainerModal.openModal();
  }

  onCreationError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.toastService.showError(error.error);
      this.createContainerModal.closeModal();
      return;
    }
    this.toastService.showError('No pudo completarse la creación del container');
  }

  onRadarTemplateContainerCreated(container) {
    this.createContainerModal.closeModal();
    this.router.navigate([`radarTemplateContainer/${container.id}`]);
  }

}
