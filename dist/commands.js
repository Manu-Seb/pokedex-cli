import { printUsage } from './repl.js';
export async function commandExit(state) {
    console.log('Closing the Pokedex... Goodbye!');
    state.readline.close();
    process.exit(0);
}
export async function commandHelp(state) {
    printUsage(state.registry());
}
export async function commandMapb(state) {
    const pokeAPI = state.PokeAPI;
    const locations = await pokeAPI.fetchLocations(state.prevURL || undefined);
    state.nextURL = locations.next;
    state.prevURL = locations.previous;
    for (const i in locations.results) {
        console.log(locations.results[i].name);
    }
}
export async function commandMap(state) {
    const pokeAPI = state.PokeAPI;
    const locations = await pokeAPI.fetchLocations(state.nextURL || undefined);
    state.nextURL = locations.next;
    state.prevURL = locations.previous;
    for (const i in locations.results) {
        console.log(locations.results[i].name);
    }
}
export async function commandExplore(state, location) {
    const pokeAPI = state.PokeAPI;
    console.log(`Exploring ${location}...`);
    console.log(`Found Pokemon:`);
    const locations = await pokeAPI.fetchLocation(location);
    locations.pokemon_encounters.forEach((element) => {
        console.log(' - ' + element.pokemon.name);
    });
}
export async function commandCatch(state, pokemon) {
    const pokeAPI = state.PokeAPI;
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    const pokemonInfo = await pokeAPI.fetchPokemon(pokemon);
    const scalingFactor = 50;
    const probablity = scalingFactor / pokemonInfo.base_experience;
    if (Math.random() < probablity) {
        console.log(`${pokemon} was caught!`);
        state.pokeDex[pokemon] = pokemonInfo;
    }
    else {
        console.log(`${pokemon} could not be caught`);
    }
}
export async function commandInspect(state, pokemon) {
    const pokeAPI = state.PokeAPI;
    const pokemonInfo = await pokeAPI.fetchCachedPokemon(pokemon);
    if (pokemonInfo == undefined) {
        console.log('You have not caught that pokemon');
        return;
    }
    console.log(`Name : ${pokemon}`);
    console.log(`Height : ${pokemonInfo.height}`);
    console.log(`Weight : ${pokemonInfo.weight}`);
    console.log(`Stats : `);
    for (const val of pokemonInfo.stats) {
        console.log(`  -${val.stat.name}: ${val.base_stat} `);
    }
    console.log(`Types: `);
    for (const val of pokemonInfo.types) {
        console.log(`  -${val.type.name} `);
    }
}
export async function commandPokedex(state) {
    const dex = state.pokeDex;
    for (const key in dex) {
        console.log(`  -${key}`);
    }
}
