import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Voting} from 'src/model/voting';

@Component({
  selector: 'app-voted-radar',
  templateUrl: './voted-radar.component.html',
  styleUrls: ['./voted-radar.component.scss']
})
export class VotedRadarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  @Input() voting: Voting;
  ngOnInit() { }

  redirectToResults() {
    const code = this.route.snapshot.paramMap.get('code');
    this.router.navigate(['/results/' + code], {state: {data: {voting: this.voting}}});
  }

}
