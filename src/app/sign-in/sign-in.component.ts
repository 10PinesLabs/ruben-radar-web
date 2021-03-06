import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {TokenService} from 'src/services/token.service';
import {getTheme} from "../theme-and-colors";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  providers = [];

  constructor(private session: TokenService,  private router: Router) {
      if (session.isLoggedIn()) { this.router.navigateByUrl('/radarTemplates'); }
   }

  ngOnInit() {
    this.providers = environment.logins;
  }

  apiURL() {
    return environment.apiURL;
  }

  loginWith(providerName) {
    return () => window.location.href = this.providerUrl(providerName);
  }

  providerUrl(providerName) {
    return `${ this.apiURL() }/auth/${providerName}/redirect`;
  }

  getLogo() {
    return getTheme().logo;
  }
}
