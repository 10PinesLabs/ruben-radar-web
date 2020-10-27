import {Component, Inject, Input, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {Axis} from '../../../model/axis';
import {RadarTemplate} from '../../../model/radarTemplate';
import {RadarTemplateService} from '../../../services/radarTemplate.service';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers;
  selectedRadarTemplateContainerId = null;
  radarTemplateName = '';
  radarTemplateDescription = '';
  newAxisName = '';
  newAxisDescription = '';
  radarTemplateAxes: Axis[];
  modalRef: BsModalRef;
  constructor(private router: Router, private modalService: BsModalService,
              @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService,) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
    this.radarTemplateAxes = [];
  }

  addAxisToRadarTemplate() {
    if (this.validNewAxis()) {
      const newAxis = new Axis(null, this.newAxisName, this.newAxisDescription, null);
      this.radarTemplateAxes.push(newAxis);
      this.newAxisName = '';
      this.newAxisDescription = '';
    }
  }

  removeAxisFromNewRadarTemplate(axis: Axis) {
    this.radarTemplateAxes = this.radarTemplateAxes.filter(a => a.name !== axis.name);
  }

  axisHasDescription(axis) {
    return !!axis.description;
  }

  validNewAxis() {
    return !!this.newAxisName;
  }

  onChange(value) {
    this.selectedRadarTemplateContainerId = value;
  }

  createRadarTemplate() {
    const newRadarTemplate = new RadarTemplate(null, this.selectedRadarTemplateContainerId, this.radarTemplateName, this.radarTemplateDescription, this.radarTemplateAxes, null, []);
    this.radarTemplateService.create(newRadarTemplate).subscribe(() => this.router.navigate(['/radarTemplates']));
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }
}
