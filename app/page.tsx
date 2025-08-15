import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

// Function to fetch the list of games with long-term caching
async function getGames() {
  const response = await fetch("https://api.justtcg.com/v1/games", {
    headers: {
      "x-api-key": process.env.JUSTTCG_API_KEY!,
    },
    // Revalidate this data at most once every 24 hours (86400 seconds)
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    // Return empty array on error so the page can still render
    return [];
  }

  const data = await response.json();
  return data.data;
}

// Function to fetch search results for cards
async function getCardSearchResults(query: string, game: string) {
  if (!query) return [];

  const params = new URLSearchParams({ q: query });
  if (game) params.set("game", game);
  const response = await fetch(`https://api.justtcg.com/v1/cards?${params.toString()}`, {
    headers: {
      "x-api-key": process.env.JUSTTCG_API_KEY!,
    },
    cache: "no-store",
  });

  if (!response.ok) return [];

  const data = await response.json();
  return data.data;
}

// This is a Server Component by default
export default async function Page({ searchParams }: { searchParams?: Promise<{ q?: string; game?: string }> }) {
  const searchQuery = (await searchParams)?.q || "";
  const gameQuery = (await searchParams)?.game || "";

  // Initiate both data fetches in parallel
  const gamesDataPromise = getGames();
  const searchResultsPromise = getCardSearchResults(searchQuery, gameQuery);

  // Wait for both promises to resolve
  const [games, searchResults] = await Promise.all([gamesDataPromise, searchResultsPromise]);

  return (
    <main>
      <h1>Secure TCG Search</h1>
      {/* Pass the fetched games list as a prop to the SearchBar */}
      <SearchBar games={games} />
      <SearchResults results={searchResults} />
    </main>
  );
}
