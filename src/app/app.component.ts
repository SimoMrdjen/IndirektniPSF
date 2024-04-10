import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role.model';
import { ObrazacService } from './services/obrazac.service';
import { KvartalService } from './services/kvartal.service';
import { Subscription } from 'rxjs';
import { IndirektniService } from './services/indirektni.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'indirektni-psf';
  role?: Role;
  Role = Role;
  kvartal: number | undefined;
  indirektni?: string;
  private kvartalSubscription?: Subscription;
  private indirektniSubscription?: Subscription;

  constructor(
    private router: Router,
    private kvartalService: KvartalService,
    private indirektniService: IndirektniService
  ) {}
  ngOnInit(): void {
    const roleStr = localStorage.getItem('role');
    if (roleStr) {
      this.role = Role[roleStr as keyof typeof Role];
    }
    this.indirektni = localStorage.getItem('indirektni') || undefined;

    // this.indirektniSubscription = this.indirektniService.indirektni$.subscribe(
    //   (indirektni) => {
    //     this.indirektni = localStorage.getItem('indirektni') || undefined;
    //     console.log('This is kvartal from app onInit : ' + indirektni);
    //   }
    // );

    this.kvartalSubscription = this.kvartalService.kvartal$.subscribe(
      (kvartal) => {
        this.kvartal = kvartal;
        console.log('This is kvartal from app onInit : ' + kvartal);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.kvartalSubscription) {
      this.kvartalSubscription.unsubscribe();
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('indirektni');

    this.router.navigate(['/login']);
  }
}
