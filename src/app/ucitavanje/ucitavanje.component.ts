import { Component, OnInit } from '@angular/core';
import { ZakljucniList } from '../models/zakljucni-list/zakljucni-list.model';
import { ZakljucniListService } from '../zakljucni-list.service';

@Component({
  selector: 'app-ucitavanje',
  templateUrl: './ucitavanje.component.html',
  styleUrls: ['./ucitavanje.component.css'],
})
export class UcitavanjeComponent implements OnInit {
  public zakList: ZakljucniList;

  constructor(private zakListService: ZakljucniListService) {
    this.zakList = this.zakListService.getZakList();
  }

  ngOnInit(): void {}
}
