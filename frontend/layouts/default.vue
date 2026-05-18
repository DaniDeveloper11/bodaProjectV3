<template>
  <div>
    <main class="flex mx-auto lg:mx-0 2xl:mx-40 max-w-8xl px-4 sm:px-6 lg:px-8">
      <div class="flex-1 min-w-0 overflow-hidden">
        <slot />

        <button v-if="showButton" @click="scrollToTop"
          class="fixed bottom-6 right-6 z-50 bg-brand-sage/90 text-white w-11 h-11 rounded-full shadow-xl hover:bg-brand-sage transition-all duration-300 backdrop-blur-sm flex items-center justify-center text-lg font-semibold">
          ↑
        </button>

      </div>
    </main>
  <footer class="border-t border-gray-200 dark:border-white/10 mt-8">
    <div class="mx-auto max-w-7xl px-6 py-8 flex items-center justify-center lg:px-8">
      <p class="text-center text-sm text-gray-500 dark:text-gray-400 font-poppins">&copy; 2026 Realizado por el Novio.</p>
    </div>
  </footer>

  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showButton.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>
<style>
html {
  scroll-behavior: smooth;
}
</style>
