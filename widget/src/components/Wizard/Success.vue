<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <Icon name="Check" :color="palette.success" size="70" />

    <p class="text-xl font-black text-center w-full mt-2">Obrigado! Recebemos o seu feedback.</p>

    <div class="flex justify-center items-center w-full mt-2">
      <button
        class="rounded-full font-normal text-sm flex flex-col justify-center bg-brand-gray items-center py-2 px-5 cursor-pointer focus:outline-none"
        @click="handleGoBack"
      >
        Envie mais feedbacks
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Icon from '@/components/Icon/index.vue'

import { resetStore } from '@/store'

import palette from '../../../palette'

interface SetupReturn {
  handleGoBack: () => void
  palette: Record<string, string>
}

export default defineComponent({
  components: {
    Icon
  },
  emits: ['select-feedback-type', 'next'],
  setup(): SetupReturn {
    function handleGoBack(): void {
      resetStore()
    }

    return {
      handleGoBack,
      palette: palette.brand
    }
  }
})
</script>
