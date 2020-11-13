import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { RadarTemplateContainerService } from 'src/services/radarTemplateContainer.service';

@Component({
  selector: 'app-radar-template-container-create-form',
  templateUrl: './radar-template-container-create-form.component.html',
  styleUrls: ['./radar-template-container-create-form.component.css']
})
export class RadarTemplateContainerCreateFormComponent implements OnInit {
  selectedRadarTemplateContainerName : string = ""
  selectedRadarTemplateContainerDescription : string = ""

  constructor(@Inject('RadarTemplateContainerService') private containerService : RadarTemplateContainerService) { }

  ngOnInit(): void {
  }

  hasRadarTemplateContainerFormCompleted = () => {
    //TODO: validar qe no exista el nombre
    return this.selectedRadarTemplateContainerName && this.selectedRadarTemplateContainerName !== "";
  }

  closeModal(){
    this.selectedRadarTemplateContainerDescription = ""
    this.selectedRadarTemplateContainerName = ""
  }

  submitAction(){
    return this.containerService.create(this.selectedRadarTemplateContainerName, this.selectedRadarTemplateContainerDescription)
  
  }

}
