import { State } from "./state.js";

export async function commandMap(state: State) {
    console.log();

    try {
        const locations = state.nextLocationsURL
            ? await state.pokeAPI.fetchLocations(state.nextLocationsURL)
            : await state.pokeAPI.fetchLocations();
        
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;

        for (const location of locations.results) {
            console.log(location.name);
        }
    } catch (err) {
        throw err;
    }

    console.log();
};

export async function commandMapBack(state: State) {
    console.log();

    if (state.prevLocationsURL) {
        try {
            const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL)
            
            state.nextLocationsURL = locations.next;
            state.prevLocationsURL = locations.previous;

            for (const location of Object.values(locations.results)) {
                console.log(location.name);
            }
        } catch (err) {
            throw err;
        }
    } else {
        console.log("you're on the first page.");
    }

    console.log();
};