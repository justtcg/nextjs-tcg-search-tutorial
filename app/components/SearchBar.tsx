"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";

// Define the type for a single game object
type Game = {
  id: number;
  name: string;
  slug: string;
};

export default function SearchBar({ games }: { games: Game[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function pushWithParams(params: URLSearchParams) {
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const params = new URLSearchParams(searchParams);
    params.set("q", formData.get("q") as string);
    params.set("game", formData.get("game") as string);

    pushWithParams(params);
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    pushWithParams(params);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  const initial = searchParams.get("q") || "";

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <label htmlFor="search" className="sr-only">
        Search cards
      </label>

      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {/* subtle search icon */}
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <input
          id="search"
          name="q"
          ref={inputRef}
          defaultValue={initial}
          placeholder="Search card name, set, or keyword"
          className="block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 py-3 pl-12 pr-48 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              clearSearch();
            }
          }}
          aria-label="Search cards"
        />

        {/* Games dropdown styled to match the input */}
        <select
          name="game"
          defaultValue={searchParams.get("game") || ""}
          aria-label="Filter by game"
          className="absolute right-28 top-1/2 -translate-y-1/2 w-36 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 text-sm text-gray-700 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        >
          <option value="">All Games</option>
          {games.map((game) => (
            <option key={game.id} value={game.slug}>
              {game.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-40 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
          aria-label="Clear search"
          title="Clear"
        >
          {/* x icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white px-4 py-2 text-sm font-medium shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          aria-label="Search"
        >
          Search
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Try &quot;Pikachu&quot;, &quot;White Dragon&quot; or &quot;Traveling Chocobo&quot;. Press Esc to clear.
      </p>
    </form>
  );
}
