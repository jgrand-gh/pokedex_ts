import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log();

    if (Object.keys(state.userPokedex).length === 0) {
        console.log("You haven't caught any Pokemon yet!");
        console.log();
        return;
    }
    
    console.log("Your Pokedex:");
    for (const pokemon of Object.values(state.userPokedex)) {
        console.log(` - ${pokemon.name}`);
    }

    console.log();
};