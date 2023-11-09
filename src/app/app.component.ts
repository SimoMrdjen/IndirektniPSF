import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role.model';
import { ObrazacService } from './services/obrazac.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'indirektni-psf';
  role?: Role;
  Role = Role;
  kvartal = this.obrazacService.kvartal;
  indirektni?: string;

  constructor(private router: Router, private obrazacService: ObrazacService) {}
  ngOnInit(): void {
    const roleStr = localStorage.getItem('role');
    if (roleStr) {
      this.role = Role[roleStr as keyof typeof Role];
      console.log('Ovo je rola' + this.role);
    }
    //this.kvartal = this.obrazacService.kvartal;
    this.indirektni = localStorage.getItem('indirektni') || undefined;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('indirektni');

    this.router.navigate(['/login']);
  }
}
