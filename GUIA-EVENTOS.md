# Guía: Cómo fluyen los datos de Strapi a los componentes

## 1. Arquitectura general

```
Strapi (localhost:1337)
  └── GET /api/events?filters[slug][$eq]=<slug>&populate[...]
          │
          ▼
  useEvent.ts  (composable)
          │
          ▼
  pages/wedding.vue  →  provide('event', event)
          │
          ├── heroComponent      →  inject('event')
          ├── countDown          →  inject('event')
          ├── namesComponent     →  inject('event')
          ├── ourParents         →  inject('event')
          ├── promiseSection     →  inject('event')
          ├── carouselComponent  →  inject('event')
          ├── calendarComponent  →  inject('event')
          ├── googleMap          →  inject('event')
          ├── timeLine           →  inject('event')
          ├── contactNovios      →  inject('event')
          ├── dressCode          →  inject('event')
          └── mesaRegalos        →  inject('event')
```

---

## 2. Cómo se determina qué evento cargar

**Archivo:** `frontend/composables/useEvent.ts`

El slug del evento se determina en este orden:

1. **Query param** (desarrollo): `?event=daniela-daniel`
2. **Subdominio** (producción): `daniela-daniel.tudominio.com`

```
http://localhost:3000?event=daniela-daniel   → slug = "daniela-daniel"
https://daniela-daniel.tudominio.com         → slug = "daniela-daniel"
```

Con ese slug se hace el fetch a Strapi:

```
GET http://localhost:1337/api/events
  ?filters[slug][$eq]=daniela-daniel
  &populate[hero][populate]=*
  &populate[name]=*
  &populate[parents][populate]=*
  &populate[story][populate]=*
  &populate[gallery][populate]=*
  &populate[map][populate]=*
  &populate[timeline][populate]=*
  &populate[contacts][populate]=*
  &populate[dressCode][populate]=*
  &populate[gifts][populate]=*
  &populate[recommendedHotels][populate]=*
```

---

## 3. Cómo se provee el evento a los componentes

**Archivo:** `frontend/pages/wedding.vue` (y `quinceanera.vue`, `birthday.vue`)

```vue
<script setup>
const { event, pending } = useEvent()
provide('event', event)   // ← hace el dato disponible para todos los hijos
</script>
```

`event` es un `ComputedRef` reactivo. Cuando Strapi responde, Vue actualiza automáticamente todos los componentes que lo inyectaron.

---

## 4. Cómo cada componente consume los datos

**Patrón base en cualquier componente:**

```vue
<script setup>
const event = inject('event')

const miDato = computed(() =>
  event?.value?.seccion?.campo ?? 'valor fallback'
)
</script>
```

- `event?.value` — accede al valor del ComputedRef (con `?.` por si aún no cargó)
- `?.seccion?.campo` — navega la estructura anidada sin romper si está vacío
- `?? 'fallback'` — valor por defecto si el campo no está en Strapi

---

## 5. Mapa completo: componente → campo en Strapi

### `heroComponent.vue`
```js
event?.value?.hero?.backgroundImage?.url   // imagen de fondo
```

### `countDown.vue`
```js
event?.value?.eventDate                    // fecha del evento (ISO 8601)
```

### `namesComponent.vue`
```js
event?.value?.name?.name1                  // nombre novia
event?.value?.name?.name2                  // nombre novio
```

### `ourParents.vue`
```js
event?.value?.parents?.introText           // texto introductorio (richtext/HTML)
event?.value?.parents?.parentGroups[]      // array de grupos de padres
  └── .fatherName                          // nombre del padre
  └── .motherName                          // nombre de la madre
```

### `promiseSection.vue`
```js
event?.value?.story?.title                 // título de la historia
event?.value?.story?.body                  // cuerpo de la historia (richtext/HTML)
event?.value?.story?.mainImage?.url        // imagen principal
```

### `carouselComponent.vue`
```js
event?.value?.gallery?.images[]            // array de imágenes de galería
  └── .url                                 // URL de cada imagen
```

### `calendarComponent.vue`
```js
event?.value?.eventDate                    // genera el calendario del mes del evento
```

### `googleMap.vue`
```js
event?.value?.map?.regionTitle             // título de la región
event?.value?.map?.locations[]             // array de ubicaciones
  └── .name                                // nombre (ej: "Templo")
  └── .latitude                            // latitud
  └── .longitude                           // longitud
  └── .placeName                           // nombre del lugar
  └── .directionUrl                        // enlace a Google Maps
  └── .iconImage?.url                      // ícono personalizado
```

### `timeLine.vue`
```js
event?.value?.timeline?.events[]           // array de eventos del día
  └── .time                                // hora (ej: "01:00 PM")
  └── .title                               // título (ej: "Misa Religiosa")
  └── .iconImage?.url                      // ícono del evento
event?.value?.timeline?.bottomImage?.url  // imagen decorativa al final
```

### `contactNovios.vue`
```js
event?.value?.contacts?.contactList[]      // array de contactos
  └── .label                               // etiqueta (ej: "Contacta al Novio")
  └── .phone                               // teléfono
  └── .whatsappUrl                         // enlace de WhatsApp
```

### `dressCode.vue`
```js
event?.value?.dressCode?.womenDescription  // descripción vestimenta mujeres
event?.value?.dressCode?.womenRestrictions // restricciones mujeres
event?.value?.dressCode?.womenColors       // array de hex ["#fff","#000"]
event?.value?.dressCode?.manDescription    // descripción vestimenta hombres
event?.value?.dressCode?.menRestriction    // restricciones hombres
event?.value?.dressCode?.menColors         // array de hex
event?.value?.dressCode?.mainImage?.url    // imagen central
event?.value?.dressCode?.womenOutfitImages[]  // fotos outfits femeninos
event?.value?.dressCode?.menOutfitImages[]    // fotos outfits masculinos
```

### `mesaRegalos.vue`
```js
event?.value?.gifts?.registryUrl           // enlace mesa de regalos (Liverpool, etc.)
```

### `pages/banco.vue`
```js
event?.value?.gifts?.registryUrl           // enlace mesa de regalos
event?.value?.gifts?.bankDetails[]         // array de cuentas bancarias
  └── .bankName                            // banco (ej: "BBVA")
  └── .accountHolder                       // titular
  └── .accountNumber                       // número de cuenta
```

---

## 6. Cómo se manejan las imágenes de Strapi

Las URLs de imágenes en Strapi son **relativas** (`/uploads/foto.webp`). Para usarlas en el frontend se construye la URL completa:

```js
const config = useRuntimeConfig()

const urlCompleta = computed(() => {
  const url = event?.value?.hero?.backgroundImage?.url
  if (!url) return '/imagenLocal.webp'                          // fallback local
  return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
})
```

La variable `strapiUrl` está configurada en `frontend/.env`:
```
STRAPI_URL=http://localhost:1337
```

---

## 7. Routing por tipo de evento

`pages/index.vue` detecta el `eventType` y redirige automáticamente:

| eventType      | Página            |
|---------------|-------------------|
| `wedding`     | `/wedding`        |
| `quinceañera` | `/quinceanera`    |
| `birthday`    | `/birthday`       |

Cada página tiene su propio conjunto de componentes, permitiendo diseños completamente distintos por tipo de evento.

---

## 8. Agregar un nuevo evento

1. En Strapi admin → Content Manager → Event → **+ Create new entry**
2. Llenar `slug` (único, ej: `maria-juan-2027`) y `eventDate`
3. Seleccionar `eventType`
4. Llenar las secciones deseadas
5. Click en **Publish**
6. Acceder en: `http://localhost:3000?event=maria-juan-2027`
