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

  editUser(user: User): Observable<User> {
    console.log('editUser is running');
    const options = {
      params: this.getParams(),
      responseType: 'json' as 'json',
    };
    return this.http.put<User>(this.url, user, options);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUsersWithoutSecurity(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  //methods for Drawer

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
