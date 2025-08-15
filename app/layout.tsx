import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JustTCG Card Search",
  description: "Search for your favorite TCG cards",
};

import { Suspense, type ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-[#030312] dark:via-[#000000] dark:to-[#000000] text-gray-900 dark:text-gray-100 antialiased">
        <div className="min-h-screen flex items-start justify-center py-20 px-6">
          <div className="w-full max-w-4xl">
            <main className="mx-auto bg-white/60 dark:bg-gray-900/50 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Secure TCG Search — private API key used on the server
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
