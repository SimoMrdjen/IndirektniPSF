import { Component } from '@angular/core';
import { Obrazac } from '../models/obrazac.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../services/obrazac.service';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';
import { KvartalService } from '../services/kvartal.service';

@Component({
  selector: 'app-overavanje',
  templateUrl: './overavanje.component.html',
  styleUrls: ['./overavanje.component.css'],
})
export class OveravanjeComponent {
  public obrazacList: Obrazac[] = [];

  constructor(
    private notification: NzNotificationService,
    private service: ObrazacService,
    private router: Router,
    private kvartalService: KvartalService
  ) {}

  ngOnInit(): void {
    this.getObrazacZaRaiseStatus();
  }

  getObrazacZaRaiseStatus() {
    const kvartal = this.kvartalService.getKvartal();

    if (kvartal !== undefined) {
      this.service.getObrazacZaRaiseStatus(10, kvartal).subscribe({
        next: (response) => {
          console.log(response);
          this.obrazacList = <any>response;
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Ne postoji obrazac za overavanje ',
            err.error
          );
          this.router.navigate(['/']);
        },
      });
    } else {
      // Handle the undefined case, perhaps show an error or use a default value
      console.error('Kvartal is undefined');
      this.router.navigate(['/']);
    }
  }

  raiseStatus(zakList: Obrazac) {
    const kvartal = this.kvartalService.getKvartal();
    if (zakList.id !== undefined && kvartal !== undefined) {
      this.service.raiseStatus(zakList.id, kvartal).subscribe({
        next: (response) => {
          console.log(response);
          // this.zakList = <any>response;
          this.notification.create(
            'success',
            'Obrazac je uspesno overen! ',
            ''
          );
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Overavanje nije uspelo! ',
            err.error
          );
        },
      });
    } else {
    }
    this.router.navigate(['/blank']);
  }
}
