import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { BsModalService, } from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {RadarTemplateService} from '../../../services/radarTemplate.service';
import {CreateRadarTemplateModal} from '../../create-radar-template/create-radar-template-modal/create-radar-template-modal.component';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers;
  @ViewChild(CreateRadarTemplateModal) public lgModal: CreateRadarTemplateModal;

  constructor(private router: Router,
              @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {}

  openModal() {
    this.lgModal.openModal();
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }


}
