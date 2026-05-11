# Guia paso a paso: Backend con Strapi

## Paso 1: Crear el proyecto Strapi

```bash
# Desde la raiz del proyecto
npx create-strapi-app@latest backend --quickstart
```

Esto crea el directorio `backend/` con Strapi 5.45.0 y SQLite (para desarrollo local).
Al terminar, se abre el admin en `http://localhost:1337/admin`.

**Crear tu usuario admin** (nombre, email, password) en el formulario que aparece.

---

## Paso 2: Crear los Componentes hijos (categoria: `event`)

En Strapi, los **Components** son bloques reutilizables que se embeben dentro de un Content Type. Hay que crearlos **antes** de crear el Event porque el Event los referencia.

Ir a: **Content-Type Builder** (menu lateral izquierdo)

### Orden de creacion: hijos primero, luego secciones.

---

### 2.1 Componente: `event.parent-group`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `fatherName` | Short text | Required |
| `motherName` | Short text | Required |

> Almacena los nombres de los padres de cada novio/a.

---

### 2.2 Componente: `event.map-location`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `name` | Short text | Required |
| `latitude` | Number (float) | Required |
| `longitude` | Number (float) | Required |
| `placeName` | Short text | Required |
| `directionUrl` | Short text | - |
| `iconImage` | Media (single) | - |

---

### 2.3 Componente: `event.timeline`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `time` | Short text | Required. Default: `"01:00 PM"` |
| `title` | Short text | Required. Default: `"Misa Religiosa"` |
| `iconImage` | Media (single) | - |

---

### 2.4 Componente: `event.contact`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `label` | Short text | Default: `"Contacta al novio"` |
| `phone` | Short text | Required. Default: `"+52 3314857062"` |
| `avatar` | Media (single) | Foto del contacto |
| `whatsappUrl` | Short text | Default: "link" |

---

### 2.5 Componente: `event.bank-detail`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `bankName` | Short text | Required. Default: `"BBVA"` |
| `accountHolder` | Short text | Required. Default: `"Firstname Lastname"` |
| `accountNumber` | Short text | Required. Default: `"2760430463"` |

---

### 2.6 Componente: `event.hotel`

Categoria: `event`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `name` | Short text | - |
| `description` | Long text | - |
| `address` | Short text | - |
| `phone` | Short text | - |
| `website` | Short text | - |
| `image` | Media (single) | Foto del hotel |

---

## Paso 3: Crear los Componentes de Seccion (categoria: `sections`)

Estos son componentes mas grandes que agrupan los hijos del paso anterior.

---

### 3.1 Componente: `sections.hero`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `backgroundImage` | Media (single) | Imagen de fondo del hero |

---

### 3.2 Componente: `sections.names`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `name1` | Short text | Required. Default: `"Nombre Novia"` |
| `name2` | Short text | Required. Default: `"Nombre Noviof"` |

---

### 3.3 Componente: `sections.parents`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `introText` | Rich text (Markdown) | Texto introductorio |
| `parentGroups` | Component (repeatable) | Usar `event.parent-group` |

---

### 3.4 Componente: `sections.story`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `title` | Short text | Default: `"UNA PROMESA PARA TODA LA VIDA"` |
| `body` | Rich text (Markdown) | Texto de la historia de la pareja |
| `mainImage` | Media (single) | Foto principal de la historia |

---

### 3.5 Componente: `sections.gallery`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `images` | Media (multiple) | Todas las fotos del carrusel |

---

### 3.6 Componente: `sections.map`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `regionTitle` | Short text | Default: `"Etzatlan Jalisco"` |
| `locations` | Component (repeatable) | Usar `event.map-location` |

---

### 3.7 Componente: `sections.timeline`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `events` | Component (repeatable) | Usar `event.timeline` |
| `bottomImage` | Media (single) | Imagen al pie del timeline |

---

### 3.8 Componente: `sections.contacts`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `contactList` | Component (repeatable) | Usar `event.contact` |

---

### 3.9 Componente: `sections.dress-code`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `womenDescription` | Short text | Default: `"Vestidos florales, colores claros o tonos coloridos"` |
| `womenRestrictions` | Short text | - |
| `womenColors` | JSON | Array de hex. Ej: `["#000000","#FF0000","#8B5CF6"]` |
| `manDescription` | Short text | Default: `"Vestimenta elegante"` |
| `menRestriction` | Short text | - |
| `menColors` | JSON | Array de hex. Ej: `["#556B2F"]` |
| `mainImage` | Media (single) | Imagen principal del dress code |
| `womenOutfitImages` | Media (multiple) | Fotos de ejemplo para mujeres |
| `menOutfitImages` | Media (multiple) | Fotos de ejemplo para hombres |

---

### 3.10 Componente: `sections.gifts`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `registryUrl` | Short text | URL de mesa de regalos |
| `bankDetails` | Component (repeatable) | Usar `event.bank-details` |

---

### 3.11 Componente: `sections.recommended-hotels`

Categoria: `sections`

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `Title` | Short text | Default: `"Hoteles Recomendados"` |
| `hotetels` | Component (repeatable) | Usar `event.hotel` |

---

## Paso 4: Crear el Collection Type `Event`

Ir a: **Content-Type Builder** > **Create new collection type**

- Display name: `Event`
- API ID: `event`
- Draft & Publish: **Habilitado**

### Campos del Event:

| Campo | Tipo en Strapi | Configuracion |
|-------|---------------|---------------|
| `slug` | Short text | Required, Unique |
| `eventType` | Enumeration | Valores: `wedding`, `quinceañera`, `birthday`, `other` |
| `eventDate` | DateTime | Required |
| `hero` | Component (single) | Usar `sections.hero` |
| `name` | Component (single) | Usar `sections.names` |
| `parents` | Component (single) | Usar `sections.parents` |
| `story` | Component (single) | Usar `sections.story` |
| `gallery` | Component (single) | Usar `sections.gallery` |
| `map` | Component (single) | Usar `sections.map` |
| `timeline` | Component (single) | Usar `sections.timeline` |
| `contacts` | Component (single) | Usar `sections.contacts` |
| `dressCode` | Component (single) | Usar `sections.dress-code` |
| `gifts` | Component (single) | Usar `sections.gifts` |
| `recommendedHotels` | Component (single) | Usar `sections.recommended-hotels` |

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

3. Llenar **hero**:
   - backgroundImage: subir imagen de fondo

4. Llenar **name**:
   - name1: `Daniela`
   - name2: `Daniel`

5. Llenar **parents**:
   - introText: `Con nuestro amor y con la presencia de Dios entre nosotros y la bendicion de nuestros padres:`
   - parentGroups:
     - Grupo 1: fatherName=`Enrique Orozco Hernandez`, motherName=`Elizabet Gonzalez Gutierrez`
     - Grupo 2: fatherName=`Hector Rene Montes Orendain`, motherName=`Antonia Villarreal Rangel`

6. Llenar **story**:
   - title: `UNA PROMESA PARA TODA LA VIDA`
   - body: texto de la historia de la pareja
   - mainImage: subir foto principal

7. Llenar **gallery**:
   - images: subir todas las fotos del carrusel

8. Llenar **map**:
   - regionTitle: `Etzatlan Jalisco`
   - locations:
     - Location 1: name=`Templo`, latitude=`20.76439604962931`, longitude=`-104.08049966545539`, placeName=`Templo de la Purisima Concepcion`, directionUrl=(URL de Google Maps), iconImage=subir icono
     - Location 2: name=`Recepcion`, latitude=`20.76774609400717`, longitude=`-104.09720436461963`, placeName=`El Ranchito, Escobedo #7`, directionUrl=`https://maps.app.goo.gl/6pbkHd4kgUk2wsPu8`, iconImage=subir icono

9. Llenar **timeline**:
   - events (7 entradas):
     - `08:00 AM` - `Getting Ready` - subir icono
     - `01:00 PM` - `Misa Religiosa` - subir icono
     - `03:00 PM` - `Inicio de la recepcion` - subir icono
     - `04:00 PM` - `Banquete` - subir icono
     - `06:00 PM` - `Primer Vals` - subir icono
     - `06:30 PM` - `Inicio de la fiesta` - subir icono
     - `11:00 PM` - `Fin de la recepcion` - subir icono
   - bottomImage: subir imagen decorativa

10. Llenar **contacts**:
    - contactList:
      - Contact 1: label=`Contacta al Novio`, phone=`+52 3314857062`, avatar=subir foto
      - Contact 2: label=`Contacta a la Novia`, phone=`+52 3334001701`, avatar=subir foto

11. Llenar **dressCode**:
    - womenDescription: `Vestidos florales, colores claros o tonos coloridos`
    - womenRestrictions: `No Negro, Lila o Rojo`
    - womenColors: `["#000000", "#FF0000", "#8B5CF6"]`
    - manDescription: `Vestimenta elegante`
    - menRestriction: `No Verde olivo`
    - menColors: `["#556B2F"]`
    - mainImage: subir imagen principal
    - womenOutfitImages: subir fotos de ejemplo para mujeres
    - menOutfitImages: subir fotos de ejemplo para hombres

12. Llenar **gifts**:
    - registryUrl: `https://mesaderegalos.liverpool.com.mx/milistaderegalos/51992607`
    - bankDetails:
      - bankName=`BBVA`, accountHolder=`Daniela Elizabeth Orozco Gonzalez`, accountNumber=`2760430463`

13. Llenar **recommendedHotels**:
    - Title: `Hoteles Recomendados`
    - hotetels:
      - Hotel 1: name, description, address, phone, website, image
      - Hotel 2: name, description, address, phone, website, image
      - Hotel 3: name, description, address, phone, website, image

14. Click **Save** y luego **Publish**

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

## Paso 8: Configuracion del servidor

### Base de datos (`config/database.js`)

- **Desarrollo**: SQLite (archivo `.tmp/data.db`)
- **Produccion**: Soporta MySQL y PostgreSQL via variables de entorno

### Servidor (`config/server.js`)

- **Host**: `0.0.0.0` (configurable via `HOST`)
- **Port**: `1337` (configurable via `PORT`)

### API (`config/api.js`)

- **defaultLimit**: 25
- **maxLimit**: 100
- **withCount**: true

### Middlewares (`config/middlewares.js`)

```
strapi::logger, strapi::errors, strapi::security, strapi::cors,
strapi::poweredBy, strapi::query, strapi::body, strapi::session,
strapi::favicon, strapi::public
```

### Variables de entorno (`.env`)

```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
APP_KEYS=<base64>
API_TOKEN_SALT=<base64>
ADMIN_JWT_SECRET=<base64>
TRANSFER_TOKEN_SALT=<base64>
ENCRYPTION_KEY=<base64>
JWT_SECRET=<base64>
```

---

## Resumen de lo creado

```
Componentes hijos (categoria: event):
  - event.parent-group        (fatherName, motherName)
  - event.map-location        (name, latitude, longitude, placeName, directionUrl, iconImage)
  - event.timeline            (time, title, iconImage)
  - event.contact             (label, phone, avatar)
  - event.bank-details        (bankName, accountHolder, accountNumber)
  - event.hotel               (name, description, address, phone, website, image)

Componentes de seccion (categoria: sections):
  - sections.hero              (backgroundImage)
  - sections.names             (name1, name2)
  - sections.parents           (introText, parentGroups[])
  - sections.story             (title, body, mainImage)
  - sections.gallery           (images[])
  - sections.map               (regionTitle, locations[])
  - sections.timeline          (events[], bottomImage)
  - sections.contacts          (contactList[])
  - sections.dress-code        (womenDescription, womenRestrictions, womenColors, manDescription, menRestriction, menColors, mainImage, womenOutfitImages[], menOutfitImages[])
  - sections.gifts             (registryUrl, bankDetails[])
  - sections.recommended-hotels (Title, hotetels[])

Collection Type:
  - Event (slug, eventType, eventDate + 11 componentes de seccion)
```

---

## Estructura de archivos del backend

```
backend/
├── src/
│   ├── api/
│   │   └── event/
│   │       ├── content-types/event/schema.json
│   │       ├── controllers/event.js
│   │       ├── services/event.js
│   │       └── routes/event.js
│   ├── components/
│   │   ├── event/
│   │   │   ├── parent-group.json
│   │   │   ├── map-location.json
│   │   │   ├── timeline.json
│   │   │   ├── bank-details.json
│   │   │   ├── contact.json
│   │   │   └── hotel.json
│   │   └── sections/
│   │       ├── hero.json
│   │       ├── names.json
│   │       ├── parents.json
│   │       ├── story.json
│   │       ├── gallery.json
│   │       ├── map.json
│   │       ├── timeline.json
│   │       ├── contacts.json
│   │       ├── dress-code.json
│   │       ├── gifts.json
│   │       └── recommended-hotels.json
│   ├── admin/
│   ├── extensions/
│   └── index.js
├── config/
│   ├── database.js
│   ├── server.js
│   ├── admin.js
│   ├── middlewares.js
│   ├── plugins.js
│   └── api.js
├── .env
└── package.json
```
