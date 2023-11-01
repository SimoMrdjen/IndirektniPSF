import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private readonly url = BASE_URL + 'download/';
  //public typeOfObrazac: string = '';

  constructor(private http: HttpClient) {}

  downloadObrazac(typeOfObrazac: string): Observable<Blob> {
    const options = {
      params: new HttpParams().set('typeOfObrazac', typeOfObrazac),
      responseType: 'blob' as 'json',
    };
    return this.http.get<Blob>(this.url, options);
  }
}
