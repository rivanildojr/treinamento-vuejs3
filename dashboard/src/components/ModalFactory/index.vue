<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToggle({ state: false })"
    >
      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <div class="flex flex-col overflow-hidden bg-white rounded-lg animated__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <component
              :is="state.component"
              v-bind="state.props"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue'

import useModal from '@/hooks/useModal'

const ModalLogin = defineAsyncComponent(() => import('@/components/ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() => import('@/components/ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  name: 'modalFactory-component',
  components: {
    ModalLogin,
    ModalCreateAccount
  },
  setup () {
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    const modal = useModal()

    onMounted(() => {
      modal.listen(handleModalToggle)
    })

    onBeforeUnmount(() => {
      modal.off(handleModalToggle)
    })

    function handleModalToggle (payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
        state.isActive = true
        return
      }

      state.component = {}
      state.props = {}
      state.width = DEFAULT_WIDTH
      state.isActive = false
    }

    return {
      state,
      handleModalToggle
    }
  }
}
</script>
