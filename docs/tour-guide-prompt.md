# Prompt: Implementar Tour Guiado con Driver.js en WebApp de Boda

## Objetivo

Agregar un sistema de tour guiado interactivo a la webapp de invitación de boda usando **Driver.js**. El tour debe mostrarse automáticamente la primera vez que un usuario visita la página y estar disponible para reiniciarse mediante un botón flotante.

## Contexto del Proyecto

- **Stack:** Nuxt 3 + Vue 3 + Tailwind CSS + Pinia
- **Dark mode forzado** en `app.vue` (`colorMode.value = 'dark'`)
- **Colores brand:** `brand-sage`, `brand-cream`, `brand-blush`, `brand-gold`, `brand-dark`, `brand-rose`
- **Fuentes:** `font-dancing`, `font-poppins`, `font-pacifico`, `font-alex`, `font-playfair`, `font-lora`
- **Breakpoints:** Extra `xs` a 375px + Tailwind defaults
- **Index page (`pages/index.vue`)** contiene los siguientes componentes con IDs de anchor:

```vue
<heroComponent />
<OurParents />
<promiseSection />
<CarouselComponent class="my-8" />
<SaveDateComponent />
<googleMap id="ubicacion" />
<timeLine id="fecha" />
<contactNovios id="informacion" />
<DressCode id="dressCode" />
<mesaRegalos />
<confirmComponent id="confirmacion" />
```

## Instalación

```bash
npm install driver.js
```

## Archivos a Crear

### 1. `composables/useTour.ts`

Composable que encapsula toda la lógica del tour:

- Importar `driver` y tipos de `driver.js`
- Importar CSS de driver.js (`driver.js/dist/driver.css`)
- Definir los steps del tour apuntando a selectores CSS existentes:

| Step | Selector | Título | Descripción |
|------|----------|--------|-------------|
| 1 | `.hero-component` o primer hijo del hero | "Bienvenidos" | "Bienvenidos a nuestra invitación virtual. Aquí encontrarás toda la información de nuestra boda." |
| 2 |组件 padres/nombres | "Con la bendición" | "Con la bendición de nuestros padres comenzamos esta nueva etapa." |
| 3 | Carousel | "Nuestros momentos" | "Algunos de los momentos más especiales que hemos compartido juntos." |
| 4 | SaveDate | "Guarda la fecha" | "¡Guarda la fecha! Falta poco para el gran día." |
| 5 | `#ubicacion` | "Ubicación" | "Aquí será la celebración. Podrás ver el mapa y las indicaciones." |
| 6 | `#fecha` | "Itinerario" | "El itinerario del gran día para que no te pierdas ningún momento." |
| 7 | `#informacion` | "Contáctanos" | "Si tienes alguna duda, aquí encontrarás la información de contacto de los novios." |
| 8 | `#dressCode` | "Código de vestimenta" | "Checa el código de vestimenta para el evento." |
| 9 | Mesa de regalos | "Mesa de regalos" | "Si deseas contribuir con un regalo, aquí encontrarás las opciones." |
| 10 | `#confirmacion` | "Confirma tu asistencia" | "Ingresa el código que viene en tu invitación para confirmar tu asistencia." |

- **Configuración del driver:**
  - `showProgress: true`
  - `showButtons: ['next', 'previous', 'close']`
  - `nextBtnText: 'Siguiente'`
  - `prevBtnText: 'Anterior'`
  - `doneBtnText: '¡Listo!'`
  - `closeBtnText: 'Saltar'`
  - `progressText: '{{current}} de {{total}}'`
  - Animaciones suaves
  - Tema oscuro que matchee los colores brand:
    - Fondo del popover: `#1a1a2e` o similar al `brand-dark`
    - Texto: `brand-cream` / blanco
    - Botones: `brand-gold` / naranja (`orange-500`)
    - Overlay: opacidad suave

- **Función `startTour()`:** Inicializa el driver con los steps y configuración, y llama `.drive()`
- **Función `hasSeenTour()`:** Verifica en `localStorage` si el usuario ya vio el tour
- **Función `markTourSeen()`:** Marca en `localStorage` que el usuario ya vio el tour
- **Callback `onDestroyCallback`** dentro de la config del driver que llame `markTourSeen()`

- **Nota sobre selectores:** Revisar cada componente para obtener el selector CSS correcto. Si un componente no tiene un ID o clase distintiva, agregar un `id` o `class` al wrapper del componente para que el step pueda referenciarlo. Los IDs existentes son: `ubicacion`, `fecha`, `informacion`, `dressCode`, `confirmacion`.

### 2. `components/tourButton.vue`

Botón flotante en la esquina inferior derecha de la pantalla:

- Position: `fixed`, `bottom-6`, `right-6`, `z-50`
- Círculo con icono de pregunta (`?`) o icono de ayuda
- Estilo: fondo `brand-gold` u `orange-500`, texto blanco, sombra, border-radius full
- Hover: escala o cambio de color sutil
- `v-tooltip` o title: "Reiniciar tour"
- Al hacer click → ejecuta `startTour()` del composable
- Debe aparecer solo si el usuario ya vio el tour anteriormente (no mostrar si es primera visita, ya que el tour arranca solo)

#### Lógica de visibilidad:

```
if (hasSeenTour()) → mostrar botón
else → ocultar botón (el tour se auto-inicia)
```

## Archivos a Modificar

### 3. `app.vue`

- Importar y agregar `<tourButton />` dentro del template, fuera de `<NuxtLayout>`
- Agregar lógica `onMounted` para:
  - Si `!hasSeenTour()` → ejecutar `startTour()` automáticamente después de un pequeño delay (ej. 1000ms para que la página cargue)
  - Marcar `tourSeen` como reactivo para controlar visibilidad del botón

### 4. `nuxt.config.ts` (opcional)

- Si es necesario, agregar configuración para transpile driver.js:
  ```ts
  build: {
    transpile: ['driver.js']
  }
  ```

## Selección de CSS en cada componente

Antes de implementar, revisar cada componente para confirmar el selector correcto. Si un componente no tiene un wrapper con ID o clase única, se debe agregar. Por ejemplo:

- `heroComponent.vue` → agregar `id="hero"` al div raíz
- `OurParents` → buscar el wrapper existente o agregar clase
- `promiseSection` → buscar el wrapper existente o agregar clase
- `CarouselComponent` → buscar el wrapper existente o agregar clase
- `SaveDateComponent` → buscar el wrapper existente o agregar clase
- `mesaRegalos` → buscar el wrapper existente o agregar clase

Los que ya tienen IDs asignados en `pages/index.vue`: `ubicacion`, `fecha`, `informacion`, `dressCode`, `confirmacion`.

## Consideraciones

- **SSR:** Driver.js es una librería del lado del cliente. Usar `<ClientOnly>` o importar dinámicamente solo en `onMounted` para evitar errores de SSR.
- **Responsive:** Los tooltips de Driver.js deben ser responsivos. Verificar que los popovers no se salgan de la pantalla en móvil (breakpoint `xs: 375px`).
- **Dark mode:** La app fuerza dark mode. Asegurar que los estilos del popover y overlay funcionen bien sobre fondo oscuro.
- **localStorage:** Usar `localStorage` directamente (no Pinia) para persistir si el usuario ya vio el tour. Key sugerida: `boda_tour_seen`.
- **Delay en auto-inicio:** Esperar ~1-2 segundos después del mount para que las imágenes y componentes se rendericen antes de iniciar el tour.
- **Destroy callback:** Al cerrar el tour (ya sea completo o con "Saltar"), marcar como visto en localStorage para no mostrarlo de nuevo automáticamente.

## Ejemplo de Código Base

### `composables/useTour.ts`

```ts
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import type { DriveStep } from 'driver.js'

const TOUR_SEEN_KEY = 'boda_tour_seen'

export const useTour = () => {
  const hasSeenTour = (): boolean => {
    if (import.meta.server) return true
    return localStorage.getItem(TOUR_SEEN_KEY) === 'true'
  }

  const markTourSeen = (): void => {
    if (import.meta.client) {
      localStorage.setItem(TOUR_SEEN_KEY, 'true')
    }
  }

  const steps: DriveStep[] = [
    { element: '#hero', popover: { title: 'Bienvenidos', description: 'Bienvenidos a nuestra invitación virtual...' } },
    // ... más steps
  ]

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: '¡Listo!',
      closeBtnText: 'Saltar',
      progressText: '{{current}} de {{total}}',
      onDestroyed: () => {
        markTourSeen()
      },
      steps,
      popoverClass: 'tour-popover',
    })
    driverObj.drive()
  }

  return { startTour, hasSeenTour, markTourSeen }
}
```

### Estilos custom (agregar en `app.vue` o archivo CSS global)

```css
.tour-popover {
  background-color: #1a1a2e !important;
  color: #faf5ef !important;
  border: 1px solid #c9a96e !important;
  border-radius: 12px !important;
}

.tour-popover .driver-popover-title {
  color: #c9a96e !important;
  font-family: 'Dancing Script', cursive !important;
  font-size: 1.5rem !important;
}

.tour-popover .driver-popover-description {
  color: #faf5ef !important;
  font-family: 'Poppins', sans-serif !important;
}

.tour-popover .driver-popover-next-btn,
.tour-popover .driver-popover-prev-btn {
  background-color: #ea580c !important;
  color: white !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;
}
```