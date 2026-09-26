import Link from "next/link";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import PokemonGrid from "@/components/PokemonGrid";
import { fetchPage, ITEMS_PER_PAGE } from "@/lib/fetch-page";

interface HomePageProps {
  searchParams?: Promise<{ search?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const searchTerm = (params?.search ?? "").trim().toLowerCase();
  const rawPage = Number(params?.page ?? "1");
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const { pokemons, totalItems, page } = await fetchPage(searchTerm, requestedPage);
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 font-bold text-white shadow-lg shadow-red-500/25">
              P
            </div>
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              Pokedex
            </span>
          </Link>
          <div className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-500">
            {totalItems} Pokemon
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 sm:pt-20 sm:pb-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            PokeAPI Explorer
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Explore the{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Pokemon
            </span>{" "}
            World
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Discover Pokemon and explore their types, abilities, statistics, and moves.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <SearchBar />

        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              {searchTerm ? "Search Results" : "All Pokemon"}
            </h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
              {totalItems} found
            </span>
          </div>

          <PokemonGrid pokemons={pokemons} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </section>

      <div className="h-20" />
    </main>
  );
}
