# Plan: Strapi CMS + Multi-Evento con Subdominios

## Contexto

El proyecto Nuxt 3 de invitaciones ya fue limpiado a frontend-only (sin Prisma, sin API, sin stores). Todo el contenido está hardcodeado en 17 componentes. Se necesita:

1. **Strapi como headless CMS** para configurar eventos desde un panel admin (textos, nombres, fechas, lugares, imágenes)
2. **Subdominios por evento** (ej: `daniela-daniel.tudominio.com`)
3. **Secciones configurables** — cada evento elige qué secciones mostrar
4. **Imágenes en Strapi** — subidas y servidas directamente desde Strapi (media library default, sin GCS)
5. **Temas por evento** — colores configurables desde Strapi

---

## Arquitectura

```
Subdominio (daniela-daniel.tudominio.com)
  → Nuxt middleware extrae slug del Host
  → Composable fetcha GET /api/events?filters[slug]=daniela-daniel&populate=deep
  → Strapi devuelve todo el evento con componentes + media URLs
  → Nuxt inyecta datos via useState + provide/inject
  → index.vue renderiza las secciones
  → Tailwind usa CSS variables inyectadas del theme del evento
```

| Pieza | Tecnología | Hosting |
|-------|-----------|---------|
| Frontend | Nuxt 3 SSR | Netlify (Functions) |
| CMS | Strapi 5 | Railway / Render |
| DB del CMS | PostgreSQL | Railway / Render |
| Imágenes | Strapi media library (almacenamiento local/servidor) | Mismo hosting que Strapi |
| DNS | Wildcard `*.tudominio.com` → Netlify | — |

---

## Fase 1: Reestructurar repo como monorepo

Mover todo el frontend existente a `frontend/` y crear Strapi en `cms/`.

```
bodaProjectV3/
  frontend/           ← todo lo actual (nuxt.config.ts, pages/, components/, etc.)
  cms/                ← nuevo proyecto Strapi
  package.json        ← scripts de conveniencia (dev:frontend, dev:cms)
```

### Pasos:
1. Crear directorio `frontend/`, mover todos los archivos de Nuxt ahí
2. `npx create-strapi-app@latest cms --quickstart --no-run`
3. Crear `package.json` raíz con scripts:
   - `"dev:frontend": "cd frontend && npm run dev"`
   - `"dev:cms": "cd cms && npm run develop"`

### Archivos a mover:
- Todo excepto `.git/`, `node_modules/`, `.claude/`

---

## Fase 2: Definición de qué viene de Strapi vs código

### DESDE STRAPI (contenido dinámico por evento)

| Categoría | Datos | Componente Nuxt afectado |
|-----------|-------|--------------------------|
| **Evento** | slug, tipo (wedding/xv/birthday), fecha principal | — (campos top-level) |
| **Theme** | 6 colores brand, colorMode (dark/light), logo | tailwind.config.js, app.vue, headerComponent |
| **Nombres** | name1, name2 | namesComponent |
| **Padres** | intro text, grupos de padres (nombres), imagen separador | ourParents |
| **Historia** | título, texto narrativo, imagen principal, imagen decorativa | promiseSection |
| **Galería** | array de imágenes | carouselComponent |
| **Save the Date** | imagen decorativa | saveDateComponent |
| **Mapa** | título región, ubicaciones (nombre, lat/lng, lugar, URL directions, icono) | googleMap |
| **Timeline** | título, eventos (hora, título, icono), imagen footer | timeLine |
| **Contactos** | título, lista de contactos (label, teléfono, URL whatsapp, avatar) | contactNovios |
| **Dress Code** | restricciones mujeres/hombres, colores prohibidos, imágenes ejemplo, texto baile | dressCode |
| **Regalos** | URL mesa de regalos, datos bancarios (banco, titular, cuenta) | mesaRegalos, datosBancarios, banco.vue |
| **Imágenes** | Hero, galería, dress code, timeline icons, decorativas, logo | Todos los que usan imágenes |

### DESDE CÓDIGO (fijo, no cambia por evento)

| Categoría | Ejemplo | Por qué en código |
|-----------|---------|-------------------|
| **Labels de UI** | "Confirmar Asistencia", "Codigo", "Copiar", "¡Número copiado!" | Son parte del diseño, no del contenido |
| **Placeholders** | "ABXY2025", "Codigo proporcionado en su invitacion" | Mismos para todos los eventos |
| **Labels countdown** | "días", "horas", "min", "seg" | Formato fijo |
| **Títulos de sección** | "Dress Code", "Save The Date", "Regalos" | Títulos genéricos del diseño |
| **Textos de botones** | "¿Cómo llegar?", "Mesa de Regalos", "Datos Bancarios", "Atrás" | Navegación estándar |
| **Estructura/orden** | Qué secciones mostrar, nav items, orden de secciones | Fijo en index.vue |
| **Footer** | "© 2025 Realizado por el Novio." | Siempre igual |
| **Tour** | Steps del tour guiado, labels (Siguiente/Anterior/Listo) | Fijo en useTour.ts |
| **Layout** | Header, footer, botón scroll-to-top, petaloComponent | Estructura visual fija |

---

## Fase 3: Modelado de Content Types en Strapi

### Collection Type: `Event`

Un event = un entry en Strapi. Campos top-level:

| Campo | Tipo | Notas |
|-------|------|-------|
| `slug` | Text (unique, required) | Para lookup por subdominio |
| `eventType` | Enum: wedding, quinceanera, birthday, other | Informativo |
| `eventDate` | DateTime | Fecha principal (countdown, calendario) |

### Componentes de Strapi (solo lo que viene del CMS):

| Componente Strapi | Campos |
|-------------------|--------|
| **EventTheme** | colorPrimary, colorSecondary, colorAccent, colorHighlight, colorDark, colorMuted, colorMode (enum: dark/light), logoImage (Media) |
| **HeroSection** | backgroundImage (Media) |
| **NamesSection** | name1, name2 |
| **ParentsSection** | introText (RichText), separatorImage (Media), parentGroups (Repeatable → ParentGroup: names JSON array) |
| **StorySection** | title, body (RichText), mainImage (Media), decorativeImage (Media) |
| **GallerySection** | images (Media multiple) |
| **SaveDateSection** | decorativeImage (Media) |
| **MapSection** | regionTitle, locations (Repeatable → MapLocation: name, lat, lng, placeName, directionsUrl, iconImage) |
| **TimelineSection** | events (Repeatable → TimelineEvent: time, title, iconImage), bottomImage (Media) |
| **ContactsSection** | contactList (Repeatable → Contact: label, phone, whatsappUrl, avatar) |
| **DressCodeSection** | womenDescription, womenRestrictions, womenColors (JSON), menDescription, menRestrictions, menColors (JSON), mainImage (Media), womenOutfitImages (Media multiple), menOutfitImages (Media multiple), danceDescription |
| **GiftsSection** | registryUrl, bankDetails (Repeatable → BankDetail: bankName, accountHolder, accountNumber) |

> **Nota**: No hay componentes para Header, Footer, Confirm, ni Tour — esos quedan en código.

### Configuración:
- Habilitar permisos públicos para `Event`: find, findOne
- Las imágenes se suben desde el admin de Strapi y se almacenan en el servidor de Strapi (provider por defecto)

### Seed:
- Crear primer evento "daniela-daniel" con todo el contenido actual hardcodeado
- Subir las ~40 imágenes de `/public/` a Strapi media library

---

## Fase 4: Capa de integración Nuxt ↔ Strapi

### 4.1 Crear `frontend/composables/useStrapi.ts`

Helper para fetch contra la API REST de Strapi. Usa `runtimeConfig.public.strapiUrl`.

### 4.2 Crear `frontend/composables/useEventData.ts`

Composable principal:
- Usa `useState('currentEvent')` para estado compartido SSR-safe
- `fetchEvent(slug)` → GET `/api/events?filters[slug][$eq]=slug&populate=deep`
- Cachea el resultado — no re-fetcha si el slug no cambió
- Retorna `event` (readonly) y `fetchEvent`

### 4.3 Crear `frontend/middleware/event.global.ts`

Middleware global de Nuxt (route middleware, no server middleware):
- Lee hostname → extrae subdominio como slug
- En dev: usa query param `?event=slug` como fallback (evita configurar DNS local)
- Llama `fetchEvent(slug)`
- Si no existe el evento → 404

### 4.4 Crear `frontend/composables/useEventTheme.ts`

- Lee `event.theme` y setea CSS custom properties en `document.documentElement`
- Se ejecuta en `onMounted` del layout

### 4.5 Modificar `frontend/nuxt.config.ts`

```ts
runtimeConfig: {
  public: {
    strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  }
}
```

Para `@nuxt/image`, las URLs de Strapi son absolutas (ej: `http://localhost:1337/uploads/foto.webp`), se usan directamente.

### Archivos a crear:
- `frontend/composables/useStrapi.ts`
- `frontend/composables/useEventData.ts`
- `frontend/composables/useEventTheme.ts`
- `frontend/middleware/event.global.ts`

### Archivos a modificar:
- `frontend/nuxt.config.ts`

---

## Fase 5: Theming dinámico + Refactor de componentes

### Modificar `frontend/tailwind.config.js`

Cambiar colores brand de hex hardcodeados a CSS variables con fallback:

```js
brand: {
  sage:  'var(--brand-sage, #6a8e58)',
  cream: 'var(--brand-cream, #f5f0e8)',
  blush: 'var(--brand-blush, #e8c9b8)',
  gold:  'var(--brand-gold, #d3924a)',
  dark:  'var(--brand-dark, #1d1f21)',
  rose:  'var(--brand-rose, #bba9a0)',
}
```

Las clases Tailwind (`text-brand-sage`, `bg-brand-gold`) siguen funcionando pero ahora resuelven al color del evento.

### Modificar `frontend/layouts/default.vue`

- Inyectar CSS variables en el div root via `:style`
- Footer queda hardcodeado en código (no viene de Strapi)

### Modificar `frontend/app.vue`

- Leer colorMode desde `event.theme.colorMode` en vez de hardcodear 'dark'

### Patrón universal para componentes:

```vue
<script setup>
const { event } = useEventData()
const sectionData = computed(() => event.value?.nombreSeccion)
</script>
```

Cada componente reemplaza valores hardcodeados por datos de Strapi. Las imágenes de Strapi vienen como URLs relativas (ej: `/uploads/foto.webp`) — se construye la URL completa con `strapiUrl + imagen.url`.

### Componentes que SÍ se refactorizan (datos de Strapi):

| # | Componente | Qué viene de Strapi |
|---|-----------|---------------------|
| 1 | `namesComponent.vue` | name1, name2 |
| 2 | `countDown.vue` | fecha target (event.eventDate) |
| 3 | `heroComponent.vue` | imagen de fondo |
| 4 | `ourParents.vue` | intro text + grupos de padres + imagen |
| 5 | `promiseSection.vue` | título + texto + 2 imágenes |
| 6 | `saveDateComponent.vue` | imagen decorativa |
| 7 | `calendarComponent.vue` | generar grid dinámicamente desde event.eventDate |
| 8 | `timeLine.vue` | array de eventos (hora, título, icono) |
| 9 | `googleMap.vue` | título región + array de ubicaciones |
| 10 | `contactNovios.vue` | array de contactos (label, tel, whatsapp, avatar) |
| 11 | `dressCode.vue` | restricciones, colores prohibidos, imágenes ejemplo |
| 12 | `mesaRegalos.vue` | URL mesa de regalos |
| 13 | `carouselComponent.vue` | array de imágenes |
| 14 | `headerComponent.vue` | logo (del theme), contactos móviles |
| 15 | `banco.vue` (page) | datos bancarios de event.gifts.bankDetails |

### Componentes que NO cambian (quedan en código):

| Componente | Qué se queda hardcodeado |
|-----------|--------------------------|
| `confirmComponent.vue` | Labels, placeholder, botón — todo UI fija |
| `datosBancarios.vue` | Ya usa props, labels fijos ("Banco:", "Titular:", etc.) |
| `carouselDressCode.vue` | Ya usa props — sin cambios |
| `headerComponent.vue` | Nav items, textos de botones — solo logo y contactos de Strapi |
| `layouts/default.vue` | Footer text, scroll button — todo fijo |
| `useTour.ts` | Steps y labels del tour — fijo en código |

---

## Fase 6: Deploy

### Netlify (frontend)

Cambiar de `generate` a `build` (SSR):

```toml
# frontend/netlify.toml
[build]
  command = "npm run build"
  publish = ".output/public"
```

### DNS
- Wildcard `*.tudominio.com` → Netlify
- O subdominios individuales como custom domains

### Strapi
- Deploy en Railway o Render con PostgreSQL
- Las imágenes se almacenan en el servidor de Strapi (persistent disk en Railway/Render)
- En producción, considerar un volumen persistente para `/cms/public/uploads/`

### Variables de entorno Netlify:
- `STRAPI_URL=https://tu-strapi.railway.app`
- `GOOGLE_MAPS_API_KEY=...`

---

## Orden de implementación

1. **Fase 1** — Reestructurar monorepo
2. **Fase 2** — Definir separación Strapi vs código (ya hecho en este plan)
3. **Fase 3** — Crear Strapi + content types + seed primer evento
4. **Fase 4** — Composables de integración + middleware
5. **Fase 5** — Theming con CSS variables + refactor de componentes (los 15 que reciben datos de Strapi)
6. **Fase 6** — Deploy

---

## Verificación

1. **Strapi local**: `cd cms && npm run develop` → crear/editar evento desde admin panel
2. **Nuxt local**: `cd frontend && npm run dev` → navegar a `localhost:3000?event=daniela-daniel` → debe verse idéntico al sitio actual
3. **Cambiar contenido en Strapi** (ej: cambiar un nombre) → refrescar Nuxt → debe reflejar el cambio
4. **Subir imagen en Strapi** → verificar que se almacena en `/uploads/` y la URL funciona en Nuxt
5. **Cambiar colores del theme** en Strapi → verificar que Tailwind aplica los nuevos colores
6. **Build SSR**: `cd frontend && npm run build && npm run preview` → verificar middleware de subdominios
