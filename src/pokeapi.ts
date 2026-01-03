import { Cache } from './pokecache.js';

export class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';
    private cache = new Cache(10000);

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const callingURL = pageURL ?? PokeAPI.baseURL + `/location-area/`;

        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val as ShallowLocations;
        }
        const response = await fetch(callingURL);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const values: ShallowLocations = await response.json();
        this.cache.add(callingURL, values);
        return values;
    }

    async fetchLocation(location: string): Promise<LocationArea> {
        const callingURL = PokeAPI.baseURL + `/location-area/${location}`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val as LocationArea;
        }
        const response = await fetch(callingURL);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const values: LocationArea = await response.json();
        this.cache.add(callingURL, values);
        return values;
    }

    async fetchPokemon(pokemon: string): Promise<PokemonInfo> {
        const pokemonName = pokemon.trim().toLowerCase();
        const callingURL = PokeAPI.baseURL + `/pokemon/${pokemonName}`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val as PokemonInfo;
        }
        const response = await fetch(callingURL);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const values: PokemonInfo = await response.json();
        this.cache.add(callingURL, values);
        return values;
    }

    async fetchCachedPokemon(
        pokemon: string
    ): Promise<PokemonInfo | undefined> {
        const pokemonName = pokemon.trim().toLowerCase();
        const callingURL = PokeAPI.baseURL + `/pokemon/${pokemonName}`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val as PokemonInfo;
        }
        return undefined;
    }
}
export type Location = {
    name: string;
    url: string;
};

export type ShallowLocations = {
    count: Number;
    next: string;
    previous: string;
    results: Location[];
};

type Pokemon = {
    name: string;
    url: string;
};

type PokemonEncounter = {
    pokemon: Pokemon;
};

export type LocationArea = {
    pokemon_encounters: PokemonEncounter[];
};

export type PokemonInfo = {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: Stat[];
    types: Type[];
};

type Stat = {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};
