<template>
    <!-- Cargando -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen bg-[#f0ede8]">
        <p class="font-poppins text-xs tracking-widest uppercase text-gray-400">Cargando invitación...</p>
    </div>

    <!-- No encontrado -->
    <div v-else-if="!event" class="flex justify-center items-center min-h-screen bg-[#f0ede8]">
        <p class="font-poppins text-sm text-gray-400">Evento no encontrado.</p>
    </div>

    <!-- Página principal -->
    <div v-else class="bg-[#f0ede8] min-h-screen flex justify-center">
        <div class="w-full max-w-sm bg-white overflow-hidden shadow-xl">

            <!-- ═══════════════════════════════════════
                 HERO — Foto + Nombres
            ════════════════════════════════════════ -->
            <section class="relative">
                <!-- Foto de la pareja -->
                <div class="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden">
                    <NuxtImg
                        v-if="heroImage"
                        :src="heroImage"
                        class="w-full h-full object-cover object-top grayscale"
                        alt="Foto de la pareja"
                    />
                    <div v-else class="w-full h-full bg-gradient-to-b from-gray-300 to-gray-500" />
                    <!-- Gradiente inferior para legibilidad -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <!-- Texto sobre la foto -->
                    <div class="absolute bottom-14 left-0 right-0 text-center px-6">
                        <p class="font-poppins text-xs tracking-[0.3em] uppercase text-white/90 mb-1">
                            Nos casamos
                        </p>
                        <p class="font-dancing text-5xl text-white leading-tight">
                            {{ event.name?.name1 ?? 'Lucia' }} &amp; {{ event.name?.name2 ?? 'Juan' }}
                        </p>
                        <p class="font-poppins text-sm tracking-widest text-white/80 mt-2">
                            {{ formattedDateShort }}
                        </p>
                    </div>
                </div>
                <!-- Borde rasgado inferior -->
                <img
                    src="/torn-paper-hero.png"
                    alt=""
                    aria-hidden="true"
                    class="absolute bottom-0 left-0 w-full z-10 pointer-events-none select-none"
                    style="height:80px; object-fit:fill;"
                />

            </section>

            <!-- ═══════════════════════════════════════
                 COUNTDOWN — Faltan
            ════════════════════════════════════════ -->
            <section class="px-8 pt-2 pb-8 text-center">
                <p class="font-poppins font-bold text-sm tracking-widest uppercase text-gray-900 mb-4">
                    Faltan:
                </p>
                <div class="flex justify-center gap-4 mb-4">
                    <div v-for="unit in countdownUnits" :key="unit.label" class="flex flex-col items-center min-w-[52px]">
                        <span class="font-playfair font-bold text-5xl text-gray-900 leading-none tabular-nums">
                            {{ String(unit.value).padStart(2, '0') }}
                        </span>
                        <span class="font-poppins text-xs text-gray-400 mt-1">{{ unit.label }}</span>
                    </div>
                </div>

                <!-- Divider -->
                <hr class="border-gray-200 my-5 mx-4" />

                <p class="font-poppins text-xs text-gray-500 leading-relaxed mb-4">
                    Te esperamos para<br>celebrar nuestra boda
                </p>

                <!-- Fecha destacada -->
                <div class="flex items-center justify-center gap-3">
                    <span class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-500 border border-gray-300 px-2 py-1">
                        {{ diaSemana }}
                    </span>
                    <span class="font-playfair font-bold text-4xl text-gray-900">{{ diaMes }}</span>
                    <span class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-500 border border-gray-300 px-2 py-1">
                        {{ mesNombre }}
                    </span>
                </div>
            </section>

            <!-- ═══════════════════════════════════════
                 UBICACIONES — Ceremonia y Fiesta
            ════════════════════════════════════════ -->
            <section v-if="locations.length" class="relative bg-[#f7f5f2] px-8 py-16">
                <!-- Borde rasgado superior (invertido) -->
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute top-0 left-0 w-full z-10 pointer-events-none select-none" style="height:80px; object-fit:fill; transform:scaleY(-1);" />
                <!-- Borde rasgado inferior -->
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute bottom-0 left-0 w-full z-10 pointer-events-none select-none" style="height:80px; object-fit:fill;" />

                <div class="space-y-8 mt-4 mb-4">
                    <div
                        v-for="(loc, i) in locations"
                        :key="i"
                        class="text-center"
                    >
                        <!-- Icono según el índice -->
                        <div class="flex justify-center mb-3">
                            <svg v-if="i === 0" viewBox="0 0 48 48" class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M24 4 L24 8 M16 8 L32 8 L36 14 L36 28 L12 28 L12 14 Z M20 28 L20 40 L28 40 L28 28 M24 14 L24 22 M20 18 L28 18"/>
                                <path d="M10 28 L38 28"/>
                            </svg>
                            <svg v-else viewBox="0 0 48 48" class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M16 8 L20 28 M32 8 L28 28 M20 28 L28 28 M24 28 L24 40 M18 40 L30 40"/>
                                <path d="M14 8 Q16 14 20 16 M34 8 Q32 14 28 16"/>
                            </svg>
                        </div>
                        <h3 class="font-playfair font-bold text-xl text-gray-900 mb-1">{{ loc.name }}</h3>
                        <p class="font-poppins text-sm text-gray-500 leading-relaxed mb-4">
                            {{ formattedTime }} hs · {{ loc.placeName }}
                        </p>
                        <a
                            v-if="loc.directionUrl"
                            :href="loc.directionUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-xs tracking-widest uppercase text-white bg-gray-900 px-8 py-2.5 rounded-full hover:bg-gray-700 transition"
                        >
                            Cómo llegar
                        </a>
                    </div>
                </div>
            </section>

            <!-- ═══════════════════════════════════════
                 FOTO SECUNDARIA (story o gallery[1])
            ════════════════════════════════════════ -->
            <section v-if="secondaryImage" class="relative">
                <div class="w-full aspect-[4/3] overflow-hidden bg-gray-200">
                    <NuxtImg
                        :src="secondaryImage"
                        class="w-full h-full object-cover object-top grayscale"
                        alt="Foto de la pareja"
                    />
                </div>
                <!-- Borde rasgado superior (invertido) -->
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute top-0 left-0 w-full z-10 pointer-events-none select-none" style="height:80px; object-fit:fill; transform:scaleY(-1);" />
                <!-- Borde rasgado inferior -->
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute bottom-0 left-0 w-full z-10 pointer-events-none select-none" style="height:80px; object-fit:fill;" />
            </section>

            <!-- ═══════════════════════════════════════
                 TIMELINE — Itinerario
            ════════════════════════════════════════ -->
            <section v-if="timelineItems.length" class="px-8 py-10">
                <div class="space-y-7">
                    <div
                        v-for="(item, i) in timelineItems"
                        :key="i"
                        class="flex flex-col items-center text-center"
                    >
                        <!-- Icono rotativo según posición -->
                        <div class="mb-2 text-gray-600">
                            <component :is="timelineIcons[i % timelineIcons.length]" />
                        </div>
                        <p class="font-poppins text-sm font-semibold text-gray-900">{{ item.time }}</p>
                        <p class="font-poppins text-xs text-gray-500">{{ item.title }}</p>
                        <!-- Separador pequeño excepto el último -->
                        <div v-if="i < timelineItems.length - 1" class="w-px h-6 bg-gray-200 mt-4" />
                    </div>
                </div>
            </section>

            <!-- ═══════════════════════════════════════
                 FOTO EXTRA (gallery[2] o gallery[0])
            ════════════════════════════════════════ -->
            <section v-if="tertiaryImage" class="relative">
                <!-- Borde rasgado superior (invertido) -->
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute top-0 left-0 w-full z-10 pointer-events-none select-none" style="height:80px; object-fit:fill; transform:scaleY(-1);" />
                <div class="w-full aspect-[4/3] overflow-hidden bg-gray-200">
                    <NuxtImg
                        :src="tertiaryImage"
                        class="w-full h-full object-cover grayscale"
                        alt="Foto de la pareja"
                    />
                </div>
                <!-- Borde rasgado inferior -->
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute bottom-0 left-0 w-full z-10 pointer-events-none select-none" style="height:80px; object-fit:fill;" />
            </section>

            <!-- ═══════════════════════════════════════
                 INSTAGRAM
            ════════════════════════════════════════ -->
            <section class="px-8 py-10 text-center">
                <div class="flex justify-center mb-3">
                    <!-- Icono corazón/love -->
                    <svg viewBox="0 0 48 48" class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M24 38 L8 24 C4 20 4 14 8 10 C12 6 18 6 22 10 L24 12 L26 10 C30 6 36 6 40 10 C44 14 44 20 40 24 Z"/>
                        <path d="M18 32 L14 28 M30 32 L34 28" stroke-linecap="round"/>
                    </svg>
                </div>
                <h3 class="font-playfair font-bold text-xl text-gray-900 mb-3">Instagram</h3>
                <p class="font-poppins text-xs text-gray-500 leading-relaxed mb-5">
                    No nos queremos perder de nada, por favor seguinos y
                    etiqueta el instagram de la boda para que podamos revivir momentos
                </p>
                <a
                    v-if="instagramHandle"
                    :href="`https://instagram.com/${instagramHandle.replace('@','')}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block font-poppins text-xs tracking-widest uppercase text-white bg-gray-900 px-8 py-2.5 rounded-full hover:bg-gray-700 transition"
                >
                    {{ instagramHandle }}
                </a>
                <span v-else class="inline-block font-poppins text-xs tracking-widest uppercase text-white bg-gray-900 px-8 py-2.5 rounded-full">
                    @{{ slugInstagram }}
                </span>
            </section>

            <!-- Divisor rasgado (blanco → crema) -->
            <div class="relative h-20 bg-[#f7f5f2]">
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute top-0 left-0 w-full pointer-events-none select-none" style="height:80px; object-fit:fill; transform:scaleY(-1);" />
            </div>

            <!-- ═══════════════════════════════════════
                 PLAYLIST
            ════════════════════════════════════════ -->
            <section class="bg-[#f7f5f2] px-8 py-10 text-center relative">
                <div class="flex justify-center mb-3">
                    <!-- Icono nota musical -->
                    <svg viewBox="0 0 48 48" class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20 36 L20 14 L38 10 L38 32"/>
                        <circle cx="16" cy="36" r="4"/>
                        <circle cx="34" cy="32" r="4"/>
                    </svg>
                </div>
                <h3 class="font-playfair font-bold text-xl text-gray-900 mb-3">Playlist</h3>
                <p class="font-poppins text-xs text-gray-500 leading-relaxed mb-5">
                    La fiesta la hacés vos, ayudanos con la música,
                    recomendanos esa canción que no puede faltar
                </p>
                <a
                    v-if="playlistUrl"
                    :href="playlistUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block font-poppins text-xs tracking-widest uppercase text-white bg-gray-900 px-8 py-2.5 rounded-full hover:bg-gray-700 transition"
                >
                    Sugerir canción →
                </a>
            </section>

            <!-- Divisor rasgado (crema → blanco) -->
            <div class="relative h-20 bg-white">
                <img src="/torn-paper-hero.png" alt="" aria-hidden="true" class="absolute top-0 left-0 w-full pointer-events-none select-none" style="height:80px; object-fit:fill; transform:scaleY(-1); filter:sepia(0.35) saturate(0.25) brightness(1.01);" />
            </div>

            <!-- ═══════════════════════════════════════
                 RSVP — Confirmación
            ════════════════════════════════════════ -->
            <section class="px-8 pt-4 pb-12 text-center">
                <div class="flex justify-center mb-3">
                    <svg viewBox="0 0 48 48" class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="6" y="12" width="36" height="26" rx="2"/>
                        <path d="M6 16 L24 28 L42 16"/>
                    </svg>
                </div>
                <h3 class="font-playfair font-bold text-xl text-gray-900 mb-2">Confirmá tu asistencia</h3>
                <p class="font-poppins text-xs text-gray-500 mb-6">Ingresá el código de tu invitación</p>

                <!-- Confirmado -->
                <div v-if="confirmacionExitosa || datosInvitado?.yaConfirmado" class="space-y-3">
                    <p class="font-playfair text-xl text-gray-900">
                        {{ mensajeExito || `¡${datosInvitado?.nombre}, tu lugar está reservado!` }}
                    </p>
                    <p class="font-poppins text-xs text-gray-400">¡Los esperamos con mucho amor!</p>
                    <button @click="handleReiniciar" class="font-poppins text-xs text-gray-400 underline hover:text-gray-700 transition">
                        Consultar otro código
                    </button>
                </div>

                <!-- Ingreso código -->
                <template v-else-if="!datosInvitado">
                    <div class="space-y-4">
                        <input
                            type="text"
                            v-model="codigo"
                            @input="codigo = ($event.target as HTMLInputElement).value.toUpperCase()"
                            @keyup.enter="handleValidar"
                            :disabled="cargando"
                            placeholder="CÓDIGO"
                            class="w-full text-center border border-gray-300 rounded-full py-3 font-poppins text-sm tracking-widest uppercase text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition bg-transparent disabled:opacity-50"
                        />
                        <div v-if="rsvpError" class="font-poppins text-xs text-red-400">{{ rsvpError }}</div>
                        <button
                            @click="handleValidar"
                            :disabled="cargando || !codigo.trim()"
                            class="w-full font-poppins text-xs tracking-widest uppercase text-white bg-gray-900 py-3 rounded-full hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {{ cargando ? 'Buscando...' : 'Confirmar' }}
                        </button>
                    </div>
                </template>

                <!-- Acompañantes -->
                <template v-else>
                    <div class="space-y-5 text-left">
                        <div class="border border-gray-200 rounded-2xl px-4 py-3 text-center">
                            <p class="font-poppins text-xs text-gray-400">Invitación para</p>
                            <p class="font-playfair text-lg text-gray-900">{{ datosInvitado.nombre }}</p>
                        </div>
                        <p v-if="datosInvitado.acompanantesMaximos === 0" class="font-poppins text-xs text-gray-400 text-center">
                            Esta invitación no incluye acompañantes.
                        </p>
                        <template v-else>
                            <div class="flex justify-between items-center">
                                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400">Acompañantes</p>
                                <p class="font-poppins text-xs text-gray-400">
                                    {{ listaAcompanantes.length }} / {{ datosInvitado.acompanantesMaximos }}
                                </p>
                            </div>
                            <ul class="space-y-2">
                                <li v-for="(a, i) in listaAcompanantes" :key="i" class="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        v-model="listaAcompanantes[i].nombre"
                                        :placeholder="`Acompañante ${i + 1}`"
                                        class="flex-1 border border-gray-200 rounded-full px-4 py-2 font-poppins text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition bg-transparent"
                                    />
                                    <button @click="eliminarAcompanante(i)" class="text-gray-300 hover:text-red-400 transition text-sm">✕</button>
                                </li>
                            </ul>
                            <button
                                @click="agregarAcompanante"
                                :disabled="listaAcompanantes.length >= (datosInvitado.acompanantesMaximos ?? 0)"
                                class="w-full py-2.5 font-poppins text-xs tracking-widest uppercase text-gray-400 border border-dashed border-gray-200 rounded-full hover:border-gray-400 hover:text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                + Agregar acompañante
                            </button>
                        </template>
                        <div v-if="rsvpError" class="font-poppins text-xs text-red-400 text-center">{{ rsvpError }}</div>
                        <button
                            @click="handleConfirmar"
                            :disabled="cargando"
                            class="w-full font-poppins text-xs tracking-widest uppercase text-white bg-gray-900 py-3 rounded-full hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {{ cargando ? 'Confirmando...' : 'Confirmar asistencia' }}
                        </button>
                        <button @click="handleReiniciar" :disabled="cargando" class="w-full font-poppins text-xs text-gray-400 hover:text-gray-700 transition text-center">
                            Cancelar
                        </button>
                    </div>
                </template>
            </section>

            <!-- ═══════════════════════════════════════
                 PIE DE PÁGINA
            ════════════════════════════════════════ -->
            <footer class="bg-[#f7f5f2] text-center py-8">
                <p class="font-dancing text-4xl text-gray-800">
                    {{ event.name?.name1 ?? 'Lucia' }} &amp; {{ event.name?.name2 ?? 'Juan' }}
                </p>
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mt-2">
                    {{ formattedDateShort }}
                </p>
            </footer>

        </div>
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

const { event, pending } = useEvent()
provide('event', event)

const config = useRuntimeConfig()

// ─── Helpers ───────────────────────────────────────────────
const imageUrl = (url?: string | null): string | null => {
    if (!url) return null
    return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
}

// ─── Imágenes ──────────────────────────────────────────────
const heroImage = computed(() => imageUrl(event.value?.hero?.backgroundImage?.url))
const storyImage = computed(() => imageUrl(event.value?.story?.mainImage?.url))
const galleryImages = computed(() =>
    (event.value?.gallery?.images ?? []).map((img: any) => imageUrl(img.url)).filter(Boolean)
)
const secondaryImage = computed(() => storyImage.value ?? galleryImages.value[0] ?? null)
const tertiaryImage = computed(() => galleryImages.value[1] ?? galleryImages.value[0] ?? null)

// ─── Fechas ────────────────────────────────────────────────
const eventDateObj = computed(() => {
    const raw = event.value?.eventDate
    return raw ? new Date(raw) : null
})

const formattedDateShort = computed(() => {
    const d = eventDateObj.value
    if (!d) return '29.11.2025'
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}.${mm}.${yyyy}`
})

const diaSemana = computed(() => {
    const d = eventDateObj.value
    if (!d) return 'Sábado'
    return d.toLocaleString('es-MX', { weekday: 'long' })
        .charAt(0).toUpperCase() + d.toLocaleString('es-MX', { weekday: 'long' }).slice(1)
})

const diaMes = computed(() => eventDateObj.value?.getDate() ?? 29)

const mesNombre = computed(() => {
    const d = eventDateObj.value
    if (!d) return 'Noviembre'
    const m = d.toLocaleString('es-MX', { month: 'long' })
    return m.charAt(0).toUpperCase() + m.slice(1)
})

const formattedTime = computed(() => {
    const d = eventDateObj.value
    if (!d) return ''
    return d.toLocaleString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false })
})

// ─── Countdown ─────────────────────────────────────────────
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })

const calcCountdown = () => {
    const target = eventDateObj.value
    if (!target) return
    const diff = target.getTime() - Date.now()
    if (diff <= 0) {
        timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
        return
    }
    timeLeft.value = {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
    }
}

const countdownUnits = computed(() => [
    { value: timeLeft.value.days, label: 'Días' },
    { value: timeLeft.value.hours, label: 'Horas' },
    { value: timeLeft.value.minutes, label: 'Minutos' },
    { value: timeLeft.value.seconds, label: 'Segundos' },
])

let countdownInterval: ReturnType<typeof setInterval>
onMounted(() => {
    calcCountdown()
    countdownInterval = setInterval(calcCountdown, 1000)
})
onUnmounted(() => clearInterval(countdownInterval))
watch(eventDateObj, calcCountdown)

// ─── Ubicaciones y Timeline ────────────────────────────────
const locations = computed(() => event.value?.map?.locations ?? [])
const timelineItems = computed(() => event.value?.timeline?.events ?? [])

// Iconos SVG renderizados como VNode (rotativos para el timeline)
const IconPin = () => h('svg', { viewBox: '0 0 48 48', class: 'w-9 h-9 text-gray-600', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('path', { d: 'M24 6 C16 6 10 12 10 20 C10 30 24 42 24 42 C24 42 38 30 38 20 C38 12 32 6 24 6 Z' }),
    h('circle', { cx: '24', cy: '20', r: '5' }),
])
const IconRings = () => h('svg', { viewBox: '0 0 48 48', class: 'w-9 h-9 text-gray-600', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('circle', { cx: '18', cy: '24', r: '9' }),
    h('circle', { cx: '30', cy: '24', r: '9' }),
])
const IconChampagne = () => h('svg', { viewBox: '0 0 48 48', class: 'w-9 h-9 text-gray-600', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('path', { d: 'M16 8 L20 26 M32 8 L28 26 M20 26 L28 26 M24 26 L24 38 M18 38 L30 38' }),
    h('path', { d: 'M14 8 Q16 14 20 16 M34 8 Q32 14 28 16' }),
])
const IconPlate = () => h('svg', { viewBox: '0 0 48 48', class: 'w-9 h-9 text-gray-600', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('ellipse', { cx: '24', cy: '28', rx: '14', ry: '8' }),
    h('path', { d: 'M10 28 Q10 38 24 38 Q38 38 38 28' }),
    h('path', { d: 'M24 10 L24 20 M20 10 L20 16 M28 10 L28 16' }),
])
const IconParty = () => h('svg', { viewBox: '0 0 48 48', class: 'w-9 h-9 text-gray-600', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('circle', { cx: '24', cy: '24', r: '14' }),
    h('path', { d: 'M24 10 L24 14 M24 34 L24 38 M10 24 L14 24 M34 24 L38 24' }),
    h('path', { d: 'M15 15 L18 18 M30 30 L33 33 M15 33 L18 30 M30 18 L33 15' }),
])

const timelineIcons = [IconPin, IconRings, IconChampagne, IconPlate, IconParty]

// ─── Instagram y Playlist ──────────────────────────────────
const instagramHandle = computed(() => {
    // Intentar leer desde el primer contacto si no hay campo específico
    const contact = event.value?.contacts?.contactList?.[0]
    return contact?.whatsappUrl?.includes('instagram') ? contact.label : null
})
const slugInstagram = computed(() => {
    const slug = event.value?.slug ?? 'laboda'
    return `@${slug}`
})
const playlistUrl = computed(() => event.value?.gifts?.registryUrl ?? null)

// ─── RSVP ──────────────────────────────────────────────────
const codigo = ref('')
const listaAcompanantes = ref<{ nombre: string }[]>([])

const {
    cargando,
    error: rsvpError,
    datosInvitado,
    confirmacionExitosa,
    mensajeExito,
    validarCodigo,
    confirmarAsistencia,
    reiniciar,
} = useRsvp()

const handleValidar = async () => {
    if (!codigo.value.trim()) return
    const ok = await validarCodigo(codigo.value)
    if (ok && datosInvitado.value) {
        listaAcompanantes.value = (datosInvitado.value.acompanantes ?? []).map((a: any) => ({ nombre: a.nombre ?? '' }))
    }
}
const handleConfirmar = () => confirmarAsistencia(codigo.value, listaAcompanantes.value)
const handleReiniciar = () => {
    codigo.value = ''
    listaAcompanantes.value = []
    reiniciar()
}
const agregarAcompanante = () => {
    if (listaAcompanantes.value.length < (datosInvitado.value?.acompanantesMaximos ?? 0))
        listaAcompanantes.value.push({ nombre: '' })
}
const eliminarAcompanante = (i: number) => listaAcompanantes.value.splice(i, 1)
</script>
