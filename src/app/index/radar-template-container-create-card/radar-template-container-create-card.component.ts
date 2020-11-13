import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { GeneralModalComponent } from 'src/app/commons/modals/general-modal/general-modal.component';
import { RadarTemplateContainer } from 'src/model/radarTemplateContainer';

@Component({
  selector: 'app-radar-template-container-create-card',
  templateUrl: './radar-template-container-create-card.component.html',
  styleUrls: ['./radar-template-container-create-card.component.scss']
})
export class RadarTemplateContainerCreateCardComponent {

  showCreateRadarTemplateContainerForm: boolean = false;
  @ViewChild('createContaienrModal') public createContainerModal : GeneralModalComponent;
  @Input() selectedRadarTemplateContainerName: string = "";
  @Input() selectedRadarTemplateContainerDescription: string = "";
  @Output() onRadarTemplateContainerCreated = new EventEmitter<RadarTemplateContainer>()
  constructor() {
  }

  onShowCreateRadarTemplateContainerModal = () => {
    this.createContainerModal.openModal()
  }

  onCreationError(error){
    console.error(error);
  }

}
