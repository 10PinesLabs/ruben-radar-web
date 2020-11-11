import { Pipe, PipeTransform } from '@angular/core';
import { RadarTemplateContainer } from 'src/model/radarTemplateContainer';
import { RadarTemplateComponent } from './radar-template/radar-template.component';

@Pipe({
  name: 'unpinnedRadarTemplateContainerPipe'
})
export class UnpinnedRadarTemplateContainerPipe implements PipeTransform {

  transform(radarTemplateConteiners : RadarTemplateContainer[]): RadarTemplateContainer[] {
    return radarTemplateConteiners.filter((container : RadarTemplateContainer)=> !container.isPinned());
  }

}
