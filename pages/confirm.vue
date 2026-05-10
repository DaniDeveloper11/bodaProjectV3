<template>
    <div class="flex flex-col  px-4 gap-4 my-10 w-screen dark:text-white">
        <div class="flex justify-end -mb-20">
            <NuxtImg src="flowerCorner.webp" class="-scale-y-100 size-40"></NuxtImg>
        </div>

        <h1 class="text-3xl font-dancing mb-4 dark:text-white">Confirma tu Asistencia</h1>
        <p v-if="isFamily" class="text-md mb-6 mx-auto text-center text-xs px-3">
            ✨ "Nos emociona compartir este momento tan especial con las personas que más queremos. Para ayudarnos a
            planear este día tan importante, por favor confirme su asistencia y la de su familia.
        </p>
        <p v-else class="text-md mb-6 mx-auto text-center text-xs px-3">
            ✨ "Nos emociona compartir este momento tan especial con las personas que más queremos. Para ayudarnos a
            planear este día tan importante, por favor confirme su asistencia y la de sus acompañantes.
        </p>
        <p></p>

        <!-- TABLE -->
        <div class="px-6 sm:px-6 lg:px-8 mx-auto">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 v-if="isFamily" class="text-lg font-lora text-gray-900">{{ guest.fullName }}</h1>
                    <p class="mt-2 text-sm text-gray-700 dark:text-white">Favor de confirmar antes del <span class="font-semibold"> 31
                            de Agosto del 2025</span></p>
                </div>
                <!-- <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add user</button>
      </div> -->
            </div>
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Nombre</th>

                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-if="!isFamily">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {{ guest.fullName }}</td>
                                        <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                            <Switch v-model="guest.confirmed"
                                                :class="[guest.confirmed ? 'bg-green-600' : 'bg-gray-400', 'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2']">
                                                <span class="sr-only">Use setting</span>
                                                <span aria-hidden="true"
                                                    :class="[guest.confirmed ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                                            </Switch>
                                            <p v-if="guest.confirmed" class=" text-xs font-thin text-green-500">
                                                confirmado</p>
                                        </td>

                                    </tr>
                                    <tr v-for="person in people" :key="person.email">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {{ person.name }}</td>

                                        <td class="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                                            <Switch v-model="person.confirmed"
                                                :class="[person.confirmed ? 'bg-green-600' : 'bg-gray-400', 'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2']">
                                                <span class="sr-only">Use setting</span>
                                                <span aria-hidden="true"
                                                    :class="[person.confirmed ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                                            </Switch>
                                            <p v-if="person.confirmed" class=" text-xs font-thin text-green-500">
                                                confirmado</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-6 mx-auto px-4 sm:px-20 w-full max-w-2xl">
            <button
                class="w-full relative bg-brand-sage text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-brand-sage/80 transition duration-300 text-center overflow-hidden"
                @click="confirmarAsistencia">
                <NuxtImg class="size-11 absolute bottom-0 right-0 -scale-y-100 -scale-x-100 pointer-events-none" src="diseno-floral-3.webp"></NuxtImg>
                Confirmar Asistencia
            </button>
        </div>

        <!-- Aviso adultos -->
        <div class="mt-8 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/60 dark:bg-red-950/20 px-5 py-4 max-w-lg">
            <p class="text-gray-700 dark:text-gray-200 text-base font-semibold">
                Celebración exclusiva para
                <span class="font-bold text-red-600 dark:text-red-400"> ADULTOS.</span>
            </p>
            <a class="text-xs text-brand-sage dark:text-brand-gold underline mt-1 inline-block" href="https://www.tiktok.com/@gabylajarochita.83/video/7316280366153633030?is_from_webapp=1&sender_device=pc&web_id=7516203306047784504">
                ¿Por qué? →
            </a>
        </div>

        <div class="mt-6">
            <p class="text-gray-600 dark:text-gray-300 text-sm">Para más información, contacta a los novios.</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm">¡Gracias por ser parte de nuestro día especial!</p>
        </div>

        <div class="flex justify-start mt-8">
            <button @click="navigateToHome"
                class="inline-flex items-center gap-2 bg-brand-sage/10 dark:bg-white/10 hover:bg-brand-sage/20 dark:hover:bg-white/20 text-brand-sage dark:text-white border border-brand-sage/30 dark:border-white/20 font-semibold py-2 px-5 rounded-xl shadow transition duration-300">
                <ArrowLeftIcon class="w-5 h-5" />
                <span>Atrás</span>
            </button>
        </div>
        <ModalConfirmAlert v-model="showModal" :title="'Confirmar Asistencia'"
            :message="'¿Estás seguro de que deseas confirmar?'" @confirm="handleConfirm"></ModalConfirmAlert>

    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useGuestStore } from '@/stores/guest'
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
import { Switch } from '@headlessui/vue'

import { ref, computed } from 'vue'
import ModalConfirmAlert from '~/components/modal/modalConfirmAlert.vue'
const router = useRouter()
const guestStore = useGuestStore()

const showModal = ref(false)
const guest = guestStore.guest
const isFamily = computed(() => guest.code.startsWith('FAM'));

const people = ref([]);

people.value.push(...guest.companions);


const navigateToHome = () => {
    router.push('/')
}

const confirmarAsistencia = async () => {
    showModal.value = true;
}
const handleConfirm = async () => {
    showModal.value = false;
    const payload = {
        code: guest.code,
        confirmed: isFamily.value ? true : guest.confirmed, // o usa un `ref` si el usuario debe marcarlo
        notes: guest.notes || '', // si usas campo de notas
        companions: people.value.map((c) => ({
            id: c.id,
            confirmed: c.confirmed ?? false
        }))
    }
     await guestStore.confirmGuest(payload);
    if (guestStore.error) {
        alert('Hubo un error al confirmar asistencia.')
    } else {
        alert('¡Confirmación enviada con éxito!')
        navigateToHome();
    }
}


</script>
