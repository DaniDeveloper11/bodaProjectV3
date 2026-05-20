<template>
    <div class="my-20 max-w-6xl mx-auto">
        <div class="w-full flex justify-end -mb-28 -mr-20">
            <NuxtImg src="flowerCorner.webp" class="-scale-y-100 size-40"></NuxtImg>
        </div>

        <div class="flex flex-col justify-center my-10">
            <h2 class="text-2xl font-dancing text-gray-800 mb-4 md:text-4xl dark:text-white">
                Confirme su asistencia
            </h2>

            <div class="flex flex-col w-full gap-6 mx-auto max-w-2xl">

                <!-- ===================== -->
                <!-- ESTADO C: ÉXITO       -->
                <!-- ===================== -->
                <div v-if="confirmacionExitosa || datosInvitado?.yaConfirmado"
                    class="text-center py-10 flex flex-col items-center gap-4">
                    <div class="text-5xl">🎉</div>
                    <p class="text-xl font-semibold text-gray-800 dark:text-white">
                        {{ mensajeExito || `¡${datosInvitado?.nombre}, tu asistencia ya fue confirmada!` }}
                    </p>

                    <!-- Lista de acompañantes confirmados (si ya estaba confirmado previamente) -->
                    <div v-if="datosInvitado?.yaConfirmado && datosInvitado.acompanantes?.length"
                        class="w-full text-left rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 px-5 py-4 mt-2">
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Acompañantes registrados:
                        </p>
                        <ul class="space-y-1">
                            <li v-for="(a, i) in datosInvitado.acompanantes" :key="i"
                                class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <span class="text-orange-400">•</span>
                                {{ a.nombre || 'Sin nombre' }}
                            </li>
                        </ul>
                    </div>

                    <p class="text-sm text-gray-500 dark:text-gray-300">
                        Nos alegra mucho contar contigo en este día tan especial.
                    </p>
                    <button v-if="datosInvitado?.yaConfirmado" @click="handleReiniciar"
                        class="mt-2 text-sm text-orange-500 underline hover:text-orange-700 transition">
                        Consultar otro código
                    </button>
                </div>

                <!-- =============================== -->
                <!-- ESTADO A: INGRESO DEL CÓDIGO    -->
                <!-- =============================== -->
                <template v-else-if="!datosInvitado">
                    <div>
                        <label for="code"
                            class="block text-sm/6 font-medium text-gray-900 dark:text-white">
                            Código de invitación
                        </label>
                        <div class="mt-2">
                            <input type="text" name="code" id="code"
                                v-model="codigo"
                                @input="codigo = codigo.toUpperCase()"
                                @keyup.enter="handleValidar"
                                :disabled="cargando"
                                class="block w-full h-14 text-center rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:opacity-50"
                                placeholder="ABXY2025"
                                style="text-transform: uppercase;" />
                        </div>
                        <p class="mt-2 text-sm text-gray-500 dark:text-white">
                            Código proporcionado en su invitación.
                        </p>
                    </div>

                    <div v-if="error"
                        class="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {{ error }}
                    </div>

                    <button @click="handleValidar"
                        :disabled="cargando || !codigo.trim()"
                        class="relative flex gap-4 justify-center bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        <NuxtImg class="size-11 absolute top-0 left-0" src="diseno-floral.webp"></NuxtImg>
                        <div class="flex flex-col items-center justify-center">
                            <span class="text-lg">{{ cargando ? 'Buscando...' : 'Buscar invitación' }}</span>
                        </div>
                    </button>
                </template>

                <!-- ======================================= -->
                <!-- ESTADO B: SELECCIÓN DE ACOMPAÑANTES    -->
                <!-- ======================================= -->
                <template v-else>
                    <!-- Nombre del invitado -->
                    <div class="rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 px-5 py-4">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Invitación encontrada para:</p>
                        <p class="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                            {{ datosInvitado.nombre }}
                        </p>
                    </div>

                    <!-- Lista de acompañantes -->
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <label class="block text-sm/6 font-medium text-gray-900 dark:text-white">
                                Acompañantes
                            </label>
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                {{ listaAcompanantes.length }} / {{ datosInvitado.acompanantesMaximos }}
                            </span>
                        </div>

                        <p v-if="datosInvitado.acompanantesMaximos === 0"
                            class="text-sm text-gray-500 dark:text-gray-400 italic">
                            Esta invitación no incluye acompañantes.
                        </p>

                        <template v-else>
                            <div v-if="listaAcompanantes.length === 0"
                                class="text-sm text-gray-400 dark:text-gray-500 italic mb-3">
                                Sin acompañantes — solo tú.
                            </div>

                            <ul class="space-y-2 mb-3">
                                <li v-for="(a, i) in listaAcompanantes" :key="i"
                                    class="flex items-center gap-2">
                                    <input type="text"
                                        v-model="listaAcompanantes[i].nombre"
                                        :placeholder="`Acompañante ${i + 1} (opcional)`"
                                        class="flex-1 h-10 rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                                    <button @click="eliminarAcompanante(i)"
                                        class="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition text-sm font-bold flex-shrink-0">
                                        ✕
                                    </button>
                                </li>
                            </ul>

                            <button @click="agregarAcompanante"
                                :disabled="listaAcompanantes.length >= (datosInvitado.acompanantesMaximos ?? 0)"
                                class="w-full py-2 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 hover:border-orange-400 hover:text-orange-500 transition disabled:opacity-40 disabled:cursor-not-allowed">
                                + Agregar acompañante
                            </button>
                        </template>
                    </div>

                    <div v-if="error"
                        class="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {{ error }}
                    </div>

                    <div class="flex flex-col gap-3">
                        <button @click="handleConfirmar"
                            :disabled="cargando"
                            class="relative flex gap-4 justify-center bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-orange-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            <NuxtImg class="size-11 absolute top-0 left-0" src="diseno-floral.webp"></NuxtImg>
                            <div class="flex flex-col items-center justify-center">
                                <span class="text-lg">{{ cargando ? 'Confirmando...' : 'Confirmar Asistencia' }}</span>
                            </div>
                        </button>

                        <button @click="handleReiniciar" :disabled="cargando"
                            class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline text-center transition">
                            Ingresar otro código
                        </button>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const codigo = ref('')
const listaAcompanantes = ref([])

const {
  cargando,
  error,
  datosInvitado,
  confirmacionExitosa,
  mensajeExito,
  validarCodigo,
  confirmarAsistencia,
  reiniciar
} = useRsvp()

const handleValidar = async () => {
  if (!codigo.value.trim()) return
  const exito = await validarCodigo(codigo.value)
  if (exito && datosInvitado.value) {
    // Pre-cargar acompañantes si el organizador ya los definió en el admin
    listaAcompanantes.value = (datosInvitado.value.acompanantes ?? []).map(a => ({
      nombre: a.nombre ?? ''
    }))
  }
}

const handleConfirmar = async () => {
  await confirmarAsistencia(codigo.value, listaAcompanantes.value)
}

const handleReiniciar = () => {
  codigo.value = ''
  listaAcompanantes.value = []
  reiniciar()
}

const agregarAcompanante = () => {
  const max = datosInvitado.value?.acompanantesMaximos ?? 0
  if (listaAcompanantes.value.length < max) {
    listaAcompanantes.value.push({ nombre: '' })
  }
}

const eliminarAcompanante = (index) => {
  listaAcompanantes.value.splice(index, 1)
}
</script>

<style>
.nuxt-icon svg {
    width: 1.8em;
    height: 1.8em;
    margin-bottom: 0.125em;
    vertical-align: middle;
    color: white;
}
</style>
