import { Component, OnInit } from '@angular/core';
import { ZakljucniList } from '../models/zakljucni-list/zakljucni-list.model';

@Component({
  selector: 'app-ucitavanje',
  templateUrl: './ucitavanje.component.html',
  styleUrls: ['./ucitavanje.component.css'],
})
export class UcitavanjeComponent implements OnInit {
  public zakList: ZakljucniList;
  constructor() {
    this.zakList = new ZakljucniList(1, '411212');
  }

  ngOnInit(): void {}
}
