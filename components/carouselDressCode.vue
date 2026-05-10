<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    default: () => [],
  },
})

const currentSlide = ref(0)
let hoverInterval = null

const slideTo = (index) => (currentSlide.value = index)

const onMouseEnter = () => {
  hoverInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % props.photos.length
  }, 1200)
}

const onMouseLeave = () => {
  clearInterval(hoverInterval)
  hoverInterval = null
}

onUnmounted(() => clearInterval(hoverInterval))

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: true,
}

const thumbnailsConfig = {
  itemsToShow: 3,
  wrapAround: true,
  touchDrag: false,
  gap: 8,
}
</script>

<template>
  <div class="dress-carousel-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <!-- Galería principal -->
    <Carousel v-bind="galleryConfig" v-model="currentSlide" class="dress-gallery">
      <Slide v-for="image in photos" :key="image">
        <NuxtImg :src="image" alt="Dress code" class="dress-gallery-image" />
      </Slide>
    </Carousel>

    <!-- Miniaturas -->
    <Carousel v-bind="thumbnailsConfig" v-model="currentSlide" class="dress-thumbnails">
      <Slide v-for="(image, index) in photos" :key="image">
        <template #default="{ isActive }">
          <div :class="['dress-thumb', { 'is-active': isActive }]" @click="slideTo(index)">
            <NuxtImg :src="image" alt="Miniatura" class="dress-thumb-image" />
          </div>
        </template>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.dress-carousel-wrapper {
  width: 100%;
  margin-top: 12px;
}

/* Galería principal */
.dress-gallery {
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .dress-gallery {
    height: 380px;
  }
}

@media (min-width: 1024px) {
  .dress-gallery {
    height: 500px;
  }
}

.dress-gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Miniaturas */
.dress-thumbnails {
  height: 72px;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .dress-thumbnails {
    height: 96px;
  }
}

@media (min-width: 1024px) {
  .dress-thumbnails {
    height: 110px;
  }
}

.dress-thumb {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease, transform 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}

.dress-thumb.is-active,
.dress-thumb:hover {
  opacity: 1;
  transform: scale(1.04);
}

.dress-thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>

<style>
/* Variables globales del carousel (no scoped) */
.dress-carousel-wrapper .carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.75);
  --vc-nav-border-radius: 100%;
  --vc-nav-color: #6a8e58;
}
</style>
