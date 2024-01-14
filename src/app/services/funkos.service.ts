import { Injectable } from '@angular/core';
import { Funko } from '../interfaces/Funko';
import { BehaviorSubject, Observable, Subject, catchError, scan } from 'rxjs';
import axios from 'axios';
import { OrderFunkosService } from './order-funkos.service';
import { environments } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class FunkosService {
    private url: string = environments.urlFunkosData;
    private funkos: Funko[] = [];
    private filteredFunkos: Funko[] = [];
    private filteredFunkosSubject: Subject<Funko[]> = new Subject<Funko[]>();
    private appliedFilters: { type: string; criteria: string, min: number, max: number }[] = [];
    private history: Funko[][] = [];
    stockFunkoSubject$ = new BehaviorSubject<number>(0);

    constructor(private orderFunkoService: OrderFunkosService) {
        this.initialize();
    }

    async initialize() {
        await this.levantarFunkos();
        this.aplicarFiltro("", "", 0, 0);
    }

    async levantarFunkos(): Promise<Funko[]> {
        try {
            const funkos = await this.getFunkos();
            if (funkos) {
                this.funkos = funkos;
                this.filteredFunkos = funkos;
                return funkos;
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    emitirStockInicial(stock: number) {
        this.stockFunkoSubject$.next(stock);
    }

    async getFunkos(): Promise<Funko[] | undefined> {
        try {
            const response = await axios.get(this.url);
            return response.data;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async getFunko(id: number | undefined): Promise<Funko | undefined> {
        try {
            const response = await axios.get(`${this.url}/${id}`);
            return response.data;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async postFunko(funko: Funko | undefined) {
        try {
            const funkos = await this.getFunkos();
            const lastIndex = funkos?.length;
            funko!.id = lastIndex! + 1;
            const response = await axios.post(`${this.url}`, funko);
        }
        catch (e) {
            console.log(e);
        }
    }

    async putFunko(funko: Funko, id: number | undefined) {
        try {
            const response = await axios.put(`${this.url}/${id}`, funko);
        }
        catch (e) {
            console.log(e);
        }
    }

    async actualizarStock(id: number | undefined, stock: number) {
        try {
            const funko = await this.getFunko(id);
            if (funko) {
                funko.stock = stock;
                await this.putFunko(funko, id);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async deleteFunko(id: number | undefined) {
        try {
            const response = await axios.delete(`${this.url}/${id}`);
        }
        catch (e) {
            console.log(e);
        }
    }

    async obtenerStockFunko(id: number | undefined): Promise<number | undefined> {
        const funko = await this.getFunko(id);
        return funko?.stock;
    }

    async actualizarStockFunko(id: number | undefined, stock: number) {
        const funko = await this.getFunko(id);
        if (funko) {
            funko.stock = stock;
            await this.putFunko(funko, id);
        }
    }

    getFilteredFunkosObservable(): Observable<Funko[]> {
        return this.filteredFunkosSubject.asObservable();
    }

    showAllFunkos() {
        this.filteredFunkos = this.funkos;
        this.filteredFunkosSubject.next(this.filteredFunkos);
    }

    obtenerPrecioFunko(id: number): number | undefined {
        const funko = this.funkos.find(funko => funko.id === id);
        return funko?.price;
    }

    calcularPrecioTotal(funkoId: number, cantidad: number): number | undefined {
        const precioFunko = this.obtenerPrecioFunko(funkoId);
        return precioFunko ? precioFunko * cantidad : undefined;
    }

    aplicarFiltro(name: string, criteria: string, min: number, max: number): Funko[] {
        if (!this.appliedFilters.find(filter => filter.type === name)) {
            this.appliedFilters.push({ type: name, criteria, min, max });
        }
        // caso en que el filtro tenga el mismo nombre pero criteria distinto
        else if (this.appliedFilters.find(filter => filter.type === name && filter.criteria !== criteria)) {
            this.appliedFilters.find(filter => filter.type === name)!.criteria = criteria;
        }
        this.levantarFunkos();
        let result = this.funkos;

        // Crea una copia de los filtros aplicados para no modificar el array original
        let appliedFiltersCopy = [...this.appliedFilters];

        // Aplica cada filtro en orden
        appliedFiltersCopy.forEach(filtro => {
            const { type, criteria, min, max } = filtro;

            if (type === 'name') {
                if (criteria !== "") {
                    this.undoFilters();
                    this.limpiarFiltro("name");
                }
                result = result.filter((funko) =>
                    (funko.name || '').toLowerCase().includes(criteria.toLowerCase())
                );
            } else if (type === 'price') {
                let max: number = 0;
                let min: number = 0;
                this.orderFunkoService.maxPriceSubject.subscribe((maxPrice) => {
                    if (maxPrice !== 0) {
                        max = maxPrice;
                    } else if (maxPrice == 0) {
                        max = 1000000;
                        this.undoFilters();
                        this.limpiarFiltro("price");
                    }
                });
                this.orderFunkoService.minPriceSubject.subscribe((minPrice) => {
                    if (minPrice !== 0) {
                        min = minPrice;
                    }
                });
                result = result.filter(funko => {
                    const price = funko.price;
                    return !isNaN(price) && price >= min && price <= max;
                });

            } else if (type === 'category') {
                if (!this.appliedFilters.find(filter => filter.type === "licence")) {
                    result = this.funkos.filter((funko) =>
                        (funko.category == criteria && typeof funko.category === 'string')
                    );

                }
                result = result.filter((funko) =>
                    (funko.category == criteria && typeof funko.category === 'string')
                );
            } else if (type === 'licence') {
                if (criteria == "") {
                    this.undoFilters();
                    this.limpiarFiltro("licence");
                }
                result = result.filter((funko) =>
                    (funko.licence == criteria && typeof funko.licence === 'string')
                );
            } else if (type === 'order') {
                if (criteria === 'az') {
                    result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                } else if (criteria === 'za') {
                    result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
                } else if (criteria === 'asc') {
                    result.sort((a, b) => a.price - b.price);
                } else if (criteria === 'desc') {
                    result.sort((a, b) => b.price - a.price);
                }
            }
        });
        // Guarda el estado actual en el historial
        this.history.push([...result]);
        this.filteredFunkosSubject.next(result);
        return result;
    }

    limpiarFiltro(name: string) {
        const filter = this.appliedFilters.find(filter => filter.type === name);
        if (filter) {
            this.appliedFilters.splice(this.appliedFilters.indexOf(filter), 1);
        }
    }

    undoFilters(): Funko[] {
        if (this.appliedFilters.length == 0) {
            this.showAllFunkos();
            return this.funkos;
        }

        if (this.history.length > 1) {
            // Elimina el estado actual del historial y retrocede al estado anterior
            this.history.pop();
            const previousState = this.history[this.history.length - 1];
            this.filteredFunkosSubject.next([...previousState]);
            this.aplicarFiltro("", "", 0, 0);
            return [...previousState];
        } else {
            // No hay estados anteriores para retroceder
            return this.funkos;
        }
    }

    clearAllFilters() {
        this.appliedFilters = [];
        this.history = [];
        this.filteredFunkosSubject.next(this.funkos);
    }

    mostrarListaFiltrada() {
        return this.history[this.history.length - 1];
    }
}