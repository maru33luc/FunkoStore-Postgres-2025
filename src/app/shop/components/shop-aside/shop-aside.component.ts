import { Component } from '@angular/core';
import { FunkosService } from 'src/app/services/funkos.service';
import { OrderFunkosService } from 'src/app/services/order-funkos.service';

@Component({
    selector: 'app-shop-aside',
    templateUrl: './shop-aside.component.html',
    styleUrls: ['./shop-aside.component.css']
})
export class ShopAsideComponent {

    searchQuery: string = '';
    orderType: 'az' | 'za' | 'desc' | 'asc' = 'az';
    minPrice: number = 0;
    maxPrice: number = 0;

    constructor(
        private orderService: OrderFunkosService,
        private funkoService: FunkosService
    ) { }

    ngOnInit() {
        this.destildarCheckbox('category');
        this.destildarCheckbox('saga');
    }

    ngOnDestroy() {
        this.clearFilters();  // Limpia los filtros cuando el componente se destruye
    }

    onOrderChange() {
        this.orderService.setOrderType(this.orderType);
        this.funkoService.aplicarFiltro("order", this.orderType, 0, 0);
    }

    onSearchChange(query: string) {
        this.orderService.setSearchQuery(query);
        if (query.length == 0) {
            this.funkoService.undoFilters();
            this.funkoService.limpiarFiltro("name");
        }
    }

    onCategoryChange(event: Event, serie: string) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
            this.orderService.setCategoryQuery(serie);
        } else {
            this.orderService.setCategoryQuery(''); // Valor vacío si se desmarca
            this.funkoService.undoFilters();
            this.funkoService.limpiarFiltro('category');
        }
    }

    onLicenceChange(event: Event, licence: string) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
            this.orderService.setLicenceQuery(licence);
        } else {
            this.orderService.setLicenceQuery('');
            this.funkoService.undoFilters();
            this.funkoService.limpiarFiltro("licence");
        }
    }

    onPriceFilterChange() {
        if (this.minPrice < 0 || this.maxPrice < 0) {
            alert("El precio no puede ser negativo");
            this.minPrice = 0;
            this.maxPrice = 0;
            return;
        }
        else if (this.maxPrice >= 0 && this.maxPrice >= this.minPrice) {
            this.orderService.setMinPrice(this.minPrice);
            this.orderService.setMaxPrice(this.maxPrice);
            this.funkoService.aplicarFiltro("price", "", this.minPrice, this.maxPrice);
        }
    }

    clearMinPricePlaceholder() {
        if (this.minPrice === 0) {
            this.minPrice = NaN;
        }
    }

    clearMaxPricePlaceholder() {
        if (this.maxPrice === 0) {
            this.maxPrice = NaN;
        }
    }

    resetMinPricePlaceholder() {
        if (isNaN(this.minPrice)) {
            this.minPrice = 0;
        }
    }

    resetMaxPricePlaceholder() {
        if (isNaN(this.maxPrice)) {
            this.maxPrice = 0;
        }
    }

    clearFilters() {
        this.searchQuery = '';
        this.orderType = 'az';
        this.minPrice = 0;
        this.maxPrice = 0;
        this.orderService.setSearchQuery('');
        this.orderService.setOrderType('az');
        this.orderService.setCategoryQuery('');
        this.orderService.setLicenceQuery('');
        this.orderService.setMinPrice(0);
        this.orderService.setMaxPrice(0);
        this.funkoService.showAllFunkos();
        this.funkoService.clearAllFilters();
        this.limpiarCheckboxes('category');
        this.limpiarCheckboxes('saga');
    }

    limpiarCheckboxes(nameInput: string) {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="' + nameInput + '"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.disabled = false;
        });
    }

    destildarCheckbox(nameInput: string) {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="' + nameInput + '"]');

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', (event) => {
                const inputCheckbox = checkbox as HTMLInputElement;

                if (inputCheckbox.checked) {
                    checkboxes.forEach((otherCheckbox) => {
                        if (otherCheckbox !== checkbox) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            });
        });
    }
}