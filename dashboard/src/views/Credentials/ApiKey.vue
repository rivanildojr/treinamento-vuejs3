<template>
  <div
    class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2"
  >
    <span v-if="hasError">
      Erro ao carregar ao carregar a apikey
    </span>

    <span v-else-if="apiKey" id="apikey">
      {{ apiKey }}
    </span>

    <div
      v-if="!hasError"
      class="flex ml-20 mr-1"
    >
      <icon
        name="copy"
        :color="brandColors.graydark"
        size="24"
        class="cursor-pointer"
        @click="handleCopy"
      />

      <icon
        id="generate-apikey"
        name="loading"
        :color="brandColors.graydark"
        size="24"
        class="cursor-pointer ml-3"
        @click="handleGenerateApiKey"
      />
    </div>
  </div>
</template>

<script>

import Icon from '@/components/Icon'

import palette from '../../../palette'

export default {
  name: 'apiKey-component',
  components: {
    Icon
  },
  props: {
    hasError: {
      type: Boolean,
      required: true
    },
    apiKey: {
      type: String,
      required: false
    }
  },
  setup (_, { emit }) {
    function handleCopy () {
      emit('onCopy')
    }

    function handleGenerateApiKey () {
      emit('onGenerateApiKey')
    }

    return {
      brandColors: palette.brand,
      handleCopy,
      handleGenerateApiKey
    }
  }
}
</script>
