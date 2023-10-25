import { Component, OnInit } from '@angular/core';
import { Obrazac } from '../models/zakljucni-list.model';
import { ObrazacService } from '../services/obrazac.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';

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
    private typeService: TypeOfObrazacService
  ) {}

  ngOnInit(): void {
    this.getObrazacZaRaiseStatus();
  }

  getObrazacZaRaiseStatus() {
    this.service.status = 0;
    this.service.getObrazacZaRaiseStatus().subscribe({
      next: (response) => {
        console.log(response);
        this.obrazacList = <any>response;
      },
      error: (err) => {
        this.notification.create(
          'error',
          'Ne postoji obrazac za odobravanje ',
          err.message
        );
      },
    });
  }

  raiseStatus(zakList: Obrazac) {
    if (zakList.id !== undefined) {
      this.service.raiseStatus(zakList.id).subscribe({
        next: (response) => {
          console.log(response);

          this.notification.create(
            'success',
            'Obrazac je uspesno odobren! ',
            response
          );
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Odobravanje nije uspelo! ',
            err.message
          );
        },
      });
    } else {
    }
    this.router.navigate(['/']);
  }
}
