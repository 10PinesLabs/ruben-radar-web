import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RadarTemplateService } from 'src/services/radarTemplate.service';

@Component({
  selector: 'app-voting-code',
  templateUrl: './voting-code.component.html',
  styleUrls: ['./voting-code.component.css']
})
export class VotingCodeComponent implements OnInit {

  accessCode = ""
  notFound = false

  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService,
                private router: Router) { }

  ngOnInit(): void {
  }

  accessToRadarContainer(){
    this.radarTemplateService.getByAccessCode(this.accessCode)
      .subscribe( radarTemplateContainer =>{
        this.router.navigate([`/vote/${this.accessCode}`], {state: {data: {radarTemplateContainer}}})
      },
       error => this.notFound = true)
   
  }

}
