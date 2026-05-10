# Arquitectura Multi-Evento

## Diagrama de un Event en Strapi

```
┌─────────────────────────────────────────────────┐
│                COLLECTION TYPE                   │
│                   Event                          │
│                                                  │
│  slug: "daniela-daniel"                          │
│  eventType: "wedding"                            │
│  eventDate: 2026-10-04                           │
│                                                  │
│  ┌─────────────┐  ┌──────────────┐              │
│  │ theme       │  │ hero         │              │
│  │ 6 colores   │  │ backgroundImg│              │
│  │ logo        │  └──────────────┘              │
│  └─────────────┘                                 │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │ names       │  │ parents                   │  │
│  │ Daniela     │  │ introText                 │  │
│  │ Daniel      │  │ parentGroups:             │  │
│  └─────────────┘  │  ├─ ParentGroup (papa,mama)│ │
│                    │  └─ ParentGroup (papa,mama)│ │
│  ┌─────────────┐  └──────────────────────────┘  │
│  │ timeline    │                                 │
│  │ events:     │  ┌──────────────┐              │
│  │  ├─ 08:00AM │  │ map          │              │
│  │  ├─ 01:00PM │  │ locations:   │              │
│  │  ├─ 03:00PM │  │  ├─ Templo   │              │
│  │  └─ ...     │  │  └─ Recepción│              │
│  └─────────────┘  └──────────────┘              │
│  ┌─────────────┐  ┌──────────────┐              │
│  │ contacts    │  │ gifts        │              │
│  │ dressCode   │  │ gallery      │              │
│  │ story       │  │ saveDate     │              │
│  └─────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────┘
```

## Como funciona para multi-evento

`Event` es un **Collection Type** (no Single Type), lo que permite crear multiples entries:

```
Strapi Admin > Content Manager > Event

  Entry 1: slug = "daniela-daniel"        ← boda actual
            eventType = wedding
            names = Daniela & Daniel
            theme = colores verde/dorado
            timeline = 7 eventos de boda
            map = Etzatlan, Jalisco

  Entry 2: slug = "xv-sofia"              ← quinceanos
            eventType = quinceanera
            names = Sofia
            theme = colores rosa/plateado
            timeline = 5 eventos
            map = Guadalajara

  Entry 3: slug = "boda-carlos-maria"     ← otra boda
            eventType = wedding
            names = Carlos & Maria
            theme = colores azul/blanco
            timeline = 6 eventos
            map = CDMX
```

## Flujo completo de una request

```
1. Alguien visita: daniela-daniel.tudominio.com
                   ─────────┬──────────────────
                            │
2. Nuxt extrae el slug del subdominio: "daniela-daniel"
                            │
3. Fetch a Strapi: GET /api/events?filters[slug]=daniela-daniel&populate=deep
                            │
4. Strapi devuelve SOLO ese evento con todos sus datos
   (nombres, padres, timeline, mapa, colores, imagenes, etc.)
                            │
5. Nuxt renderiza la pagina con esos datos
```

## La clave

**Un solo codigo Nuxt sirve para todos los eventos.** Lo unico que cambia es el contenido que viene de Strapi.

- `daniela-daniel.tudominio.com` → fetch slug "daniela-daniel" → datos de la boda
- `xv-sofia.tudominio.com` → fetch slug "xv-sofia" → datos de los XV
- `boda-carlos-maria.tudominio.com` → fetch slug "boda-carlos-maria" → datos de otra boda

Cada evento tiene sus propios: nombres, fechas, colores, imagenes, timeline, ubicaciones, contactos, dress code, regalos.
