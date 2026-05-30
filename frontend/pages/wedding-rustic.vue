<template>
    <!-- Cargando -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen bg-white">
        <p class="text-gray-400 font-poppins tracking-widest text-xs uppercase">Cargando invitación...</p>
    </div>

    <!-- No encontrado -->
    <div v-else-if="!event" class="flex justify-center items-center min-h-screen bg-white">
        <p class="text-gray-400 font-poppins text-sm">Evento no encontrado.</p>
    </div>

    <!-- Página principal -->
    <div v-else class="bg-white min-h-screen text-[#2C2C2C]">

        <!-- ─── NAVEGACIÓN ─── -->
        <nav class="w-full border-b bg-[#ab6c49] border-gray-100  ">

          <div class=" h-auto pt-8 pb-2 px-2 mx-auto w-full space-y-4">
            <h1 class="text-center font-dancing text-5xl text-white">Nuetra Boda</h1>
            <p class="text-white text-xs font-light text-center">est 2026</p>
            <div class="w-full border-b border-white border-1 "></div>
            <ul class="flex justify-center">
              <li v-for="link in navLinks" :key="link.href" class=" px-2 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-white/40">
                <a :href="link.href" class="font-poppins text-[10px] tracking-[0.2em] uppercase text-white hover:text-[#B5603A] transition">
                  {{ link.label }}
                </a>
              </li>
            </ul>

          </div>


        </nav>

        <!-- ─── HERO ─── -->
        <section id="inicio" class="relative w-full h-[70vh] sm:h-screen">
            <NuxtImg
                v-if="heroImage"
                :src="heroImage"
                class="absolute inset-0 w-full h-full object-cover object-center"
                alt="Foto de portada"
            />
            <div v-if="heroImage" class="absolute inset-0 bg-black/20" />
         
        </section>

        <section class="py-8">
             <div class="flex flex-col items-center justify-center text-center px-6 text-[#ab6c49]" >
               
                <h1 class="font-playfair font-bold text-5xl sm:text-7xl tracking-wider uppercase leading-none">
                    {{ event.name?.name1 ?? 'Jacob' }}
                </h1>
                <p class="font-dancing text-3xl sm:text-4xl my-2 opacity-90">&amp;</p>
                <h1 class="font-playfair font-bold text-5xl sm:text-7xl tracking-wider uppercase leading-none">
                    {{ event.name?.name2 ?? 'Marilize' }}
                </h1>
                <p class="font-poppins text-xs tracking-[0.25em] uppercase mt-6 opacity-70">{{ formattedDate }}</p>
            </div>
        </section>

        <!-- ─── COUNTDOWN ─── -->
        <section id="fecha" class="bg-[#ab6c49] py-2 px-6 text-white">
            <div class="max-w-sm mx-auto text-center">
                <p class="font-poppins text-[10px] tracking-[0.3em] uppercase mb-8">Faltan</p>
                <div class="flex justify-center gap-4">
                    <div v-for="unit in countdown" :key="unit.label" class="flex flex-col items-center">
                        <span class="font-playfair text-3xl sm:text-4xl font-bold  w-16 sm:w-20 text-center leading-none">
                            {{ unit.value }}
                        </span>
                        <span class="font-poppins text-[9px] tracking-[0.2em] uppercase mt-2">{{ unit.label }}</span>
                    </div>
                </div>
            </div>
        </section>

    

        <!-- ─── HISTORIA ─── -->
        <section v-if="event.story" class="py-16 px-6">
            <div class="max-w-4xl mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Nuestra historia</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <h2 class="font-playfair font-bold text-xl text-[#2C2C2C] uppercase tracking-wider mb-8">
                    {{ event.story.title ?? 'Una promesa para toda la vida' }}
                </h2>
                <div
                    v-if="storyImage"
                    id="ourHistoryPhoto"
                    class=" mx-auto mb-8 overflow-hidden"
                >
                    <NuxtImg
                        :src="storyImage"
                        class="w-full h-full object-cover object-center"
                        alt="Foto de la pareja"
                    />
                </div>
                <p v-if="event.story.body" class="font-poppins text-sm text-gray-600 leading-relaxed text-left">
                    {{ event.story.body }}
                </p>
            </div>
        </section>

            <!-- ─── PADRES ─── -->
        <section v-if="event.parents" id="novios" class="bg-[#FAF7F4] py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Familias</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <p class="font-poppins text-xs text-gray-500 leading-loose mb-8">
                    {{ event.parents.introText ?? 'Solicitan el honor de su presencia en su unión matrimonial' }}
                </p>
                <div v-if="parentGroups.length" class="space-y-6">
                    <div v-for="(grupo, i) in parentGroups" :key="i">
                        <p class="font-playfair text-[#2C2C2C] text-lg leading-snug">{{ grupo.fatherName }}</p>
                        <p class="font-playfair text-[#2C2C2C] text-lg leading-snug">{{ grupo.motherName }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── GALERÍA ─── -->
        <section v-if="galleryImages.length" id="galeria" class="py-16 px-6 bg-[#FAF7F4]">
            <div class="max-w-sm mx-auto">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Galería</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <div class="grid grid-cols-2 gap-1">
                    <NuxtImg
                        v-for="(img, i) in galleryImages"
                        :key="i"
                        :src="img"
                        :class="i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'"
                        class="w-full object-cover"
                        alt="Foto"
                    />
                </div>
            </div>
        </section>

        <!-- ─── FECHA Y LUGAR ─── -->
        <section id="lugar" class="py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Lugar</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <p class="font-playfair font-bold text-lg text-[#2C2C2C] uppercase tracking-wider mb-10">
                    {{ formattedDate }}
                </p>
                <div v-if="locations.length" class="space-y-10">
                    <div v-for="(loc, i) in locations" :key="i" class="space-y-2">
                        <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">{{ loc.name }}</p>
                        <p class="font-playfair text-[#2C2C2C] text-xl leading-snug">{{ loc.placeName }}</p>
                        <a
                            v-if="loc.directionUrl"
                            :href="loc.directionUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-[10px] tracking-[0.2em] uppercase mt-2 px-6 py-2.5 bg-[#B5603A] text-white hover:bg-[#9A4D2E] transition"
                        >
                            ¿Cómo llegar?
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── ITINERARIO ─── -->
        <section v-if="timelineEvents.length" id="stad" class="bg-[#FAF7F4] py-16 px-6">
            <div class="max-w-sm mx-auto">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Itinerario</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <div class="space-y-6">
                    <div v-for="(item, i) in timelineEvents" :key="i" class="flex items-start gap-6">
                        <span class="font-poppins text-xs text-[#B5603A] whitespace-nowrap w-20 shrink-0 pt-0.5 tracking-wide">
                            {{ item.time }}
                        </span>
                        <div class="flex-1 border-t border-[#B5603A] border-opacity-20 pt-1">
                            <p class="font-playfair text-[#2C2C2C] text-base">{{ item.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── DRESS CODE ─── -->
        <section v-if="event.dressCode" class="py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Dress code</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <div v-if="event.dressCode.womenDescription" class="mb-10">
                    <p class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3">Mujeres</p>
                    <p class="font-playfair text-[#2C2C2C] text-base mb-2">{{ event.dressCode.womenDescription }}</p>
                    <p v-if="event.dressCode.womenRestrictions" class="font-poppins text-xs text-gray-400 mb-4">
                        Evitar: {{ event.dressCode.womenRestrictions }}
                    </p>
                    <div v-if="womenColors.length" class="flex justify-center gap-2">
                        <span
                            v-for="(color, i) in womenColors"
                            :key="i"
                            class="w-7 h-7 rounded-full border-2 border-white shadow-sm inline-block"
                            :style="{ backgroundColor: color }"
                        />
                    </div>
                </div>
                <div v-if="event.dressCode.manDescription">
                    <p class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3">Hombres</p>
                    <p class="font-playfair text-[#2C2C2C] text-base mb-2">{{ event.dressCode.manDescription }}</p>
                    <p v-if="event.dressCode.menRestriction" class="font-poppins text-xs text-gray-400 mb-4">
                        Evitar: {{ event.dressCode.menRestriction }}
                    </p>
                    <div v-if="menColors.length" class="flex justify-center gap-2">
                        <span
                            v-for="(color, i) in menColors"
                            :key="i"
                            class="w-7 h-7 rounded-full border-2 border-white shadow-sm inline-block"
                            :style="{ backgroundColor: color }"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── HOTELES RECOMENDADOS ─── -->
        <section v-if="hotels.length" class="bg-[#FAF7F4] py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">
                        {{ event.recommendedHotels?.Title ?? 'Alojamiento' }}
                    </p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <div class="space-y-12 text-left">
                    <div v-for="(hotel, i) in hotels" :key="i" class="space-y-2">
                        <NuxtImg
                            v-if="hotelImage(hotel)"
                            :src="hotelImage(hotel)"
                            class="w-full aspect-video object-cover mb-4"
                            alt="Hotel"
                        />
                        <p class="font-playfair text-[#2C2C2C] text-lg font-semibold">{{ hotel.name }}</p>
                        <p v-if="hotel.address" class="font-poppins text-xs text-gray-400 tracking-wide">{{ hotel.address }}</p>
                        <p v-if="hotel.description" class="font-poppins text-sm text-gray-600 leading-relaxed">{{ hotel.description }}</p>
                        <p v-if="hotel.phone" class="font-poppins text-sm text-gray-700">{{ hotel.phone }}</p>
                        <a
                            v-if="hotel.website"
                            :href="hotel.website"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-[10px] tracking-[0.2em] uppercase text-[#B5603A] border-b border-[#B5603A] pb-0.5 hover:opacity-70 transition"
                        >
                            Ver sitio web →
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── MESA DE REGALOS ─── -->
        <section v-if="event.gifts" class="py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Mesa de regalos</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <a
                    v-if="event.gifts.registryUrl"
                    :href="event.gifts.registryUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block font-poppins text-[10px] tracking-[0.2em] uppercase px-8 py-3 bg-[#B5603A] text-white hover:bg-[#9A4D2E] transition"
                >
                    Ver mesa de regalos
                </a>
                <div v-if="bankDetails.length" class="mt-10 space-y-8">
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-gray-400">Transferencia bancaria</p>
                    <div v-for="(bank, i) in bankDetails" :key="i" class="space-y-1">
                        <p class="font-playfair text-[#2C2C2C] text-lg font-semibold">{{ bank.bankName }}</p>
                        <p class="font-poppins text-sm text-gray-500">{{ bank.accountHolder }}</p>
                        <p class="font-poppins text-sm text-[#2C2C2C] tracking-widest font-medium">{{ bank.accountNumber }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── CONTACTOS ─── -->
        <section v-if="contacts.length" class="bg-[#FAF7F4] py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">Contacto</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <div class="space-y-8">
                    <div v-for="(contact, i) in contacts" :key="i" class="space-y-2">
                        <p class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400">{{ contact.label }}</p>
                        <p class="font-playfair text-[#2C2C2C] text-xl">{{ contact.phone }}</p>
                        <a
                            v-if="contact.whatsappUrl"
                            :href="contact.whatsappUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block font-poppins text-[10px] tracking-[0.2em] uppercase px-6 py-2.5 bg-[#B5603A] text-white hover:bg-[#9A4D2E] transition"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── RSVP ─── -->
        <section id="rsvp" class="py-16 px-6">
            <div class="max-w-sm mx-auto text-center">
                <div class="flex items-center gap-4 mb-10">
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                    <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-[#B5603A]">RSVP</p>
                    <div class="flex-1 h-px bg-[#B5603A] opacity-30"></div>
                </div>
                <h2 class="font-playfair font-bold text-2xl text-[#2C2C2C] uppercase tracking-wider mb-10">
                    ¿Nos acompañas?
                </h2>

                <!-- Estado: confirmado -->
                <div v-if="confirmacionExitosa || datosInvitado?.yaConfirmado" class="space-y-4 py-4">
                    <p class="font-playfair text-2xl text-[#2C2C2C]">
                        {{ mensajeExito || `¡${datosInvitado?.nombre}, tu lugar está reservado!` }}
                    </p>
                    <p class="font-poppins text-xs text-gray-400 tracking-wide">
                        Nos alegra mucho contar contigo en este día tan especial.
                    </p>
                    <button
                        @click="handleReiniciar"
                        class="font-poppins text-[10px] tracking-[0.2em] uppercase text-[#B5603A] border-b border-[#B5603A] pb-0.5 hover:opacity-70 transition"
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
                            class="w-full text-center border-b border-gray-300 py-3 font-poppins text-sm tracking-widest uppercase text-[#2C2C2C] placeholder:text-gray-300 focus:outline-none focus:border-[#B5603A] transition bg-transparent disabled:opacity-50"
                        />
                        <p class="font-poppins text-xs text-gray-400">
                            Ingresa el código que aparece en tu invitación.
                        </p>
                        <div v-if="rsvpError" class="font-poppins text-xs text-red-400">{{ rsvpError }}</div>
                        <button
                            @click="handleValidar"
                            :disabled="cargando || !codigo.trim()"
                            class="w-full font-poppins text-[10px] tracking-[0.2em] uppercase py-3 bg-[#B5603A] text-white hover:bg-[#9A4D2E] transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {{ cargando ? 'Buscando...' : 'Buscar invitación' }}
                        </button>
                    </div>
                </template>

                <!-- Estado: selección de acompañantes -->
                <template v-else>
                    <div class="space-y-6">
                        <div class="border-b border-gray-100 pb-5">
                            <p class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">Invitación para</p>
                            <p class="font-playfair text-[#2C2C2C] text-xl">{{ datosInvitado.nombre }}</p>
                        </div>

                        <p v-if="datosInvitado.acompanantesMaximos === 0" class="font-poppins text-xs text-gray-400">
                            Esta invitación no incluye acompañantes.
                        </p>

                        <template v-else>
                            <div>
                                <div class="flex justify-between items-center mb-4">
                                    <p class="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400">Acompañantes</p>
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
                                            class="flex-1 border-b border-gray-200 py-2 font-poppins text-sm text-[#2C2C2C] placeholder:text-gray-300 focus:outline-none focus:border-[#B5603A] transition bg-transparent"
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
                                    class="w-full py-2.5 font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 border border-dashed border-gray-200 hover:border-[#B5603A] hover:text-[#B5603A] transition disabled:opacity-30 disabled:cursor-not-allowed"
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
                                class="w-full font-poppins text-[10px] tracking-[0.2em] uppercase py-3 bg-[#B5603A] text-white hover:bg-[#9A4D2E] transition disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {{ cargando ? 'Confirmando...' : 'Confirmar asistencia' }}
                            </button>
                            <button
                                @click="handleReiniciar"
                                :disabled="cargando"
                                class="w-full font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-[#B5603A] transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </section>

        <!-- ─── PIE DE PÁGINA ─── -->
        <footer class="bg-[#2C2C2C] py-16 px-6 text-center">
            <p class="font-dancing text-4xl text-white mb-2">
                {{ event.name?.name1 ?? 'Jacob' }} &amp; {{ event.name?.name2 ?? 'Marilize' }}
            </p>
            <p class="font-poppins text-[10px] tracking-[0.3em] uppercase text-white opacity-40 mt-3">{{ formattedDate }}</p>
        </footer>

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

const eventYear = computed(() => {
    const raw = event.value?.eventDate
    return raw ? new Date(raw).getFullYear() : new Date().getFullYear()
})

// ─── Countdown ────────────────────────────────────────────
const now = ref(new Date())
let timer: ReturnType<typeof setInterval>
onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(timer))

const countdown = computed(() => {
    const raw = event.value?.eventDate
    if (!raw) return []
    const target = new Date(raw).getTime()
    const diff = Math.max(0, target - now.value.getTime())
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return [
        { value: String(days).padStart(2, '0'), label: 'Días' },
        { value: String(hours).padStart(2, '0'), label: 'Horas' },
        { value: String(minutes).padStart(2, '0'), label: 'Min' },
        { value: String(seconds).padStart(2, '0'), label: 'Seg' },
    ]
})

// ─── Navegación ───────────────────────────────────────────
const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#fecha', label: 'Fecha' },
    { href: '#galeria', label: 'Galería' },
    { href: '#lugar', label: 'Lugar' },
    { href: '#rsvp', label: 'RSVP' },
]

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
