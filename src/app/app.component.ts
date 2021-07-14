import {Component, OnInit} from '@angular/core';
import {getTheme} from "./theme-and-colors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(): void {
    document.body.dataset.theme = getTheme().name;
  }

  getSpinnerColor(): string {
    return getTheme().radarColor;
  }

  getLogo(): string {
    return getTheme().logo;
  }
}
