import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { KvartalService } from './kvartal.service';
import { BASE_URL } from '../constants';

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

  uploadExcelFile(file: File, kvartal: number, typeOfObrazac: string): Observable<any> {
    // Create a new FormData object to hold the file
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Generate a unique UUID for the Idempotency-Key
    const idempotencyKey = uuidv4();

    // Create headers, including the Idempotency-Key
    const headers = new HttpHeaders({
      'Idempotency-Key': idempotencyKey
    });

    // Options including headers and the expected response type
    const options = {
      headers: headers,
      responseType: 'text' as 'text'
    };

    // Perform the POST request to upload the file
    return this.http.post(`${this.url}${typeOfObrazac}/${kvartal}`, formData, options)
      .pipe(
        catchError((error) => {
          // Log and rethrow the error for further handling if necessary
          console.error('Error uploading file:', error);
          return throwError(() => new Error('Error uploading file: ' + error.message));
        })
      );
  }
*/

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

