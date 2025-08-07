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

    async fetchLocation(locationName: string): Promise<Location> {
        const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached_entry = this.#cache.get<Location>(fullURL);
        if (cached_entry) {
            return cached_entry;
        }

        try {
            const response = await fetch(fullURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}, ${response.statusText}`)
            }

            const result: Location = await response.json();
            this.#cache.add(fullURL, result);
            return result;
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error(`pokeapi - fetchLocation API call failed: ${(e as Error).message}`);
            }
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached_entry = this.#cache.get<Pokemon>(fullURL);
        if (cached_entry) {
            return cached_entry;
        }

        try {
            const response = await fetch(fullURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}, ${response.statusText}`)
            }

            const result: Pokemon = await response.json();
            this.#cache.add(fullURL, result);
            return result;
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error(`pokeapi - fetchPokemon API call failed: ${(e as Error).message}`);
            }
        }
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
    encounter_method_rates: {
        encounter_method: {
            name: string
            url: string
        }
        version_details: {
            rate: number
            version: {
                name: string
                url: string
            }
        }[]
    }[]
    game_index: number
    id: number
    location: {
        name: string
        url: string
    }
    name: string
    names: {
        language: {
            name: string
            url: string
        }
        name: string
    }[]
    pokemon_encounters: {
        pokemon: {
            name: string
            url: string
        }
        version_details: {
            encounter_details: {
                chance: number
                condition_values: any[]
                max_level: number
                method: {
                    name: string
                    url: string
                }
                min_level: number
            }[]
            max_chance: number
            version: {
                name: string
                url: string
            }
        }[]
    }[]
};

export type Pokemon = {
    abilities: {
        ability: {
            name: string
            url: string
        }
        is_hidden: boolean
        slot: number
    }[]
    base_experience: number
    cries: {
        latest: string
        legacy: any
    }
    forms: {
        name: string
        url: string
    }[]
    game_indices: any[]
    height: number
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: {
        move: {
            name: string
            url: string
        }
        version_group_details: {
            level_learned_at: number
            move_learn_method: {
                name: string
                url: string
            }
            order?: number
            version_group: {
                name: string
                url: string
            }
        }[]
    }[]
    name: string
    order: number
    past_abilities: any[]
    past_types: any[]
    species: {
        name: string
        url: string
    }
    sprites: {
        back_default: any
        back_female: any
        back_shiny: any
        back_shiny_female: any
        front_default: string
        front_female: any
        front_shiny: string
        front_shiny_female: any
        other: {
            dream_world: {
                front_default: any
                front_female: any
            }
            home: {
                front_default: string
                front_female: any
                front_shiny: string
                front_shiny_female: any
            }
            "official-artwork": {
                front_default: string
                front_shiny: string
            }
            showdown: {
                back_default: any
                back_female: any
                back_shiny: any
                back_shiny_female: any
                front_default: any
                front_female: any
                front_shiny: any
                front_shiny_female: any
            }
        }
        versions: {
            "generation-i": {
                "red-blue": {
                    back_default: any
                    back_gray: any
                    back_transparent: any
                    front_default: any
                    front_gray: any
                    front_transparent: any
                }
                yellow: {
                    back_default: any
                    back_gray: any
                    back_transparent: any
                    front_default: any
                    front_gray: any
                    front_transparent: any
                }
            }
            "generation-ii": {
                crystal: {
                    back_default: any
                    back_shiny: any
                    back_shiny_transparent: any
                    back_transparent: any
                    front_default: any
                    front_shiny: any
                    front_shiny_transparent: any
                    front_transparent: any
                }
                gold: {
                    back_default: any
                    back_shiny: any
                    front_default: any
                    front_shiny: any
                    front_transparent: any
                }
                silver: {
                    back_default: any
                    back_shiny: any
                    front_default: any
                    front_shiny: any
                    front_transparent: any
                }
            }
            "generation-iii": {
                emerald: {
                    front_default: any
                    front_shiny: any
                }
                "firered-leafgreen": {
                    back_default: any
                    back_shiny: any
                    front_default: any
                    front_shiny: any
                }
                "ruby-sapphire": {
                    back_default: any
                    back_shiny: any
                    front_default: any
                    front_shiny: any
                }
            }
            "generation-iv": {
                "diamond-pearl": {
                    back_default: any
                    back_female: any
                    back_shiny: any
                    back_shiny_female: any
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
                "heartgold-soulsilver": {
                    back_default: any
                    back_female: any
                    back_shiny: any
                    back_shiny_female: any
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
                platinum: {
                    back_default: any
                    back_female: any
                    back_shiny: any
                    back_shiny_female: any
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
            }
            "generation-v": {
                "black-white": {
                    animated: {
                        back_default: any
                        back_female: any
                        back_shiny: any
                        back_shiny_female: any
                        front_default: any
                        front_female: any
                        front_shiny: any
                        front_shiny_female: any
                    }
                    back_default: any
                    back_female: any
                    back_shiny: any
                    back_shiny_female: any
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
            }
            "generation-vi": {
                "omegaruby-alphasapphire": {
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
                "x-y": {
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
            }
            "generation-vii": {
                icons: {
                    front_default: any
                    front_female: any
                }
                "ultra-sun-ultra-moon": {
                    front_default: any
                    front_female: any
                    front_shiny: any
                    front_shiny_female: any
                }
            }
            "generation-viii": {
                icons: {
                    front_default: any
                    front_female: any
                }
            }
        }
    }
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: string
            url: string
        }
    }[]
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]
    weight: number
};