import { HttpClient, HttpParams } from '@angular/common/http';
import { Obrazac } from '../models/obrazac.model';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../constants';
import { KvartalService } from './kvartal.service';
import { Router } from '@angular/router';
import { ZakList } from '../models/zakList.model';
import { ObrazacIO } from '../models/obrazac-io.model';
import { Obrazac5 } from '../models/obrazac5.model';

@Injectable({
  providedIn: 'root',
})
export class ObrazacService {
  obrazac = new Obrazac();
  url = BASE_URL;
  typeOfObrazac = '';
  obrazacIoList: ObrazacIO[] = [];
  obrazac5List: Obrazac5[] = [];

  private zakListsSource = new BehaviorSubject<ZakList[]>([]);
  zakLists$ = this.zakListsSource.asObservable();

  updateZakLists(zakLists: ZakList[]) {
    this.zakListsSource.next(zakLists);
  }

  constructor(
    private http: HttpClient,
    private kvartalService: KvartalService
  ) {}

  getParams(status: number, kvartal: number): HttpParams {
    let params = new HttpParams().append('status', status);
    params = params.append('kvartal', kvartal);
    return params;
  }
  getParamsWithType(kvartal: number, typeOfObrazac: string): HttpParams {
    let params = new HttpParams().append('kvartal', kvartal);
    params = params.append('typeOfObrazac', typeOfObrazac);
    return params;
  }
  getParam(kvartal: number): HttpParams {
    let params = new HttpParams().append('kvartal', kvartal);
    return params;
  }
  getReview(kvartal: number): Observable<any> {
    const options = {
      params: this.getParam(kvartal),
      responseType: 'json' as 'json',
    };
    return this.http.get<Obrazac>(this.url + 'review', options);
  }

  public getObrazacDetails(
    id: number,
    kvartal: number,
    obrazacType: string
  ): Observable<Obrazac> {
    const options = {
      params: this.getParamsWithType(kvartal, obrazacType),
      responseType: 'json' as 'json',
    };
    return this.http.get<Obrazac>(this.url + 'review/' + id, options);
  }

  public getObrazacZaRaiseStatus(
    status: number,
    kvartal: number
  ): Observable<Obrazac> {
    const options = {
      params: this.getParams(status, kvartal),
      responseType: 'json' as 'json',
    };
    return this.http.get<Obrazac>(this.url + this.typeOfObrazac, options);
  }

  raiseStatus(id: number, kvartal: number) {
    const options: any = {
      responseType: 'text' as 'text',
      params: this.getParam(kvartal),
    };
    return this.http.put<any>(
      this.url + this.typeOfObrazac + '/status/' + id,
      {},
      options
    );
  }

  getObrazacZaStorno(kvartal: number) {
    console.log('Type of obrazac: ' + this.typeOfObrazac);
    const options = {
      params: this.getParam(kvartal),
      responseType: 'json' as 'json',
    };
    return this.http.get<Obrazac>(
      this.url + this.typeOfObrazac + '/storno', //+ this.kvartal,
      options
    );
  }

  stornoObrazac(id: number, kvartal: number): Observable<any> {
    const options: any = {
      responseType: 'text' as 'json',
      params: this.getParam(kvartal),
    };
    return this.http.put(
      this.url + this.typeOfObrazac + '/storno/' + id,
      {},
      options
    );
  }
}
