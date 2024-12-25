import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
        ) {}

        canActivate(): Observable<boolean> {
          const authState$ = this.loginService.authStateObservable();
          if (!authState$) {
              return of(false);
          }

          return authState$.pipe(
              map((user) => {
                  return user?.isAdmin === true;
              }),
              catchError(() => {
                return of(false);
            })

          );
      }

}
