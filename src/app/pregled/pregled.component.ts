import { Component, OnInit } from '@angular/core';
import { Obrazac } from '../models/obrazac.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ObrazacService } from '../services/obrazac.service';
import { Router } from '@angular/router';
import { KvartalService } from '../services/kvartal.service';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css'],
})
export class PregledComponent implements OnInit {
  public obrazacList: Obrazac[] = [];

  constructor(
    private notification: NzNotificationService,
    private service: ObrazacService,
    private router: Router,
    private kvartalService: KvartalService
  ) {}

  ngOnInit(): void {
    console.log(
      'This is from review . Kvartal is : ' + this.kvartalService.getKvartal()
    );
    this.getReview();
  }

  getReview() {
    const kvartal = this.kvartalService.getKvartal();

    if (kvartal !== undefined) {
      this.service.getReview(kvartal).subscribe({
        next: (response) => {
          console.log(response);
          this.obrazacList = <any>response;
        },
        error: (err) => {
          this.notification.create(
            'error',
            'Ne postoji dokumenti za prikaz ',
            err.error
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
  getObrazacDetails(obrazac: Obrazac) {
    this.service.obrazac = obrazac;
    this.router.navigate(['/details']);
  }
}
