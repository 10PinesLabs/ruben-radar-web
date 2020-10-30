import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-radar-template-form',
  templateUrl: './radar-template-form.component.html',
  styleUrls: ['./radar-template-form.component.scss']
})
export class RadarTemplateFormComponent implements OnInit {

  @Input() radarTemplateName;
  @Input() radarTemplateDescription;
  @Input() selectedRadarTemplateContainer;
  @Input() radarTemplateContainers;
  @Input() showErrors: boolean;
  @Output() radarTemplateNameChange = new EventEmitter();
  @Output() radarTemplateDescriptionChange = new EventEmitter();
  @Output() selectedRadarTemplateContainerChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onRadarTemplateNameChange() {
    this.radarTemplateNameChange.emit(this.radarTemplateName);
  }

  onRadarTemplateDescriptionChange() {
    this.radarTemplateDescriptionChange.emit(this.radarTemplateDescription);
  }

  onSelectedRadarTemplateContainerChange() {
    this.selectedRadarTemplateContainerChange.emit(this.selectedRadarTemplateContainer);
  }

  showRadarContainerError() {
    return this.showErrors && this.selectedRadarTemplateContainer === null;
  }

  showRadarTemplateNameError() {
    const trimmedRadarTemplateName = this.radarTemplateName.trim();
    return this.showErrors && trimmedRadarTemplateName.length === 0;
  }

  showRadarTemplateDescriptionError() {
    const trimmedRadarTemplateDescription = this.radarTemplateDescription.trim();
    return this.showErrors && trimmedRadarTemplateDescription.length === 0;
  }
}
