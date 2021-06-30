import {Component} from '@angular/core';

export const CHART_COLORS = {
  radarGreen: "#63B471",
  transparentRadarGreen: "#C2E8D9",
  blue: 'rgb(0,174,255)',
  lightBlue: 'rgb(2,203,172)',
  green: 'rgb(0,130,0)',
  lightGreen: 'rgb(25,255,0)',
  yellow: 'rgb(196,196,0)',
  lightYellow: 'rgb(255,231,0)',
  lightOrange: 'rgb(255,151,0)',
  orange: 'rgb(199,118,0)',
  lightRed: 'rgb(255,60,0)',
  red: 'rgb(255,0,0)',
  transparentBlue: 'rgb(0,174,255, 0.4)',
  transparentLightBlue: 'rgb(2,203,172, 0.4)',
  transparentGreen: 'rgb(0,130,0, 0.4)',
  transparentLightGreen: 'rgb(25,255,0, 0.4)',
  transparentYellow: 'rgb(196,196,0, 0.4)',
  transparentLightYellow: 'rgb(255,231,0, 0.4)',
  transparentLightOrange: 'rgb(255,151,0, 0.4)',
  transparentOrange: 'rgb(199,118,0, 0.4)',
  transparentLightRed: 'rgb(255,60,0, 0.4)',
  transparentRed: 'rgb(255,0,0, 0.1)',
};

export const POINTS_RANGE = 5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
}
