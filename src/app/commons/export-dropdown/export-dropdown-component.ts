import {Component, Input} from '@angular/core';
import {ngxCsv} from 'ngx-csv';

@Component({
  selector: 'app-export-dropdown',
  templateUrl: './export-dropdown.component.html',
  styleUrls: ['./export-dropdown.component.scss']
})
export class ExportDropdownComponent {
  @Input() data = [];
  @Input() headers = [];
  @Input() filename = 'rawData';

  resultsCSV = () =>  {
    const options = {
      headers: this.headers,
    };
    return new ngxCsv(JSON.stringify(this.data), this.filename + '.csv', options);
  }
}
