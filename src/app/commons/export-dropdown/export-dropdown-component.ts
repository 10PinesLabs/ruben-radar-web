import {Component, Input} from '@angular/core';
import {ngxCsv} from 'ngx-csv';
import * as html2pdf from 'html2pdf.js';

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

  generatePDF = () => {
    const options = {
      filename: `unaarchivo.pdf`,
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };

    const polygonGraphic: Element = document.getElementById('radar-template-polygon-graphic');
    const axesGraphic: Element = document.getElementById('radar-template-axes-graphic');

    html2pdf().from(polygonGraphic).set(options).toPdf().get('pdf').then(function (pdf) {
      pdf.addPage();
    }).from(axesGraphic).toContainer().toCanvas().toPdf().save();

  }
}
