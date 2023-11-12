import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KvartalService {
  private kvartalSubject = new BehaviorSubject<number | undefined>(undefined);
  kvartal$ = this.kvartalSubject.asObservable();

  setKvartal(kvartal: number | undefined) {
    this.kvartalSubject.next(kvartal);
  }

  getKvartal() {
    return this.kvartalSubject.value;
  }
}
