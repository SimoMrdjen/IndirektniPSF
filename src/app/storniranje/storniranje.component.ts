import { Component, OnInit } from '@angular/core';
import { Obrazac } from '../models/zakljucni-list.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../services/obrazac.service';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';
import { KvartalService } from '../services/kvartal.service';

@Component({
  selector: 'app-storniranje',
  templateUrl: './storniranje.component.html',
  styleUrls: ['./storniranje.component.css'],
})
export class StorniranjeComponent implements OnInit {
  public obrazacList: Obrazac[] = [];

  constructor(
    private notification: NzNotificationService,
    private service: ObrazacService,
    private router: Router,
    private kvartalService: KvartalService
  ) {}

  ngOnInit(): void {
    this.getObrazacZaStorno();
  }

  stornoObrazac(zakList: Obrazac) {
    const kvartal = this.kvartalService.getKvartal();

    if (zakList.id !== undefined && kvartal !== undefined) {
      this.service.stornoObrazac(zakList.id, kvartal).subscribe({
        next: (response) => {
          console.log(response);
          // this.zakList = <any>response;
          this.notification.create(
            'success',
            'Obrazac je uspesno storniran! ',
            response
          );
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Sorniranje nije uspelo! ',
            err.error
          );
        },
      });
    } else {
    }
    this.router.navigate(['/']);
  }

  private getObrazacZaStorno() {
    const kvartal = this.kvartalService.getKvartal();
    if (kvartal !== undefined) {
      this.service.getObrazacZaStorno(kvartal).subscribe({
        next: (response) => {
          console.log(response);
          this.obrazacList = <any>response;
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Ne postoji obrazac za storniranje ',
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
}
