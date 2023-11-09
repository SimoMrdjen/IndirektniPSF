import { Component } from '@angular/core';
import { ObrazacService } from '../services/obrazac.service';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //public zakList: ZakljucniList;
  selectedKvartal?: number;

  constructor(
    private zakListService: ObrazacService,
    private fileService: FileUploadService
  ) {
    // this.zakList = this.zakListService.getZakList();
  }

  ngOnInit(): void {}

  setKvartal(kvartal: number): void {
    this.selectedKvartal = kvartal;
    this.fileService.kvartal = kvartal;
    this.zakListService.kvartal = kvartal;
  }
}
