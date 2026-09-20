import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
    selector: 'app-shop-main',
    templateUrl: './shop-main.component.html',
    styleUrls: ['./shop-main.component.css']
})
export class ShopMainComponent implements OnInit, OnDestroy {
    lista: Funko[] = [];
    itemsPerPage = 9;
    currentPage = 0;
    pages: number[] = [];
    showPagination = true;
    isLoading: boolean = true;
    skeletonItems: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    filteredFunkos$: Observable<Funko[]> | undefined;
    minPrice: number = 0;
    maxPrice: number = 0; // Valores iniciales de precio mínimo y máximo
    totalItems = 0; // Total de items del backend
    private subscriptions: Subscription[] = [];

    constructor(private funkoService: FunkosService,
        private orderService: OrderFunkosService,
        private activatedRoute: ActivatedRoute) { }

    async ngOnInit() {
        // Suscripción a cambios de filtros
        const filterSub = this.funkoService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
            this.lista = filteredFunkos;
            this.totalItems = this.lista.length;
            this.currentPage = 0;
            this.calculateTotalPages();
            this.updatePaginationVisibility();
            if (this.lista && this.lista.length > 0) {
                this.isLoading = false;
            }
        });
        this.subscriptions.push(filterSub);

        await this.loadFunkos();

        this.activatedRoute.paramMap.subscribe(params => {
            const licence = params.get('licence');
            if (licence != null && licence !== '') {
                this.orderService.setLicenceQuery(licence);
                this.funkoService.aplicarFiltro("licence", licence, 0, 0);
            }
        });
        this.filteredFunkos$ = this.funkoService.getFilteredFunkosObservable();
        window.addEventListener('resize', () => {
            this.updateItemsPerPage();
        });

        // Suscripción a cambios en el orden
        const orderSub = this.orderService.orderType$.subscribe(orderType => {
            if (orderType === "az" || orderType === "za" || orderType === "asc" || orderType === "desc") {
                this.funkoService.aplicarFiltro("order", orderType, 0, 0);
            }
        });
        this.subscriptions.push(orderSub);

        // Suscripción a cambios en el filtro de búsqueda
        const searchSub = this.orderService.searchQuery$.subscribe((query) => {
            if (query.length !== 0) {
                this.funkoService.aplicarFiltro("name", query, 0, 0);
            } else {
                this.funkoService.limpiarFiltro("name");
            }
        });
        this.subscriptions.push(searchSub);

        // Suscripción a cambios en el filtro de precio
        const minPriceSub = this.orderService.minPriceSubject.subscribe((minPrice) => {
            if (minPrice !== 0) {
                this.minPrice = minPrice;
                this.funkoService.aplicarFiltro("price", "", minPrice, this.maxPrice);
            } else {
                this.funkoService.limpiarFiltro("price");
            }
        });
        this.subscriptions.push(minPriceSub);

        // Suscripción a cambios en el filtro de precio
        const maxPriceSub = this.orderService.maxPriceSubject.subscribe((maxPrice) => {
            if (maxPrice !== 0) {
                this.maxPrice = maxPrice;
                this.funkoService.aplicarFiltro("price", "", this.minPrice, maxPrice);
            } else {
                this.funkoService.limpiarFiltro("price");
            }
        });
        this.subscriptions.push(maxPriceSub);

        // Suscripción a cambios en el filtro de serie / categoria
        const categorySub = this.orderService.categoryQuery$.subscribe((serie) => {
            if (serie.length !== 0) {
                this.funkoService.aplicarFiltro("category", serie, 0, 0);
            } else {
                this.funkoService.limpiarFiltro("category");
            }
        });
        this.subscriptions.push(categorySub);

        // Suscripción a cambios en el filtro de licencia
        const licenceSub = this.orderService.licenceQuery$?.subscribe((licence) => {
            if (licence.length !== 0) {
                this.funkoService.aplicarFiltro("licence", licence, 0, 0);
            } else {
                this.funkoService.limpiarFiltro("licence");
            }
        });
        if (licenceSub) this.subscriptions.push(licenceSub);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    async loadFunkos() {
        this.isLoading = true;
        try {
            await this.funkoService.getFunkos();
        } catch (error) {
            console.error('Error loading funkos:', error);
        } finally {
            this.isLoading = false;
        }
    }

    calculateTotalPages() {
        this.pages = Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(0).map((_, i) => i);
    }

    get paginatedItems() {
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