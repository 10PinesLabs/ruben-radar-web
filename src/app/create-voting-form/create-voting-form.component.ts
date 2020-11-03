import {Component, Inject, Input} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader';
import {PositioningService} from 'ngx-bootstrap/positioning';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {VotingService} from "../../services/voting.service";

@Component({
  selector: 'app-create-voting-form',
  templateUrl: './create-voting-form.component.html',
  styleUrls: ['./create-voting-form.component.scss'],
  providers: [BsModalService, ComponentLoaderFactory, PositioningService]
})

export class CreateVotingFormComponent {
  @Input() radarTemplateContainer;
  votingName = '';
  today = this.calendar.getToday();
  calendarData: NgbDateStruct = null;
  checkForErrors = false;

  constructor(private router: Router, private calendar: NgbCalendar,
              @Inject('VotingService') private votingService: VotingService) {
  }

  calendarHasError() {
    return !this.calendarData;
  }

  isValidVoting(){
    return !this.calendarHasError();
  }

  getSelectedDate () {
    return this.calendarData.year + '-' + this.calendarData.month + '-' + this.calendarData.day;
  }

  submitAction() {
    this.checkForErrors = true;
    if (this.isValidVoting()) {
      return this.votingService.create(this.radarTemplateContainer.id, this.votingName, this.getSelectedDate())
    } else {
      return new Observable((observer) => observer.complete());
    }
  }

  closeModal(): void {
    this.votingName = '';
    this.calendarData= null;
    this.checkForErrors = false;
  }

}
