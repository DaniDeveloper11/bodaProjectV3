<template>
  <button
    v-if="visible"
    title="Reiniciar tour"
    class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-xl font-bold hover:bg-orange-400 hover:scale-110 transition-all duration-200"
    @click="startTour"
  >
    ?
  </button>
</template>

<script setup lang="ts">
const { startTour, hasSeenTour } = useTour()

const visible = ref(false)

onMounted(() => {
  visible.value = hasSeenTour()
})

// Expose method so app.vue can update visibility after tour completes
const show = () => { visible.value = true }
defineExpose({ show })
</script>
