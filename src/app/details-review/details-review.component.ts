import { Component } from '@angular/core';
import { Obrazac } from '../models/obrazac.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../services/obrazac.service';
import { Router } from '@angular/router';
import { KvartalService } from '../services/kvartal.service';
import { ZakList } from '../models/zakList.model';
import { ObrazacIO } from '../models/obrazac-io.model';
import { Obrazac5 } from '../models/obrazac5.model';

@Component({
  selector: 'app-details-review',
  templateUrl: './details-review.component.html',
  styleUrls: ['./details-review.component.css'],
})
export class DetailsReviewComponent {
  public obrazacList: Obrazac[] = [];
  //private obrazacResponse = new Obrazac();
  zakLists: ZakList[] = [];
  obrazacIoList: ObrazacIO[] = [];
  obrazac5List: Obrazac5[] = [];
  title = 'OPSTI PODACI O DOKUMENTU';
  stavke = 'STAVKE DOKUMENTA';

  constructor(
    private notification: NzNotificationService,
    private service: ObrazacService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getObrazacDetails(this.service.obrazac);
  }

  getObrazacDetails(obrazac: Obrazac) {
    if (
      typeof obrazac.kvartal === 'undefined' ||
      typeof obrazac.id === 'undefined' ||
      typeof obrazac.obrazacType === 'undefined'
    ) {
      console.error('Missing required parameters');
      return; // Exit the function if parameters are missing
    }

    const kvartal = obrazac.kvartal;
    const id = obrazac.id;
    const obrazacType = obrazac.obrazacType;

    this.service.getObrazacDetails(id, kvartal, obrazacType).subscribe({
      next: (response) => {
        this.obrazacList.push(response);
        // this.service.updateZakLists(response.zakljucniListDtos);
        this.zakLists = response.zakljucniListDtos || [];
        this.obrazacIoList = response.obrazacIODTOS || [];
        this.obrazac5List = response.obrazac5DTOS || [];
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.notification.create(
          'error',
          'Ne postoji dokumenti za prikaz ',
          err.message || 'Unknown error occurred'
        );
        this.router.navigate(['/blank']);
      },
    });
  }
}
