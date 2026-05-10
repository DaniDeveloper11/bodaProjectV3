<template>
  <div class="my-10 mx-auto w-full">
    <h2 class="text-[#d3924a] font-dancing text-5xl text-center my-8">
      Etzatlan Jalisco </h2>
    <div id="map" class="w-full h-[400px] rounded-2xl shadow" />
    <div class="flex justify-center gap-4 mt-4 w-full">
      <button v-for="(location, index) in locations" :key="index" @click="focusLocation(location)" type="button"
        class="flex justify-center items-center gap-x-1.5 rounded-md bg-orange-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">

        <NuxtImg sizes="20" :src="location.img"></NuxtImg>
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
import { ref, onMounted } from "vue";
import { ArrowUpRightIcon } from "@heroicons/vue/20/solid";

const place = ref("");
const placeUbication = ref("");
const config = useRuntimeConfig();

// Ubicaciones
const locations = [
  {
    name: "Templo",
    position: { lat: 20.76439604962931, lng: -104.08049966545539 },
    icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    img: "iglesiaBlanco.webp",
    place: "Templo de la Purisima Concepción",
    howtoarrive:
      "https://www.google.com/maps/place/Parroquia+de+la+Pur%C3%ADsima+Concepci%C3%B3n/@20.7643861,-104.0804978,17z/data=!3m1!4b1!4m6!3m5!1s0x84266f6b9aefb4f7:0xb69c75b278d74289!8m2!3d20.7643861!4d-104.0804978!16s%2Fg%2F1tdywp8y?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Recepción",
    position: { lat: 20.76774609400717, lng: -104.09720436461963 },
    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    img: "papel-picado.webp",
    place: "El Ranchito, Escobedo #7",
    howtoarrive: "https://maps.app.goo.gl/6pbkHd4kgUk2wsPu8",
  },
];

let map: google.maps.Map;

// Carga dinámica del script de Google Maps con callback
function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject("Google Maps failed to load");
    document.head.appendChild(script);

    // La función global que se llama desde el script
    (window as any).initMap = () => resolve();
  });
}

// Centrar el mapa en una ubicación
function focusLocation(location: (typeof locations)[0]) {
  place.value = location.place;
  placeUbication.value = location.howtoarrive;
  map.setCenter(location.position);
  map.setZoom(16);
}

// Inicializa el mapa una vez que Google Maps esté listo
onMounted(async () => {
  await loadGoogleMapsScript();

  const el = document.getElementById("map");
  if (!el) return;

  map = new google.maps.Map(el, {
    center: locations[0].position,
    zoom: 13,
  });

  locations.forEach((loc) => {
    new google.maps.Marker({
      position: loc.position,
      map,
      title: loc.name,
      icon: loc.icon,
    });
  });
});
</script>

