import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/authenticate')) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');
    if (!token || this.tokenService.isTokenExpired(token)) {
      this.redirectToLoginDueToExpiredSession();
      // EMPTY se odmah zavrsava (complete), za razliku od praznog Observable-a koji
      // nikad ne emituje ni ne zavrsava - a to je ranije ostavljalo pozivaoca (i UI)
      // da zauvek ceka odgovor koji nikad nece stici.
      return EMPTY;
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }

  private redirectToLoginDueToExpiredSession(): void {
    if (this.router.url.startsWith('/login')) {
      return;
    }
    localStorage.clear();
    this.sharedService.setIndirektni(null);
    this.router.navigate(['/login']);
  }
}
