import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays Pokemon locations in batches of 20; additional commands will output the next 20",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous batch of 20 Pokemon locations",
            callback: commandMapBack,
        },
    }
}