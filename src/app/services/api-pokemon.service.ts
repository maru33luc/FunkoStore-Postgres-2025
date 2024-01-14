import { Injectable } from '@angular/core';
import axios from 'axios';
import { CharacterApiPokemon } from '../interfaces/CharacterApi';
import { environments } from 'src/environments/environments';

@Injectable({
    providedIn: 'root'
})
export class ApiPokemonService {
    private url: string = environments.urlPokemonJson;

    constructor() { }

    async getPokemon(id: number | undefined): Promise<CharacterApiPokemon | undefined> {
        try {
            const response = await axios.get(`${this.url}/pokemon/${id}`);
            return response.data;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }
}