import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {RadarTemplate} from 'src/model/radarTemplate';
import {Router} from '@angular/router';
import {Radar} from '../../model/radar';
import { ConfirmActionModalComponent } from '../commons/modals/confirm-action-modal/confirm-action-modal.component';
import { ToastService } from 'src/services/toast.service';
import { VotingService } from 'src/services/voting.service';

@Component({
  selector: 'app-radar-template',
  templateUrl: './radar-template.component.html',
  styleUrls: ['./radar-template.component.scss']
})
export class RadarTemplateComponent implements OnInit, OnChanges {
  @Input() radarTemplate: RadarTemplate;
  @Output() openVotingCreateModalEvent = new EventEmitter<void>();

  @ViewChild('deleteVotingModal') public deleteVotingModal: ConfirmActionModalComponent;

  selectedRadar: Radar = null;
  selectedAxisId: Number = null;

  constructor(private router: Router, private toastService: ToastService, @Inject('VotingService') private votingService: VotingService) {
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

  openDeleteVotingModal = () => {
    this.deleteVotingModal.openModal();
  }

  deleteVoting = () => {
    return () => this.votingService.delete(this.selectedRadar.voting_id);
  }

  handleDeleteVotingError() {
    this.toastService.showError('Ocurrió un problema al intentar borrar la votación');
  }

  handleDeleteVotingSuccess(radarTemplate, index) {
    this.toastService.showSuccess('La votación se eliminó exitosamente');
  }

}
