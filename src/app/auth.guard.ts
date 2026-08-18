import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';
import { SharedService } from './services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private sharedService: SharedService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.isLoggedIn(); // Call the isLoggedIn function

    if (!isLoggedIn) {
      // Sesija je nevazeca ili je token istekao - obrisi zaostalu sesiju
      // (da nav bar/role prikaz ne ostane "zaglavljen" na starim podacima)
      // i vrati korisnika na login stranicu.
      localStorage.clear();
      this.sharedService.setIndirektni(null);
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  private isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // get token from local storage
    if (token) {
      return !this.tokenService.isTokenExpired(token); // return true if token is not expired
    } else {
      return false; // return false if no token
    }
  }
}
