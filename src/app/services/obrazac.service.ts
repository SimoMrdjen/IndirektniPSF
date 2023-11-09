import { HttpClient, HttpParams } from '@angular/common/http';
import { Obrazac } from '../models/zakljucni-list.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ObrazacService {
  obrazac = new Obrazac();
  url = BASE_URL;
  status = 0;
  typeOfObrazac = '';
  kvartal?: number;

  constructor(private http: HttpClient) {}

  getParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('status', this.status);
    //params = params.append('typeOfObrazac', this.typeOfObrazac);
    return params;
  }

  public getObrazacZaRaiseStatus(): Observable<Obrazac> {
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.get<Obrazac>(this.url + this.typeOfObrazac, options);
  }

  raiseStatus(id: number) {
    const options: any = {
      responseType: 'text' as 'text',
    };
    return this.http.put<any>(
      this.url + this.typeOfObrazac + '/status/' + id,
      {},
      options
    );
  }

  //storno
  storno(id: number) {
    const options = {
      responseType: 'text' as 'json',
    };
    return this.http.put<Obrazac>(
      this.url + this.typeOfObrazac + '/' + id,
      options
    );
  }

  getObrazacZaStorno() {
    console.log('Type of obrazac: ' + this.typeOfObrazac);
    const options = {
      //params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.get<Obrazac>(
      this.url + this.typeOfObrazac + '/storno/' + this.kvartal,
      options
    );
  }

  stornoObrazac(id: number): Observable<any> {
    const options: any = {
      responseType: 'text' as 'json',
    };
    return this.http.put(
      this.url + this.typeOfObrazac + '/storno/' + id,
      {},
      options
    );
  }
}
