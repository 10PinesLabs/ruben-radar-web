import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {RadarVoteComponent} from './radar-vote/radar-vote.component';
import {AxisComponent} from './radar-vote/voting-radar/axis/axis.component';
import {VotingRadarComponent} from './radar-vote/voting-radar/voting-radar.component';
import {VotedRadarComponent} from './radar-vote/voted-radar/voted-radar.component';
import {ResultsComponent} from './results/results.component';
import {CardContainerComponent} from './card-container/card-container.component';
import {IndexComponent} from './index/index.component';
import {RadarRowComponent} from './index/radar-row/radar-row.component';
import {RadarTemplateCardComponent} from './index/radar-template-card/radar-template-card.component';
import {RadarTemplatePreViewComponent} from './index/radar-template-pre-view/radar-template-pre-view.component';
import {RadarTemplateIndexDetailsComponent} from './index/radar-template-index-details/radar-template-index-details.component';
import {ButtonWithIconComponent} from './commons/buttons/button-with-icon.component';
import {HeaderFiltersComponent} from './index/header-filters/header-filters.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CreateRadarComponent} from './create-radar/create-radar.component';
import {CreateRadarTemplateComponent} from './create-radar-template/create-radar-template.component';
import {RadarTemplateFormComponent} from './create-radar-template/radar-template-form/radar-template-form.component';
import {RadarTemplateAxisEvolutionComponent} from './radar-template/axis-evolution/radar-template-axis-evolution.component';
import {RadarTemplateComponent} from './radar-template/radar-template.component';
import {RadarTemplateAxisEvolutionLineChartComponent} from './radar-template/axis-evolution/charts/line-chart/radar-template-axis-evolution-line-chart.component';
import {RadarTemplateAxisEvolutionDispersionChartComponent} from './radar-template/axis-evolution/charts/dispersion-chart/radar-template-axis-evolution-dispersion-chart.component';
import {RadarFormComponent} from './create-radar/radar-form/radar-form.component';
import {AxesFormComponent} from './create-radar/axes-form/axes-form.component';
import {TokenComponent} from './token/token.component';
import {ErrorComponent} from './error/error.component';
import {TokenService} from '../services/token.service';
import {SelectToCompareComponent} from './select-to-compare/select-to-compare.component';
import {CompareRadarsComponent} from './compare-radars/compare-radars.component';
import {AxisBarChartComponent} from './chart-components/axis-bar-chart/axis-bar-chart.component';
import {AxisTableValuesComponent} from './chart-components/axis-table-values/axis-table-values.component';
import {RadarChartComponent} from './chart-components/radar-chart/radar-chart.component';
import {CompareRadarsButtonsComponent} from './compare-radars/compare-radars-buttons/compare-radars-buttons.component';
import {HttpRadarService} from 'src/services/http-radar.service';
import {HttpRadarTemplateService} from 'src/services/http-radarTemplate.service';
import {SignInComponent} from './sign-in/sign-in.component';
import {HttpConfigInterceptor} from 'src/interceptor/httpconfig.interceptor';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RadarTemplateVisualizerComponent} from './chart-components/template-chart/template-visualizer.component';
import {FitTextDirective} from './commons/directives/fittext.directive';
import {NgPipesModule} from 'ngx-pipes';
import {HttpRadarTemplateContainerService} from '../services/http-radarTemplateContainer.service';
import {RadarTemplateContainerCardComponent} from './index/radar-template-container-card/radar-template-container-card.component';
import {RadarTemplateContainerComponent} from './radar-template/container/radar-template-container.component';
import {CallToActionHeaderButton} from './index/call-to-actions-buttons/call-to-action-header-button';
import { VotingCodeComponent } from './voting-code/voting-code.component';
import { RadarTemplateContainerCreateCardComponent } from './index/radar-template-container-create-card/radar-template-container-create-card.component'
import { WizzardArrows } from './radar-vote/wizzard-arrows/wizzard-arrows.component';
import {HttpVotingService} from "../services/http-voting.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {IndexHeaderComponent} from './index/index-header/index-header-component';
import {CreateRadarTemplateForm} from './create-radar-template/create-radar-template-form/create-radar-template-form.component';
import {GeneralModalComponent} from './commons/modals/general-modal.component';
import {ToastService} from '../services/toast.service';
import {ToastComponent} from './commons/toasts/toast.component';
import {CloneRadarTemplateContainerFormComponent} from './clone-radar-template-container/clone-radar-template-container-form.component';
import {ShareContainerForm} from './radar-template/container/share-container/share-container-form.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {HttpUserService} from '../services/http-user.service';
import {CreateVotingFormComponent} from './create-voting-form/create-voting-form.component';
import {RadarTemplateContainerExportDataHelper} from './helpers/radarTemplateContainerExportData.helper';
import {ExportDropdownComponent} from './commons/export-dropdown/export-dropdown-component';
import { CopyClipboardDirective } from './commons/directives/clipboard.directive';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RadarVoteComponent,
    AxisComponent,
    RadarTemplateContainerCreateCardComponent,
    VotingRadarComponent,
    VotedRadarComponent,
    ResultsComponent,
    CardContainerComponent,
    AxisBarChartComponent,
    AxisTableValuesComponent,
    RadarChartComponent,
    IndexComponent,
    RadarRowComponent,
    RadarTemplateCardComponent,
    RadarTemplateContainerCardComponent,
    RadarTemplateContainerComponent,
    RadarTemplatePreViewComponent,
    RadarTemplateIndexDetailsComponent,
    ButtonWithIconComponent,
    HeaderFiltersComponent,
    CreateRadarComponent,
    CreateRadarTemplateComponent,
    RadarTemplateAxisEvolutionComponent,
    RadarTemplateComponent,
    RadarTemplateAxisEvolutionLineChartComponent,
    RadarTemplateAxisEvolutionDispersionChartComponent,
    RadarTemplateFormComponent,
    RadarFormComponent,
    AxesFormComponent,
    TokenComponent,
    ErrorComponent,
    SelectToCompareComponent,
    CompareRadarsComponent,
    CompareRadarsButtonsComponent,
    SignInComponent,
    PageNotFoundComponent,
    RadarTemplateComponent,
    RadarTemplateVisualizerComponent,
    FitTextDirective,
    CallToActionHeaderButton,
    VotingCodeComponent,
    IndexHeaderComponent,
    CreateRadarTemplateForm,
    GeneralModalComponent,
    WizzardArrows,
    ToastComponent,
    CloneRadarTemplateContainerFormComponent,
    ShareContainerForm,
    CreateVotingFormComponent,
    ExportDropdownComponent,
    CopyClipboardDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    FormsModule,
    NgPipesModule,
    NgbModule,
    CarouselModule.forRoot(),
    NgScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [
    {provide: 'RadarService', useClass: HttpRadarService},
    {provide: 'RadarTemplateService', useClass: HttpRadarTemplateService},
    {provide: 'RadarTemplateContainerService', useClass: HttpRadarTemplateContainerService},
    {provide: 'VotingService', useClass: HttpVotingService},
    {provide: 'UserService', useClass: HttpUserService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    ToastService,
    TokenService,
    RadarTemplateContainerExportDataHelper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
