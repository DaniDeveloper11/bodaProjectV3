<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Buscador -->
      <div class="sm:col-span-2">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          Buscar
        </label>
        <div class="relative rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search"
            v-model="localSearchTerm"
            type="text"
            class="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Buscar por código o nombre..."
          />
        </div>
      </div>

      <!-- Filtro por estado -->
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
          Estado
        </label>
        <select
          id="status"
          v-model="localStatusFilter"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="all">Todos</option>
          <option value="confirmed">Confirmados</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      <!-- Filtro por lado -->
      <div>
        <label for="side" class="block text-sm font-medium text-gray-700 mb-2">
          Lado
        </label>
        <select
          id="side"
          v-model="localSideFilter"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="all">Todos</option>
          <option value="NOVIO">Novio</option>
          <option value="NOVIA">Novia</option>
        </select>
      </div>
    </div>

    <!-- Estadísticas de filtros y botón de exportación -->
    <div class="mt-4 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Mostrando <span class="font-medium">{{ filteredCount }}</span> de 
        <span class="font-medium">{{ totalCount }}</span> invitados
      </div>
      
      <button
        @click="$emit('export')"
        type="button"
        class="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <ArrowDownTrayIcon class="-ml-0.5 h-5 w-5" />
        Exportar CSV
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  searchTerm: string
  statusFilter: 'all' | 'confirmed' | 'pending'
  sideFilter: 'all' | 'NOVIO' | 'NOVIA'
  filteredCount: number
  totalCount: number
}>()

const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:statusFilter': [value: 'all' | 'confirmed' | 'pending']
  'update:sideFilter': [value: 'all' | 'NOVIO' | 'NOVIA']
  'export': []
}>()

// Variables locales para v-model
const localSearchTerm = ref(props.searchTerm)
const localStatusFilter = ref(props.statusFilter)
const localSideFilter = ref(props.sideFilter)

// Watchers para emitir cambios (con debounce para búsqueda)
let searchTimeout: NodeJS.Timeout | null = null
watch(localSearchTerm, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emit('update:searchTerm', newValue)
  }, 300)
})

watch(localStatusFilter, (newValue) => {
  emit('update:statusFilter', newValue)
})

watch(localSideFilter, (newValue) => {
  emit('update:sideFilter', newValue)
})
</script>
