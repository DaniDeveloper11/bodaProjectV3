<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref } from 'vue'

const currentSlide = ref(0)

const slideTo = (nextSlide) => (currentSlide.value = nextSlide)

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
  height: 320,
}

const thumbnailsConfig = {
  height: 80,
  itemsToShow: 6,
  wrapAround: true,
  touchDrag: false,
  gap: 10,
}

const event = inject('event')
const config = useRuntimeConfig()

const fallbackImages = [
  'us1.webp', 'us2.webp', 'us3.webp', 'us4.webp', 'us5.webp',
  'us6.webp', 'us8.webp', 'us9.webp', 'us10.webp', 'us11.webp',
  'us12.webp', 'us13.webp',
]

const images = computed(() => {
  const strapiImages = event?.value?.gallery?.images
  if (strapiImages?.length) {
    return strapiImages.map(img => {
      const url = img.url
      return url.startsWith('http') ? url : `${config.public.strapiUrl}${url}`
    })
  }
  return fallbackImages
})
</script>

<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
    <Slide v-for="image,index in images" :key="index">
      <!-- <img :src="image.url" alt="Gallery Image" class="gallery-image" /> -->
       <NuxtImg :src="image" alt="Gallery Image" class="gallery-image" />
    </Slide>
  </Carousel>

  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
    <Slide v-for="image,index in images" :key="index">
      <template #default="{ currentIndex, isActive }">
        <div
          :class="['thumbnail', { 'is-active': isActive }]"
          @click="slideTo(currentIndex)"
        >
          <img :src="image" alt="Thumbnail Image" class="thumbnail-image" />
        </div>
      </template>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-image {
  border-radius: 16px;
}
@media (min-width: 768px) and (max-width: 1023px) {
  #gallery {
    height: 450px;
  }
  #thumbnails {
    height: 100px;
  }
}
@media (min-width: 1024px) {
  #gallery {
    height: 600px;
  }
}
#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}

@media (min-width: 1024px) {
  #thumbnails {
    height: 120px;
  }

  .thumbnail-image {
    border-radius: 8px;
  }
}
</style>
