import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
    if (!pokemonName) {
        console.log("Please provide a Pokemon name");
        console.log();
        return
    }

    console.log();
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    try {
        const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

        const baseExp = pokemon.base_experience || 1;
        const catchChance = (100 - Math.log(baseExp) * 15);
        const roll = 100 * Math.random();

        if (catchChance > roll) {
            console.log(`${pokemonName} was caught!`);
            console.log('You may now inspect it with the "inspect" command.');
            state.userPokedex[pokemonName] = pokemon;
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    } catch (err) {
        throw err;
    }

    console.log();
};