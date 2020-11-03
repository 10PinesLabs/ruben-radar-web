import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CurrentPageService {
  @Output() onPage$: EventEmitter<pages> = new EventEmitter();

  sendMessage(page: pages) {
    this.onPage$.emit(page);
  }
}

export enum pages{
  'INDEX',
  'OTHER'
}