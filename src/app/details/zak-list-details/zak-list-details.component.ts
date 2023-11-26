import { Component } from '@angular/core';
import { Obrazac } from '../../models/obrazac.model';
import { ZakList } from '../../models/zakList.model';
import { ObrazacIO } from '../../models/obrazac-io.model';
import { Obrazac5 } from '../../models/obrazac5.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../../services/obrazac.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zak-list-details',
  templateUrl: './zak-list-details.component.html',
  styleUrls: ['./zak-list-details.component.css'],
})
export class ZakListDetailsComponent {
  zakLists: ZakList[] = [];
  stavke = 'STAVKE DOKUMENTA';
  constructor(
    private notification: NzNotificationService,
    private service: ObrazacService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.zakLists$.subscribe((zakLists) => (this.zakLists = zakLists));
  }
}
