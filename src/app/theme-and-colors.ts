import {document} from "ngx-bootstrap/utils";

export const CHART_COLORS = {
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

const radarTheme = {
  name: "radar",
  primaryColor: 'rgba(25, 179, 112, 1)',
  radarColor: "rgba(25, 179, 112, 1)",
  transparentRadarColor: "rgba(157, 217, 191, 0.6)",
  secondaryRadarColor: 'rgba(35, 25, 179, 1)',
  secondaryTransparentRadarColor: 'rgba(159, 155, 217, 0.6)',
  selectedAxisBorderColor: '#1C7CD5',
  selectedAxisBackgroundColor: '#DCEDF6',
}

const metateamsTheme = {
  name: "metateams",
  primaryColor: 'rgb(28, 30, 63)',
  radarColor: 'rgb(231, 102, 127)',
  transparentRadarColor: 'rgba(231, 102, 127, 0.6)',
  secondaryRadarColor: "rgb(28, 30, 63)",
  secondaryTransparentRadarColor: "rgba(28, 30, 63, 0.6)",
  selectedAxisBorderColor: 'rgb(28, 30, 63)',
  selectedAxisBackgroundColor: 'rgba(231, 102, 127, 0.6)',
}

export const getTheme = () => {
  return document.location.host.split(".").includes(metateamsTheme.name) ? metateamsTheme : radarTheme;
}
