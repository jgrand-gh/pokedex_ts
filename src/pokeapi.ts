export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    
    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const fullURL = pageURL || `${PokeAPI.baseURL}/location-area/`;

        try {
            const response = await fetch(fullURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}, ${response.statusText}`)
            }

            const result: ShallowLocations = await response.json();
            return result as ShallowLocations;
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