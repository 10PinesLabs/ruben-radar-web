import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class ConfirmActionModalComponent {
  modalRef: BsModalRef;
  @ViewChild('modalRef') modal: TemplateRef<any>;
  @Input() modalTitle: string;
  @Input() onSubmitButtonText: string;
  @Output() submit = new EventEmitter();

  constructor(private modalService: BsModalService) {
  }

  openModal = () => {
    this.modalRef = this.modalService.show(this.modal);
    this.modalRef.setClass('modal-lg');
  }

  closeModal = () => {
    this.modalRef.hide();
  }

  onSubmitAction = () => {
    this.submit.emit();
    this.closeModal();
  }
}
