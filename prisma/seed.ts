import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar datos existentes
  await prisma.companion.deleteMany()
  await prisma.guest.deleteMany()

  // Invitados del lado del NOVIO
  const guest1 = await prisma.guest.create({
    data: {
      code: 'JUAN2024',
      fullName: 'Juan Pérez García',
      confirmed: true,
      notes: 'Prefiere comida vegetariana',
      side: 'NOVIO',
      companions: {
        create: [
          { name: 'María Pérez', confirmed: true },
          { name: 'Pedro Pérez Jr.', confirmed: true }
        ]
      }
    }
  })

  const guest2 = await prisma.guest.create({
    data: {
      code: 'CARLOS2024',
      fullName: 'Carlos Rodríguez López',
      confirmed: false,
      side: 'NOVIO',
      companions: {
        create: [
          { name: 'Ana Rodríguez', confirmed: false }
        ]
      }
    }
  })

  const guest3 = await prisma.guest.create({
    data: {
      code: 'DIEGO2024',
      fullName: 'Diego Martínez Sánchez',
      confirmed: true,
      notes: 'Llegará un poco tarde',
      side: 'NOVIO'
    }
  })

  const guest4 = await prisma.guest.create({
    data: {
      code: 'ROBERTO2024',
      fullName: 'Roberto Gómez Hernández',
      confirmed: false,
      side: 'NOVIO'
    }
  })

  // Invitados del lado de la NOVIA
  const guest5 = await prisma.guest.create({
    data: {
      code: 'LUCIA2024',
      fullName: 'Lucía Fernández Torres',
      confirmed: true,
      notes: 'Necesita silla para bebé',
      side: 'NOVIA',
      companions: {
        create: [
          { name: 'Jorge Fernández', confirmed: true },
          { name: 'Sofía Fernández', confirmed: true }
        ]
      }
    }
  })

  const guest6 = await prisma.guest.create({
    data: {
      code: 'CARMEN2024',
      fullName: 'Carmen Ruiz Morales',
      confirmed: true,
      side: 'NOVIA',
      companions: {
        create: [
          { name: 'Miguel Ruiz', confirmed: false }
        ]
      }
    }
  })

  const guest7 = await prisma.guest.create({
    data: {
      code: 'ELENA2024',
      fullName: 'Elena Jiménez Castro',
      confirmed: false,
      side: 'NOVIA'
    }
  })

  const guest8 = await prisma.guest.create({
    data: {
      code: 'ISABEL2024',
      fullName: 'Isabel Ramírez Ortiz',
      confirmed: true,
      notes: 'Alergias: mariscos',
      side: 'NOVIA',
      companions: {
        create: [
          { name: 'Francisco Ramírez', confirmed: true }
        ]
      }
    }
  })

  console.log('✅ Seed completado exitosamente!')
  console.log(`   📊 Se crearon ${await prisma.guest.count()} invitados`)
  console.log(`   👥 Se crearon ${await prisma.companion.count()} acompañantes`)
  console.log('')
  console.log('📝 Códigos de invitados creados:')
  console.log('   NOVIO: JUAN2024, CARLOS2024, DIEGO2024, ROBERTO2024')
  console.log('   NOVIA: LUCIA2024, CARMEN2024, ELENA2024, ISABEL2024')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
