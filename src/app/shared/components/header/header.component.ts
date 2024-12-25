import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    template: `<div #hambIcon></div>`,
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;
    isAdmin: boolean = false;
    username: string = '';
    user$: Observable<any> | undefined;

    @ViewChild('hambIcon') hambIcon!: ElementRef;
    @ViewChild('navBar') navBar!: ElementRef;

    constructor(private loginService: LoginService,
                private router: Router) { }

    ngOnInit() {
        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        });

        // this.loginService.isAdmin().subscribe((isAdmin) => {
        //     this.isAdmin = isAdmin;
        // });

        this.loginService.authStateObservable()?.subscribe((user) => {
            if (user) {
                this.isAdmin = user.isAdmin;
                this.loginService.getUserName().then((nombre) => {
                    if (nombre) {
                        console.log('nombre: ', nombre);
                        this.username = nombre.toUpperCase();
                    }
                });
            }
        });
    }

    ngAfterViewInit() {
        if (this.hambIcon) {
            this.hambIcon.nativeElement.addEventListener('click', () => {
                this.navBar.nativeElement.classList.toggle('header-navbar-menu');
                this.navBar.nativeElement.classList.toggle('header-navbar-dropdown-menu');
            });
        }
    }

    logout() {
        if(this.isAdmin){
            this.router.navigate(['/home']);
            this.isAdmin = false;
        }
        this.loginService.logout();
    }
}
