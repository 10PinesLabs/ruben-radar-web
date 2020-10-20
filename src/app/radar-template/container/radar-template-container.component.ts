import {Component, OnInit, Input, Inject, OnChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {RadarTemplateContainer} from "../../../model/radarTemplateContainer";
import {RadarTemplateContainerService} from "../../../services/radarTemplateContainer.service";
import {Voting} from "../../../model/voting";
import {VotingService} from "../../../services/voting.service";
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-radar-template-container',
  templateUrl: './radar-template-container.component.html',
  styleUrls: ['./radar-template-container.component.scss']
})
export class RadarTemplateContainerComponent implements OnInit {
  @Input() radarTemplateContainer: any;
  id: String;
  selectedRadarTemplate = null;
  showCreateVotingForm = false;
  votingCode = null;

  today = this.calendar.getToday();
  calendarData: NgbDateStruct;

  constructor(@Inject('RadarTemplateContainerService') private radarTemplateContainerService: RadarTemplateContainerService,
              @Inject('VotingService') private votingService: VotingService,
              private calendar: NgbCalendar,
              private route: ActivatedRoute,  private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.radarTemplateContainerService.get(this.id).subscribe(radarTemplateContainer => {
      this.radarTemplateContainer = new RadarTemplateContainer(radarTemplateContainer.id, radarTemplateContainer.name,
        radarTemplateContainer.description, radarTemplateContainer.active, radarTemplateContainer.radar_templates)
      this.setSelectedRadarTemplate(this.radarTemplateContainer.radar_templates[0]);
    });
  }

  onVotingFormShowClick = () => {
    this.showCreateVotingForm = true;
  }

  onCancelVotingCreateClick = () => {
    this.showCreateVotingForm = false;
  }

  onVotingCreateClick = () => {
    debugger;
    this.votingService.create(this.radarTemplateContainer.id, this.getSelectedDate()).subscribe( voting => {
      debugger;
      this.votingCode = voting.code;
      this.showCreateVotingForm = false;
    })
  }

  getSelectedDate () {
    return this.calendarData.year + "-" + this.calendarData.month + "-" + this.calendarData.day;
  }

  isSelected(radarTemplate){
    return this.selectedRadarTemplate.id === radarTemplate.id;
  }

  radarTemplates() {
    return this.radarTemplateContainer.radar_templates;
  }

  onRadarTemplateCardClick(radarTemplate){
    this.setSelectedRadarTemplate(radarTemplate);
  }

  setSelectedRadarTemplate(radarTemplate){
    this.selectedRadarTemplate = radarTemplate
  }

}
