import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndirektniService {
  private indirektniSource = new BehaviorSubject<string | null>(null);
  indirektni$ = this.indirektniSource.asObservable();

  setKvartal(indirektni: string | null | undefined) {
    if (indirektni !== undefined) {
      this.setKvartal(indirektni);
  } else {
      this.setKvartal(''); // or null, depending on what should happen when undefined
  }}


  getKvartal() {
    return this.indirektniSource.value;
  }
setIndirektni(value: string | null): void {
    this.indirektniSource.next(value);
    localStorage.setItem('indirektni', value ?? ''); // Use an empty string or similar if null
}
}
