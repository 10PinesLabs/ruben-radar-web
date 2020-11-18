import { EventEmitter, Injectable, Output } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from "@angular/router";
import { filter, map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CurrentPageService {

  @Output() onPage$: EventEmitter<pages> = new EventEmitter();
  currentPage : pages;

  constructor(public router: Router,  private activatedRoute: ActivatedRoute) {

    this.router.events
    .pipe(
     filter(event => event instanceof NavigationEnd),
     map(() => this.activatedRoute),
     map(route => route.firstChild),
     switchMap(route => route.data),
     map(data => data['page'])).subscribe((page : pages)=>{
       this.currentPage = page;
       this.onPage$.emit(this.currentPage)
     })
  }

  isInIndex() : boolean{
    return this.currentPage === pages.INDEX
  }

  isInLogin() : boolean {
    return this.currentPage === pages.LOGIN;
  }
}

export enum pages{
  'INDEX',
  'LOGIN',
  'OTHER'
}
