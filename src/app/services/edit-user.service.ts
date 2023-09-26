import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  public user: User | null = null;
  private visibilitySubject = new BehaviorSubject<boolean>(false);

  // Observable to expose the visibility subject value
  public visibility$ = this.visibilitySubject.asObservable();

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
