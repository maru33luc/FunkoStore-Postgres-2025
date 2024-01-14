import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funko } from 'src/app/interfaces/Funko';

@Component({
    selector: 'app-admin-form',
    templateUrl: './admin-form.component.html',
    styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent {
    @Input() name?: string;
    @Input() serie?: string;
    @Input() category?: string;
    @Input() licence?: string;
    @Input() price?: number;
    @Input() stock?: number;
    @Input() front_image?: string;
    @Input() back_image?: string;
    @Input() description?: string;

    formAdmin: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        serie: ['', Validators.required],
        category: ['', Validators.required],
        licence: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(1)]],
        stock: [0, [Validators.required, Validators.min(1)]],
        front_image: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
        back_image: ['', [Validators.required, Validators.pattern('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$')]],
        description: ['', Validators.required],
    });

    @Output() sendFunko = new EventEmitter<Funko>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnChanges() {
        this.formAdmin.controls['name'].setValue(this.name);
        this.formAdmin.controls['serie'].setValue(this.serie);
        this.formAdmin.controls['category'].setValue(this.category);
        this.formAdmin.controls['licence'].setValue(this.licence);
        this.formAdmin.controls['price'].setValue(this.price);
        this.formAdmin.controls['stock'].setValue(this.stock);
        this.formAdmin.controls['front_image'].setValue(this.front_image);
        this.formAdmin.controls['back_image'].setValue(this.back_image);
        this.formAdmin.controls['description'].setValue(this.description);
    }

    validate(field: string, error: string) {
        return (
            this.formAdmin.controls[field].getError(error) &&
            this.formAdmin.controls[field].touched);
    }

    sendData() {
        if (this.formAdmin.invalid) {
            this.formAdmin.markAllAsTouched();
        } else {
            const funko: Funko = {
                name: this.formAdmin.controls['name'].value,
                serie: this.formAdmin.controls['serie'].value,
                category: this.formAdmin.controls['category'].value,
                licence: this.formAdmin.controls['licence'].value,
                price: this.formAdmin.controls['price'].value,
                stock: this.formAdmin.controls['stock'].value,
                front_image: this.formAdmin.controls['front_image'].value,
                back_image: this.formAdmin.controls['back_image'].value,
                description: this.formAdmin.controls['description'].value,
                id: 0,
            };
            this.sendFunko.emit(funko);
        }
    }
}