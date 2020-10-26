import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {Axis} from '../../../model/axis';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers;
  selectedRadarTemplateContainer = null;
  radarTemplateName = '';
  radarTemplateDescription = '';
  newAxisName = '';
  newAxisDescription = '';
  radarTemplateAxes: Axis[];
  modalRef: BsModalRef;
  constructor(private router: Router, private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
    this.radarTemplateAxes = [];
  }

  addAxisToRadarTemplate() {
    if (this.validNewAxis()) {
      const newAxis = new Axis(null, this.newAxisName, this.newAxisDescription, null);
      this.radarTemplateAxes.push(newAxis);
      console.log(this.radarTemplateAxes);
      this.newAxisName = '';
      this.newAxisDescription = '';
    }
  }

  removeAxisFromNewRadarTemplate(axis: Axis) {
    this.radarTemplateAxes = this.radarTemplateAxes.filter(a => a.name !== axis.name);
  }

  validNewAxis() {
    return !!this.newAxisName;
  }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }
}
