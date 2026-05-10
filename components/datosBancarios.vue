<template>
<div class="max-w-md mx-auto mt-8">
    <div class="overflow-hidden rounded-2xl bg-white dark:bg-white/10 dark:backdrop-blur-sm border border-gray-100 dark:border-white/20 shadow-xl dark:shadow-black/30">
        <div class="px-6 py-6 sm:p-8 flex flex-col gap-4">
            <p class="text-gray-800 dark:text-white"><strong class="text-brand-sage dark:text-brand-gold">Banco:</strong> {{ bankName }}</p>
            <p class="text-gray-800 dark:text-white"><strong class="text-brand-sage dark:text-brand-gold">Titular:</strong> {{ accountHolder }}</p>
            <p class="text-gray-800 dark:text-white"><strong class="text-brand-sage dark:text-brand-gold">Concepto:</strong> "Regalo de bodas"</p>
            <p class="flex items-center gap-3 text-gray-800 dark:text-white">
                <strong class="text-brand-sage dark:text-brand-gold">Cuenta:</strong>
                <span class="font-mono text-sm bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-gray-900 dark:text-white">{{ accountNumber }}</span>
                <button @click="copyToClipboard(accountNumber)"
                    class="text-brand-sage hover:text-brand-sage/70 dark:text-brand-gold dark:hover:text-brand-gold/70 text-sm font-semibold transition">
                    Copiar
                </button>
            </p>
            <p v-if="copied" class="text-green-500 text-sm text-center font-medium">¡Número copiado!</p>
        </div>
    </div>
</div>

</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    bankName: { type: String, required: true },
    accountHolder: { type: String, required: true },
    accountNumber: { type: String, required: true },
})

const copied = ref(false)

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        copied.value = true
        setTimeout(() => (copied.value = false), 2000)
    })
}
</script>
