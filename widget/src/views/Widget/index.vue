<template>
  <teleport to="body">
    <component :is="state.component" @open-box="handleOpenBox" @close-box="handleCloseBox" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'

import Standby from './Standby.vue'
import Box from './Box.vue'

import useIframeControl from '@/hooks/iframe'
import useStore from '@/hooks/store'

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
    const store = useStore()
    const iframe = useIframeControl()

    watch(
      () => store.currentComponent,
      () => {
        iframe.updateCoreValuesOnStore()
      }
    )

    const state = reactive<State>({
      component: NAME_COMPONENTS_WIDGET.STANDBY
    })

    function handleOpenBox(): void {
      iframe.notifyOpen()
      state.component = NAME_COMPONENTS_WIDGET.BOX
    }

    function handleCloseBox(): void {
      iframe.notifyClose()
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
