import { Component, OnInit } from '@angular/core';
import { Obrazac } from '../models/zakljucni-list.model';
import { ObrazacService } from '../services/obrazac.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
            'Obrazac je uspesno odobren! ',
            ''
          );
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Odobravanje nije uspelo! ',
            err.error
          );
        },
      });
    } else {
    }
    this.router.navigate(['/']);
  }

  // raiseStatus(zakList: Obrazac) {
  //   if (zakList.id !== undefined) {
  //     this.service.raiseStatus(zakList.id).subscribe({
  //       next: (response: any) => {
  //         if (response instanceof HttpResponse) {
  //           const body: string = response.body;
  //           console.log('Success block:', body);
  //           this.notification.create(
  //             'success',
  //             'Obrazac je uspesno odobren!',
  //             body
  //           );
  //         }
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log('Error block:', err);
  //         this.notification.create(
  //           'error',
  //           'Odobravanje nije uspelo!',
  //           err.message
  //         );
  //       },
  //     });
  //   }
  //   this.router.navigate(['/']);
  // }
}
