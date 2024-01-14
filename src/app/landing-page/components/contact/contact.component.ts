import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environments } from 'src/environments/environments';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    formContact: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        mail: ['', Validators.required],
        telephone: ['', [Validators.required]],
        message: ['', [Validators.required]],
    });

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    enviarFormulario() {
        if (this.formContact.invalid) {
            this.formContact.markAllAsTouched();
        } else {
            const contacto: any = {
                name: this.formContact.controls['name'].value,
                mail: this.formContact.controls['mail'].value,
                telephone: this.formContact.controls['telephone'].value,
                message: this.formContact.controls['message'].value,
            };

            this.http.post(environments.urlFormsPree, contacto).subscribe(
                {
                    next: () => {
                        Swal.fire({
                            text: "Su mensaje ha sido enviado",
                            icon: "success",
                        }).then(() => {
                            this.router.navigate(['/home']);
                            this.scrollToTop();
                        });
                    },
                    error: () => {
                        Swal.fire({
                            text: "Hubo un problema al enviar el mensaje",
                            icon: "error",
                        });
                    }
                });
        }
    }

    validate(field: string, error: string) {
        return (
            this.formContact.controls[field].getError(error) &&
            this.formContact.controls[field].touched);
    }

    scrollToTop() {
        window.scroll(0, 0);
    }
}