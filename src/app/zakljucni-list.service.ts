import { ZakljucniList } from './models/zakljucni-list/zakljucni-list.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZakljucniListService {
  zakljucniList: ZakljucniList;
  constructor() {
    this.zakljucniList = new ZakljucniList(5, '444444');
  }
  public getZakList(): ZakljucniList {
    return this.zakljucniList;
  }
}
