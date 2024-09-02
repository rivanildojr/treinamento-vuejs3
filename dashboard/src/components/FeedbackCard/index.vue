<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between gap-2 flex-wrap w-full mb-8">
      <badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>

    <div
      v-if="state.isOpen"
      :class="{animate__fadeOutUp: state.isClosing}"
      class="flex flex-wrap gap-2 mt-8 animate__animated__fadeInUp animate__faster"
    >
      <div class="flex flex-col gap-2 w-full md:w-1/2">
        <feedback-item
          title="Página"
          :description="feedback.page"
        />

        <feedback-item
          title="Dispositivo"
          :description="feedback.device"
        />
      </div>

      <div class="flex flex-col w-full gap-2 md:w-1/3">
        <feedback-item
          title="Usuário"
          :description="feedback.fingerprint"
        />
      </div>
    </div>

    <div
      class="flex justify-end mt-8"
      v-if="!state.isOpen"
    >
      <icon
        name="chevron-down"
        size="24"
        :color="brandColors.graydark"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

import Icon from '@/components/Icon'
import Badge from './Badge.vue'
import FeedbackItem from './Item.vue'

import { getDiffTimeBetweenCurrentDate } from '@/utils/date'
import palette from '../../../palette'
import { wait } from '@/utils/timeout'

export default {
  components: {
    Icon,
    Badge,
    FeedbackItem
  },
  props: {
    feedback: {
      type: Object,
      required: true
    },
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    async function handleToggle () {
      state.isClosing = true

      await wait(250)

      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    }
  }
}
</script>
