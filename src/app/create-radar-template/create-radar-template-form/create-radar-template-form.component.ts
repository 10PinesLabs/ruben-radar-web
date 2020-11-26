import {Component, Inject, Input} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {RadarTemplateService} from '../../../services/radarTemplate.service';
import {Axis} from '../../../model/axis';
import {RadarTemplate} from '../../../model/radarTemplate';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-radar-template-form',
  templateUrl: './create-radar-template-form.component.html',
  styleUrls: ['./create-radar-template-form.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class CreateRadarTemplateFormComponent {
  @Input() radarTemplateContainer;
  selectedRadarTemplateContainerId = null;
  radarTemplateName = '';
  radarTemplateDescription = '';
  newAxisName = '';
  newAxisDescription = '';
  radarTemplateAxes: Axis[] = [];
  checkForErrors = false;
  nameHasError = false;
  descriptionHasError = false;
  blankAxisNameError = false;
  repeatedAxisNameError = false;
  notEnoughAxesError = false;
  readyToCloseModal = true;

  constructor(private router: Router,
               @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {
  }

  addAxisToRadarTemplate = () => {
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
    this.repeatedAxisNameError = this.radarTemplateAxes.some(axis => axis.name === this.newAxisName);
    this.blankAxisNameError = !this.newAxisName;
    return !this.blankAxisNameError && !this.repeatedAxisNameError;
  }

  onChange(value) {
    this.selectedRadarTemplateContainerId = value;
  }

  isValidRadar() {
    this.nameHasError = !this.radarNameIsValid();
    this.descriptionHasError = !this.radarDescriptionIsValid();
    this.notEnoughAxesError = !this.axesAreValid();
    return !this.nameHasError && !this.descriptionHasError && !this.notEnoughAxesError;
  }

  submitAction() {
    if (this.isValidRadar()) {
      const newRadarTemplate = new RadarTemplate(null, this.radarTemplateContainer.id, this.radarTemplateName, this.radarTemplateDescription, this.radarTemplateAxes, null, []);
      return this.radarTemplateService.create(newRadarTemplate);
    } else {
      return new Observable((observer) => observer.complete());
    }
  }

  closeModal() {
    this.selectedRadarTemplateContainerId = null;
    this.radarTemplateName = '';
    this.radarTemplateDescription = '';
    this.newAxisName = '';
    this.newAxisDescription = '';
    this.radarTemplateAxes = [];
    this.checkForErrors = false;
    this.nameHasError = false;
    this.descriptionHasError = false;
    this. blankAxisNameError = false;
    this.repeatedAxisNameError = false;
    this.notEnoughAxesError = false;
    this.readyToCloseModal = true;
  }

   radarNameIsValid() {
    this.nameHasError = this.radarTemplateName === '';
    return !this.nameHasError;
  }

   radarDescriptionIsValid() {
    this.descriptionHasError = this.radarTemplateDescription === '';
    return !this.descriptionHasError;
  }

  private axesAreValid() {
    return this.radarTemplateAxes.length > 2;
  }
}
