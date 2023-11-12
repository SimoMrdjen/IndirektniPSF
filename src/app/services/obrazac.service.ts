import { HttpClient, HttpParams } from '@angular/common/http';
import { Obrazac } from '../models/zakljucni-list.model';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { KvartalService } from './kvartal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ObrazacService {
  obrazac = new Obrazac();
  url = BASE_URL;
  //status = 0;
  typeOfObrazac = '';
  // kvartal: number | undefined;

  constructor(
    private http: HttpClient,
    private kvartalService: KvartalService
  ) {
    // this.kvartalService.kvartal$.subscribe((kvartal) => {
    //   this.kvartal = kvartal;
    // });
  }

  getParams(status: number, kvartal: number): HttpParams {
    let params = new HttpParams().append('status', status);
    // if (this.kvartal !== undefined) {
    params = params.append('kvartal', kvartal);
    // }
    return params;
  }
  getParam(kvartal: number): HttpParams {
    let params = new HttpParams().append('kvartal', kvartal);
    return params;
  }

  public getObrazacZaRaiseStatus(
    status: number,
    kvartal: number
  ): Observable<Obrazac> {
    console.log('kvartal from raise status: ' + kvartal);
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

  //storno
  // storno(id: number,     status: number,
  //        kvartal: number) {
  //   const options = {
  //     responseType: 'text' as 'json',
  //     params: this.getParams(status, kvartal),
  //
  //   };
  //   return this.http.put<Obrazac>(
  //     this.url + this.typeOfObrazac + '/' + id,
  //     options
  //   );
  // }

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
