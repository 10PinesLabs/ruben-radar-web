import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RadarTemplateService} from '../../../services/radarTemplate.service';
import {CreateRadarTemplateModal} from '../../create-radar-template/create-radar-template-modal/create-radar-template-modal.component';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss']
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers;
  @ViewChild(CreateRadarTemplateModal) public createRadarTemplateModal: CreateRadarTemplateModal;

  constructor(private router: Router,
              @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {}

  openModal() {
    this.createRadarTemplateModal.openModal();
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

}
