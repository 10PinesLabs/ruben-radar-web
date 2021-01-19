import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RadarTemplate} from 'src/model/radarTemplate';
import {Router} from '@angular/router';
import {Radar} from '../../model/radar';

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit, OnChanges {
  @Input() radarTemplate: RadarTemplate;
  @Output() openVotingCreateModalEvent = new EventEmitter<void>();

  selectedRadar: Radar = null;
  selectedAxisId: Number = null;

  constructor(private router: Router) {
  }

  templateHasAnyRadars() {
    return this.radarTemplate && this.radarTemplate.radars.length > 0;
  }

  openVotingCreateModal = () => {
    this.openVotingCreateModalEvent.emit();
  }

  setSelectedRadarFromRadarTemplate() {
    this.setSelectedRadar(this.templateHasAnyRadars() ? this.radarTemplate.radars[this.radarTemplate.radars.length - 1] : null);
  }

  setSelectedAxisFromSelectedRadar() {
    this.setSelectedAxis((this.selectedRadar && this.selectedRadar.axes) ? this.selectedRadar.axes[0].id : null);
  }

  onRadarAxisChange(selectedAxisId) {
    this.selectedAxisId = selectedAxisId;
  }

  initialize() {
    this.setSelectedRadarFromRadarTemplate();
    this.setSelectedAxisFromSelectedRadar();
  }

  shouldDisplayTemplateRadars() {
    return this.templateHasAnyRadars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initialize();
  }

  radars() {
    return this.radarTemplate.radars;
  }

  setSelectedRadar(radar) {
    if (!radar) { return; }
    this.selectedRadar = radar;
    this.selectedAxisId = radar.axes[0].id;
  }

  setSelectedAxis(id) {
    this.selectedAxisId = id;
  }

  viewRadar = () => {
    const radarUrl = `radar/${this.selectedRadar.id}/results`;
    this.router.navigate([radarUrl]);
  }

  ngOnInit(): void {
    this.initialize();
  }

}
