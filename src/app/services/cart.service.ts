import { Injectable } from '@angular/core';
import { ItemCart, FunkoCart, Cart } from '../interfaces/Cart';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: ItemCart[] = [];
    cartId: number | undefined = undefined;
    userId: number | undefined;
    cartSubject: BehaviorSubject<ItemCart[]> = new BehaviorSubject(this.cart);
    url: string = environments.urlCartData;

    constructor(private loginService: LoginService) {

        //Suscripcion a cambios de estado de autenticacion    
        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                this.userId = user.id;
                const res = await this.obtenerCartPorUserId(this.userId!);
                this.cartId = res.id;
                const resp = await axios.get(`${this.url}/items/${this.userId}`);
                this.cart = resp.data;
                this.cartSubject.next(this.cart);
            }
        });
        //Suscripcion a cambios en el carrito
        this.cartSubject.subscribe((cart) => {
            this.cart = cart;
        });
    }

    async obtenerCartPorUserId(userId: number): Promise<Cart> {
        try {
            const res = await axios.get(`${this.url}/${userId}`);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtenerCarts(): Promise<Cart[]> {
        try {
            const res = await axios.get(`${this.url}`);
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async obtenerCarritoDeCompras(userId: number | undefined): Promise<ItemCart[] > {
        try {
            const res = await axios.get(`${this.url}/items/${this.userId}`);
            if(res){
                const items = res.data;
                this.cart = items;
                this.cartSubject.next(this.cart);
                return items;
            }return [];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async agregarAlCarrito(funkoId: number, quantity: number): Promise<ItemCart | undefined> {
        try {
            if (!this.cart.find((itemCart) => itemCart.id_funko === funkoId)) {
                const resp= await this.obtenerCarts();
                const cart = await this.obtenerCartPorUserId(this.userId!);
                const length = resp.length;
                const res = await axios.post(`${this.url}/items/${this.userId}`, { id: length +1 , id_cart: cart.id, id_funko: funkoId, quantity: quantity });
                const item = res.data;
                this.cart.push(item);
                this.cartSubject.next(this.cart);
                return item;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }return undefined;
    }

    async actualizarCantidades(idUser: number, idCart: number, idItem: number, quantity: number) {
        try {
            const res = await axios.put(`${this.url}/items/${idUser}`, { id_funko: idItem, cantidad: quantity });
            this.cart = await this.obtenerCarritoDeCompras(idUser);
            this.cartSubject.next(this.cart);
            return this.cart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async eliminarDelCarrito(funkoId: number, userId: number) {
        try {
            const res = await axios.delete(`${this.url}/items/${userId}`, { data: { id_funko: funkoId } });
            this.cart = this.cart.filter((item) => item.id_funko !== funkoId);
            this.cartSubject.next(this.cart);
            return this.cart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}