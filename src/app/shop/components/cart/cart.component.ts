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
        this.cartItemsCopy = []; // Clear the array before populating it again
        // Use a Map to track unique items based on funkoId
        const uniqueItemsMap = new Map<number, any>();
        
        for (const item of this.cartItems) {
            try {
                const funko: any | undefined = await this.funkoService.getFunko(item.funkoId);
                if (funko) {
                    const itemACopiar = { ...funko, quantity: item.quantity };
                    // Use funkoId as the key to ensure uniqueness
                    uniqueItemsMap.set(item.funkoId, itemACopiar);
                    
                } else {
                    console.log('Item not found:', item);
                }
            } catch (error) {
                console.error('Error loading details for item:', item, error);
            }
        }
        // Convert the Map values back to an array
        this.cartItemsCopy = Array.from(uniqueItemsMap.values());  
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
                if (this.user) {
                    this.loginService.authStateObservable()?.subscribe(async (user) => {
                        if (user) {
                            const userId = user.id || 0; // Add null check and provide a default value
                            const res = await this.cartService.eliminarDelCarrito(item.id, userId);
                            if (res) {
                                this.cartItems = this.cartItems.filter((cartItem) => cartItem.funkoId !== item.id);
                            }
                            await this.loadFunkoDetails();
                        }
                    });
                } else {
                    this.cartLocalService.removeFromCart(item.id);
                    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
                }
            }
        });
    }

    getTotalQuantity(): Observable<number> {
        return this.totalQuantity;
    }
}