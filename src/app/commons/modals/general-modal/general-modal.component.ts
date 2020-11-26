import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class GeneralModalComponent {
  @ViewChild('modalRef') modal: TemplateRef<any>;
  @Input() modalTitle: string;
  @Input() displayContent = true;
  @Input() onSubmitButtonText: string;
  @ContentChild('contentRef') contentRef;
  modalRef: BsModalRef;
  @Output() afterSubmit = new EventEmitter();
  @Output() afterSubmitError = new EventEmitter();
  @Output() submit = new EventEmitter();
  @Input() closeOnSubmit = true;

  constructor(private modalService: BsModalService) {
  }

  openModal = () => {
    this.modalRef = this.modalService.show(this.modal);
    this.modalRef.setClass('modal-lg');
  }

  closeModal = () => {
    if (this.contentRef) {
      this.contentRef.closeModal();
    }
    this.modalRef.hide();
  }

  submitAction = () => {
    !this.displayContent ? this.submit.emit() : this.contentRef.submitAction().subscribe(
      (response) => {
      this.afterSubmit.emit(response);
      if (this.closeOnSubmit && this.displayContent) {
      this.closeModal();
      }
    },
      (error) => {
        this.afterSubmitError.emit(error);
        if (this.contentRef.submitError) {
          this.contentRef.submitError(error);
        }
      });


  }
}
