import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-call-to-action-header-button',
  templateUrl: './call-to-action-header-button.html',
  styleUrls: ['./call-to-action-header-button.scss']
})
export class CallToActionHeaderButton {
  @Input() label: String;
  @Input() icon: String;
  @Input() onClick: () => {};
}
