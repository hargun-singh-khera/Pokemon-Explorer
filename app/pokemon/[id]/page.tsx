import { ArrowLeft, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StatBar from "@/components/StatBar";
import { getPokemon } from "@/lib/pokeapi";

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="text-center">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gray-100">
          <SearchX className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Pokemon Not Found</h1>
        <p className="mt-2 text-gray-500">We couldn&apos;t find a Pokemon with this ID.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition hover:bg-red-600 hover:shadow-red-500/30"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pokemon
        </Link>
      </div>
    </main>
  );
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  if (!pokemon) return <NotFound />;

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500 font-bold text-white shadow-lg shadow-red-500/25">
              P
            </div>
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              Pokedex
            </span>
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="relative bg-gradient-to-br from-gray-700 to-gray-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative flex flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:items-end sm:gap-10 sm:px-12 sm:py-16">
              {image && (
                <Image
                  src={image}
                  alt={pokemon.name}
                  width={400}
                  height={400}
                  priority
                  className="h-48 w-48 drop-shadow-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                />
              )}
              <div className="flex flex-col items-center gap-3 pb-2 text-center sm:items-start sm:text-left">
                <span className="text-sm font-bold text-white/70">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
                <h1 className="text-4xl font-extrabold capitalize tracking-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
                  {pokemon.name}
                </h1>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {pokemon.types.map((pokemonType) => (
                    <span
                      key={pokemonType.type.name}
                      className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold capitalize text-white backdrop-blur-sm"
                    >
                      {pokemonType.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6 sm:p-8">
            <div className="rounded-2xl bg-gray-50 p-4 sm:p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Height</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{pokemon.height / 10} <span className="text-sm font-medium text-gray-500">m</span></p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4 sm:p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Weight</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{pokemon.weight / 10} <span className="text-sm font-medium text-gray-500">kg</span></p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">Abilities</h2>
            {pokemon.abilities.length === 0 ? (
              <p className="mt-4 text-sm text-gray-400">No abilities recorded.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {pokemon.abilities.map((abilityEntry) => (
                  <div
                    key={abilityEntry.ability.name}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <span className="text-sm font-semibold capitalize text-gray-800">
                      {abilityEntry.ability.name.replace("-", " ")}
                    </span>
                    {abilityEntry.is_hidden && (
                      <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-600">
                        Hidden
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">Base Stats</h2>
            {pokemon.stats.length === 0 ? (
              <p className="mt-4 text-sm text-gray-400">No stats recorded.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {pokemon.stats.map((statEntry) => (
                  <StatBar key={statEntry.stat.name} label={statEntry.stat.name} value={statEntry.base_stat} />
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Moves</h2>
            {pokemon.moves.length > 0 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                {pokemon.moves.length} total
              </span>
            )}
          </div>
          {pokemon.moves.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">No moves recorded.</p>
          ) : (
            <>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pokemon.moves.slice(0, 40).map((moveEntry) => (
                  <span
                    key={moveEntry.move.name}
                    className="rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-medium capitalize text-gray-600 ring-1 ring-gray-100"
                  >
                    {moveEntry.move.name.replace("-", " ")}
                  </span>
                ))}
              </div>
              {pokemon.moves.length > 40 && (
                <p className="mt-4 text-xs text-gray-400">Showing 40 of {pokemon.moves.length} moves.</p>
              )}
            </>
          )}
        </section>
      </section>

      <div className="h-20" />
    </main>
  );
}
