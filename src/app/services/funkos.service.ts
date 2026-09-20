import { Injectable } from '@angular/core';
import { Funko } from '../interfaces/Funko';
import { BehaviorSubject, Observable, Subject, catchError, scan, from, shareReplay, map } from 'rxjs';
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
    
    private fetchPromise: Promise<Funko[] | undefined> | null = null;

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

    async getFunkos(forceRefresh: boolean = false): Promise<Funko[] | undefined> {
        if (!forceRefresh && this.funkos && this.funkos.length > 0) {
            return this.funkos;
        }

        if (!forceRefresh && this.fetchPromise) {
            return this.fetchPromise;
        }

        this.fetchPromise = (async () => {
            try {
                const response = await axios.get(this.url);
                let result: Funko[] = [];
                if (response.data && Array.isArray(response.data.funkos)) {
                    result = response.data.funkos;
                } else if (Array.isArray(response.data)) {
                    result = response.data;
                }
                this.funkos = result;
                this.filteredFunkos = result;
                this.filteredFunkosSubject.next(result);
                return result;
            } catch (e) {
                console.log(e);
                return undefined;
            } finally {
                this.fetchPromise = null;
            }
        })();

        return this.fetchPromise;
    }

    getFunkosCached(): Observable<Funko[] | undefined> {
        return from(this.getFunkos());
    }

    async getFunko(id: number | undefined): Promise<Funko | undefined> {
        if (id !== undefined && this.funkos && this.funkos.length > 0) {
            const found = this.funkos.find(f => f.id === Number(id));
            if (found) return found;
        }
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
            // Invalidar cache después de crear
            this.invalidateFunkosCache();
        }
        catch (e) {
            console.log(e);
        }
    }

    async putFunko(funko: Funko, id: number | undefined) {
        try {
            const response = await axios.put(`${this.url}/${id}`, funko);
            // Invalidar cache después de actualizar
            this.invalidateFunkosCache();
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
            // Invalidar cache después de eliminar
            this.invalidateFunkosCache();
        }
        catch (e) {
            console.log(e);
        }
    }

    // Método para invalidar el cache
    private invalidateFunkosCache() {
        this.funkos = [];
        this.fetchPromise = null;
        this.getFunkos(true);
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
        this.clearAllFilters();
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
        if (name && name !== "") {
            const existing = this.appliedFilters.find(filter => filter.type === name);
            if (!existing) {
                this.appliedFilters.push({ type: name, criteria, min, max });
            } else {
                existing.criteria = criteria;
                existing.min = min;
                existing.max = max;
            }
        }

        let result = [...(this.funkos || [])];

        this.appliedFilters.forEach(filtro => {
            const { type, criteria, min, max } = filtro;

            if (type === 'name' && criteria && criteria !== '') {
                result = result.filter((funko) =>
                    (funko.name || '').toLowerCase().includes(criteria.toLowerCase())
                );
            } else if (type === 'price') {
                const effectiveMin = min || 0;
                const effectiveMax = (max && max > 0) ? max : 1000000;
                result = result.filter(funko => {
                    const price = Number(funko.price);
                    return !isNaN(price) && price >= effectiveMin && price <= effectiveMax;
                });
            } else if (type === 'category' && criteria && criteria !== '') {
                result = result.filter((funko) =>
                    funko.category === criteria
                );
            } else if (type === 'licence' && criteria && criteria !== '') {
                result = result.filter((funko) =>
                    funko.licence === criteria
                );
            } else if (type === 'order') {
                if (criteria === 'az') {
                    result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                } else if (criteria === 'za') {
                    result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
                } else if (criteria === 'asc') {
                    result.sort((a, b) => Number(a.price) - Number(b.price));
                } else if (criteria === 'desc') {
                    result.sort((a, b) => Number(b.price) - Number(a.price));
                }
            }
        });

        this.filteredFunkos = result;
        this.filteredFunkosSubject.next(result);
        return result;
    }

    limpiarFiltro(name: string) {
        this.appliedFilters = this.appliedFilters.filter(filter => filter.type !== name);
        this.aplicarFiltro("", "", 0, 0);
    }

    undoFilters(): Funko[] {
        if (this.appliedFilters.length > 0) {
            this.appliedFilters.pop();
        }
        return this.aplicarFiltro("", "", 0, 0);
    }

    clearAllFilters() {
        this.appliedFilters = [];
        this.history = [];
        this.filteredFunkos = [...(this.funkos || [])];
        this.filteredFunkosSubject.next(this.filteredFunkos);
    }

    mostrarListaFiltrada() {
        return this.filteredFunkos;
    }
}
