import {Injectable} from '@angular/core';
import {RadarTemplateContainer} from '../../model/radarTemplateContainer';
import {RadarTemplate} from '../../model/radarTemplate';
import {Radar} from '../../model/radar';
import {Axis} from '../../model/axis';

@Injectable({
  providedIn: 'root'
})

export class RadarTemplateContainerCsvHelper {

  data(container: RadarTemplateContainer) {
    let radarTemplateContainerExtendedData = [];
    const radarTemplateContainerData = {
      'Nombre Radar Template Container': container.name,
      'ID Radar Template Container': container.id,
    };
    container.radar_templates.forEach(radarTemplate => {
      const radarTemplateExtendedData = this.addRadarTemplateData(radarTemplate);
      const extendedData = radarTemplateExtendedData.map(rdTmplExtendedData => {
        return {...radarTemplateContainerData, ...rdTmplExtendedData};
      });
      radarTemplateContainerExtendedData = radarTemplateContainerExtendedData.concat(extendedData);
    });
    return radarTemplateContainerExtendedData;
  }
  headers() {
    return ['Nombre Radar Template Container', 'ID Radar Template Container', 'Nombre Radar Template',
      'ID Radar Template', 'Nombre Radar', 'ID Radar', 'Nombre de Arista', 'Puntos'];
  }

  private addRadarTemplateData(radarTemplate: RadarTemplate) {
    let radarTemplateExtendedData = [];
    const radarTemplateData = {
      'Nombre Radar Template': radarTemplate.name,
      'ID Radar Template': radarTemplate.id,
    };
    radarTemplate.radars.forEach(axis => {
      const radarExtendedData = this.addRadarData(axis);
      const extendedData = radarExtendedData.map(rdExtendedData => {
        return {...radarTemplateData, ...rdExtendedData};
      });
      radarTemplateExtendedData = radarTemplateExtendedData.concat(extendedData);
    });
    return radarTemplateExtendedData;
  }

  private addRadarData(radar: Radar) {
    let radarExtendedData = [];
    const radarData = {
      'Nombre Radar': radar.name,
      'ID Radar': radar.id,
    };
    radar.axes.forEach(axis => {
      const axesExtendedData = this.addAxisData(axis);
      const extendedData = axesExtendedData.map(axisExtendedData => {
        return {...radarData, ...axisExtendedData};
      });
      radarExtendedData = radarExtendedData.concat(extendedData);
    });
    return radarExtendedData;
  }

  private addAxisData(axis: Axis) {
    return axis.answers.map(answer => ({
      'Nombre de Arista': axis.name,
      'Puntos': answer.points,
    }));
  }
}
