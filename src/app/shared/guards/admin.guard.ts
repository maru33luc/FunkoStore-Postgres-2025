import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
        ) {}

    canActivate(): Observable<boolean> {
        return this.loginService.isAdmin().pipe(
            map((isAdmin: any) => {
                if (isAdmin) {
                    return true;
                } else {
                    this.router.navigate(['home']); // Redirigir al usuario a la página de inicio de sesión
                    return false;
                }
            })
        );
    }
}