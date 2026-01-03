import { createInterface, Interface } from 'readline';
import {
    commandCatch,
    commandExit,
    commandExplore,
    commandHelp,
    commandInspect,
    commandMap,
    commandMapb,
    commandPokedex,
} from './commands.js';
import { stdin, stdout } from 'node:process';
import { PokeAPI, PokemonInfo } from './pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    PokeAPI: PokeAPI;
    nextURL: string | null;
    prevURL: string | null;
    pokeDex: Record<string, PokemonInfo>;
    registry: () => Record<string, CLICommand>;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: commandExit,
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp,
        },
        map: {
            name: 'map',
            description: 'Displays the next 20 areas',
            callback: commandMap,
        },
        mapb: {
            name: 'mapb',
            description: 'Displays the previous 20 areas',
            callback: commandMapb,
        },
        explore: {
            name: 'Explore',
            description: 'Displays the previous 20 areas',
            callback: commandExplore,
        },
        catch: {
            name: 'Catch',
            description: 'Catch a pokemon',
            callback: commandCatch,
        },
        inspect: {
            name: 'Inspect',
            description: 'Inspect a pokemon',
            callback: commandInspect,
        },
        pokedex: {
            name: 'PokeDex',
            description: 'View all caught pokemon',
            callback: commandPokedex,
        },
    };
}

export function initState(): State {
    const pokemon = createInterface({
        input: stdin,
        output: stdout,
        prompt: 'Pokedex >',
    });

    const pokeAPI: PokeAPI = new PokeAPI();
    const pokeDex: Record<string, PokemonInfo> = {};
    return {
        readline: pokemon,
        registry: getCommands,
        PokeAPI: pokeAPI,
        nextURL: null,
        prevURL: null,
        pokeDex: pokeDex,
    };
}
