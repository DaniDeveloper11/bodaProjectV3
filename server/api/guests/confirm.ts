import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { code, confirmed, notes, companions } = body

  if (!code || typeof confirmed !== 'boolean') {
    throw createError({ statusCode: 400, message: 'Datos inválidos' })
  }

  const guest = await prisma.guest.findUnique({ where: { code } })

  if (!guest) {
    throw createError({ statusCode: 404, message: 'Invitado no encontrado' })
  }

  // Actualizar invitado
  await prisma.guest.update({
    where: { code },
    data: {
      confirmed,
      notes: notes || undefined,
    },
  })

  // Actualizar acompañantes
  if (Array.isArray(companions)) {
    for (const companion of companions) {
      await prisma.companion.update({
        where: { id: companion.id },
        data: { confirmed: !!companion.confirmed },
      })
    }
  }

  return { message: 'Confirmación guardada con éxito' }
})
