import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { KvartalService } from './kvartal.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID function

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

  uploadExcelFile(file: File, kvartal: number, typeOfObrazac: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Generate a UUID for the Idempotency-Key
    const idempotencyKey = uuidv4();

    // Prepare headers with the Idempotency-Key
    const headers = new HttpHeaders({
      'Idempotency-Key': idempotencyKey
    });

    const options = {
      headers: headers,
      responseType: 'text' as 'text'
    };

    return this.http.post(`${this.url}${typeOfObrazac}/${kvartal}`, formData, options);
  }
}

/*
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
*/