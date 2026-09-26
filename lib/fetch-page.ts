import type { PokemonListItem } from "@/types/pokemon";
import { getAllPokemons, getPokemons } from "@/lib/pokeapi";

const ITEMS_PER_PAGE = 20;

export interface PageData {
  pokemons: PokemonListItem[];
  totalItems: number;
  page: number;
}

export async function fetchPage(searchTerm: string, requestedPage: number): Promise<PageData> {
  if (!searchTerm) {
    const data = await getPokemons(ITEMS_PER_PAGE, (requestedPage - 1) * ITEMS_PER_PAGE);
    const totalPages = Math.max(1, Math.ceil(data.count / ITEMS_PER_PAGE));
    return {
      pokemons: data.results,
      totalItems: data.count,
      page: Math.min(requestedPage, totalPages),
    };
  }

  const all = await getAllPokemons();
  const filtered = all.results.filter((p) => p.name.includes(searchTerm));
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * ITEMS_PER_PAGE;

  return {
    pokemons: filtered.slice(start, start + ITEMS_PER_PAGE),
    totalItems,
    page,
  };
}

export { ITEMS_PER_PAGE };
