<template>
    <div class="petalos-container pointer-events-none">
      <span
        v-for="(petalo, index) in petalos"
        :key="index"
        class="petalo"
        :style="{
          left: petalo.left + '%',
          animationDuration: petalo.duration + 's',
          animationDelay: petalo.delay + 's',
          transform: `rotate(${petalo.rotation}deg)`
        }"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  interface Petalo {
    left: number
    duration: number
    delay: number
    rotation: number
  }
  
  const TOTAL_DESKTOP = 30
  const TOTAL_MOBILE  = 15
  const petalos = ref<Petalo[]>([])

  onMounted(() => {
    const total = window.innerWidth < 768 ? TOTAL_MOBILE : TOTAL_DESKTOP
    petalos.value = Array.from({ length: total }, () => ({
      left: Math.random() * 100,       // posición horizontal (%)
      duration: 6 + Math.random() * 5, // duración de la caída (6s a 11s)
      delay: Math.random() * 5,        // retardo inicial
      rotation: Math.random() * 360    // rotación inicial
    }))
  })
  </script>
  
  <style scoped>
  .petalos-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 50;
    pointer-events: none;
  }
  
  .petalo {
    position: absolute;
    top: -40px;
    width: 30px;
    height: 30px;
    background-image: url('/petalo.webp');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.8;
    animation-name: caer;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  
  @keyframes caer {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(110vh) rotate(360deg);
      opacity: 0;
    }
  }
  </style>
  