export interface User {
    id?: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}