<template>
    <!-- Cargando -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen bg-white">
        <p class="text-gray-300 font-poppins tracking-widest text-xs uppercase">Cargando invitación...</p>
    </div>

    <!-- No encontrado -->
    <div v-else-if="!event" class="flex justify-center items-center min-h-screen bg-white">
        <p class="text-gray-300 font-poppins text-sm">Evento no encontrado.</p>
    </div>

    <!-- Página principal -->
    <div v-else class="bg-white min-h-screen">

        <!-- ─── HERO ─── -->
        <section class="relative w-full h-screen flex items-end justify-center pb-20">
            <NuxtImg
                v-if="heroImage"
                :src="heroImage"
                class="absolute inset-0 w-full h-full object-cover object-center"
                alt="Foto de la pareja"
            />
            <div v-if="heroImage" class="absolute inset-0 bg-black/30 pointer-events-none" />
            <div
                class="relative z-10 text-center px-8"
                :class="heroImage ? 'text-white' : 'text-gray-900'"
            >
                <h1 class="font-playfair font-bold text-5xl sm:text-7xl tracking-widest uppercase leading-none">
                    {{ event.name?.name1 ?? 'OLIVIA' }}
                </h1>
                <p class="font-dancing text-4xl sm:text-5xl my-3 leading-tight">and</p>
                <h1 class="font-playfair font-bold text-5xl sm:text-7xl tracking-widest uppercase leading-none">
                    {{ event.name?.name2 ?? 'JAMES' }}
                </h1>
                <p class="font-poppins text-xs tracking-[0.3em] uppercase mt-6 opacity-70">
                    {{ formattedDate }}
                </p>
            </div>
        </section>

        <!-- Contenido principal centrado -->
        <div class="w-full max-w-sm mx-auto px-8 py-16 text-center">

            <!-- ─── PADRES ─── -->
            <section v-if="event.parents" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-500 leading-loose">
                    {{ event.parents.introText ?? 'Solicitan el honor de su presencia en su unión matrimonial' }}
                </p>
                <div v-if="parentGroups.length" class="mt-8 space-y-5">
                    <div v-for="(grupo, i) in parentGroups" :key="i" class="space-y-1">
                        <p class="font-playfair text-gray-800 text-lg leading-snug">{{ grupo.fatherName }}</p>
                        <p class="font-playfair text-gray-800 text-lg leading-snug">{{ grupo.motherName }}</p>
                    </div>
                </div>
            </section>

            <!-- ─── HISTORIA ─── -->
            <section v-if="event.story" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-4">Nuestra historia</p>
                <h2 class="font-playfair font-bold text-xl text-gray-900 uppercase tracking-wider mb-8">
                    {{ event.story.title ?? 'Una promesa para toda la vida' }}
                </h2>
                <NuxtImg
                    v-if="storyImage"
                    :src="storyImage"
                    class="w-full aspect-square object-cover mb-8 grayscale"
                    alt="Foto de la pareja"
                />
                <p v-if="event.story.body" class="font-poppins text-sm text-gray-600 leading-relaxed text-left">
                    {{ event.story.body }}
                </p>
            </section>

            <!-- ─── GALERÍA ─── -->
            <section v-if="galleryImages.length" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-6">Galería</p>
                <div class="grid grid-cols-2 gap-0.5">
                    <NuxtImg
                        v-for="(img, i) in galleryImages"
                        :key="i"
                        :src="img"
                        :class="i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'"
                        class="w-full object-cover grayscale hover:grayscale-0 transition duration-500"
                        alt="Foto"
                    />
                </div>
            </section>

            <!-- ─── FECHA Y LUGAR ─── -->
            <section class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-4">Fecha y lugar</p>
                <p class="font-playfair font-bold text-xl text-gray-900 uppercase tracking-wider mb-10">
                    {{ formattedDate }}
                </p>
                <div v-if="locations.length" class="space-y-10">
                    <div v-for="(loc, i) in locations" :key="i" class="space-y-2">
                        <p class="font-poppins text-xs tracking-widest uppercase text-gray-400">{{ loc.name }}</p>
                        <p class="font-playfair text-gray-900 text-lg leading-snug">{{ loc.placeName }}</p>
                        <a
                            v-if="loc.directionUrl"
                            :href="loc.directionUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-xs tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition"
                        >
                            ¿Cómo llegar? →
                        </a>
                    </div>
                </div>
            </section>

            <!-- ─── ITINERARIO ─── -->
            <section v-if="timelineEvents.length" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-8">Itinerario</p>
                <div class="space-y-5 text-left">
                    <div v-for="(item, i) in timelineEvents" :key="i" class="flex items-start gap-5">
                        <span class="font-poppins text-xs tracking-wider text-gray-400 whitespace-nowrap w-20 shrink-0 pt-0.5">
                            {{ item.time }}
                        </span>
                        <div class="flex-1 border-t border-gray-200 pt-0.5">
                            <p class="font-playfair text-gray-900 text-base">{{ item.title }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ─── DRESS CODE ─── -->
            <section v-if="event.dressCode" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-8">Dress code</p>
                <div v-if="event.dressCode.womenDescription" class="mb-10">
                    <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-3">Mujeres</p>
                    <p class="font-playfair text-gray-900 text-base mb-2">{{ event.dressCode.womenDescription }}</p>
                    <p v-if="event.dressCode.womenRestrictions" class="font-poppins text-xs text-gray-400 mb-4">
                        Evitar: {{ event.dressCode.womenRestrictions }}
                    </p>
                    <div v-if="womenColors.length" class="flex justify-center gap-2">
                        <span
                            v-for="(color, i) in womenColors"
                            :key="i"
                            class="w-6 h-6 rounded-full border border-gray-100 inline-block shadow-sm"
                            :style="{ backgroundColor: color }"
                        />
                    </div>
                </div>
                <div v-if="event.dressCode.manDescription">
                    <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-3">Hombres</p>
                    <p class="font-playfair text-gray-900 text-base mb-2">{{ event.dressCode.manDescription }}</p>
                    <p v-if="event.dressCode.menRestriction" class="font-poppins text-xs text-gray-400 mb-4">
                        Evitar: {{ event.dressCode.menRestriction }}
                    </p>
                    <div v-if="menColors.length" class="flex justify-center gap-2">
                        <span
                            v-for="(color, i) in menColors"
                            :key="i"
                            class="w-6 h-6 rounded-full border border-gray-100 inline-block shadow-sm"
                            :style="{ backgroundColor: color }"
                        />
                    </div>
                </div>
            </section>

            <!-- ─── MESA DE REGALOS ─── -->
            <section v-if="event.gifts" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-8">Mesa de regalos</p>
                <a
                    v-if="event.gifts.registryUrl"
                    :href="event.gifts.registryUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block font-poppins text-xs tracking-widest uppercase text-gray-900 border border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition"
                >
                    Ver mesa de regalos →
                </a>
                <div v-if="bankDetails.length" class="mt-10 space-y-8">
                    <p class="font-poppins text-xs tracking-widest uppercase text-gray-400">Transferencia bancaria</p>
                    <div v-for="(bank, i) in bankDetails" :key="i" class="space-y-1">
                        <p class="font-playfair text-gray-900 text-lg font-semibold">{{ bank.bankName }}</p>
                        <p class="font-poppins text-sm text-gray-500">{{ bank.accountHolder }}</p>
                        <p class="font-poppins text-sm text-gray-900 tracking-widest font-medium">{{ bank.accountNumber }}</p>
                    </div>
                </div>
            </section>

            <!-- ─── CONTACTOS ─── -->
            <section v-if="contacts.length" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-8">Contacto</p>
                <div class="space-y-8">
                    <div v-for="(contact, i) in contacts" :key="i" class="space-y-2">
                        <p class="font-poppins text-xs tracking-widest uppercase text-gray-400">{{ contact.label }}</p>
                        <p class="font-playfair text-gray-900 text-xl">{{ contact.phone }}</p>
                        <a
                            v-if="contact.whatsappUrl"
                            :href="contact.whatsappUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-xs tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition"
                        >
                            WhatsApp →
                        </a>
                    </div>
                </div>
            </section>

            <!-- ─── HOTELES RECOMENDADOS ─── -->
            <section v-if="hotels.length" class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-8">
                    {{ event.recommendedHotels?.Title ?? 'Hoteles recomendados' }}
                </p>
                <div class="space-y-12 text-left">
                    <div v-for="(hotel, i) in hotels" :key="i" class="space-y-2">
                        <NuxtImg
                            v-if="hotelImage(hotel)"
                            :src="hotelImage(hotel)"
                            class="w-full aspect-video object-cover mb-4 grayscale"
                            alt="Hotel"
                        />
                        <p class="font-playfair text-gray-900 text-lg font-semibold">{{ hotel.name }}</p>
                        <p v-if="hotel.address" class="font-poppins text-xs text-gray-400 tracking-wide">{{ hotel.address }}</p>
                        <p v-if="hotel.description" class="font-poppins text-sm text-gray-600 leading-relaxed">{{ hotel.description }}</p>
                        <p v-if="hotel.phone" class="font-poppins text-sm text-gray-700">{{ hotel.phone }}</p>
                        <a
                            v-if="hotel.website"
                            :href="hotel.website"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-xs tracking-widest uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition"
                        >
                            Ver sitio web →
                        </a>
                    </div>
                </div>
            </section>

            <!-- ─── RSVP ─── -->
            <section class="mb-20">
                <hr class="border-gray-200 mb-12" />
                <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-2">Confirmación</p>
                <h2 class="font-playfair font-bold text-2xl text-gray-900 uppercase tracking-wider mb-10">
                    ¿Nos acompañas?
                </h2>

                <!-- Estado: confirmado -->
                <div v-if="confirmacionExitosa || datosInvitado?.yaConfirmado" class="space-y-4 py-4">
                    <p class="font-playfair text-2xl text-gray-900">
                        {{ mensajeExito || `¡${datosInvitado?.nombre}, tu lugar está reservado!` }}
                    </p>
                    <p class="font-poppins text-xs text-gray-400 tracking-wide">
                        Nos alegra mucho contar contigo en este día tan especial.
                    </p>
                    <button
                        @click="handleReiniciar"
                        class="font-poppins text-xs tracking-widest uppercase text-gray-400 border-b border-gray-200 pb-0.5 hover:text-gray-700 hover:border-gray-700 transition"
                    >
                        Consultar otro código
                    </button>
                </div>

                <!-- Estado: ingreso de código -->
                <template v-else-if="!datosInvitado">
                    <div class="space-y-6">
                        <input
                            type="text"
                            v-model="codigo"
                            @input="codigo = ($event.target as HTMLInputElement).value.toUpperCase()"
                            @keyup.enter="handleValidar"
                            :disabled="cargando"
                            placeholder="CÓDIGO DE INVITACIÓN"
                            class="w-full text-center border-b border-gray-300 py-3 font-poppins text-sm tracking-widest uppercase text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition bg-transparent disabled:opacity-50"
                        />
                        <p class="font-poppins text-xs text-gray-400">
                            Ingresa el código que aparece en tu invitación.
                        </p>
                        <div v-if="rsvpError" class="font-poppins text-xs text-red-400">{{ rsvpError }}</div>
                        <button
                            @click="handleValidar"
                            :disabled="cargando || !codigo.trim()"
                            class="w-full font-poppins text-xs tracking-widest uppercase border border-gray-900 py-3 hover:bg-gray-900 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {{ cargando ? 'Buscando...' : 'Buscar invitación' }}
                        </button>
                    </div>
                </template>

                <!-- Estado: selección de acompañantes -->
                <template v-else>
                    <div class="space-y-6">
                        <div class="border-b border-gray-200 pb-5">
                            <p class="font-poppins text-xs tracking-widest uppercase text-gray-400 mb-1">Invitación para</p>
                            <p class="font-playfair text-gray-900 text-xl">{{ datosInvitado.nombre }}</p>
                        </div>

                        <p v-if="datosInvitado.acompanantesMaximos === 0" class="font-poppins text-xs text-gray-400">
                            Esta invitación no incluye acompañantes.
                        </p>

                        <template v-else>
                            <div>
                                <div class="flex justify-between items-center mb-4">
                                    <p class="font-poppins text-xs tracking-widest uppercase text-gray-400">Acompañantes</p>
                                    <p class="font-poppins text-xs text-gray-400">
                                        {{ listaAcompanantes.length }} / {{ datosInvitado.acompanantesMaximos }}
                                    </p>
                                </div>
                                <ul class="space-y-3 mb-4">
                                    <li v-for="(a, i) in listaAcompanantes" :key="i" class="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            v-model="listaAcompanantes[i].nombre"
                                            :placeholder="`Acompañante ${i + 1}`"
                                            class="flex-1 border-b border-gray-200 py-2 font-poppins text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition bg-transparent"
                                        />
                                        <button
                                            @click="eliminarAcompanante(i)"
                                            class="font-poppins text-xs text-gray-300 hover:text-red-400 transition"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                </ul>
                                <button
                                    @click="agregarAcompanante"
                                    :disabled="listaAcompanantes.length >= (datosInvitado.acompanantesMaximos ?? 0)"
                                    class="w-full py-2.5 font-poppins text-xs tracking-widest uppercase text-gray-400 border border-dashed border-gray-200 hover:border-gray-400 hover:text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    + Agregar acompañante
                                </button>
                            </div>
                        </template>

                        <div v-if="rsvpError" class="font-poppins text-xs text-red-400">{{ rsvpError }}</div>

                        <div class="space-y-3">
                            <button
                                @click="handleConfirmar"
                                :disabled="cargando"
                                class="w-full font-poppins text-xs tracking-widest uppercase border border-gray-900 py-3 hover:bg-gray-900 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {{ cargando ? 'Confirmando...' : 'Confirmar asistencia' }}
                            </button>
                            <button
                                @click="handleReiniciar"
                                :disabled="cargando"
                                class="w-full font-poppins text-xs tracking-widest uppercase text-gray-400 hover:text-gray-700 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </template>
            </section>

            <!-- ─── PIE DE PÁGINA ─── -->
            <footer class="pb-8">
                <hr class="border-gray-200 mb-12" />
                <p class="font-dancing text-4xl text-gray-900">
                    {{ event.name?.name1 ?? 'Olivia' }} &amp; {{ event.name?.name2 ?? 'James' }}
                </p>
                <p class="font-poppins text-xs text-gray-400 tracking-widest uppercase mt-3">{{ formattedDate }}</p>
            </footer>

        </div>
    </div>
</template>

<script setup lang="ts">
const { event, pending } = useEvent()
provide('event', event)

const config = useRuntimeConfig()

// ─── Helpers ─────────────────────────────────────────────
const imageUrl = (url?: string | null): string | null => {
    if (!url) return null
    return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
}

const parseColors = (raw: any): string[] => {
    if (!raw) return []
    try { return typeof raw === 'string' ? JSON.parse(raw) : raw } catch { return [] }
}

// ─── Fecha formateada ─────────────────────────────────────
const formattedDate = computed(() => {
    const raw = event.value?.eventDate
    if (!raw) return '12 de octubre de 20XX'
    const date = new Date(raw)
    const day = date.getDate()
    const month = date.toLocaleString('es-MX', { month: 'long' })
    const year = date.getFullYear()
    const time = date.toLocaleString('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true })
    return `${day} de ${month} de ${year}, a las ${time}`
})

// ─── Secciones computadas ─────────────────────────────────
const heroImage = computed(() => imageUrl(event.value?.hero?.backgroundImage?.url))
const storyImage = computed(() => imageUrl(event.value?.story?.mainImage?.url))
const parentGroups = computed(() => event.value?.parents?.parentGroups ?? [])
const galleryImages = computed(() =>
    (event.value?.gallery?.images ?? []).map((img: any) => imageUrl(img.url)).filter(Boolean)
)
const locations = computed(() => event.value?.map?.locations ?? [])
const timelineEvents = computed(() => event.value?.timeline?.events ?? [])
const womenColors = computed(() => parseColors(event.value?.dressCode?.womenColors))
const menColors = computed(() => parseColors(event.value?.dressCode?.menColors))
const bankDetails = computed(() => event.value?.gifts?.bankDetails ?? [])
const contacts = computed(() => event.value?.contacts?.contactList ?? [])
const hotels = computed(() => event.value?.recommendedHotels?.hotetels ?? [])

const hotelImage = (hotel: any) => imageUrl(hotel.image?.url)

// ─── RSVP ─────────────────────────────────────────────────
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
    reiniciar
} = useRsvp()

const handleValidar = async () => {
    if (!codigo.value.trim()) return
    const exito = await validarCodigo(codigo.value)
    if (exito && datosInvitado.value) {
        listaAcompanantes.value = (datosInvitado.value.acompanantes ?? []).map((a: any) => ({
            nombre: a.nombre ?? ''
        }))
    }
}

const handleConfirmar = async () => {
    await confirmarAsistencia(codigo.value, listaAcompanantes.value)
}

const handleReiniciar = () => {
    codigo.value = ''
    listaAcompanantes.value = []
    reiniciar()
}

const agregarAcompanante = () => {
    const max = datosInvitado.value?.acompanantesMaximos ?? 0
    if (listaAcompanantes.value.length < max) {
        listaAcompanantes.value.push({ nombre: '' })
    }
}

const eliminarAcompanante = (index: number) => {
    listaAcompanantes.value.splice(index, 1)
}
</script>
