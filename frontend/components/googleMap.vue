<template>
  <div class="my-10 mx-auto w-full">
    <h2 class="text-[#d3924a] font-dancing text-5xl text-center my-8">
      {{ regionTitle }}</h2>
    <div id="map" class="w-full h-[400px] rounded-2xl shadow" />
    <div class="flex justify-center gap-4 mt-4 w-full">
      <button v-for="(location, index) in locations" :key="index" @click="focusLocation(location)" type="button"
        class="flex justify-center items-center gap-x-1.5 rounded-md bg-orange-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">

        <NuxtImg sizes="20" :src="location.img" class="size-5"></NuxtImg>
        {{ location.name }}
      </button>
    </div>
    <p class="text-center text-lg font-lora my-4 text-gray-600">{{ place }}</p>
<div v-if="placeUbication" class="flex justify-center">
  <a :href="placeUbication" target="_blank">
    <button
      type="button"
      class="rounded-full bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
    >
      <span class="text-sm font-medium">¿Cómo llegar?</span>
      <ArrowUpRightIcon class="w-6 h-6" aria-hidden="true" />

    </button>
  </a>
</div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject, onMounted } from "vue";
import { ArrowUpRightIcon } from "@heroicons/vue/20/solid";

const event = inject<any>('event')
const config = useRuntimeConfig();

const place = ref("");
const placeUbication = ref("");
const mapReady = ref(false);
let map: google.maps.Map;
let markers: google.maps.Marker[] = [];

const regionTitle = computed(() => event?.value?.map?.regionTitle ?? 'Etzatlan Jalisco')

const iconColors = [
  'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
]

const locations = computed(() => {
  const strapiLocations = event?.value?.map?.locations
  if (strapiLocations?.length) {
    return strapiLocations.map((loc: any, i: number) => ({
      name: loc.name,
      position: { lat: loc.latitude, lng: loc.longitude },
      icon: iconColors[i % iconColors.length],
      img: loc.iconImage?.url
        ? (loc.iconImage.url.startsWith('http') ? loc.iconImage.url : `${config.public.strapiUrl}${loc.iconImage.url}`)
        : 'iglesiaBlanco.webp',
      place: loc.placeName,
      howtoarrive: loc.directionUrl ?? '',
    }))
  }
  // Fallback hardcodeado
  return [
    { name: "Templo", position: { lat: 20.76439604962931, lng: -104.08049966545539 }, icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", img: "iglesiaBlanco.webp", place: "Templo de la Purisima Concepción", howtoarrive: "https://www.google.com/maps/place/Parroquia+de+la+Pur%C3%ADsima+Concepci%C3%B3n/@20.7643861,-104.0804978,17z" },
    { name: "Recepción", position: { lat: 20.76774609400717, lng: -104.09720436461963 }, icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", img: "papel-picado.webp", place: "El Ranchito, Escobedo #7", howtoarrive: "https://maps.app.goo.gl/6pbkHd4kgUk2wsPu8" },
  ]
})

function colocarMarcadores() {
  if (!map || !locations.value.length) return
  markers.forEach(m => m.setMap(null))
  markers = []
  locations.value.forEach(loc => {
    markers.push(new google.maps.Marker({ position: loc.position, map, title: loc.name, icon: loc.icon }))
  })
  map.setCenter(locations.value[0].position)
}

function focusLocation(location: any) {
  place.value = location.place;
  placeUbication.value = location.howtoarrive;
  map.setCenter(location.position);
  map.setZoom(16);
}

function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) { resolve(); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject("Google Maps failed to load");
    document.head.appendChild(script);
    (window as any).initMap = () => resolve();
  });
}

watch(locations, () => { if (mapReady.value) colocarMarcadores() })

onMounted(async () => {
  await loadGoogleMapsScript();
  const el = document.getElementById("map");
  if (!el) return;
  const centro = locations.value[0]?.position ?? { lat: 20.764, lng: -104.08 }
  map = new google.maps.Map(el, { center: centro, zoom: 13 });
  mapReady.value = true;
  colocarMarcadores();
});
</script>

