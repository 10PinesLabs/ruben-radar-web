import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {CreateRadarTemplateForm} from '../../create-radar-template/create-radar-template-form/create-radar-template-form.component';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class GeneralModalComponent {
  @ViewChild('modalRef') elCosoQueAbreElModal: TemplateRef<any>;
  @Input() modalTitle: string;
  @Input() onSubmitButtonText: string;
  @ContentChild('contentRef') contentRef;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.elCosoQueAbreElModal);
    this.modalRef.setClass('modal-lg');
  }

  submitAction() {
    debugger
    this.contentRef.submitAction();
  }
}
