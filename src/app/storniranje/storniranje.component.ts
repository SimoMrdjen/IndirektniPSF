import { Component, OnInit } from '@angular/core';
import { ZakljucniList } from '../models/zakljucni-list/zakljucni-list.model';

@Component({
  selector: 'app-storniranje',
  templateUrl: './storniranje.component.html',
  styleUrls: ['./storniranje.component.css'],
})
export class StorniranjeComponent implements OnInit {
  public zakList: ZakljucniList = new ZakljucniList();

  ngOnInit(): void {}
}
