import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly url = 'http://localhost:8080/api/v1/auth/authenticate';
  user?: User;

  constructor(private http: HttpClient, private router: Router) {}

  /* login(user: User): Observable<any> {
    console.log('Sending login request...');
    const headers = new HttpHeaders().set('X-Skip-Interceptor', '');
    // this.http.post(this.url, user);
    return this.http.post<User>(this.url, user);
  } */

  login(user: User): Observable<any> {
    console.log('Sending login request...');
    return this.http.post<User>(this.url, user).pipe(
      tap((data) => console.log('response data:', data)),
      catchError((error) => {
        console.error('error caught in service:', error);
        return throwError(error);
      })
    );
  }
}
