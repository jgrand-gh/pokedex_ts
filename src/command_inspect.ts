import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
    if (!pokemonName) {
        console.log("Please provide a Pokemon name");
        console.log();
        return
    }

    if (!state.userPokedex[pokemonName]) {
        console.log("You have not caught that Pokemon yet!");
        console.log();
        return;
    }

    console.log();

    try {
        const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);

        console.log("Stats:");
        for (const stat of pokemon.stats) {
            console.log(` -${stat.stat.name}: ${stat.base_stat}`);
        }

        console.log("Types:");
        for (const type of pokemon.types) {
            console.log(` - ${type.type.name}`);
        }
    } catch (err) {
        throw err;
    }

    console.log();
};