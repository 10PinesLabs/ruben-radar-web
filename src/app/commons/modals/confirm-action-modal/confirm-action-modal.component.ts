import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {GeneralModalComponent} from '../general-modal/general-modal.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class ConfirmActionModalComponent {
  @ViewChild('actionModal') public actionModal: GeneralModalComponent;
  @Input() modalTitle: string;
  @Input() submitAction: () => Observable<any>;
  @Input() onSubmitButtonText: string;
  @Output() onAfterSubmit = new EventEmitter();
  @Output() onAfterSubmitError = new EventEmitter();


  openModal() {
    this.actionModal.openModal();
  }

  onAfterSubmitAction() {
    this.onAfterSubmit.emit();
  }

  onAfterSubmitActionError() {
    this.onAfterSubmitError.emit();
  }

  onSubmit() {
    this.submitAction().subscribe(
      result => {
      this.onAfterSubmitAction();
    },
      error => {
        this.onAfterSubmitActionError();
      });
  }
}
