import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.loginService.authStateObservable()!.pipe(
            map(user => {
                
                if (user) {
                    if (this.loginService.isAdmin()) {
                        this.router.navigate(['admin']);
                        return false;
                    }else{
                        this.router.navigate(['home']);
                        return false;
                    }
                    
                } else {
                    return true;
                }
            })
        );
    }
}