import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
    selector: 'app-shop-main',
    templateUrl: './shop-main.component.html',
    styleUrls: ['./shop-main.component.css']
})
export class ShopMainComponent implements OnInit {
    lista: Funko[] = [];
    itemsPerPage = 9;
    currentPage = 0;
    pages: number[] = [];
    showPagination = true;
    filteredFunkos$: Observable<Funko[]> | undefined;
    minPrice: number = 0;
    maxPrice: number = 0; // Valores iniciales de precio mínimo y máximo

    constructor(private funkoService: FunkosService,
        private orderService: OrderFunkosService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            const licence = params.get('licence');
            if (licence != null) {
                this.orderService.setLicenceQuery(licence || '');
                this.funkoService.aplicarFiltro("licence", licence || '', 0, 0);
                this.currentPage = 0;
                this.calculateTotalPages();
            } else {
                this.mostrarFunkos();
            }
        });
        this.filteredFunkos$ = this.funkoService.getFilteredFunkosObservable();
        window.addEventListener('resize', () => {
            this.updateItemsPerPage();
        });

        // Suscripción a cambios en el orden
        this.orderService.orderType$.subscribe(orderType => {
            if (orderType === "az" || orderType === "za") {
                this.funkoService.aplicarFiltro("order", orderType, 0, 0);
                this.currentPage = 0; // Reiniciar a la primera página después de cambiar el orden
                this.calculateTotalPages(); // Recalcular el número de páginas
            }
        });

        // Suscripción a cambios en el filtro de búsqueda
        this.orderService.searchQuery$.subscribe((query) => {
            if (query.length !== 0) {
                this.funkoService.aplicarFiltro("name", query, 0, 0);
                this.currentPage = 0;
                this.calculateTotalPages();
            } else {
                this.funkoService.limpiarFiltro("name");
                this.lista = this.funkoService.mostrarListaFiltrada();
            }
        });

        // Suscripción a cambios de filtros
        this.funkoService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
            this.lista = filteredFunkos;
            this.currentPage = 0;
            this.calculateTotalPages();
            this.updatePaginationVisibility();
        });

        // Suscripción a cambios en el filtro de precio
        this.orderService.minPriceSubject.subscribe((minPrice) => {
            if (minPrice !== 0) {
                this.minPrice = minPrice;
                this.funkoService.aplicarFiltro("price", "", minPrice, this.maxPrice);
                this.currentPage = 0;
                this.calculateTotalPages();
            }
        });

        // Suscripción a cambios en el filtro de precio
        this.orderService.maxPriceSubject.subscribe((maxPrice) => {
            if (maxPrice !== 0) {
                this.maxPrice = maxPrice;
                this.funkoService.aplicarFiltro("price", "", this.minPrice, this.maxPrice);
                this.currentPage = 0;
                this.calculateTotalPages();
            }
        });

        // Suscripción a cambios en el filtro de serie
        this.orderService.categoryQuery$.subscribe((serie) => {
            if (serie.length !== 0) {
                this.funkoService.aplicarFiltro("category", serie, 0, 0);
                this.currentPage = 0;
                this.calculateTotalPages();
            } else {
                this.funkoService.limpiarFiltro("category");
                this.lista = this.funkoService.mostrarListaFiltrada();
            }
        });

        // Suscripción a cambios en el filtro de licencia
        this.orderService.licenceQuery$?.subscribe((licence) => {
            if (licence.length !== 0) {
                this.funkoService.aplicarFiltro("licence", licence, 0, 0);
                this.currentPage = 0;
                this.calculateTotalPages();
            } else {
                this.funkoService.limpiarFiltro("licence");
                this.lista = this.funkoService.mostrarListaFiltrada();
            }
        });
    }

    async mostrarFunkos() {
        const response = await this.funkoService.getFunkos();
        if (response != undefined) {
            this.lista = response as Funko[];
            // ordenar la lista por nombre ascendente
            this.lista.sort((a, b) => a.name.localeCompare(b.name));
            this.calculateTotalPages();
        } else {
            console.log('Error al mostrar los funkos');
        }
    }

    calculateTotalPages() {
        this.pages = Array(Math.ceil(this.lista.length / this.itemsPerPage)).fill(0).map((_, i) => i);
    }

    get paginatedItems() {
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
        window.scrollTo(0, 0);
        return false;
    }

    updateItemsPerPage() {
        if (window.innerWidth <= 1200 && window.innerWidth >= 992) {
            this.itemsPerPage = 8;
        } else if (window.innerWidth < 992 && window.innerWidth >= 768) {
            this.itemsPerPage = 6;
        } else if (window.innerWidth < 768) {
            this.itemsPerPage = 4;
        } else {
            this.itemsPerPage = 9;
        }
    }

    updatePaginationVisibility() {
        if (this.filteredFunkos$ === undefined) {
            this.showPagination = false;
        } else if (this.lista.length === 0) {
            this.showPagination = false;
        } else {
            this.showPagination = true;
        }
    }
}