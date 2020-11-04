import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RadarTemplateService} from '../../../services/radarTemplate.service';

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss']
})
export class IndexHeaderComponent implements OnInit {
  @Input() radarTemplateContainers;

  constructor(private router: Router,
              @Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService) {}

  ngOnInit(): void {

    }

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

}
