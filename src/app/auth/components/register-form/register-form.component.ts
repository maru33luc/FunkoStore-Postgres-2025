import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
    isUser: boolean = false;
    checkTerms!: boolean;
    dataLoaded: boolean = true;

    registerForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(30)]],
        lastname: ['', [Validators.required, Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required]],
        terms: false,
    });

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private loginService: LoginService,
    ) { }

    ngOnInit() {
        this.registerForm.get('email')?.valueChanges.subscribe((valor) => {
            this.isUser = false;
        });
    }

    validate(field: string, error: string): boolean {
        return (
            this.registerForm.controls[field].getError(error) &&
            this.registerForm.controls[field].touched);
    }

    validateRepassword(): boolean {
        const password = this.registerForm.controls['password'].value;
        const repassword = this.registerForm.controls['repassword'].value;
        return (
            repassword.length !== 0 &&
            password !== repassword &&
            this.registerForm.controls['repassword'].touched);
    }

    validateTerms(): boolean {
        return (
            !this.registerForm.controls['terms'].value &&
            this.registerForm.controls['terms'].touched
        );
    }

    async register() {
        const terms = document.getElementById('accept-terms') as HTMLInputElement;
        if (!terms?.checked) {
            this.checkTerms = true;
            return;
        }
        else if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
        }
        else {
            try {
                this.dataLoaded = false;
                const response = await this.loginService.register(
                    this.registerForm.value.email,
                    this.registerForm.value.password,
                    this.registerForm.value.name,
                    this.registerForm.value.lastname
                );
                this.dataLoaded = true;
                await this.router.navigateByUrl('/login/log');
            } catch (e) {
                this.isUser = true;
                this.dataLoaded = true;
                console.log(e);
            }
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}