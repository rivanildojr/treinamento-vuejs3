<template>
  <span
    class="p-2 text-xs font-black text-white uppercase rounded-full"
    :class="classColor"
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue'

import { FEEDBACK_TYPE, FEEDBACK_COLOR_TYPE } from './constants'

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const label = computed(() => {
      return FEEDBACK_TYPE[props.type] || 'outros'
    })

    const classColor = computed(() => {
      return FEEDBACK_COLOR_TYPE[props.type] || 'bg-brand-graydark'
    })

    return {
      label,
      classColor
    }
  }
}
</script>
