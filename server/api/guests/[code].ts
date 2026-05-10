import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  const code = event.context.params?.code

  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Se requiere el código del invitado'
    })
  }

  const guest = await prisma.guest.findUnique({
    where: { code },
    include: {
      companions: {
        select: {
          id: true,
          name: true,
          confirmed: true
        }
      }
    }
  })

  if (!guest) {
    throw createError({
      statusCode: 404,
      message: 'Invitado no encontrado'
    })
  }

  return guest
})
