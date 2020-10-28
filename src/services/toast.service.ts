import {Injectable, TemplateRef} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[];
  constructor() {
    this.toasts = [];
  }

  showSuccess(textOrTpl: string) {
    this.show(textOrTpl, {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
  }

  showError(textOrTpl: string) {
    this.show(textOrTpl, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Hubo un error en la operación'
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
}
