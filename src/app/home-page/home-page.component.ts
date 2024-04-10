import { Component } from '@angular/core';
import { ObrazacService } from '../services/obrazac.service';
import { FileUploadService } from '../services/file-upload.service';
import { KvartalService } from '../services/kvartal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  //public zakList: ZakljucniList;
  selectedKvartal?: number;

  constructor(private kvartalService: KvartalService) {}

  ngOnInit(): void {}

  setKvartal(kvartal: number): void {
    this.selectedKvartal = kvartal;
    this.kvartalService.setKvartal(kvartal); // Using KvartalService to set the kvartal
  }
}
