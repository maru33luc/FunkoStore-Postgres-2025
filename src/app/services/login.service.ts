import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { environments } from 'src/environments/environments';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private authState$: BehaviorSubject<any> | undefined;
    urlAuth = environments.urlUsersData;

    constructor() {
        this.initialize();
        // Crea un observable personalizado para el estado de autenticación
        this.authState$ = new BehaviorSubject<any>(null);
    }

    private initialize(): void {
        window.addEventListener('unload', this.onUnload.bind(this));
    }

    // Define un método para obtener el observable del estado de autenticación
    authStateObservable(): Observable<User> | undefined {
        return this.authState$;
    }

    async getUsers(): Promise<User[] | undefined> {
        try {
            const response = await axios.get(this.urlAuth);
            return response.data;
        } catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async register(
        email: string,
        password: string,
        nombre: string,
        apellido: string
    ) {
        let lenght = 0;
        try {
            const users = await this.getUsers();
            if (users) {
                const userFound = users.find((user) => user.email === email);
                lenght = users.length;
                if (userFound) {
                    throw new Error('El usuario ya existe');
                }
            }
            try {
                const user: User = {
                    id: lenght + 1,
                    name: nombre,
                    last_name: apellido,
                    email: email,
                    password: password,
                    isAdmin: false,
                };
                const userCredential = await axios.post(this.urlAuth, user);
                alert('Usuario registrado con éxito');
            } catch (error) {
                alert('No se pudo registrar el usuario');
            }
        } catch (error) {
            alert('No se pudo obtener la lista de usuarios');
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const userCredential = {
                email: email,
                password: password,
            };
            const response = await axios.post(
                `${this.urlAuth}/auth`,
                userCredential
            );
            if(response){
                this.storeToken(response.data.token);
                try{
                    const user = await axios.get(`${this.urlAuth}/auth`, {
                        headers: {
                            Authorization: `Bearer ${response.data.token}` // Enviar el token en el encabezado
                        }
                    });
                    if(user){
                        this.authState$?.next(user.data);
                        return user.data;
                    }
                }
                catch(e){
                    console.log(e);
                }

            }


        } catch (e) {
            alert('No se pudo iniciar sesión');
            window.location.href = '/login';
            return null;
        }
    }
    private storeToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            window.location.href = '/home';
            alert('Sesión cerrada con éxito');
        } catch (e) {
            console.log(e);
            alert('No se pudo cerrar sesión');
        }
    }

    async getDataActualUser():Promise<any> {
        const token = this.getToken();
        if (!token) {
            throw new Error('No hay token disponible');
        }
        try {
            const res = await axios.get(`${this.urlAuth}/auth`, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en el encabezado
                }
            });
            if (res) {
                return res.data;
            }
            return null;
        } catch (e) {
            console.error('Error al obtener información del usuario', e);
            return null;
        }
    }

    private onUnload(): void {
        this.logout();
    }

    async getUserName() {
        const data = await this.getDataActualUser();
        if (data) {
            return data.name;
        }
    }

    async updateDataUser(
        nombre: string,
        apellido: string,
        email: string,
        password: string
    ) {
        const data = await this.getDataActualUser();
        const token = this.getToken(); // Obtener el token del servicio de login

        if (!token) {
            throw new Error('No hay token disponible'); // Manejar el caso donde no hay token
        }
        if (data) {
            const user: User = {
                id: data.id,
                name: nombre,
                last_name: apellido,
                email: email,
                password: password,
                isAdmin: data.isAdmin,
            };
            try {
                const userCredential = await axios.put(
                    `${this.urlAuth}/${data.id}`,
                    user,{
                        headers: {
                            Authorization: `Bearer ${token}` // Enviar el token en el encabezado
                        }
                    }
                );
                alert('Usuario actualizado con éxito');
            } catch (error) {
                alert('No se pudo actualizar el usuario');
            }
        }
    }

    isUserLoggedIn(): boolean {
        const token = this.getToken();
        return token !== null; // Verifica si hay un token almacenado
    }

    // isAdmin(): Observable<boolean> {
    //     return new Observable<boolean>((observer) => {
    //         this.authState$?.subscribe((user) => {
    //             if (user) {
    //                 observer.next(user.isAdmin);
    //             } else {
    //                 observer.next(false);
    //             }
    //         });
    //     });
    // }

    isAdmin(): boolean {
        return this.authState$?.value.isAdmin;
    }

    async resetPassword(email: string) {}
}

// Método para almacenar el token en el almacenamiento local
