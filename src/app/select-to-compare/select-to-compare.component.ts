import {Component, Inject, OnInit} from '@angular/core';
import {Radar} from 'src/model/radar';
import {RadarService} from 'src/services/radar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-to-compare',
  templateUrl: './select-to-compare.component.html',
  styleUrls: ['./select-to-compare.component.scss']
})
export class SelectToCompareComponent implements OnInit {

  title: String = 'Comparar Radares';
  radars: Radar[];
  firstRadar: Radar;
  secondRadar: Radar;

  constructor(@Inject('RadarService') private radarService: RadarService,
              private router: Router) {
    this.radars = [];
  }

  ngOnInit() {
    this.radarService.getAll().subscribe(radars => {
      radars.forEach(radar => {
        this.radars.push(new Radar(radar.id, radar.name, radar.description, radar.axes, radar.active, radar.global_average));
      });
      this.radars = this.radars.sort((r1, r2) => r2.id - r1.id); // mayor id a menor id
      this.firstRadar = this.radars[0];
      this.secondRadar = this.radars[0];
    });
  }

  backToIndex() {
    this.router.navigate(['/radarTemplates']);
  }

  compareRadars() {
    this.router.navigate(['radars', 'compare', this.firstRadar.id, this.secondRadar.id]);
  }
}
