import { Component, OnInit } from '@angular/core';
import { Funko } from 'src/app/interfaces/Funko';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
    lista: Funko[] = [];
    itemsPerPage = 10;
    currentPage = 0;
    pages: number[] = [];
    showPagination = true;
    hasResults: boolean = true;
    searchQuery: string = '';

    constructor(
        private funkosService: FunkosService,
        private orderService: OrderFunkosService
    ) { }

    ngOnInit() {
        this.mostrarFunkos();

        this.orderService.searchQuery$.subscribe((query) => {
            this.funkosService.aplicarFiltro("name", query, 0, 0);
        });

        this.funkosService.getFilteredFunkosObservable().subscribe(filteredFunkos => {
            this.lista = filteredFunkos;
            this.currentPage = 0;
            this.calculateTotalPages();

            if (this.lista.length === 0) {
                this.hasResults = false;
            } else {
                this.hasResults = true;
            }

        });
    }

    filterFunkos(query: string) {
        this.funkosService.aplicarFiltro("name", query, 0, 0);
        this.calculateTotalPages();
    }

    async mostrarFunkos() {
        const response = await this.funkosService.getFunkos();
        if (response != undefined) {
            this.lista = response as Funko[];
            this.calculateTotalPages();
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
    }

    eliminarFunko(id: number | undefined) {
        Swal.fire({
            text: "¿Está seguro de eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ELIMINAR",
            cancelButtonText: "CANCELAR"
        }).then((result) => {
            if (result.isConfirmed) {
                this.funkosService.deleteFunko(id);
                Swal.fire({
                    text: "El producto ha sido eliminado",
                    icon: "success"
                }).then(() => {
                    this.scrollToTop();
                    window.location.reload();
                });
            }
        });
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }
}