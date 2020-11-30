import {Component, Inject, Input} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {Router} from '@angular/router';
import {RadarTemplateContainerService} from '../../services/radarTemplateContainer.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-clone-radar-template-container-form',
  templateUrl: './clone-radar-template-container-form.component.html',
  styleUrls: ['./clone-radar-template-container-form.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class CloneRadarTemplateContainerFormComponent {
  @Input() radarTemplateContainer;
  radarTemplateContainerName = '';
  radarTemplateContainerDescription = '';
  checkForErrors = false;
  nameHasError = false;
  descriptionHasError = false;
  selectedShouldShare = false;

  constructor(private router: Router,
               @Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService) {
  }

  isValidContainer() {
    this.nameHasError = !this.containerNameIsValid();
    this.descriptionHasError = !this.containerDescriptionIsValid();
    return !this.nameHasError && !this.descriptionHasError;
  }

  submitAction() {
    if (this.isValidContainer()) {
      return this.radarTemplateContainerService.clone(this.radarTemplateContainer.id,
        this.radarTemplateContainerName, this.radarTemplateContainerDescription, this.selectedShouldShare);
    } else {
      return new Observable((observer) => observer.complete());
    }
  }

   containerNameIsValid() {
    this.nameHasError = this.radarTemplateContainerName === '';
    return !this.nameHasError;
  }

   containerDescriptionIsValid() {
    this.descriptionHasError = this.radarTemplateContainerDescription === '';
    return !this.descriptionHasError;
  }

  toggleShouldShareContainerCheck() {
    this.selectedShouldShare = !this.selectedShouldShare;
  }

  closeModal(): void {
    this.radarTemplateContainerName = '';
    this.radarTemplateContainerDescription = '';
    this.checkForErrors = false;
    this.nameHasError = false;
    this.descriptionHasError = false;
    this.selectedShouldShare = false;
  }

}
