// This is a Server Component by default
interface Card {
  id: string;
  name: string;
  game: string;
  set: string;
  number: string;
  rarity: string;
  tcgplayerId: string;
  variants: Variant[];
}

interface Variant {
  id: string;
  condition: string;
  printing: string;
  language: string;
  price: number;
  lastUpdated: number;
  priceChange24hr: number;
  priceChange7d: number;
  priceChange30d: number;
  priceHistory: PriceHistory[];
}

interface PriceHistory {
  p: number;
  t: number;
}

function formatCurrency(value?: number) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function fmtChange(value?: number) {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function changeColorClass(value?: number) {
  if (value == null || Number.isNaN(value)) return "text-gray-500 bg-gray-100 dark:bg-gray-800";
  if (value > 0) return "text-emerald-700 bg-emerald-50 dark:bg-emerald-900/40";
  if (value < 0) return "text-rose-700 bg-rose-50 dark:bg-rose-900/40";
  return "text-gray-600 bg-gray-100 dark:bg-gray-800";
}

function makeSparkline(priceHistory: PriceHistory[], width = 120, height = 36) {
  if (!priceHistory || priceHistory.length < 2) return null;
  const prices = priceHistory.map((p) => p.p).filter((v) => typeof v === "number");
  if (prices.length < 2) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const step = (width - 2) / (prices.length - 1);
  const points = prices.map((val, i) => {
    const x = 1 + i * step;
    const y = 1 + (1 - (val - min) / range) * (height - 2);
    return `${x},${y}`;
  });
  const d = `M${points.join(" L ")}`;
  const last = prices[prices.length - 1];
  const first = prices[0];
  const positive = last >= first;
  return { d, width, height, positive };
}

export default function SearchResults({ results }: { results: Card[] }) {
  if (!results || results.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 p-8 text-center">
        <svg className="mx-auto h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        <h3 className="mt-4 text-sm font-semibold">Search for cards</h3>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Try a name, set, or keyword — results will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((card) => {
        const bestVariant =
          (card.variants || []).slice().sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0] || null;
        const price = bestVariant?.price ?? null;
        const ph = bestVariant?.priceHistory ?? [];
        const spark = makeSparkline(ph);
        const change24 = bestVariant?.priceChange24hr;
        const change7 = bestVariant?.priceChange7d;
        const change30 = bestVariant?.priceChange30d;

        return (
          <article
            key={card.id}
            className="flex flex-col justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold leading-6 truncate">{card.name}</h4>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                    {card.set} • {card.number} • {card.rarity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(price ?? undefined)}
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {bestVariant ? `${bestVariant.printing} • ${bestVariant.language}` : "—"}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {spark ? (
                    <div className="w-28 sm:w-32 max-w-full">
                      <svg
                        viewBox={`0 0 ${spark.width} ${spark.height}`}
                        className="w-full h-8 rounded-md"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d={spark.d}
                          fill="none"
                          stroke={spark.positive ? "#10b981" : "#ef4444"}
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-28 h-8 bg-gray-100 dark:bg-gray-800 rounded-md" />
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${changeColorClass(
                      change24
                    )}`}
                    title="24 hour change"
                  >
                    {fmtChange(change24)}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${changeColorClass(
                      change7
                    )}`}
                    title="7 day change"
                  >
                    {fmtChange(change7)}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${changeColorClass(
                      change30
                    )}`}
                    title="30 day change"
                  >
                    {fmtChange(change30)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div>
                Game: <span className="text-gray-700 dark:text-gray-200 ml-1">{card.game}</span>
              </div>
              <a
                className="ml-4 text-indigo-600 dark:text-indigo-400 hover:underline"
                href={`https://www.tcgplayer.com/product/${card.tcgplayerId}`}
                target="_blank"
                rel="noreferrer"
              >
                View on TCGplayer
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
