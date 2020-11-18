import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voting } from 'src/model/voting';
import { RadarTemplateContainerService } from 'src/services/radarTemplateContainer.service';
import { VotingService } from 'src/services/voting.service';

@Component({
  selector: 'app-voting-code',
  templateUrl: './voting-code.component.html',
  styleUrls: ['./voting-code.component.scss']
})
export class VotingCodeComponent implements OnInit {

  accessCode = ""
  notFound = false

  constructor(@Inject('VotingService') private votingService: VotingService,
                private router: Router) { }

  ngOnInit(): void {
  }

  accessToRadarContainer(){
    this.votingService.get(this.accessCode)
      .subscribe( (votingResult : Voting) =>{
        const voting = new Voting(votingResult.id, votingResult.code, votingResult.ends_at, votingResult.radar_template_container)
        this.router.navigate([`/vote/${this.accessCode}`], {state: {data: {voting:voting}}})
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
