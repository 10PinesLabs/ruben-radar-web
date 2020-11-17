import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.scss']
})
export class ButtonWithIconComponent {

  @Input() label: String;
  @Input() onClick: () => {};
  @Input() iconClass: String;
  @Input() iconImgSrc: String;
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'light' | 'dark';
  @Input() disabled: boolean;
  @Input() disabledTooltipText?: string;
  @Input() height : number
  @Input() width : number
  
  constructor() {
  }

  mapTypeToClass() {
    return 'btn-' + this.type;
  }

  title() {
    return this.disabled ? this.disabledTooltipText : "";
  }

}
