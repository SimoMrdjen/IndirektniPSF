import { Component, OnInit } from '@angular/core';
import { ZakljucniList } from '../models/zakljucni-list.model';
import { ZakljucniListService } from '../services/zakljucni-list.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TypeOfObrazacService } from '../services/type-of-obrazac.service';

@Component({
  selector: 'app-odobravanje',
  templateUrl: './odobravanje.component.html',
  styleUrls: ['./odobravanje.component.css'],
})
export class OdobravanjeComponent implements OnInit {
  public zakLists: ZakljucniList[] = [];

  constructor(
    private notification: NzNotificationService,
    private service: ZakljucniListService,
    private router: Router,
    private typeService: TypeOfObrazacService
  ) {}

  ngOnInit(): void {
    this.getZakList();
  }

  getZakList() {
    this.service.status = 0;
    this.service.getZakList().subscribe({
      next: (response) => {
        console.log(response);
        this.zakLists = <any>response;
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

  raiseStatus(zakList: ZakljucniList) {
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
            err.message
          );
        },
      });
    } else {
    }
  }
}
