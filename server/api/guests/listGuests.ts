import { prisma } from '~/server/prisma'

export default defineEventHandler(async () => {
  return await prisma.guest.findMany({
    include: {
      companions: true
    },
    orderBy: {
      fullName: 'asc'
    }
  })
})
