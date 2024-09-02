<template>
  <div class="flex flex-col w-full">
    <span
      class="font-bold text-gray-400 uppercase select-none"
      :title="title"
      @click.stop.prevent="handleCopy(title)"
    >
      {{ title }}
    </span>

    <span
      class="font-medium text-gray-700 text-ellipsis whitespace-nowrap overflow-x-hidden"
      :title="description"
      @click.stop.prevent="handleCopy(description)"
    >
      {{ description }}
    </span>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup () {
    const toast = useToast()

    async function handleCopy (value) {
      toast.clear()

      try {
        await navigator.clipboard.writeText(value)

        toast.success('Copiado!')
      } catch (error) {
        toast.error('Error ao copiar o texto')
      }
    }

    return {
      handleCopy
    }
  }
}
</script>
