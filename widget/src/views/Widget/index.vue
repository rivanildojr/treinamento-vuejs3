<template>
  <teleport to="body">
    <component :is="state.component" @open-box="handleOpenBox" @close-box="handleCloseBox" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import Standby from './Standby.vue'
import Box from './Box.vue'

import { NAME_COMPONENTS_WIDGET } from '@/constants/nameComponents'

type State = {
  component: string
}

interface StateReturn {
  state: State
  handleOpenBox: () => void
  handleCloseBox: () => void
}

export default defineComponent({
  name: 'Widget-View',
  components: {
    Standby,
    Box
  },
  setup(): StateReturn {
    const state = reactive<State>({
      component: NAME_COMPONENTS_WIDGET.STANDBY
    })

    function handleOpenBox(): void {
      state.component = NAME_COMPONENTS_WIDGET.BOX
    }

    function handleCloseBox(): void {
      state.component = NAME_COMPONENTS_WIDGET.STANDBY
    }

    return {
      state,
      handleOpenBox,
      handleCloseBox
    }
  }
})
</script>
