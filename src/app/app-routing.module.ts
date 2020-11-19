import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RadarVoteComponent } from './radar-vote/radar-vote.component';
import { ResultsComponent } from './results/results.component';
import { IndexComponent } from './index/index.component';
import { CreateRadarComponent } from './create-radar/create-radar.component';
import { TokenComponent } from './token/token.component';
import { ErrorComponent } from './error/error.component';
import { SelectToCompareComponent } from './select-to-compare/select-to-compare.component';
import { CompareRadarsComponent } from './compare-radars/compare-radars.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {CreateRadarTemplateComponent} from './create-radar-template/create-radar-template.component';
import {RadarTemplateContainerComponent} from './radar-template/container/radar-template-container.component';
import { VotingCodeComponent } from './voting-code/voting-code.component';
import { pages } from 'src/services/currentPage.service';
import {VotingResolver} from './resolvers/voting-resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignInComponent, data: {page: pages.LOGIN}},
  { path: 'radarTemplates', component: IndexComponent, data: {page: pages.INDEX} },
  { path: 'token/:token', component: TokenComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'vote/:code', component: RadarVoteComponent, resolve: {voting: VotingResolver} },
  { path: 'results/:code', component: RadarTemplateContainerComponent},
  { path: 'radar/:id/results', component: ResultsComponent },
  { path: 'radar/create', component: CreateRadarComponent },
  { path: 'radarTemplate/create', component: CreateRadarTemplateComponent },
  { path: 'radar/create/:id', component: CreateRadarComponent },
  { path: 'selectToCompare', component: SelectToCompareComponent },
  { path: 'radarTemplateContainer/:id', component: RadarTemplateContainerComponent },
  { path: 'radars/compare/:firstRadarId/:secondRadarId', component: CompareRadarsComponent },
  { path: 'code', component: VotingCodeComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ VotingResolver ]
})
export class AppRoutingModule {}
