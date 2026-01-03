export async function startREPL(state) {
    console.log('Welcome to the Pokedex!');
    console.log('Usage:\n');
    let commands = state.registry();
    printUsage(commands);
    state.readline.prompt();
    state.readline.on('line', async (input) => {
        let actual = cleanInput(input);
        if (actual.length == 0) {
            state.readline.prompt();
            return;
        }
        if (actual[0] in commands) {
            await commands[actual[0]].callback(state, actual[1]);
        }
        else {
            console.log('Unknown command');
        }
        state.readline.prompt();
    });
}
export function printUsage(commands) {
    for (const key in commands) {
        console.log(`${key}: ${commands[key].description}`);
    }
}
export function cleanInput(input) {
    let temp = input.split(' ').map((x) => x.toLowerCase());
    return temp;
}
