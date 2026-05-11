# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-event wedding/celebration invitation platform. A single Nuxt 3 frontend serves different events based on subdomain slugs, with content managed in Strapi 5 CMS. Currently in active development — frontend components have hardcoded content being migrated to use Strapi data.

## Architecture

```
Subdomain (daniela-daniel.tudominio.com)
  → Nuxt middleware extracts slug from Host header
  → Composable fetches GET /api/events?filters[slug]=<slug>&populate=deep
  → Strapi returns event with nested components + media URLs
  → Nuxt renders sections using event data
```

- **Frontend** (`/frontend`): Nuxt 3 + Vue 3 + Tailwind CSS (port 3000)
- **Backend** (`/backend`): Strapi 5.45.0 + SQLite (port 1337)
- **No root package.json** — run commands from `/frontend` or `/backend`

## Development Commands

### Frontend (`cd frontend`)
```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run generate     # Static site generation
npm run preview      # Preview production build
```

### Backend (`cd backend`)
```bash
npm run dev          # Start Strapi with hot reload (http://localhost:1337/admin)
npm run build        # Build Strapi admin panel
npm run start        # Start Strapi in production mode
```

Both servers must run simultaneously for full-stack development.

## Key Architecture Details

**Event Collection Type**: Single Strapi collection type `Event` with fields: `slug` (unique), `eventType` (enum: wedding/quinceañera/birthday/other), `eventDate`, plus 11 section component fields (hero, name, parents, story, gallery, map, timeline, contacts, dressCode, gifts, recommendedHotels).

**Component hierarchy**: Strapi components are in two categories:
- `sections.*` — top-level components embedded directly in Event (11 types)
- `event.*` — child components used inside sections (6 types: parent-group, map-location, timeline, contact, bank-details, hotel)

**Subdomain routing**: In production, subdomain maps to event slug. In development, use query param `?event=slug` as fallback.

**Tailwind theme**: Custom brand colors (sage, cream, blush, gold, dark, rose) and fonts (Dancing Script, Poppins, Playfair Display, etc.) defined in `frontend/tailwind.config.js`.

**Dark mode**: App defaults to dark color mode (`colorMode.value = 'dark'` in app.vue).

## Existing Documentation

- `GUIA-STRAPI.md` — Complete Strapi schema reference with all component fields and setup instructions (authoritative for current backend state)
- `ARQUITECTURA.md` — Visual diagram of Event structure in Strapi
- `PLAN.md` — 6-phase implementation plan with current progress

## Backend Environment Variables

Backend `.env` at `/backend/.env` contains Strapi secrets (APP_KEYS, JWT_SECRET, etc.) plus:
- `HOST` / `PORT` — server binding (default: 0.0.0.0:1337)
- `DATABASE_CLIENT` / `DATABASE_FILENAME` — SQLite config

Frontend uses `GOOGLE_MAPS_API_KEY` via Nuxt runtime config.

## Language

The project's documentation, commit messages, and code comments are in Spanish. Follow this convention.
