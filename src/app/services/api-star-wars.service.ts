import { Injectable } from '@angular/core';
import axios from 'axios';
import { environments } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class ApiStarWarsService {
    url: string = environments.urlAPIStarWars;

    constructor() { }

    async getCharacterInfo(name: string) {
        try {
            const response = await axios(`${this.url}/characters/name/${name}`);
            const data = response.data;
            if (data === undefined) {
                return undefined;
            }
            return data[0];
        } catch (error) {
            alert('Error en la solicitud' + error);
        }
        return undefined;
    }
}