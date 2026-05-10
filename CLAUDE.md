# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server on port 3000 (host 0.0.0.0)

# Build & Deploy
npm run build        # SSR build (Nuxt server)
npm run generate     # Static site generation (used by Netlify)
npm run preview      # Preview production build locally

# Database (Prisma)
npx prisma migrate dev       # Run migrations in development
npx prisma studio            # Open Prisma DB GUI
npx prisma generate          # Regenerate Prisma client after schema changes
npx prisma db push           # Push schema changes without migration files
```

> **Note:** `postinstall` runs `nuxt prepare && nuxt build` automatically after `npm install`. Avoid running `npm install` mid-session unless you intend a full rebuild.

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string (required for server API) |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key (exposed to client via `runtimeConfig.public`) |

## Architecture

### Full-stack Nuxt 3 app — SSR + API routes + MySQL

The app has two distinct modes depending on deployment:
- **SSR (`npm run build`)**: Runs Nuxt server with live API routes hitting MySQL via Prisma.
- **Static (`npm run generate`)**: Generates a static site for Netlify. API routes won't function unless paired with Netlify Functions.

### Pages

- `/` (`pages/index.vue`): Single-page wedding invitation — stacks all section components vertically. The `id` attributes on components serve as anchor targets for the nav.
- `/confirm` (`pages/confirm.vue`): Guest attendance confirmation form, reads/writes via the Pinia store.
- `/banco` (`pages/banco.vue`): Bank transfer details for gifts.

### Data flow for guest confirmation

1. User enters their unique `code` on the home page (`confirmComponent`)
2. `useGuestStore.fetchGuestByCode(code)` calls `GET /api/guests/[code]`
3. Pinia store persists guest data to `localStorage` (`persist: true`)
4. User navigates to `/confirm` page where they toggle attendance for themselves and companions
5. `useGuestStore.confirmGuest(data)` calls `POST /api/guests/confirm`

### Server layer

- `server/prisma.ts`: Singleton Prisma client (cached on `globalThis` in dev to prevent hot-reload connection leaks)
- `server/api/guests/[code].ts`: GET — fetch guest + companions by unique code
- `server/api/guests/confirm.ts`: POST — update `confirmed`, `notes`, and each companion's `confirmed`
- `server/api/guests/listGuests.ts`: GET — admin list of all guests

### State management (Pinia)

Single store at `stores/guest.ts`. State is persisted to localStorage automatically. The store holds the full `Guest` object including its `Companion[]` array and exposes `loading`/`error` reactive states.

### Styling conventions

- **Color mode**: `app.vue` forces `colorMode.value = 'dark'` on load — the app always renders in dark mode regardless of system preference.
- **Brand palette**: Use the custom Tailwind tokens (`brand-sage`, `brand-cream`, `brand-blush`, `brand-gold`, `brand-dark`, `brand-rose`) instead of raw hex values. Defined in `tailwind.config.js`.
- **Typography**: Custom font utilities — `font-dancing`, `font-poppins`, `font-pacifico`, `font-alex`, `font-playfair`, `font-lora`. Configured via `googleFonts` in `nuxt.config.ts`.
- **Breakpoints**: An extra `xs` breakpoint is defined at `375px` in addition to Tailwind defaults.
- **Custom SVG icons**: Live in `assets/my-icons/` and are referenced with the `my-icon:` prefix via `nuxt-icons`.
- **Carousel components**: Prefixed with `MyPrefix` (e.g., `<MyPrefixCarousel>`).

### Database schema

```
Guest      code (unique), fullName, confirmed, notes, side (NOVIO|NOVIA)
Companion  name, confirmed, guestId → Guest.id
```

Guests are pre-seeded with unique codes — there is no self-registration flow. Confirmation updates the existing record.
