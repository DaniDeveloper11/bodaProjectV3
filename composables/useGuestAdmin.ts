// /composables/useGuestAdmin.ts
import { ref, computed } from 'vue'

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
  createdAt: string
  updatedAt?: string | null
}

export const useGuestAdmin = () => {
  const guests = ref<Guest[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Filtros
  const searchTerm = ref('')
  const statusFilter = ref<'all' | 'confirmed' | 'pending'>('all')
  const sideFilter = ref<'all' | 'NOVIO' | 'NOVIA'>('all')

  // Fetch guests from API
  const fetchGuests = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Guest[]>('/api/guests/listGuests')
      guests.value = data || []
    } catch (err) {
      error.value = 'Error al conectar con el servidor'
      guests.value = []
    } finally {
      loading.value = false
    }
  }

  // Estadísticas computadas
  const stats = computed(() => {
    const totalGuests = guests.value.length
    const confirmed = guests.value.filter(g => g.confirmed).length
    const pending = totalGuests - confirmed
    const sideNovio = guests.value.filter(g => g.side === 'NOVIO').length
    const sideNovia = guests.value.filter(g => g.side === 'NOVIA').length
    const totalCompanions = guests.value.reduce((acc, g) => acc + g.companions.length, 0)
    const confirmedCompanions = guests.value.reduce((acc, g) => 
      acc + g.companions.filter(c => c.confirmed).length, 0
    )
    
    const novioConfirmed = guests.value.filter(g => g.side === 'NOVIO' && g.confirmed).length
    const noviaConfirmed = guests.value.filter(g => g.side === 'NOVIA' && g.confirmed).length
    
    return {
      totalGuests,
      confirmed,
      pending,
      sideNovio,
      sideNovia,
      totalCompanions,
      confirmedCompanions,
      confirmationRate: totalGuests > 0 ? ((confirmed / totalGuests) * 100).toFixed(1) : '0',
      novioConfirmed,
      noviaConfirmed
    }
  })

  // Invitados filtrados
  const filteredGuests = computed(() => {
    let result = guests.value

    // Filtro por búsqueda
    if (searchTerm.value) {
      const search = searchTerm.value.toLowerCase()
      result = result.filter(g => 
        g.code.toLowerCase().includes(search) ||
        g.fullName.toLowerCase().includes(search)
      )
    }

    // Filtro por estado
    if (statusFilter.value === 'confirmed') {
      result = result.filter(g => g.confirmed)
    } else if (statusFilter.value === 'pending') {
      result = result.filter(g => !g.confirmed)
    }

    // Filtro por lado
    if (sideFilter.value !== 'all') {
      result = result.filter(g => g.side === sideFilter.value)
    }

    return result
  })

  // Exportar a CSV
  const exportToCSV = () => {
    const data = filteredGuests.value
    
    if (data.length === 0) {
      alert('No hay datos para exportar')
      return
    }

    // Headers del CSV
    const headers = [
      'Código',
      'Nombre Completo',
      'Lado',
      'Confirmado',
      'Notas',
      'Acompañantes',
      'Acompañantes Confirmados',
      'Nombres Acompañantes'
    ]

    // Construir filas del CSV
    const rows = data.map(guest => {
      const companionNames = guest.companions.map(c => c.name).join('; ')
      const confirmedCompanions = guest.companions.filter(c => c.confirmed).length
      
      return [
        guest.code,
        guest.fullName,
        guest.side,
        guest.confirmed ? 'Sí' : 'No',
        guest.notes ? `"${guest.notes.replace(/"/g, '""')}"` : '',
        guest.companions.length,
        confirmedCompanions,
        companionNames ? `"${companionNames}"` : ''
      ]
    })

    // Unir todo en formato CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    // Crear BOM para UTF-8 (para que Excel lo abra correctamente)
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    
    // Crear enlace de descarga
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    const date = new Date().toISOString().split('T')[0]
    
    link.setAttribute('href', url)
    link.setAttribute('download', `confirmaciones-boda-${date}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
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
  }
}
