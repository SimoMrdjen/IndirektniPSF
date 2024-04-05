import { Component, OnInit } from '@angular/core';
import { Obrazac } from '../models/obrazac.model';
import { ObrazacService } from '../services/obrazac.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { KvartalService } from '../services/kvartal.service';

@Component({
  selector: 'app-odobravanje',
  templateUrl: './odobravanje.component.html',
  styleUrls: ['./odobravanje.component.css'],
})
export class OdobravanjeComponent implements OnInit {
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
      this.service.getObrazacZaRaiseStatus(0, kvartal).subscribe({
        next: (response) => {
          console.log(response);
          this.obrazacList = <any>response;
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Ne postoji obrazac za odobravanje ',
            err.error,
            { nzDuration: 10000 }
          );
          this.router.navigate(['/blank']);
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
            'Obrazac je uspesno odobren! ',
            '',
            { nzDuration: 10000 }
          );
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Odobravanje nije uspelo! ',
            err.error,
            { nzDuration: 10000 }
          );
        },
      });
    } else {
    }
    this.router.navigate(['/blank']);
  }
}
