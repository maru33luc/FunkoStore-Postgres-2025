import { Injectable } from '@angular/core';
import axios from 'axios';
import { environments } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class PotterApiService {
    url = environments.urlAPIPotter;

    constructor() { }

    async getCharacterInfo(name: string) {
        try {
            const response = await axios(`${this.url}/api/characters`);
            const data = response;
            const character = data.data.filter((character: { name: string; }) => character.name === name);
            if (character.length === 0) {
                return undefined;
            }
            return character[0];
        } catch (error) {
            alert('Error en la solicitud' + error);
            return undefined;
        }
    }
}