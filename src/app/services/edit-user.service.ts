import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EditUserService implements OnInit {
  private readonly url = 'http://localhost:8080/api/v1/users';
  public user: User | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {}

  getToken(): any {
    if (localStorage.getItem('token')?.length === 0) {
      this.router.navigate(['/login']);
      return;
    }
    return localStorage.getItem('token');
  }

  getUsers(): Observable<User[]> {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW1vMSIsImlhdCI6MTY5NTkwODM3NCwiZXhwIjoxNjk1OTk0Nzc0fQ.GfzIpndBHj8wxmLjgfApxa6TeW-yofeOyVj0SvYRk18';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token, //this.getToken(),
    });
    return this.http.get<User[]>(this.url, { headers: headers });
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
