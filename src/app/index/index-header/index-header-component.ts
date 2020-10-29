import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RadarTemplateService} from '../../../services/radarTemplate.service';
import {CreateRadarTemplateForm} from '../../create-radar-template/create-radar-template-form/create-radar-template-form.component';
import {GeneralModalComponent} from '../../commons/modals/general-modal.component';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss']
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers;
  @ViewChild(GeneralModalComponent) public createRadarTemplateModal: GeneralModalComponent;

  constructor(private router: Router,
              @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {}

  ngOnInit(): void {

    }

  openModal() {
    this.createRadarTemplateModal.openModal();
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

}
