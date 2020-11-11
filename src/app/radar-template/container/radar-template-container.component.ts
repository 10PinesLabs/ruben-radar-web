import {Component, OnInit, Input, Inject, ViewChild} from '@angular/core';
import {RadarTemplateContainer} from '../../../model/radarTemplateContainer';
import {RadarTemplateContainerService} from '../../../services/radarTemplateContainer.service';
import {VotingService} from '../../../services/voting.service';
import {GeneralModalComponent} from '../../commons/modals/general-modal.component';
import {RadarTemplate} from '../../../model/radarTemplate';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {RadarTemplateContainerExportDataHelper} from '../../helpers/radarTemplateContainerExportData.helper';
import {RadarTemplateService} from '../../../services/radarTemplate.service';


@Component({
  selector: 'app-radar-template-container',
  templateUrl: './radar-template-container.component.html',
  styleUrls: ['./radar-template-container.component.scss']
})
export class RadarTemplateContainerComponent implements OnInit {
  @Input() radarTemplateContainer: RadarTemplateContainer;
  id: String;
  selectedRadarTemplate = null;
  selectedRadarTemplateIndex: number = 0;
  showCreateVotingForm = false;
  votingCode = null;
  @ViewChild('createRadarTemplateRef') public createRadarTemplateModal;
  @ViewChild('shareContainerRef') public shareContainerModal;
  votingName = null;
  @ViewChild('cloneContainerModal') public cloneRadarTemplateContainerModal: GeneralModalComponent;
  @ViewChild('votingModal') public votingModal: GeneralModalComponent;


  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              @Inject('RadarTemplateService') private radarTemplatesService: RadarTemplateService,
              @Inject('VotingService') private votingService: VotingService,
              private radarTemplateContainerCsvHelper: RadarTemplateContainerExportDataHelper,
              private toastService: ToastService,
              private route: ActivatedRoute,  private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.radarTemplateContainerService.get(this.id).subscribe(radarTemplateContainer => {
        this.radarTemplateContainer = new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
          radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
          radarTemplateContainer.active_voting_code);

        this.votingCode = this.radarTemplateContainer.active_voting_code;
        this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex]);
      });
    });
  };

  hasVotingCode() {
    return !!this.votingCode;
  }

  canCreateVoting() {
    return !this.hasVotingCode();
  }

  openVotingCreateModal = () => {
    this.votingModal.openModal();
  }

  handleVotingCreateSuccess = (voting) => {
    this.votingCode = voting.code;

    this.radarTemplateContainer = new RadarTemplateContainer(voting.radar_template_container.id,
      voting.radar_template_container.name, voting.radar_template_container.description,
      voting.radar_template_container.active, voting.radar_template_container.radar_templates,
      voting.radar_template_container.active_voting_code);

    this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex]);
    this.toastService.showSuccess('Votación creada con éxito');
  };

  handleVotingCreateError(){
    this.toastService.showError("Ocurrió un error al crear la votación");
  }

  isSelected(radarTemplate) {
    return this.selectedRadarTemplate.id === radarTemplate.id;
  }

  radarTemplates() {
    return this.radarTemplateContainer.radar_templates;
  }

  onRadarTemplateCardClick(radarTemplate, index) {
    this.setSelectedRadarTemplate(radarTemplate);
    this.selectedRadarTemplateIndex = index;
  }

  setSelectedRadarTemplate(radarTemplate) {
    this.selectedRadarTemplate = radarTemplate;
  }

  addRadar = () => {
    this.createRadarTemplateModal.openModal();
  }

  shareRadar = () => {
    this.shareContainerModal.openModal();
  }

  deleteRadarTemplate = ($event, radarTemplate, index) => {
    $event.stopPropagation();
    this.radarTemplatesService.close(radarTemplate.id).subscribe(() => {
      this.deleteRadarAndUpdateList(radarTemplate, index);
    }, () => {
      this.toastService.showError('Ocurrió un problema al intentar borrar el radar');
    });
  };

  private deleteRadarAndUpdateList(radarTemplate, deletedRadarTemplateIndex) {
    if (this.selectedRadarTemplate.id === radarTemplate.id) {
      this.selectedRadarTemplateIndex = deletedRadarTemplateIndex % (this.radarTemplateContainer.radar_templates.length - 1);
      this.radarTemplateContainer.deleteRadar(radarTemplate.id);
      this.selectedRadarTemplate = this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex];
    } else {
      this.radarTemplateContainer.deleteRadar(radarTemplate.id);
    }
  }

  openCloneContainerModal = () => {
    this.cloneRadarTemplateContainerModal.openModal();
  }

  isContainerEmpty() {
    return this.radarTemplates().length === 0;
  }

  cloneRadarTemplateContainer(radarTemplateContainer) {
    this.router.navigate(['radarTemplateContainer/' + radarTemplateContainer.id]);
    this.toastService.showSuccess('Tu Contenedor se clonó con éxito');
  }

  handleRadarTemplateCloneError() {
    this.toastService.showError('Ocurrió un error al clonar el Contenedr');
  }

  addRadarTemplateToContainer(radarTemplate) {
    const newRadarTemplate = new RadarTemplate(radarTemplate.id, this.radarTemplateContainer.id, radarTemplate.name, radarTemplate.description, radarTemplate.axes, radarTemplate.active, radarTemplate.radars);
    this.radarTemplateContainer.addRadarTemplate(newRadarTemplate);
    this.setSelectedRadarTemplate(newRadarTemplate);
    this.toastService.showSuccess('Tu Radar se agregó con éxito');
  }

  handleRadarTemplateAddError() {
    this.toastService.showError('Ocurrió un error al intentar crear el Radar');
  }
  exportData() {
    return this.radarTemplateContainerCsvHelper.data(this.radarTemplateContainer);
  }

  exportHeaders() {
    return this.radarTemplateContainerCsvHelper.headers();
  }

  exportFilename() {
    return this.radarTemplateContainerCsvHelper.filename(this.radarTemplateContainer);
  }

  successfulContainerShare() {
    this.toastService.showSuccess('Tu container se compartió exitosamente');
  }

  handleContainerShareError() {
    this.toastService.showError("Ocurrió un error al intentar compartir el container");
  }
}
