import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { KvartalService } from './kvartal.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly url = BASE_URL;
  kvartal?: number;

  constructor(
    private http: HttpClient,
    private kvartalService: KvartalService
  ) {}

  uploadExcelFile(
    file: File,
    kvartal: number,
    typeOfObrazac: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const options = {
      responseType: 'text' as 'text',
    };
    return this.http.post(
      this.url + typeOfObrazac + '/' + kvartal,
      formData,
      options
    );
  }
}
