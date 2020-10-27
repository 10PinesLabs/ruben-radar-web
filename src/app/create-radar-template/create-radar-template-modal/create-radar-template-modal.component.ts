import {Component, Inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {RadarTemplateService} from '../../../services/radarTemplate.service';
import {Axis} from '../../../model/axis';
import {RadarTemplate} from '../../../model/radarTemplate';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-radar-template-modal',
  templateUrl: './create-radar-template-modal.component.html',
  styleUrls: ['./create-radar-template-modal.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class CreateRadarTemplateModal {
  @Input() radarTemplateContainers;
  @ViewChild('createRadarModalRef') createRadarModalRef: TemplateRef<any>;
  selectedRadarTemplateContainerId = null;
  radarTemplateName = '';
  radarTemplateDescription = '';
  newAxisName = '';
  newAxisDescription = '';
  radarTemplateAxes: Axis[] = [];
  checkForErrors = false;
  modalRef: BsModalRef;

  constructor( private modalService: BsModalService, private router: Router,
               @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.createRadarModalRef);
    this.modalRef.setClass('modal-lg');
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
    this.modalRef.hide();
  }
}
