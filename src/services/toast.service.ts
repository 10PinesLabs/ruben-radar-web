import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[];
  constructor() {
    this.toasts = [];
  }

  showSuccess(text: string) {
    this.show(text, {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
    });
  }

  showError(text: string) {
    this.show(text, {
      classname: 'bg-danger text-light',
      delay: 5000 ,
      autohide: true,
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  private show(text: string, options: any = {}) {
    this.toasts.push({ text, ...options });
  }
}
