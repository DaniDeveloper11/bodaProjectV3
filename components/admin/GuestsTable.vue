<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lado
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acompañantes
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notas
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Expandir</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-for="guest in paginatedGuests" :key="guest.id">
            <!-- Fila principal del invitado -->
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ guest.code }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ guest.fullName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    guest.side === 'NOVIO' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                  ]"
                >
                  {{ guest.side }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    guest.confirmed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ guest.confirmed ? 'Confirmado' : 'Pendiente' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center">
                  <UserGroupIcon class="h-4 w-4 text-gray-400 mr-1" />
                  {{ guest.companions.length }}
                  <span v-if="guest.companions.length > 0" class="ml-1 text-gray-400">
                    ({{ guest.companions.filter(c => c.confirmed).length }} confirmados)
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {{ guest.notes || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  v-if="guest.companions.length > 0"
                  @click="toggleExpanded(guest.id)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  <ChevronDownIcon
                    :class="[
                      'h-5 w-5 transition-transform',
                      expandedRows.has(guest.id) ? 'rotate-180' : ''
                    ]"
                  />
                </button>
              </td>
            </tr>

            <!-- Fila expandible con acompañantes -->
            <tr v-if="expandedRows.has(guest.id) && guest.companions.length > 0" class="bg-gray-50">
              <td colspan="7" class="px-6 py-4">
                <div class="ml-8">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Acompañantes:</h4>
                  <ul class="space-y-1">
                    <li
                      v-for="companion in guest.companions"
                      :key="companion.id"
                      class="flex items-center text-sm text-gray-700"
                    >
                      <span
                        :class="[
                          'inline-flex h-2 w-2 rounded-full mr-2',
                          companion.confirmed ? 'bg-green-500' : 'bg-red-500'
                        ]"
                      ></span>
                      {{ companion.name }}
                      <span class="ml-2 text-xs text-gray-500">
                        ({{ companion.confirmed ? 'Confirmado' : 'Pendiente' }})
                      </span>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Mostrando
            <span class="font-medium">{{ startIndex + 1 }}</span>
            a
            <span class="font-medium">{{ Math.min(endIndex, guests.length) }}</span>
            de
            <span class="font-medium">{{ guests.length }}</span>
            resultados
          </p>
        </div>
        <div class="flex items-center gap-4">
          <select
            v-model="perPage"
            class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          >
            <option :value="10">10 por página</option>
            <option :value="25">25 por página</option>
            <option :value="50">50 por página</option>
          </select>
          
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Anterior</span>
              <ChevronLeftIcon class="h-5 w-5" />
            </button>
            
            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page as number)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <span
                v-else
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
              >
                ...
              </span>
            </template>
            
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Siguiente</span>
              <ChevronRightIcon class="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { UserGroupIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

interface Companion {
  id: number
  name: string
  confirmed: boolean
  guestId: number
}

interface Guest {
  id: number
  code: string
  fullName: string
  confirmed: boolean
  notes?: string | null
  side: 'NOVIO' | 'NOVIA'
  companions: Companion[]
}

const props = defineProps<{
  guests: Guest[]
}>()

// Estado de filas expandidas
const expandedRows = ref(new Set<number>())

const toggleExpanded = (guestId: number) => {
  if (expandedRows.value.has(guestId)) {
    expandedRows.value.delete(guestId)
  } else {
    expandedRows.value.add(guestId)
  }
}

// Paginación
const currentPage = ref(1)
const perPage = ref(10)

const totalPages = computed(() => Math.ceil(props.guests.length / perPage.value))
const startIndex = computed(() => (currentPage.value - 1) * perPage.value)
const endIndex = computed(() => startIndex.value + perPage.value)

const paginatedGuests = computed(() => {
  return props.guests.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    pages.push(total)
  }
  
  return pages
})

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Reset page cuando cambian los filtros
watch(() => props.guests.length, () => {
  currentPage.value = 1
})
</script>
