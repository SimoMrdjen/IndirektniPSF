import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private indirektniSource = new BehaviorSubject<string | null>(null);
  indirektni$ = this.indirektniSource.asObservable();

  constructor() {}

  setIndirektni(indirektni: string | null): void {
    this.indirektniSource.next(indirektni);
  }

  getIndirektni(): Observable<string | null> {
    return this.indirektniSource.asObservable();
  }
}
