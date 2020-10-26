import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})
export class IndexHeaderComponent implements OnInit{
  @Input() radarTemplateContainers;
  selectedRadarTemplateContainer = null;
  radarTemplateName = '';
  radarTemplateDescription = '';
  modalRef: BsModalRef;
  constructor(private router: Router, private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }
}
