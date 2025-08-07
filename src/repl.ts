import { State } from "./state.js";

export async function startREPL(state: State): Promise<void> {
    state.readline.prompt();

    state.readline.on('line', async (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            state.readline.prompt();
            return;
        }

        const command = state.commands[cleanedInput[0]];
        const args = cleanedInput.slice(1);
        
        if (!command) {
            console.log('Unknown command. Type "help" for a list of commands.');
            state.readline.prompt();
            return;
        } else {
            try {
                await command.callback(state, ...args);
            } catch (e) {
                console.error(`Command failed due to: ${(e as Error).message}`);
                console.log();
            }
            state.readline.prompt();
        }
    });
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter(input => input !== "");
}