import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {GeneralModalComponent} from '../general-modal/general-modal.component';
import {Observable} from 'rxjs';
import {Voting} from '../../../../model/voting';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class ConfirmActionModalComponent {
  @ViewChild('confirmationModal') public actionModal: GeneralModalComponent;
  @Input() modalTitle: string;
  @Input() submitAction: () => Observable<Voting>;
  @Input() onSubmitButtonText: string;
  @Input() displayContent = false;
  @Output() onAfterSubmit = new EventEmitter();
  @Output() onAfterSubmitError = new EventEmitter();


  openModal() {
    this.actionModal.openModal();
  }

  onAfterSubmitAction(result) {
    this.onAfterSubmit.emit(result);
  }

  onAfterSubmitActionError(error) {
    this.onAfterSubmitError.emit(error);
  }

  onSubmit() {
    this.submitAction().subscribe(
      result => {
      this.onAfterSubmitAction(result);
      this.actionModal.closeModal()
    },
      error => {
        this.onAfterSubmitActionError(error);
      });
  }
}
