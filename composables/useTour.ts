import { driver } from 'driver.js'
import type { DriveStep } from 'driver.js'

const TOUR_SEEN_KEY = 'boda_tour_seen'

export const useTour = () => {
  const hasSeenTour = (): boolean => {
    if (import.meta.server) return true
    return localStorage.getItem(TOUR_SEEN_KEY) === 'true'
  }

  const markTourSeen = (): void => {
    if (import.meta.client) {
      localStorage.setItem(TOUR_SEEN_KEY, 'true')
    }
  }

  const steps: DriveStep[] = [
    {
      element: '#hero',
      popover: {
        title: 'Bienvenidos',
        description: 'Bienvenidos a nuestra invitación virtual. Aquí encontrarás toda la información de nuestra boda.',
      },
    },
    {
      element: '#our-parents',
      popover: {
        title: 'Con la bendición',
        description: 'Con la bendición de nuestros padres comenzamos esta nueva etapa.',
      },
    },
    {
      element: '#promise',
      popover: {
        title: 'Nuestra historia',
        description: 'Una promesa para toda la vida. Aquí te contamos cómo comenzó todo.',
      },
    },
    {
      element: '#carousel',
      popover: {
        title: 'Nuestros momentos',
        description: 'Algunos de los momentos más especiales que hemos compartido juntos.',
      },
    },
    {
      element: '#save-date',
      popover: {
        title: 'Guarda la fecha',
        description: '¡Guarda la fecha! Falta poco para el gran día.',
      },
    },
    {
      element: '#ubicacion',
      popover: {
        title: 'Ubicación',
        description: 'Aquí será la misa y celebracion. Podrás ver el mapa y las indicaciones.',
      },
    },
    {
      element: '#fecha',
      popover: {
        title: 'Itinerario',
        description: 'El itinerario del gran día para que no te pierdas ningún momento.',
      },
    },
    {
      element: '#informacion',
      popover: {
        title: 'Contáctanos',
        description: 'Si tienes alguna duda, aquí encontrarás la información de contacto de los novios.',
      },
    },
    {
      element: '#dressCode',
      popover: {
        title: 'Código de vestimenta',
        description: 'Checa el código de vestimenta para el evento.',
      },
    },
    {
      element: '#mesa-regalos',
      popover: {
        title: 'Mesa de regalos',
        description: 'Si deseas contribuir con un regalo, aquí encontrarás las opciones.',
      },
    },
    {
      element: '#confirmacion',
      popover: {
        title: 'Confirma tu asistencia',
        description: 'Ingresa el código que viene en tu invitación para confirmar tu asistencia.',
      },
    },
  ]

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: '¡Listo!',
      progressText: '{{current}} de {{total}}',
      animate: true,
      smoothScroll: true,
      popoverClass: 'tour-popover',
      onDestroyed: () => {
        markTourSeen()
      },
      steps,
    })
    driverObj.drive()
  }

  return { startTour, hasSeenTour, markTourSeen }
}
