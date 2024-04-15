import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role.model';
import { ObrazacService } from './services/obrazac.service';
import { KvartalService } from './services/kvartal.service';
import { Subscription } from 'rxjs';
import { IndirektniService } from './services/indirektni.service';
import { SharedService } from './services/shared.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  indirektni?: string|null;
  private indirektniSubscription?: Subscription;
  title = 'indirektni-psf';
  role?: Role;
  Role = Role;
  kvartal: number | undefined;
  private kvartalSubscription?: Subscription;



  constructor(
    private router: Router,
    private kvartalService: KvartalService,
    private indirektniService: IndirektniService,
    private sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.indirektniSubscription = this.sharedService.indirektni$.subscribe(indirektni => {
      this.indirektni = indirektni;
    });
    const roleStr = localStorage.getItem('role');
    if (roleStr) {
      this.role = Role[roleStr as keyof typeof Role];
    }
    this.kvartalSubscription = this.kvartalService.kvartal$.subscribe(
      (kvartal) => {
        this.kvartal = kvartal;
        console.log('This is kvartal from app onInit : ' + kvartal);
      }
    );
  }

  ngOnDestroy(): void {
    this.indirektniSubscription?.unsubscribe();
    if (this.kvartalSubscription) {
      this.kvartalSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    localStorage.clear(); // Clear all local storage
    this.sharedService.setIndirektni(null); // Clear shared service state
    this.router.navigate(['/login']).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('indirektni');
      this.sharedService.setIndirektni(null); // Reset the indirektni in shared service
      //this.sharedService.setKvartal(null);
    });
  }
}
/*
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
  indirektni?: string | null; 
  private kvartalSubscription?: Subscription;
  private indirektniSubscription?: Subscription;

  constructor(
    private router: Router,
    private kvartalService: KvartalService,
    //private indirektniService: IndirektniService,
    private sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef,

  ) {}

  ngOnInit(): void {
    const roleStr = localStorage.getItem('role');
    if (roleStr) {
      this.role = Role[roleStr as keyof typeof Role];
    }
    this.indirektni = localStorage.getItem('indirektni') || undefined;
    this.indirektniSubscription = this.sharedService.indirektni$.subscribe(indirektni => {
      this.indirektni = indirektni;
      this.changeDetectorRef.detectChanges(); // Trigger change detection
    });
 
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
    this.sharedService.setIndirektni(null); // Reset the indirektni in shared service
    //this.sharedService.setKvartal(null); // Reset the kvartal in shared service

    this.router.navigate(['/login']);
  }
}

*/
