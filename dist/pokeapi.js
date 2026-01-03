import { Cache } from './pokecache.js';
export class PokeAPI {
    static baseURL = 'https://pokeapi.co/api/v2';
    cache = new Cache(10000);
    constructor() { }
    async fetchLocations(pageURL) {
        const callingURL = pageURL ?? PokeAPI.baseURL + `/location-area/`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val;
        }
        const response = await fetch(callingURL);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const values = await response.json();
        this.cache.add(callingURL, values);
        return values;
    }
    async fetchLocation(location) {
        const callingURL = PokeAPI.baseURL + `/location-area/${location}`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val;
        }
        const response = await fetch(callingURL);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const values = await response.json();
        this.cache.add(callingURL, values);
        return values;
    }
    async fetchPokemon(pokemon) {
        const pokemonName = pokemon.trim().toLowerCase();
        const callingURL = PokeAPI.baseURL + `/pokemon/${pokemonName}`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val;
        }
        const response = await fetch(callingURL);
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`);
        }
        const values = await response.json();
        this.cache.add(callingURL, values);
        return values;
    }
    async fetchCachedPokemon(pokemon) {
        const pokemonName = pokemon.trim().toLowerCase();
        const callingURL = PokeAPI.baseURL + `/pokemon/${pokemonName}`;
        const cached = this.cache.get(callingURL);
        if (cached) {
            return cached.val;
        }
        return undefined;
    }
}
