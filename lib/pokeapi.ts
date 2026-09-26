import type { Pokemon, PokemonListItem, PokemonListResponse } from "@/types/pokemon";

const API = "https://pokeapi.co/api/v2";
const FETCH_ALL_LIMIT = 2000;

export async function getPokemons(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${API}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch Pokemons");
  return response.json();
}

export async function getAllPokemons(): Promise<PokemonListResponse> {
  const response = await fetch(`${API}/pokemon?limit=${FETCH_ALL_LIMIT}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch Pokemons");
  return response.json();
}

export async function getPokemon(id: string): Promise<Pokemon | null> {
  const response = await fetch(`${API}/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;
  return response.json();
}

export function getPokemonId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getPokemonImage(pokemon: PokemonListItem): string {
  const id = getPokemonId(pokemon.url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
