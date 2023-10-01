import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EditUserService implements OnInit {
  private readonly url = 'http://localhost:8080/api/v1/users';
  public user: User | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    console.log('constructor() is running in service');
  }

  ngOnInit(): void {
    console.log('ngOnIit() is running in service');
  }

  getParams(): HttpParams {
    let params = new HttpParams();
    if (this.user?.sifraradnika) {
      params = params.append('id', this.user.sifraradnika);
    }
    return params;
  }

  getHeaders(): HttpHeaders {
    const token = //getToken();
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW1vIiwiaWF0IjoxNjk2MTc2NDI5LCJleHAiOjE2OTYyNjI4Mjl9.3K0sb-pxNFqA_OlLb9tmz3RHCd1OAKAqpfQlijQwYNU';
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  ////////////////////////////////////

  editUser(user: User): Observable<User> {
    console.log('editUser is running');
    const options = {
      headers: this.getHeaders(),
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.put<User>(this.url, user, options);
  }

  ////////////////////////////////////

  getToken(): any {
    if (localStorage.getItem('token')?.length === 0) {
      this.router.navigate(['/login']);
      return;
    }
    return localStorage.getItem('token');
  }

  getUsers(): Observable<User[]> {
    console.log('getUsers() is running');
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW1vIiwiaWF0IjoxNjk2MTA1OTI4LCJleHAiOjE2OTYxOTIzMjh9.yncG2UOkuST4hTijo0hM_RtYDog37gTQsPiavVpFFf8';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token, //this.getToken(),
    });
    return this.http.get<User[]>(this.url, { headers: headers });
  }

  getUsersWithoutSecurity(): Observable<User[]> {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW1vIiwiaWF0IjoxNjk2MTc2NDI5LCJleHAiOjE2OTYyNjI4Mjl9.3K0sb-pxNFqA_OlLb9tmz3RHCd1OAKAqpfQlijQwYNU';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<User[]>(this.url, { headers });
  }

  setUser(user: User): void {
    this.user = user;
  }

  open(): void {
    this.visibilitySubject.next(true);
  }

  close(): void {
    this.visibilitySubject.next(false);
  }
}
