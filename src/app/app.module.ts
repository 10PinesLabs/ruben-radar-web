import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { AxisComponent } from './radar-vote/voting-radar/axis/axis.component';
import { environment } from '../environments/environment';
import { VotingRadarComponent } from './radar-vote/voting-radar/voting-radar.component';
import { VotedRadarComponent } from './radar-vote/voted-radar/voted-radar.component';
import { ResultsComponent } from './results/results.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { IndexComponent } from './index/index.component';
import { RadarCardComponent } from './index/radar-card/radar-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateRadarComponent } from './create-radar/create-radar.component';
import { RadarFormComponent } from './create-radar/radar-form/radar-form.component';
import { AxesFormComponent } from './create-radar/axes-form/axes-form.component';
import { TokenComponent } from './token/token.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import { ErrorComponent } from './error/error.component';
import {TokenService} from '../services/token.service';
import { SelectToCompareComponent } from './select-to-compare/select-to-compare.component';
import { CompareRadarsComponent } from './compare-radars/compare-radars.component';
import { AxisBarChartComponent } from './chart-components/axis-bar-chart/axis-bar-chart.component';
import { AxisTableValuesComponent } from './chart-components/axis-table-values/axis-table-values.component';
import { RadarChartComponent } from './chart-components/radar-chart/radar-chart.component';
import { CompareRadarsButtonsComponent } from './compare-radars/compare-radars-buttons/compare-radars-buttons.component';
import { HttpRadarService } from 'src/services/http-radar.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RadarVoteComponent,
    AxisComponent,
    VotingRadarComponent,
    VotedRadarComponent,
    ResultsComponent,
    CardContainerComponent,
    AxisBarChartComponent,
    AxisTableValuesComponent,
    RadarChartComponent,
    IndexComponent,
    RadarCardComponent,
    CreateRadarComponent,
    RadarFormComponent,
    AxesFormComponent,
    TokenComponent,
    ErrorComponent,
    SelectToCompareComponent,
    CompareRadarsComponent,
    CompareRadarsButtonsComponent
  ],
  imports: [
    StorageServiceModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    FormsModule
  ],
  providers: [{provide: 'RadarService', useClass: HttpRadarService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
