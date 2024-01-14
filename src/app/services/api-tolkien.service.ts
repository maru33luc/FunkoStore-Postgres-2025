import { Injectable } from '@angular/core';
import axios from 'axios';
import { environments } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class ApiTolkienService {
    url: string = environments.urlAPITolkien;
    token: string = environments.tokenAPITolkien;
    constructor() { }

    async getCharacterInfo(name: string) {
        try {
            // Encapsula el nombre con / y ^ para hacer una búsqueda basada en expresiones regulares
            const regexName = `^${name}`;
            const response = await axios.get(`${this.url}/character?name=/${regexName}/i`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response.data;
        } catch (error) {
            alert('Error en la solicitud' + error);
        }
    }
}