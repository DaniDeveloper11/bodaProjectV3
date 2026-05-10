<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              Panel de Administración
            </h1>
            <p class="mt-1 text-sm text-gray-500">
              Gestión de confirmaciones de boda
            </p>
          </div>
          <div class="mt-4 flex md:ml-4 md:mt-0">
            <NuxtLink
              to="/"
              class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ArrowLeftIcon class="h-5 w-5 mr-2" />
              Volver al sitio
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <XCircleIcon class="h-5 w-5 text-red-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error al cargar datos</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
            <div class="mt-4">
              <button
                @click="fetchGuests"
                type="button"
                class="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Loaded -->
      <div v-else class="space-y-8">
        <!-- Estadísticas -->
        <section>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Estadísticas Generales</h2>
          <AdminStatsCards :stats="stats" />
        </section>

        <!-- Gráficos -->
        <section>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Visualización de Datos</h2>
          <AdminConfirmationChart :stats="stats" />
        </section>

        <!-- Filtros -->
        <section>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Lista de Invitados</h2>
          <AdminTableFilters
            v-model:search-term="searchTerm"
            v-model:status-filter="statusFilter"
            v-model:side-filter="sideFilter"
            :filtered-count="filteredGuests.length"
            :total-count="guests.length"
            @export="exportToCSV"
          />
        </section>

        <!-- Tabla -->
        <section>
          <AdminGuestsTable :guests="filteredGuests" />
        </section>

        <!-- Empty State -->
        <div
          v-if="filteredGuests.length === 0 && guests.length > 0"
          class="text-center py-12 bg-white rounded-lg shadow"
        >
          <MagnifyingGlassIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-semibold text-gray-900">No se encontraron resultados</h3>
          <p class="mt-1 text-sm text-gray-500">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          Panel de administración de confirmaciones - Última actualización: {{ lastUpdate }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { ArrowLeftIcon, XCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

// Composable de administración
const {
  guests,
  loading,
  error,
  searchTerm,
  statusFilter,
  sideFilter,
  stats,
  filteredGuests,
  fetchGuests,
  exportToCSV
} = useGuestAdmin()

// Cargar datos al montar
onMounted(async () => {
  await fetchGuests()
})

// Última actualización
const lastUpdate = computed(() => {
  const now = new Date()
  return now.toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Configurar metadata de la página
useHead({
  title: 'Admin - Confirmaciones de Boda',
  meta: [
    {
      name: 'description',
      content: 'Panel de administración para gestionar confirmaciones de invitados'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>
