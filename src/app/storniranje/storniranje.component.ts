import { Component, OnInit } from '@angular/core';
import { Obrazac } from '../models/zakljucni-list.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../services/obrazac.service';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';

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
    private typeService: TypeOfObrazacService
  ) {}

  ngOnInit(): void {
    this.getObrazacZaStorno();
  }

  stornoObrazac(zakList: Obrazac) {
    if (zakList.id !== undefined) {
      this.service.stornoObrazac(zakList.id).subscribe({
        next: (response) => {
          console.log(response);
          // this.zakList = <any>response;
          this.notification.create(
            'success',
            'Obrazac je uspesno storniran! ',
            ''
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
    this.service.getObrazacZaStorno().subscribe({
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
  }
}
