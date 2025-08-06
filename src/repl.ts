import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";

export function startREPL(): void {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    })

    rl.prompt();

    rl.on('line', (input) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }

        const commands = getCommands();
        const command = commands[cleanedInput[0]];
        if (!command) {
            console.log("Unknown command");
        } else {       
            command.callback(commands);
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter(input => input !== "");
}