import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { PokemonListItem } from "@/types/pokemon";
import { getPokemonId, getPokemonImage } from "@/lib/pokeapi";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = getPokemonId(pokemon.url);
  const image = getPokemonImage(pokemon);

  return (
    <Link
      href={`/pokemon/${id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gray-50">
        <span className="absolute right-3 top-3 text-xs font-bold text-gray-300">
          #{String(id).padStart(3, "0")}
        </span>
        <Image
          src={image}
          alt={pokemon.name}
          width={200}
          height={200}
          className="relative z-10 h-28 w-28 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-36 sm:w-36"
        />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-base font-bold capitalize text-gray-900 sm:text-lg">
          {pokemon.name}
        </h2>
        <span className="flex items-center gap-1 text-xs font-medium text-red-500 transition-colors group-hover:text-red-600">
          View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
