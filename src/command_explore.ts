import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    if (!locationName) {
        console.log("Please provide a location name");
        console.log();
        return
    }

    console.log();
    console.log(`Exploring ${locationName}...`);

    try {
        const location = await state.pokeAPI.fetchLocation(locationName);
        console.log("Found Pokemon:");

        for (const encounters of location.pokemon_encounters) {
            console.log(` - ${encounters.pokemon.name}`);
        }
    } catch (err) {
        throw err;
    }

    console.log();
};