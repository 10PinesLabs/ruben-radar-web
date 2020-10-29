import {Component, Inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {RadarTemplateService} from '../../../services/radarTemplate.service';
import {Axis} from '../../../model/axis';
import {RadarTemplate} from '../../../model/radarTemplate';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-radar-template-form',
  templateUrl: './create-radar-template-form.component.html',
  styleUrls: ['./create-radar-template-form.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class CreateRadarTemplateForm {
  @Input() radarTemplateContainer;
  selectedRadarTemplateContainerId = null;
  radarTemplateName = '';
  radarTemplateDescription = '';
  newAxisName = '';
  newAxisDescription = '';
  radarTemplateAxes: Axis[] = [];
  checkForErrors = false;
  nameHasError = false;
  blankAxisNameError = false;
  repeatedAxisNameError = false;

  constructor(private router: Router,
               @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {
  }

  addAxisToRadarTemplate() {
    if (this.validNewAxis(this.newAxisName)) {
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

  validNewAxis(name: string) {
    this.repeatedAxisNameError = this.radarTemplateAxes.some(axis => axis.name === name);
    this.blankAxisNameError = !this.newAxisName;
    return !this.blankAxisNameError && !this.repeatedAxisNameError;
  }

  onChange(value) {
    this.selectedRadarTemplateContainerId = value;
  }

  isValidRadar() {
    return this.radarNameIsValid() && this.radarDescriptionIsValid() && this.axesAreValid();
  };

  submitAction() {
    if (this.isValidRadar()) {
      const newRadarTemplate = new RadarTemplate(null, this.radarTemplateContainer.id, this.radarTemplateName, this.radarTemplateDescription, this.radarTemplateAxes, null, []);
      this.radarTemplateService.create(newRadarTemplate).subscribe(() => this.router.navigate(['/radarTemplates']));
    }
  }

  private radarNameIsValid() {
    return this.radarTemplateName !== '';
  }

  private radarDescriptionIsValid() {
    return this.radarTemplateDescription !== '';
  }

  private axesAreValid() {
    return this.radarTemplateAxes.length > 2;
  }
}
