import {Component, Input} from '@angular/core';
import {ngxCsv} from 'ngx-csv';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {RadarTemplateContainer} from '../../../model/radarTemplateContainer';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-export-dropdown',
  templateUrl: './export-dropdown.component.html',
  styleUrls: ['./export-dropdown.component.scss']
})
export class ExportDropdownComponent {
  @Input() data = [];
  @Input() headers = [];
  @Input() filename = 'rawData';
  @Input() radarTemplateContainer: RadarTemplateContainer;

  resultsCSV = () =>  {
    const options = {
      headers: this.headers,
    };
    return new ngxCsv(JSON.stringify(this.data), this.filename + '.csv', options);
  }

  generatePDF = () => {
    const docDefinition = {
      header: {
        text: this.radarTemplateContainer.name,
        style: 'sectionHeader'
      },
      styles: {
        sectionHeader: {
          margin: [15,15,15,15],
          alignment: 'center',
          bold: true,
          decoration: 'underline',
          fontSize: 24,
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
