interface Acompanante {
  nombre?: string | null
}

interface DatosInvitado {
  yaConfirmado: boolean
  nombre: string
  acompanantesMaximos?: number
  acompanantes?: Acompanante[]
}

export const useRsvp = () => {
  const config = useRuntimeConfig()
  const base = config.public.strapiUrl

  const cargando = ref(false)
  const error = ref<string | null>(null)
  const datosInvitado = ref<DatosInvitado | null>(null)
  const confirmacionExitosa = ref(false)
  const mensajeExito = ref('')

  const validarCodigo = async (codigo: string) => {
    cargando.value = true
    error.value = null
    datosInvitado.value = null
    try {
      const res = await $fetch<{ data: DatosInvitado }>(
        `${base}/api/invitados/validar/${codigo.trim().toUpperCase()}`
      )
      datosInvitado.value = res.data
      return true
    } catch (err: any) {
      error.value = err?.data?.error?.message ?? 'Código no encontrado.'
      return false
    } finally {
      cargando.value = false
    }
  }

  const confirmarAsistencia = async (codigo: string, acompanantes: Acompanante[]) => {
    cargando.value = true
    error.value = null
    try {
      const res = await $fetch<{ data: { mensaje: string } }>(
        `${base}/api/invitados/confirmar`,
        {
          method: 'POST',
          body: { codigo: codigo.trim().toUpperCase(), acompanantes }
        }
      )
      confirmacionExitosa.value = true
      mensajeExito.value = res.data.mensaje
      return true
    } catch (err: any) {
      error.value = err?.data?.error?.message ?? 'Error al confirmar. Intenta de nuevo.'
      return false
    } finally {
      cargando.value = false
    }
  }

  const reiniciar = () => {
    cargando.value = false
    error.value = null
    datosInvitado.value = null
    confirmacionExitosa.value = false
    mensajeExito.value = ''
  }

  return {
    cargando,
    error,
    datosInvitado,
    confirmacionExitosa,
    mensajeExito,
    validarCodigo,
    confirmarAsistencia,
    reiniciar
  }
}
