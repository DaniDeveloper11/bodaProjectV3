<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <!-- Doughnut Chart: Confirmados vs Pendientes -->
    <div class="bg-white overflow-hidden shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Estado de Confirmación</h3>
      <div class="relative h-64">
        <Doughnut :data="confirmationData" :options="doughnutOptions" />
      </div>
    </div>

    <!-- Bar Chart: Por Lado -->
    <div class="bg-white overflow-hidden shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Confirmados por Lado</h3>
      <div class="relative h-64">
        <Bar :data="sideData" :options="barOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js'

// Registrar componentes de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

interface Stats {
  confirmed: number
  pending: number
  novioConfirmed: number
  noviaConfirmed: number
  sideNovio: number
  sideNovia: number
}

const props = defineProps<{
  stats: Stats
}>()

// Datos para gráfico de dona (Confirmados vs Pendientes)
const confirmationData = computed(() => ({
  labels: ['Confirmados', 'Pendientes'],
  datasets: [
    {
      data: [props.stats.confirmed, props.stats.pending],
      backgroundColor: ['#10B981', '#EF4444'],
      hoverBackgroundColor: ['#059669', '#DC2626'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }
  ]
}))

// Opciones para gráfico de dona
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = props.stats.confirmed + props.stats.pending
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  }
}

// Datos para gráfico de barras (Por lado)
const sideData = computed(() => ({
  labels: ['Lado Novio', 'Lado Novia'],
  datasets: [
    {
      label: 'Confirmados',
      data: [props.stats.novioConfirmed, props.stats.noviaConfirmed],
      backgroundColor: '#3B82F6',
      borderColor: '#2563EB',
      borderWidth: 1
    },
    {
      label: 'Pendientes',
      data: [
        props.stats.sideNovio - props.stats.novioConfirmed,
        props.stats.sideNovia - props.stats.noviaConfirmed
      ],
      backgroundColor: '#F59E0B',
      borderColor: '#D97706',
      borderWidth: 1
    }
  ]
}))

// Opciones para gráfico de barras
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false
    }
  },
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false
      }
    },
    y: {
      stacked: false,
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>
