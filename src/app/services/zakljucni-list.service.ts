import { HttpClient, HttpParams } from '@angular/common/http';
import { ZakljucniList } from '../models/zakljucni-list.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ZakljucniListService {
  zakljucniList?: ZakljucniList;
  url = BASE_URL + 'zakljucni_list';
  status = 0;

  constructor(private http: HttpClient) {}

  getParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('status', this.status);
    return params;
  }

  public getZakList(): Observable<ZakljucniList> {
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.get<ZakljucniList>(this.url, options);
  }

  raiseStatus(id: number) {
    const options = {
      responseType: 'json' as 'json',
    };
    return this.http.put<ZakljucniList>(this.url + '/' + id, options);
  }
}
