import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-csv-downloader',
  templateUrl: './csv-downloader.component.html',
  styleUrls: ['./csv-downloader.component.scss']
})
export class CsvDownloaderComponent {

  @Input() data = [];
  @Input() headers = [];
  @Input() filename = 'rawData';
}
