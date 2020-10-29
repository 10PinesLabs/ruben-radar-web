import {Component, OnInit, Input, Inject, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {RadarTemplateContainer} from '../../../model/radarTemplateContainer';
import {RadarTemplateContainerService} from '../../../services/radarTemplateContainer.service';
import {VotingService} from '../../../services/voting.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {RadarTemplateContainerCsvHelper} from '../../helpers/radarTemplateContainerCsv.helper';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-radar-template-container',
  templateUrl: './radar-template-container.component.html',
  styleUrls: ['./radar-template-container.component.scss']
})
export class RadarTemplateContainerComponent implements OnInit {
  @Input() radarTemplateContainer: RadarTemplateContainer;
  id: String;
  selectedRadarTemplate = null;
  selectedRadarTemplateIndex = 0;
  showCreateVotingForm = false;
  votingCode = null;

  today = this.calendar.getToday();
  calendarData: NgbDateStruct = null;

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              @Inject('VotingService') private votingService: VotingService,
              private radarTemplateContainerCsvHelper: RadarTemplateContainerCsvHelper,
              private toastService: ToastService,
              private calendar: NgbCalendar,
              private route: ActivatedRoute,  private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
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
    this.votingService.create(this.radarTemplateContainer.id, this.getSelectedDate()).subscribe( voting => {
      this.votingCode = voting.code;

      this.radarTemplateContainer = new RadarTemplateContainer(voting.radar_template_container.id,
        voting.radar_template_container.name, voting.radar_template_container.description,
        voting.radar_template_container.active, voting.radar_template_container.radar_templates,
        voting.radar_template_container.active_voting_code);

      this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[this.selectedRadarTemplateIndex]);
      this.showCreateVotingForm = false;
      this.toastService.showSuccess('Votación creada con éxito');
    });
  }

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
    console.error('Aun no se implemento la creacion de radares');
  }

  isContainerEmpty() {
    return this.radarTemplates().length === 0;
  }

  containerCsvData() {
    return this.radarTemplateContainerCsvHelper.data(this.radarTemplateContainer);
  }

  containerCsvHeaders() {
    return this.radarTemplateContainerCsvHelper.headers();
  }

  containerCsvFilename() {
    return this.radarTemplateContainerCsvHelper.filename(this.radarTemplateContainer);
  }
}
