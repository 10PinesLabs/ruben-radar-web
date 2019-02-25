import { Component, OnInit } from '@angular/core';
import { CompareRadarsService } from 'src/services/compare-radars.service';
import { Radar } from 'src/model/radar';


@Component({
  selector: 'app-compare-radars',
  templateUrl: './compare-radars.component.html',
  styleUrls: ['./compare-radars.component.scss']
})
export class CompareRadarsComponent implements OnInit {

  firstRadar: Radar;
  secondRadar: Radar;

  constructor(private compareRadarsService: CompareRadarsService) { }

  ngOnInit() {
    this.compareRadarsService.firstRadar().subscribe(firstRadar => this.firstRadar = firstRadar);
    this.compareRadarsService.secondRadar().subscribe(secondRadar => this.secondRadar = secondRadar);
    // TODO: si no hay radares debería llevar a la pagina de select-to-compare
  }

  title() {
    return 'Comparación entre ' + this.firstRadar.title + ' y ' + this.secondRadar.title;
  }

  axes() {
    // TODO: debería ser solo las aristas que tienen en comun ambos radars
    return this.firstRadar.axes;
  }

  getRadarPorpertyFormattedForChart() {
    return [this.firstRadar, this.secondRadar];
  }

  getRadarsAxisValuesPorpertyFormattedForChart(axis) {
    return [this.firstRadar.axisValuesFor(axis), this.secondRadar.axisValuesFor(axis)];
  }

  getRadarTitlesPorpertyFormattedForChart() {
    return [this.firstRadar.title, this.secondRadar.title];
  }
}
