import {Component, OnInit, Input, Inject, OnChanges, ViewChild} from '@angular/core';
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {RadarTemplateContainerService} from "../../../services/radarTemplateContainer.service";
import {VotingService} from "../../../services/voting.service";
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {GeneralModalComponent} from '../../commons/modals/general-modal.component';
import {RadarTemplate} from '../../../model/radarTemplate';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import { Voting } from 'src/model/voting';

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
  @ViewChild(GeneralModalComponent) public createRadarTemplateModal: GeneralModalComponent;
  votingName = null;
  today = this.calendar.getToday();
  calendarData: NgbDateStruct = null;
  code: string;
  isAVoteResult : boolean = false;

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              @Inject('VotingService') private votingService: VotingService,
              private toastService: ToastService,
              private calendar: NgbCalendar,
              private route: ActivatedRoute,  private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.code = this.route.snapshot.paramMap.get('code');

    if(this.code){
      this.isAVoteResult = true;
    }
    
  }

  ngOnInit() {

    if(this.isAVoteResult){
      this.radarTemplateContainer = history.state.data;
      if (!this.radarTemplateContainer) {
        this.votingService.get(this.code).subscribe(
          (votingResult : Voting) => {
            this.radarTemplateContainer = votingResult.radar_template_container;
      this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex]);

          },
        );
      }
      return
    }

    this.radarTemplateContainerService.get(this.id).subscribe(radarTemplateContainer => {
      this.radarTemplateContainer = new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
        radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates,
        radarTemplateContainer.active_voting_code);

      this.votingCode = this.radarTemplateContainer.active_voting_code;
      this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex]);
    });
  }

  onVotingFormShowClick = () => {
    this.showCreateVotingForm = true;
  }

  onCancelVotingCreateClick = () => {
    this.showCreateVotingForm = false;
  }

  hasVotingCode() {
    return !!this.votingCode;
  }

  canCreateVoting() {
    return !this.hasVotingCode() && !!this.calendarData;
  }

  onVotingCreateClick = () => {
    this.votingService.create(this.radarTemplateContainer.id, this.votingName, this.getSelectedDate()).subscribe( voting => {
      this.votingCode = voting.code;

      this.radarTemplateContainer = new RadarTemplateContainer(voting.radar_template_container.id,
        voting.radar_template_container.name, voting.radar_template_container.description,
        voting.radar_template_container.active, voting.radar_template_container.radar_templates,
        voting.radar_template_container.active_voting_code);

      this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex]);
      this.showCreateVotingForm = false;
      this.toastService.showSuccess('Votación creada con éxito');
    });
  };

  getSelectedDate () {
    return this.calendarData.year + '-' + this.calendarData.month + '-' + this.calendarData.day;
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

  addRadar() {
    this.createRadarTemplateModal.openModal();
  }

  isContainerEmpty() {
    return this.radarTemplates().length === 0;
  }

  addRadarTemplateToContainer(radarTemplate) {
    const newRadarTemplate = new RadarTemplate(radarTemplate.id, this.radarTemplateContainer.id, radarTemplate.name, radarTemplate.description, radarTemplate.axes, radarTemplate.active, radarTemplate.radars);
    this.radarTemplateContainer.addRadarTemplate(newRadarTemplate);
    this.setSelectedRadarTemplate(newRadarTemplate);
    this.toastService.showSuccess('Tu Radar se agregó con éxito');
  }

  handleRadarTemplateAddError() {
    this.toastService.showError("Ocurrió un error al intentar crear el Radar");
  }
}
