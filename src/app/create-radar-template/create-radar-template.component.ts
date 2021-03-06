import {Component, Inject, OnInit} from '@angular/core';
import {Axis} from 'src/model/axis';
import {ActivatedRoute, Router} from '@angular/router';
import {RadarTemplateService} from '../../services/radarTemplate.service';
import {RadarTemplate} from '../../model/radarTemplate';
import {RadarTemplateContainerService} from '../../services/radarTemplateContainer.service';

@Component({
  selector: 'app-create-radar-template',
  templateUrl: './create-radar-template.component.html',
  styleUrls: ['./create-radar-template.component.scss']
})
export class CreateRadarTemplateComponent implements OnInit {

  axes: Axis[] = [];
  radarTemplateName = '';
  radarTemplateDescription = '';
  selectedRadarTemplateContainer = null;
  showErrors = false;
  radarTemplateContainers = [];

  constructor(@Inject('RadarTemplateService') private radarTemplateService: RadarTemplateService,
              @Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const strId = params.get('id');
      if (strId !== null) {
        // Check if why would we need this
        this.radarTemplateService.get(strId).subscribe(result => {
          this.radarTemplateName = result.name;
          this.radarTemplateDescription = result.description;
          this.axes = result.axes.map(axis => new Axis(null, axis.name, axis.description, []));
        });
      }
    });

    this.radarTemplateContainerService.getAll().subscribe(radarTemplateContainers => {
      radarTemplateContainers.forEach(radarTemplateContainer => {
        this.radarTemplateContainers.push({id: radarTemplateContainer.id, containerName: radarTemplateContainer.name});
      });
    });
  }

  radarTemplateIsInvalid(): boolean {
    return this.radarContainerIdIsEmpty() || this.radarTemplateNameIsEmpty() || this.radarTemplateDescriptionIsEmpty()
      || this.radarTemplateAxesIsLessThanThree();
  }

  createRadarTemplate() {
    if (this.radarTemplateIsInvalid()) {
      this.showErrors = true;
    } else {
     const newRadarTemplate = new RadarTemplate(null, this.selectedRadarTemplateContainer, this.radarTemplateName
       , this.radarTemplateDescription, this.axes, null, []);
     this.radarTemplateService.create(newRadarTemplate).subscribe(() => this.router.navigate(['/radarTemplates']));
    }
  }

  backToIndex() {
    this.router.navigate(['/radarTemplates']);
  }

  private radarTemplateNameIsEmpty(): boolean {
    return this.radarTemplateName.length === 0;
  }

  private radarTemplateDescriptionIsEmpty(): boolean {
    return this.radarTemplateDescription.length === 0;
  }

  private radarTemplateAxesIsLessThanThree(): boolean {
    return this.axes.length < 3;
  }

  private radarContainerIdIsEmpty(): boolean {
    return this.selectedRadarTemplateContainer === null;
  }
}
