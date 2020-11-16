import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import {RadarTemplateContainer} from '../../model/radarTemplateContainer';
import { CurrentPageService } from 'src/services/currentPage.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  LOGIN = "Login";
  LOGOUT = "Logout";
  username = "Username";
  isDropdownOpen : boolean = false;
  radarTemplateContainers: RadarTemplateContainer[];
  constructor(private tokenService: TokenService, private router: Router
    ,private currentPageService : CurrentPageService) {
    }

  ngOnInit(): void {
    this.tokenService.getCurrentUser().subscribe((user) => {
      this.username = user.name
    });
  }

  apiURL() {
    return environment.apiURL;
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  isInIndex() : boolean{
    return this.currentPageService.isInIndex();
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(["/"]);
  }

  navegateToRadares() {
    this.router.navigate(["/radarTemplates"]);
  }

  dropdownToggle(){
    this.isDropdownOpen = !this.isDropdownOpen
  }
  hideDropdown(){
    this.isDropdownOpen = false;
  }
}
