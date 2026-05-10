<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Total Invitados -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UsersIcon class="h-6 w-6 text-gray-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Total Invitados</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ stats.totalGuests }}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmados -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-6 w-6 text-green-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Confirmados</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-green-600">{{ stats.confirmed }}</div>
                <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {{ stats.confirmationRate }}%
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Pendientes -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <ClockIcon class="h-6 w-6 text-red-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Pendientes</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-red-600">{{ stats.pending }}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Lado Novio -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UserIcon class="h-6 w-6 text-blue-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Lado Novio</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ stats.sideNovio }}</div>
                <div class="ml-2 text-sm text-gray-500">
                  ({{ stats.novioConfirmed }} confirmados)
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Lado Novia -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UserIcon class="h-6 w-6 text-pink-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Lado Novia</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ stats.sideNovia }}</div>
                <div class="ml-2 text-sm text-gray-500">
                  ({{ stats.noviaConfirmed }} confirmados)
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Acompañantes -->
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UserGroupIcon class="h-6 w-6 text-purple-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">Acompañantes</dt>
              <dd class="flex items-baseline">
                <div class="text-2xl font-semibold text-gray-900">{{ stats.totalCompanions }}</div>
                <div class="ml-2 text-sm text-gray-500">
                  ({{ stats.confirmedCompanions }} confirmados)
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline'

interface Stats {
  totalGuests: number
  confirmed: number
  pending: number
  sideNovio: number
  sideNovia: number
  totalCompanions: number
  confirmedCompanions: number
  confirmationRate: string
  novioConfirmed: number
  noviaConfirmed: number
}

defineProps<{
  stats: Stats
}>()
</script>
