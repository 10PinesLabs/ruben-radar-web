import {Component} from '@angular/core';
import {ToastService} from 'src/services/toast.service';


@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: {'[class.ngb-toasts]': 'true'},
})

export class ToastComponent {
  constructor(public toastService: ToastService) {}

  onCloseClick(toast) {
    this.toastService.remove(toast);
  }
}
