// /stores/guest.ts
import { defineStore } from 'pinia'

interface Companion {
  id: number
  name: string
  confirmed: boolean
}

interface Guest {
  id: number
  code: string
  fullName: string
  confirmed: boolean
  notes?: string
  side: 'NOVIO' | 'NOVIA'
  companions: Companion[]
}

type GuestResponse = 
Pick<Guest, 'code' | 'confirmed' | 'notes' | 'side'> 

export const useGuestStore = defineStore('guest', {
  state: () => ({
    guest: null as Guest | null,
    loading: false,
    error: null as string | null
  }),
 persist: true,
  actions: {
    async fetchGuestByCode(code: string) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useFetch<Guest>(`/api/guests/${code}`)

        if (error.value) {
          this.error = 'Invitado no encontrado'
          this.guest = null
        } else {
          this.guest = data.value
        }
      } catch (err) {
        this.error = 'Error al conectar con el servidor'
        this.guest = null
      } finally {
        this.loading = false
      }
    },
    async confirmGuest(data:Guest){
      this.loading = true
      this.error = null
      try{
        const { error } = await useFetch<GuestResponse>('/api/guests/confirm', {
          method: 'POST',
          body: data
        })
        if (error.value) {
          this.error = 'Error al confirmar el invitado'
        } else {
          this.guest = { ...this.guest, ...data }
        }
      }
      catch (err) {
        this.error = 'Error al conectar con el servidor'
      } finally {
        this.loading = false
      }
    },

    clearGuest() {
      this.guest = null
      this.error = null
    }
  }
})
