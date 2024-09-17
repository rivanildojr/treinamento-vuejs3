<template>
  <div class="box animate__animated animate__fadeInUp">
    <header
      class="relative w-full flex"
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo
      }"
    >
      <button
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl text-gray-800 focus:outline-none"
        :class="{ invisible: canGoBack }"
        :disabled="canGoBack"
        @click="handleBack"
      >
        <Icon name="Arrow" :color="colors.gray['800']" />
      </button>

      <p
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl font-black text-center text-brand-main"
      >
        {{ label }}
      </p>

      <button class="text-xl text-gray-800 focus:outline-none" @click="handleCloseBox">
        <Icon size="14" name="Close" :color="colors.gray['800']" />
      </button>
    </header>

    <Wizard />

    <div v-if="canShowAdditionalControlAndInfo" class="text-gray-800 text-sm flex">
      <Icon name="Chat" :color="brandColors.graydark" />

      <span class="ml-1"> widget by <strong class="font-bold">feedbacker</strong></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ComputedRef, SetupContext } from 'vue'

import Icon from '@/components/Icon/index.vue'
import Wizard from '@/components/Wizard/index.vue'

import useStore from '@/hooks/store'
import useNavigation from '@/hooks/navigation'
import type { Navigation } from '@/hooks/navigation'

import palette from '../../../palette'

import colors from 'tailwindcss/colors'
import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import { NAME_COMPONENTS_WIZARD } from '@/constants/nameComponents'

interface SetupReturn {
  label: ComputedRef<string>
  canGoBack: ComputedRef<boolean>
  canShowAdditionalControlAndInfo: ComputedRef<boolean>
  colors: DefaultColors
  brandColors: Record<string, string>
  handleCloseBox: () => void
  handleBack: Navigation['next']
}

const LABEL: Record<string, string> = {
  ISSUE: 'Reporte um problema',
  IDEA: 'Nos fale a sua ideia',
  OTHER: 'Abra sua mente',
  DEFAULT: 'O que você tem em mente?'
}

export default defineComponent({
  name: 'Box-Component',
  components: {
    Icon,
    Wizard
  },
  emits: ['close-box'],
  setup(_: any, { emit }: SetupContext): SetupReturn {
    const store = useStore()
    const { back } = useNavigation()

    const label = computed<string>(() => {
      return LABEL[store.feedbackType] || LABEL.DEFAULT
    })

    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === NAME_COMPONENTS_WIZARD.SELECT_FEEDBACK_TYPE
    })

    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return (
        store.currentComponent !== NAME_COMPONENTS_WIZARD.SUCCESS &&
        store.currentComponent !== NAME_COMPONENTS_WIZARD.ERROR
      )
    })

    function handleCloseBox() {
      emit('close-box')
    }

    return {
      label,
      canGoBack,
      canShowAdditionalControlAndInfo,
      colors,
      brandColors: palette.brand,
      handleCloseBox,
      handleBack: back
    }
  }
})
</script>

<style scoped lang="postcss">
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
