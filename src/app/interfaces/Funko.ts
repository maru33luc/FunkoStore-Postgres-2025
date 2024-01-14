export interface Funko {
    name: string;
    description: string;
    category: string;
    serie: string;
    price: number;
    front_image: string;
    back_image: string;
    licence: string;    
    stock: number;
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}