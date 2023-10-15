import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'indirektni-psf';
  role?: Role;
  Role = Role;

  constructor(private router: Router) {}
  ngOnInit(): void {
    const roleStr = localStorage.getItem('role');
    if (roleStr) {
      this.role = Role[roleStr as keyof typeof Role];
      console.log('Ovo je rola' + this.role);
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
