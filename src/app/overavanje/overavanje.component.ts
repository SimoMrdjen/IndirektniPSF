import { Component } from '@angular/core';
import { Obrazac } from '../models/zakljucni-list.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../services/obrazac.service';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';

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
    private typeService: TypeOfObrazacService
  ) {}

  ngOnInit(): void {
    this.getObrazacZaRaiseStatus();
  }

  getObrazacZaRaiseStatus() {
    this.service.status = 10;
    this.service.getObrazacZaRaiseStatus().subscribe({
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
  }

  raiseStatus(zakList: Obrazac) {
    if (zakList.id !== undefined) {
      this.service.raiseStatus(zakList.id).subscribe({
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
    this.router.navigate(['/']);
  }
}
