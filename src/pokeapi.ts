import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(interval: number) {
        this.#cache = new Cache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL || `${PokeAPI.baseURL}/location-area/`;

        const cached_entry = this.#cache.get<ShallowLocations>(fullURL);
        if (cached_entry) {
            return cached_entry;
        }

        try {
            const response = await fetch(fullURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}, ${response.statusText}`)
            }

            const result: ShallowLocations = await response.json();
            this.#cache.add(fullURL, result);
            return result;
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error(`pokeapi - fetchLocations API call failed: ${(e as Error).message}`);
            }
        }
    }

    async fetchLocation(locationName: string): Promise<void> {

    }
}

export type ShallowLocations = {
    count: number,
    next: string,
    previous: any,
    results: {
        name: string,
        url: string,
    }[],
};

export type Location = {

};