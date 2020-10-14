import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index-header-component',
  templateUrl: './index-header-component.html',
  styleUrls: ['./index-header-component.scss']
})
export class IndexHeaderComponent {

  constructor(private router: Router) {}

  navigateToCreateRadarTemplate = () => {
    this.router.navigate(['radarTemplate/create']);
  }

  navigateToCreateRadarTemplateContainer = () => {
    this.router.navigate(['radarTemplateContainer/create']);
  }
}
