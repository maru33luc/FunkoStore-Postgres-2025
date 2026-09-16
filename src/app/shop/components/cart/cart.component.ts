import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FunkosService } from 'src/app/services/funkos.service';
import { CartLocalService } from 'src/app/services/cart-local.service';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ItemCart, FunkoCart } from 'src/app/interfaces/Cart';
import { User } from 'src/app/interfaces/User';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cartItems: FunkoCart[] = [];
    cartItemsCopy: any[] = [];
    cartItemsId: number[] = [];
    user: Observable<User> | undefined;
    currentUser: User | undefined;
    cart: any;
    totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(
        private cartService: CartService,
        private funkoService: FunkosService,
        private loginService: LoginService,
        private cartLocalService: CartLocalService,
    ) { }

    ngOnInit() {
        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                this.user = this.loginService.authStateObservable();
                await this.obtenerCart(user.id?.toString() ?? ''); 
                this.obtenerTotalPrice();
                await this.loadFunkoDetails();
            } else {
                this.user = undefined;
                this.cartItems = [];
                this.cartItems = await this.cartLocalService.getCart();
                await this.loadFunkoDetails(); 
                 
            }
        });
        this.cartLocalService.cartSubject.subscribe(async (items) => {
            if (this.user == undefined) {
                this.cartItems = items;
                await this.loadFunkoDetails();
                 this.obtenerTotalPrice();
                const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
                this.totalQuantity.next(totalItems);  
            }
        });
        this.cartService.cartSubject.subscribe(async (cart) => {
            const carrito = cart;
            this.cartItems = [];
            
            carrito.forEach((item) => {
                this.cartItems.push({ funkoId: item.id_funko, quantity: item.cantidad });
                this.cartItemsId.push(item.id_funko);
            });
            const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
                this.totalQuantity.next(totalItems);
                this.obtenerTotalPrice();
            
        });
    }

    async obtenerCart(uid: string) {
        const res = await this.cartService.obtenerCarritoDeCompras(parseInt(uid));
        if (res) {
            this.cart = res[0].id_cart;
            const carrito = res as ItemCart[];
            carrito.forEach((item) => {
                this.cartItems.push({ funkoId: item.id_funko, quantity: item.cantidad });
                this.cartItemsId.push(item.id_funko);
            });
            await this.loadFunkoDetails();
        } return null;
    }

    obtenerTotalPrice() {
        let total = 0;
        for (const item of this.cartItemsCopy) {
            total += item.price * item.quantity;
        }
        this.totalPrice.next(total);
    }

    async loadFunkoDetails() {
        const uniqueItemsMap = new Map<number, any>();
        
        const promises = this.cartItems.map(async (item) => {
            const existing = this.cartItemsCopy.find(c => (c.id === item.funkoId || c.funkoId === item.funkoId));
            if (existing) {
                return { ...existing, quantity: item.quantity };
            }
            try {
                const funko: any | undefined = await this.funkoService.getFunko(item.funkoId);
                if (funko) {
                    return { ...funko, quantity: item.quantity };
                } else {
                    console.log('Item not found:', item);
                }
            } catch (error) {
                console.error('Error loading details for item:', item, error);
            }
            return null;
        });

        const details = await Promise.all(promises);
        details.forEach(detail => {
            if (detail) {
                uniqueItemsMap.set(detail.id || detail.funkoId, detail);
            }
        });

        this.cartItemsCopy = Array.from(uniqueItemsMap.values());
        this.obtenerTotalPrice();
    }

    async increaseQuantity(item: any) {
        this.loginService.authStateObservable()?.subscribe(async (user) => {
            if (user) {
                const userId = user.id || 0;
                const updatedQuantity = item.quantity + 1;

                // Primero actualiza el stock
                await this.funkoService.actualizarStock(item.id, item.stock - 1);
                item.stock--;

                // Luego actualiza la cantidad en el carrito
                const res = await this.cartService.actualizarCantidades(userId, this.cart.id, item.id, updatedQuantity);

                // Actualiza la cantidad localmente después de la confirmación del servidor
                item.quantity = updatedQuantity;
                // this.totalPrice.next(this.totalPrice.value + item.price);
                this.obtenerTotalPrice();
            }
            else {
                const funko: FunkoCart = {
                    funkoId: item.id,
                    quantity: item.quantity + 1
                }
                this.cartLocalService.updateCartItem(funko);
                item.quantity++;

                await this.funkoService.actualizarStock(item.id, item.stock - 1);
                item.stock--;
                this.totalQuantity.next(this.totalQuantity.value + 1);
                this.obtenerTotalPrice();
            }
        });
    }

    async decreaseQuantity(item: any) {
        if (item.quantity > 0) {
            this.loginService.authStateObservable()?.subscribe(async (user) => {
                if (user) {
                    const userId = user.id || 0;
                    const updatedQuantity = item.quantity - 1;

                    // Primero actualiza el stock
                    await this.funkoService.actualizarStock(item.id, item.stock + 1);
                    item.stock++;

                    // Luego actualiza la cantidad en el carrito
                    const res = await this.cartService.actualizarCantidades(userId, this.cart.id, item.id, updatedQuantity);

                    // Actualiza la cantidad localmente después de la confirmación del servidor
                    item.quantity = updatedQuantity;  
                    this.obtenerTotalPrice();  
                }
                else {
                    const funko: FunkoCart = {
                        funkoId: item.id,
                        quantity: item.quantity + 1
                    }
                    this.cartLocalService.updateCartItem(funko);
                    item.quantity--;
                    await this.funkoService.actualizarStock(item.id, item.stock + 1);
                    item.stock++;
                    this.totalQuantity.next(this.totalQuantity.value - 1);
                    this.obtenerTotalPrice();
                }
            });
        }
    }

    calculateTotalPrice(item: any): number {
        return item.price * item.quantity;
    }

    removeItem(item: any) {
        Swal.fire({
            text: "¿Está seguro de eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ELIMINAR",
            cancelButtonText: "CANCELAR"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const itemId = item.id || item.funkoId;

                // Remover inmediatamente de las listas locales para evitar parpadeo de pantalla
                this.cartItemsCopy = this.cartItemsCopy.filter(c => (c.id !== itemId && c.funkoId !== itemId));
                this.cartItems = this.cartItems.filter(c => c.funkoId !== itemId);

                const totalItems = this.cartItemsCopy.reduce((total, c) => total + c.quantity, 0);
                this.totalQuantity.next(totalItems);
                this.obtenerTotalPrice();

                if (this.currentUser && this.currentUser.id) {
                    await this.cartService.eliminarDelCarrito(itemId, this.currentUser.id);
                } else {
                    this.cartLocalService.removeFromCart(itemId);
                }
            }
        });
    }

    trackByFunkoId(index: number, item: any): number {
        return item.id || item.funkoId || index;
    }

    getTotalQuantity(): Observable<number> {
        return this.totalQuantity;
    }
}