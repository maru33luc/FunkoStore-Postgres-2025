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
    isLoading: boolean = true;
    skeletonItems: number[] = [1, 2, 3, 4];
    @Input() title: string | undefined;
    @Input() filtroLista: string | undefined;

    constructor(private funkoService: FunkosService) { }

    ngOnInit() {
        this.updateItemsPerPage();
        this.funkoService.getFilteredFunkosObservable().subscribe(funkos => {
            if (funkos && funkos.length > 0) {
                this.lista = [...funkos];
                if (this.filtroLista) {
                    this.lista = this.lista.filter(funko => funko.licence === this.filtroLista);
                }
                this.calculateTotalPages();
                this.isLoading = false;
            }
        });
        this.mostrarFunkos();
        window.addEventListener('resize', () => {
            this.updateItemsPerPage();
        });
    }

    async mostrarFunkos() {
        this.isLoading = true;
        try {
            const response = await this.funkoService.getFunkos();
            if (response != undefined && response.length > 0) {
                this.lista = response as Funko[];
                if (this.filtroLista) {
                    this.lista = this.lista.filter(funko => funko.licence === this.filtroLista);
                }
                this.calculateTotalPages();
                this.isLoading = false;
            } else {
                console.log('Error al mostrar los funkos');
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (this.lista && this.lista.length > 0) {
                this.isLoading = false;
            }
        }
    }

    calculateTotalPages() {
        this.pages = Array(Math.ceil(this.lista.length / this.itemsPerPage)).fill(0).map((_, i) => i);
    }

    get pagedItems() {
        if (!Array.isArray(this.lista)) return [];
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