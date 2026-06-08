# Photo Library

A small photo library built with **Angular 22**. It shows an infinite, random
photostream and lets you save photos to a **Favorites** library that survives a
page refresh. Images come from [picsum.photos](https://picsum.photos).

## Features

- **Photostream** (`/`) — an infinite, randomly-ordered grid of photos. New
  pages load automatically as you scroll, with a loading spinner and graceful
  error / empty states.
- **Click to favorite** — clicking a photo in the stream toggles it in your
  Favorites.
- **Favorites** (`/favorites`) — a grid of every saved photo; each tile opens
  its detail page. Favorites are stored in `localStorage`, so they **persist
  across refreshes**.
- **Single photo** (`/photos/:id`) — a full-screen view of one photo with an
  add / **remove from favorites** action.
- Responsive, accessible **Material 3** UI with an active-route-aware header.

## Tech stack

- **Angular 22** — standalone components, **zoneless** change detection, signals
- **Angular Material 22** (Material 3 theming) + **SCSS**
- **TypeScript 6**, RxJS (`rxResource`, HTTP interceptors)
- **Vitest** + jsdom for unit tests, esbuild (`@angular/build`) for the build

## Getting started

**Prerequisites:** Node.js `^20.19`, `^22.12`, or `≥24`, and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server  ->  http://localhost:4200/
npm start

# 3. Run the unit tests
npm test

# 4. Production build  ->  dist/gallery-template/browser
npm run build
```

### Scripts

| Script | What it does |
| --- | --- |
| `npm start` | Dev server with live reload at `http://localhost:4200/` |
| `npm test` | Runs the unit-test suite once (Vitest) |
| `npm run build` | Production build into `dist/gallery-template/browser` |
| `npm run watch` | Development build that rebuilds on change |

## Routes

| Path | Screen |
| --- | --- |
| `/` | Photostream (infinite scroll) |
| `/favorites` | Favorites library |
| `/photos/:id` | Single photo |

## Project structure

```
src/app/
├── core/            # app-wide singletons
│   ├── interceptors/  latency-interceptor — simulates a 200–300 ms API delay
│   ├── models/        Photo
│   ├── services/      photo · favorites · localstorage
│   └── tokens/        API_BASE_URL · SIMULATED_LATENCY · INTERSECTION_OBSERVER · BROWSER_STORAGE
├── features/        # lazy-loaded routed pages
│   ├── photos/        Photos page + Photostream (paginated stream state)
│   ├── favorites/     Favorites page
│   └── photo-detail/  single-photo page
├── layout/
│   └── header/        top navigation
└── shared/          # reusable building blocks
    ├── components/    photo-card · photo-grid · loading-indicator
    ├── directives/    infinite-scroll · image-status
    ├── styles/        image-grid mixins
    └── utils/         image-loader (picsum responsive URLs)
```

## Notable implementation details

- **Infinite scroll is hand-rolled** with an `IntersectionObserver` directive —
  no third-party library. The observer is provided through an injection token so
  it can be swapped out in tests.
- **Simulated real-world API** — an HTTP interceptor delays every response by a
  random 200–300 ms.
- **Images** use `NgOptimizedImage` with a custom `IMAGE_LOADER` that rewrites
  picsum URLs to the requested width; the first images in the stream are marked
  `priority`, and `index.html` preconnects to the picsum CDN for a faster LCP.
- **State** is signal-based throughout. `FavoritesService` persists to
  `localStorage` via an injectable `BROWSER_STORAGE` token, keeping it testable
  and safe when storage is unavailable.
- **Routing** uses lazy standalone components; the `:id` route parameter binds
  straight to a component input via `withComponentInputBinding()`.

## Testing

40 unit tests (Vitest + jsdom) cover the services, tokens, latency interceptor,
directives, shared components, and all three pages — including favorites
persistence, the paginated stream (loading / error / empty), and the
infinite-scroll trigger.

```bash
npm test
```
