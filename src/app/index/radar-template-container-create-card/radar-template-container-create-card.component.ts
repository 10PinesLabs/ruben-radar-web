import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-radar-template-container-create-card',
  templateUrl: './radar-template-container-create-card.component.html',
  styleUrls: ['./radar-template-container-create-card.component.scss']
})
export class RadarTemplateContainerCreateCardComponent implements OnInit {

  showCreateRadarTemplateContainerForm: boolean = false;
  @Input() selectedRadarTemplateContainerName: string = "";
  @Input() selectedRadarTemplateContainerDescription: string = "";
  @Input() onCreateClick: (name: string, description: string) => {}

  constructor() {
  }

  onShowCreateRadarTemplateContainerForm = () => {
    this.showCreateRadarTemplateContainerForm = true;
  }

  hasRadarTemplateContainerFormCompleted = () => {
    //TODO: validar qe no exista el nombre
    return this.selectedRadarTemplateContainerName && this.selectedRadarTemplateContainerName !== "";
  }

  onCancelRadarTemplateContainerClick = () => {
    this.showCreateRadarTemplateContainerForm = false;
  }

  onCreateRadarTemplateContainerClick = () => {
    this.onCreateClick(this.selectedRadarTemplateContainerName, this.selectedRadarTemplateContainerDescription);
    this.showCreateRadarTemplateContainerForm = false;
  }

  ngOnInit(): void {
  }

}
