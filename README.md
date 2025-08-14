# Next.js Secure TCG Search Tutorial

[![Powered by JustTCG](https://img.shields.io/badge/Powered%20by-JustTCG-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMjU2M2ViIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmE3YjJjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHRleHQgeT0iNzUiIHg9IjUwJSIgZm9udC1zaXplPSI3MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0idXJsKCNnKSI+VEM8L3RleHQ+PC9zdmc+)]()

This repository contains the source code for the blog post, **"The Production-Ready TCG Search: Securing API Keys with Next.js Server Components"**.

This project demonstrates the modern, secure way to fetch data from a third-party API within a Next.js 15 application. It evolves our previous vanilla JS tutorial into a production-grade example that protects your secret API keys.

**➡️ Read the full tutorial here: [Link to Blog Post Once Live]**

### The Secure Architecture

This project uses a URL-driven, server-first data fetching pattern. A Client Component manages the UI and updates the URL's search parameters, which triggers the parent Server Component to re-render and securely fetch new data.

**[Architectural Diagram Image: `images/architecture.png`]**

### Core Concepts Demonstrated

* **Secure API Key Management**: Storing and using secret keys in `.env.local` so they are never exposed to the browser.
* **Data Fetching in Server Components**: Using `async/await` directly within a Server Component to fetch data.
* **URL State Management**: Using Next.js's `useRouter` and `useSearchParams` hooks to drive application state.
* **Client & Server Composition**: Correctly composing interactive Client Components (`'use client'`) within parent Server Components.
* **Disabling Data Cache**: Using `{ cache: 'no-store' }` to ensure real-time data from the API.

---

### Getting Started

To get this project running on your local machine, follow these steps.

#### Prerequisites

* Node.js v22 or later.
* A free JustTCG API key. You can get one from the **[JustTCG Dashboard](https://justtcg.com/dashboard)**.

#### Installation & Configuration

1.  Clone this repository to your local machine:
    ```bash
    git clone https://github.com/JustTCG/nextjs-tcg-search-tutorial.git
    ```
2.  Navigate into the project directory and install dependencies:
    ```bash
    cd nextjs-tcg-search-tutorial
    npm install
    ```
3.  Create a local environment file by copying the example:
    ```bash
    cp .env.local.example .env.local
    ```
4.  Open the newly created `.env.local` file and replace `"your_api_key_here"` with your actual JustTCG API key.
5.  Start the Next.js development server:
    ```bash
    npm run dev
    ```

#### Running the Development Server
Open http://localhost:3000 in your browser to see the application.

About JustTCG
JustTCG is the dedicated, simple, and reliable pricing API for Trading Card Games, built by collectors for developers. We provide accurate, lightning-fast data, specializing exclusively in TCGs to eliminate bloat and irrelevant information.

🔗 Website: https://justtcg.com

📚 API Documentation: https://justtcg.com/docs

License
This project is licensed under the MIT License.
