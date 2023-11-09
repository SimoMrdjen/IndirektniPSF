import { FileUploadService } from './../services/file-upload.service';
import { Component, OnInit } from '@angular/core';
//import { ZakljucniList } from '../models/zakljucni-list.model';
import { ObrazacService } from '../services/obrazac.service';

@Component({
  selector: 'app-ucitavanje',
  templateUrl: './ucitavanje.component.html',
  styleUrls: ['./ucitavanje.component.css'],
})
export class UcitavanjeComponent implements OnInit {
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
