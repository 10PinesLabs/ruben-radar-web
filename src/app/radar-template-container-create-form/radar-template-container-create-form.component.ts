import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { RadarTemplateContainerService } from 'src/services/radarTemplateContainer.service';

@Component({
  selector: 'app-radar-template-container-create-form',
  templateUrl: './radar-template-container-create-form.component.html',
  styleUrls: ['./radar-template-container-create-form.component.scss']
})
export class RadarTemplateContainerCreateFormComponent implements OnInit {
  selectedRadarTemplateContainerName : string = ""
  selectedRadarTemplateContainerDescription : string = ""
  emptyNameError : boolean

  constructor(@Inject('RadarTemplateContainerService') private containerService : RadarTemplateContainerService) { }

  ngOnInit(): void {
  }

  hasRadarTemplateContainerFormCompleted = () => {
    //TODO: validar qe no exista el nombre
    return this.selectedRadarTemplateContainerName && this.selectedRadarTemplateContainerName !== "";
  }

  isNameUsed(){
    return this.containerService.getAllLastKnown().map(container => container.name).includes(this.selectedRadarTemplateContainerName);
  }

  closeModal(){
    this.selectedRadarTemplateContainerDescription = ""
    this.selectedRadarTemplateContainerName = ""
  }

  isNameEmpty(){
    return this.selectedRadarTemplateContainerName==""
  }

  validateInputs(){
    if(!this.isNameEmpty()) this.emptyNameError = false;
    return !this.isNameUsed()&&!this.isNameEmpty()
  }

  submitAction(){
    if(this.validateInputs()){
      return this.containerService.create(this.selectedRadarTemplateContainerName, this.selectedRadarTemplateContainerDescription)
    }
    if(this.isNameEmpty()) this.emptyNameError = true;
  }

}
