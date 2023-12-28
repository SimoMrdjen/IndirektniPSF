import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndirektniService {
  private indirektniSubject = new BehaviorSubject<string | undefined>(
    undefined
  );
  indirektni$ = this.indirektniSubject.asObservable();

  setKvartal(indirektni: string | undefined) {
    this.indirektniSubject.next(indirektni);
  }

  getKvartal() {
    return this.indirektniSubject.value;
  }
}
