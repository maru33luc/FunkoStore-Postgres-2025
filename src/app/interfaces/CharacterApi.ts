export interface CharacterApiTolkien {
    race: string;
    spouse: string;
    wikiUrl: string;
    birth: string;
    death: string;
}

export interface CharacterApiPotter {
    species : string;
    house : string;
    dateOfBirth: string;
    ancestry: string;
    patronus: string;
    wand: {
        wood: string;
        core: string;
    }
    image: string;
}

export interface CharacterApiStarWars {
    name: string;
    description: string;
    image: string;
}

export interface CharacterApiPokemon {
    name: string,
    description: string,
    type: string,
    height: string,
    weight: string,
    id?: number
}