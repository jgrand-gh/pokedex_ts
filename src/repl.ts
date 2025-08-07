import { State } from "./state.js";

export function startREPL(state: State): void {
    state.readline.prompt();

    state.readline.on('line', (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            state.readline.prompt();
            return;
        }

        const command = state.commands[cleanedInput[0]];
        if (!command) {
            console.log("Unknown command");
        } else {       
            command.callback(state);
        }
        state.readline.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter(input => input !== "");
}