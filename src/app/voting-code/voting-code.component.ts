import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RadarTemplateContainerService } from 'src/services/radarTemplateContainer.service';

@Component({
  selector: 'app-voting-code',
  templateUrl: './voting-code.component.html',
  styleUrls: ['./voting-code.component.scss']
})
export class VotingCodeComponent implements OnInit {

  accessCode = ""
  notFound = false

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
                private router: Router) { }

  ngOnInit(): void {
  }

  accessToRadarContainer(){
    this.radarTemplateContainerService.getByAccessCode(this.accessCode)
      .subscribe( radarTemplateContainer =>{
        this.router.navigate([`/vote/${this.accessCode}`], {state: {data: radarTemplateContainer}})
      },
       error => this.notFound = true)
   
  }

  userPressedEnterKey(){
    this.accessToRadarContainer()
  }

  inputChanged(){
    this.notFound = false;
  }

}
