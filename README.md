# Pokedex CLI

This project is a simple command-line Pokedex built with TypeScript. Explore Pokemon locations, catch Pokemon, inspect their stats, and manage your personal Pokedex—all from your terminal!

## Features

- Browse Pokemon locations in batches
- Explore areas to discover local Pokemon
- Attempt to catch Pokemon and build your Pokedex
- Inspect detailed stats and types of caught Pokemon
- Command-based REPL interface

## Requirements

- Node.js 22.15.0 or newer (see [.nvmrc](.nvmrc))
- TypeScript (see [package.json](package.json))

## Getting Started

1. **Clone the repository**
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Build the project:**
   ```sh
   npm run build
   ```
4. **Start the Pokedex CLI:**
   ```sh
   npm start
   ```

## Controls / Commands

- `help` — Displays a help message with available commands
- `exit` — Exits the Pokedex
- `map` — Displays Pokemon locations in batches of 20
- `mapb` — Displays the previous batch of 20 Pokemon locations
- `explore <location_name>` — Lists Pokemon found in the specified area
- `catch <pokemon_name>` — Attempt to catch a Pokemon by name
- `inspect <pokemon_name>` — Inspect a caught Pokemon's stats and types
- `pokedex` — Displays the list of Pokemon you've caught

## Project Structure

- [`src/main.ts`](src/main.ts) — Entry point, starts the REPL
- [`src/repl.ts`](src/repl.ts) — REPL loop and input cleaning
- [`src/state.ts`](src/state.ts) — Application state and initialization
- [`src/commands.ts`](src/commands.ts) — Command definitions and descriptions
- [`src/command_*.ts`](src/) — Individual command implementations
- [`src/pokeapi.ts`](src/pokeapi.ts) — PokeAPI wrapper and type definitions
- [`src/pokecache.ts`](src/pokecache.ts) — Simple in-memory cache for API responses
- [`src/pokecache.test.ts`](src/pokecache.test.ts) — Cache unit tests
- [`src/repl.test.ts`](src/repl.test.ts) — REPL input cleaning tests

## License

This project is for educational purposes as part of a Boot.dev learning module.
