import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
    isCorrect: boolean = true;
    dataLoaded: boolean = true;

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.loginForm.get('email')?.valueChanges.subscribe((valor) => {
            this.isCorrect = true;
        });
        this.loginForm.get('password')?.valueChanges.subscribe((valor) => {
            this.isCorrect = true;
        });
    }

    validate(field: string, error: string): boolean {
        return (
            this.loginForm.controls[field].getError(error) &&
            this.loginForm.controls[field].touched);
    }

    async login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
        } else {
            try {
                this.dataLoaded = false;
                const res = await this.loginService.login(
                    this.loginForm.value.email,
                    this.loginForm.value.password
                );
                if(res){
                    this.isCorrect = true;
                    this.dataLoaded = true;
                if (await this.loginService.isUserLoggedIn()) {
                    if (this.loginService.isAdmin()) {
                        this.router.navigateByUrl('/admin');
                    } else {
                        this.router.navigateByUrl('/home');
                    }
                }
                }else{
                    this.isCorrect = false;
                    this.dataLoaded = true;
                }
                
            } catch (e) {
                this.isCorrect = false;
                this.dataLoaded = true;
                console.error(e);
            }
        }
    }

    async resetPassword() {
        const { value: mail } = await Swal.fire({
            text: "Ingrese su correo electrónico",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "REESTABLECER",
            cancelButtonText: "CANCELAR",
            inputValidator: (value) => {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!value) {
                    return "Campo obligatorio";
                } else if (!regex.test(value)) {
                    return "Formato inválido";
                }
                return null;
            }
        });
        if (mail) {
            try {
                await this.loginService.resetPassword(mail);
                Swal.fire({
                    text: `Se ha enviado un correo a ${mail} para restablecer su contraseña`,
                    icon: "success",
                });
            } catch (error) {
                Swal.fire({
                    text: "Error al restablecer la contraseña. Por favor, verifique su correo electrónico.",
                    icon: "error",
                });
                console.error(error);
            }
        }
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}