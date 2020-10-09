import {Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { RadarTemplate } from 'src/model/radarTemplate';
import { FitTextDirective } from '../commons/directives/fittext.directive';
import {Router} from "@angular/router";

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit, OnChanges {
  //@ViewChild(FitTextDirective) textFitter : FitTextDirective;
  @Input() radarTemplate: RadarTemplate;
  selectedRadar = null;
  selectedAxisId: Number = null;
  displayTemplateRadars = false;

  constructor(private router: Router) {
  }

  templateHasAnyRadars() {
    return this.radarTemplate.radars.length > 0;
  }

  initializeRadar() {
    if (this.templateHasAnyRadars()) {
      this.setSelectedRadar(this.radarTemplate.radars[0]);
      this.displayTemplateRadars = true;
    } else {
      this.displayTemplateRadars = false;
    }
  }

  shouldDisplayTemplateRadars() {
    return this.displayTemplateRadars;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeRadar();
    if (this.selectedRadar) {
      this.setSelectedAxis(this.selectedRadar.axes[0].id);
    }
  }

  radars() {
    return this.radarTemplate.radars;
  }

  setSelectedRadar(radar) {
    this.selectedRadar = radar;
  }

  setSelectedAxis(id) {
    this.selectedAxisId = id;
  }

  viewRadar() {
    const radarUrl = `radar/${this.selectedRadar.id}/results`;
    this.router.navigate([radarUrl]);
  }

  ngOnInit(): void {
    if (this.radarTemplate.radars.length > 0) {
      this.setSelectedRadar(this.radarTemplate.radars[0]);
      this.setSelectedAxis(this.selectedRadar.axes[0].id);
      this.displayTemplateRadars = true;
    } else {
      this.displayTemplateRadars = false;
    }
  }

}
