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
  @ViewChild('modalRef') modal: TemplateRef<any>;
  @Input() modalTitle: string;
  @Input() onSubmitButtonText: string;
  @ContentChild('contentRef') contentRef;
  modalRef: BsModalRef;
  @Output() onAfterSubmit = new EventEmitter();
  @Output() onAfterSubmitError = new EventEmitter();
  opened : boolean = false;

  constructor(private modalService: BsModalService) {
  }

  openModal = () => {
    this.opened = true;
    this.modalRef = this.modalService.show(this.modal);
    this.modalRef.setClass('modal-lg');
  }

  closeModal = () => {
    this.opened = false;
    this.contentRef.closeModal();
    this.modalRef.hide();
  }

  submitAction = () => {
    this.contentRef.submitAction().subscribe(
      (response) => {
      this.onAfterSubmit.emit(response);
      this.closeModal();
    },
      (error) => {
        this.onAfterSubmitError.emit(error)
      });
  }
}
