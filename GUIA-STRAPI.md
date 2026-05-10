# Guia paso a paso: Backend con Strapi

## Paso 1: Crear el proyecto Strapi

```bash
# Desde la raiz del proyecto
npx create-strapi-app@latest cms --quickstart
```

Esto crea el directorio `cms/` con Strapi 5 y SQLite (para desarrollo local).
Al terminar, se abre el admin en `http://localhost:1337/admin`.

**Crear tu usuario admin** (nombre, email, password) en el formulario que aparece.

---

## Paso 2: Crear los Componentes (hijos primero)

En Strapi, los **Components** son bloques reutilizables que se embeben dentro de un Content Type. Hay que crearlos **antes** de crear el Event porque el Event los referencia.

Ir a: **Content-Type Builder** (menu lateral izquierdo)

### Orden de creacion (hijos antes que padres):

---

### 2.1 Componente: `event.parent-group`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `fatherName` |text | Required |
| `motherName` |text | Required |

> Almacena un 2 campos de texto para los padres de los novios 

---

### 2.2 Componente: `event.map-location`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `name` | Short text | Required |
| `latitude` | Number (float) | Required |
| `longitude` | Number (float) | Required |
| `placeName` | Short text | Required |
| `directionsUrl` | Short text | - |
| `iconImage` | Media (single) | - |

---

### 2.3 Componente: `event.timeline-event`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `time` | Short text | Required. Ej: "01:00 PM" |
| `title` | Short text | Required. Ej: "Misa Religiosa" |
| `iconImage` | Media (single) | - |

---

### 2.4 Componente: `event.contact`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `label` | Short text | Required. Ej: "Contacta al Novio" |
| `phone` | Short text | Required. Ej: "+52 3314857062" |
| `` | Short text | URL completa de wa.me |
| `avatar` | Media (single) | Foto del contacto |

---

### 2.5 Componente: `event.bank-detail`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `bankName` | Short text | Required. Ej: "BBVA" |
| `accountHolder` | Short text | Required. Ej: "Daniela Elizabeth Orozco Gonzalez" |
| `accountNumber` | Short text | Required. Ej: "2760430463" |

---

## Paso 3: Crear los Componentes de Seccion

Estos son componentes mas grandes que agrupan los hijos del paso anterior.

---

### 3.1 Componente: `sections.theme`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `colorPrimary` | Short text | Default: "#6a8e58" |
| `colorSecondary` | Short text | Default: "#f5f0e8" |
| `colorAccent` | Short text | Default: "#d3924a" |
| `colorHighlight` | Short text | Default: "#e8c9b8" |
| `colorDark` | Short text | Default: "#1d1f21" |
| `colorMuted` | Short text | Default: "#bba9a0" |
| `colorMode` | Enumeration | Valores: `dark`, `light`. Default: `dark` |
| `logoImage` | Media (single) | Logo del evento para el header |

---

### 3.2 Componente: `sections.hero`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `backgroundImage` | Media (single) | Imagen de fondo del hero |

---

### 3.3 Componente: `sections.names`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `name1` | Short text | Required. Ej: "Daniela" |
| `name2` | Short text | Required. Ej: "Daniel" |

---

### 3.4 Componente: `sections.parents`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `introText` | Rich text (Markdown) | Texto introductorio. Ej: "Con nuestro amor y con la presencia de Dios..." |
| `separatorImage` | Media (single) | Imagen decorativa entre grupos |
| `parentGroups` | Component (repeatable) | Usar `event.parent-group`. Min 1 |

---

### 3.5 Componente: `sections.story`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `title` | Short text | Ej: "UNA PROMESA PARA TODA LA VIDA" |
| `body` | Rich text (Markdown) | Texto de la historia de la pareja |
| `mainImage` | Media (single) | Foto principal de la historia |
| `decorativeImage` | Media (single) | Imagen decorativa (flor, etc) |

---

### 3.6 Componente: `sections.gallery`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `images` | Media (multiple) | Todas las fotos del carrusel |

---

### 3.7 Componente: `sections.save-date`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `decorativeImage` | Media (single) | Imagen decorativa |

---

### 3.8 Componente: `sections.map`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `regionTitle` | Short text | Ej: "Etzatlan Jalisco" |
| `locations` | Component (repeatable) | Usar `event.map-location`. Min 1 |

---

### 3.9 Componente: `sections.timeline`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `events` | Component (repeatable) | Usar `event.timeline-event`. Min 1 |
| `bottomImage` | Media (single) | Imagen al pie del timeline |

---

### 3.10 Componente: `sections.contacts`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `contactList` | Component (repeatable) | Usar `event.contact`. Min 1 |

---

### 3.11 Componente: `sections.dress-code`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `womenDescription` | Short text | Ej: "Vestidos florales, colores claros o tonos coloridos" |
| `womenRestrictions` | Short text | Ej: "No Negro, Lila o Rojo" |
| `womenColors` | JSON | Array de hex prohibidos. Ej: `["#000000","#FF0000","#8B5CF6"]` |
| `menDescription` | Short text | Ej: "Vestimenta elegante" |
| `menRestrictions` | Short text | Ej: "No Verde olivo" |
| `menColors` | JSON | Array de hex prohibidos. Ej: `["#556B2F"]` |
| `mainImage` | Media (single) | Imagen principal del dress code |
| `womenOutfitImages` | Media (multiple) | Fotos de ejemplo para mujeres |
| `menOutfitImages` | Media (multiple) | Fotos de ejemplo para hombres |
| `danceDescription` | Short text | Ej: "La fiesta no para, asi que asegurate de traer zapatos comodos" |

---

### 3.12 Componente: `sections.gifts`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `registryUrl` | Short text | URL de mesa de regalos (Liverpool, etc) |
| `bankDetails` | Component (repeatable) | Usar `event.bank-detail` |

---

## Paso 4: Crear el Collection Type `Event`

Ir a: **Content-Type Builder** > **Create new collection type**

- Display name: `Event`
- API ID: `event`

### Campos del Event:

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `slug` | Short text | Required, Unique |
| `eventType` | Enumeration | Valores: `wedding`, `quinceanera`, `birthday`, `other` |
| `eventDate` | DateTime | Required |
| `theme` | Component (single) | Usar `sections.theme` |
| `hero` | Component (single) | Usar `sections.hero` |
| `names` | Component (single) | Usar `sections.names` |
| `parents` | Component (single) | Usar `sections.parents` |
| `story` | Component (single) | Usar `sections.story` |
| `gallery` | Component (single) | Usar `sections.gallery` |
| `saveDate` | Component (single) | Usar `sections.save-date` |
| `map` | Component (single) | Usar `sections.map` |
| `timeline` | Component (single) | Usar `sections.timeline` |
| `contacts` | Component (single) | Usar `sections.contacts` |
| `dressCode` | Component (single) | Usar `sections.dress-code` |
| `gifts` | Component (single) | Usar `sections.gifts` |

Dar click en **Save** (Strapi reinicia el servidor).

---

## Paso 5: Configurar permisos publicos

El frontend (Nuxt) necesita leer los eventos sin autenticacion.

1. Ir a: **Settings** > **Users & Permissions plugin** > **Roles** > **Public**
2. En la seccion **Event**, habilitar:
   - `find` (listar eventos)
   - `findOne` (obtener un evento por ID)
3. **Save**

Ahora `GET http://localhost:1337/api/events` es accesible sin token.

---

## Paso 6: Crear el primer evento (seed manual)

1. Ir a: **Content Manager** > **Event** > **Create new entry**

2. Llenar los campos top-level:
   - `slug`: `daniela-daniel`
   - `eventType`: `wedding`
   - `eventDate`: `2026-10-04 13:00`

3. Llenar **theme**:
   - colorPrimary: `#6a8e58`
   - colorSecondary: `#f5f0e8`
   - colorAccent: `#d3924a`
   - colorHighlight: `#e8c9b8`
   - colorDark: `#1d1f21`
   - colorMuted: `#bba9a0`
   - colorMode: `dark`
   - logoImage: subir `logoDDr.webp`

4. Llenar **hero**:
   - backgroundImage: subir `fotoHero.webp`

5. Llenar **names**:
   - name1: `Daniela`
   - name2: `Daniel`

6. Llenar **parents**:
   - introText: `Con nuestro amor y con la presencia de Dios entre nosotros y la bendicion de nuestros padres:`
   - separatorImage: subir `t.webp`
   - parentGroups:
     - Grupo 1: `["Enrique Orozco Hernandez", "Elizabet Gonzalez Gutierrez"]`
     - Grupo 2: `["Hector Rene Montes Orendain", "Antonia Villarreal Rangel"]`

7. Llenar **story**:
   - title: `UNA PROMESA PARA TODA LA VIDA`
   - body: `Nos conocimos en el 2015...` (el texto completo)
   - mainImage: subir `foto2.webp`
   - decorativeImage: subir `flowerCorner.webp`

8. Llenar **gallery**:
   - images: subir `us1.webp` hasta `us13.webp` (excepto us7)

9. Llenar **saveDate**:
   - decorativeImage: subir `t.webp`

10. Llenar **map**:
    - regionTitle: `Etzatlan Jalisco`
    - locations:
      - Location 1: name=`Templo`, lat=`20.76439604962931`, lng=`-104.08049966545539`, placeName=`Templo de la Purisima Concepcion`, directionsUrl=(URL de Google Maps), iconImage=subir `iglesiaBlanco.webp`
      - Location 2: name=`Recepcion`, lat=`20.76774609400717`, lng=`-104.09720436461963`, placeName=`El Ranchito, Escobedo #7`, directionsUrl=`https://maps.app.goo.gl/6pbkHd4kgUk2wsPu8`, iconImage=subir `papel-picado.webp`

11. Llenar **timeline**:
    - events (7 entradas):
      - `08:00 AM` - `Getting Ready` - subir `traje-de-boda.webp`
      - `01:00 PM` - `Misa Religiosa` - subir `iglesia.webp`
      - `03:00 PM` - `Inicio de la recepcion` - subir `animar.webp`
      - `04:00 PM` - `Banquete` - subir `banquete.webp`
      - `06:00 PM` - `Primer Vals` - subir `baile.webp`
      - `06:30 PM` - `Inicio de la fiesta` - subir `pista-de-baile.webp`
      - `11:00 PM` - `Fin de la recepcion` - subir `coche.webp`
    - bottomImage: subir `foto3.webp`

12. Llenar **contacts**:
    - contactList:
      - Contact 1: label=`Contacta al Novio`, phone=`+52 3314857062`, whatsappUrl=`https://wa.me/523314857062?text=...`, avatar=subir `novio.webp`
      - Contact 2: label=`Contacta a la Novia`, phone=`+52 3334001701`, whatsappUrl=`https://wa.me/523334001701?text=...`, avatar=subir `novia.webp`

13. Llenar **dressCode**:
    - womenDescription: `Vestidos florales, colores claros o tonos coloridos`
    - womenRestrictions: `No Negro, Lila o Rojo`
    - womenColors: `["#000000", "#FF0000", "#8B5CF6"]`
    - menDescription: `Vestimenta elegante`
    - menRestrictions: `No Verde olivo`
    - menColors: `["#556B2F"]`
    - mainImage: subir `dressCodeImg.webp`
    - womenOutfitImages: subir `vestidos1.webp` a `vestidos4.webp`
    - menOutfitImages: subir `suits1.webp` a `suits3.webp`
    - danceDescription: `La fiesta no para, asi que asegurate de traer zapatos comodos. Sugerimos Tenis`

14. Llenar **gifts**:
    - registryUrl: `https://mesaderegalos.liverpool.com.mx/milistaderegalos/51992607`
    - bankDetails:
      - bankName=`BBVA`, accountHolder=`Daniela Elizabeth Orozco Gonzalez`, accountNumber=`2760430463`

15. Click **Save** y luego **Publish**

---

## Paso 7: Verificar la API

Abrir en el navegador o con curl:

```bash
# Listar eventos
curl http://localhost:1337/api/events

# Obtener evento con todos los componentes
curl "http://localhost:1337/api/events?filters[slug][\$eq]=daniela-daniel&populate=deep"
```

Deberias ver el JSON completo con todos los datos del evento, incluyendo URLs de las imagenes subidas.

---

## Resumen de lo creado

```
Componentes hijos (categoria: event):
  - event.parent-group      (names)
  - event.map-location       (name, lat, lng, placeName, directionsUrl, iconImage)
  - event.timeline-event     (time, title, iconImage)
  - event.contact            (label, phone, whatsappUrl, avatar)
  - event.bank-detail        (bankName, accountHolder, accountNumber)

Componentes de seccion (categoria: sections):
  - sections.theme           (colores, colorMode, logo)
  - sections.hero            (backgroundImage)
  - sections.names           (name1, name2)
  - sections.parents         (introText, separatorImage, parentGroups[])
  - sections.story           (title, body, mainImage, decorativeImage)
  - sections.gallery         (images[])
  - sections.save-date       (decorativeImage)
  - sections.map             (regionTitle, locations[])
  - sections.timeline        (events[], bottomImage)
  - sections.contacts        (contactList[])
  - sections.dress-code      (women*, men*, mainImage, outfitImages[], danceDescription)
  - sections.gifts           (registryUrl, bankDetails[])

Collection Type:
  - Event (slug, eventType, eventDate + 12 componentes de seccion)
```
