import { Component, Input, OnInit } from '@angular/core';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
    lista: Funko[] = [];
    itemsPerPage = 4;
    currentPage = 0;
    pages: number[] = [];
    @Input() title: string | undefined;
    @Input() filtroLista: string | undefined;

    constructor(private funkoService: FunkosService) { }

    ngOnInit() {
        this.mostrarFunkos();
        window.addEventListener('resize', () => {
            this.updateItemsPerPage();
        });
    }

    async mostrarFunkos() {
        const response = await this.funkoService.getFunkos();
        if (response != undefined) {
            this.lista = response as Funko[];
            // Aplicar filtro por algun criterio si está presente
            if (this.filtroLista) {
                this.lista = this.lista.filter(funko => funko.licence === this.filtroLista);
            }
            this.calculateTotalPages();
        } else {
            console.log('Error al mostrar los funkos');
        }
    }

    calculateTotalPages() {
        this.pages = Array(Math.ceil(this.lista.length / this.itemsPerPage)).fill(0).map((_, i) => i);
    }

    get pagedItems() {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.lista.slice(startIndex, endIndex);
    }

    changePage(newPage: number) {
        if (newPage < 0) {
            this.currentPage = 0;
        } else if (newPage >= this.pages.length) {
            this.currentPage = this.pages.length - 1;
        } else {
            this.currentPage = newPage;
        }
        return false;
    }

    updateItemsPerPage() {
        if (window.innerWidth <= 1200 && window.innerWidth > 992) {
            this.itemsPerPage = 3;
        } else if (window.innerWidth <= 992 && window.innerWidth > 576) {
            this.itemsPerPage = 2;
        }
        else if (window.innerWidth <= 576) {
            this.itemsPerPage = 1;
        }
        else {
            this.itemsPerPage = 4;
        }
    }
}