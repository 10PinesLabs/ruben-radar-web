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
  nameTakenError : boolean

  constructor(@Inject('RadarTemplateContainerService') private containerService : RadarTemplateContainerService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.selectedRadarTemplateContainerDescription = ""
    this.selectedRadarTemplateContainerName = ""
  }

  isNameEmpty(){
    return this.selectedRadarTemplateContainerName==""
  }

  submitError(error){
    if(error.error.errors[0] === "has already been taken"){
      this.nameTakenError = true
    }
  }

  resetErrors(){
    this.emptyNameError = false
    this.nameTakenError = false
  }

  submitAction(){
    if(this.isNameEmpty()){
      this.emptyNameError = true
      return 
    }
    return this.containerService.create(this.selectedRadarTemplateContainerName, this.selectedRadarTemplateContainerDescription)
  }

}
