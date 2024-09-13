<template>
  <component
    :is="store.currentComponent"
    @select-feedback-type="handleSelectFeedbackType"
    @next="handleNext"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useStore from '@/hooks/store'

import useNavigation from '@/hooks/navigation'
import type { Navigation } from '@/hooks/navigation'

import { setFeedbackType } from '@/store'
import type { StoreState } from '@/store'

interface SetupReturn {
  store: StoreState
  handleSelectFeedbackType: (type: string) => void
  handleNext: Navigation['next']
}

export default defineComponent({
  name: 'Wizard-Component',
  setup(): SetupReturn {
    const store = useStore()
    const { next } = useNavigation()

    function handleSelectFeedbackType(type: string): void {
      setFeedbackType(type)
    }

    return {
      store,
      handleSelectFeedbackType,
      handleNext: next
    }
  }
})
</script>
