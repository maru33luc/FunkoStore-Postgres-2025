
export interface FunkoCart {
    funkoId: number;
    quantity: number;
}

export interface ItemCart {
    id: number;
    id_cart: number | undefined;
    id_funko: number;
    cantidad: number;
    subtotal: number;
}

export interface Cart{
    id: number;
    id_user: number;
}