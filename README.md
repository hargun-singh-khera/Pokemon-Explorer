# Pokedex

A responsive Pokemon explorer built with Next.js, powered by the [PokeAPI](https://pokeapi.co).

## Features

- Browse all Pokemon with paginated listing
- Search Pokemon by name with real-time debounced filtering
- Detailed Pokemon pages with stats, abilities, types, and moves
- Fully responsive design for mobile, tablet, and desktop
- Server-side rendering with ISR caching (1 hour)
- URL-based pagination and search with clean query parameters

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Data:** PokeAPI (REST)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── app/
│   ├── page.tsx                    # Home page (listing + search + pagination)
│   ├── layout.tsx                  # Root layout with Geist font
│   ├── globals.css                 # Global styles
│   └── pokemon/[id]/page.tsx       # Pokemon detail page
├── components/
│   ├── Pagination.tsx              # Client-side pagination controls
│   ├── PokemonCard.tsx             # Pokemon list item card
│   ├── PokemonGrid.tsx             # Responsive grid layout
│   ├── SearchBar.tsx               # Debounced search input
│   └── StatBar.tsx                 # Stat bar visualization
├── lib/
│   ├── fetch-page.ts               # Page data fetching logic
│   └── pokeapi.ts                  # PokeAPI client functions
├── types/
│   └── pokemon.ts                  # TypeScript interfaces
└── public/                         # Static assets
```

## API

This project uses the public PokeAPI. All requests are cached for 1 hour via Next.js ISR.

## License

MIT
