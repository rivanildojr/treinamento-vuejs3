<template>
  <div
    :style="{
      width: computedWidth,
      height
    }"
    class="opacity-75 content-loader"
  >
    <span
      :style="{ animationDuration }"
      class="content-loader--fx"
    />

    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    maxWidth: {
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number
    },
    animationDuration: {
      default: '1.6s',
      type: String
    },
    height: {
      default: '1rem',
      type: String
    },
    width: {
      default: '1rem',
      type: String
    }
  },
  setup (props) {
    const computedWidth = computed(() => {
      const value = Math.random() * (props.width - props.minWidth)
      return props.width ?? `${Math.floor(value + props.minWidth)}%`
    })

    return {
      computedWidth
    }
  }
}
</script>
<style lang="postcss" scoped>
.content-loader {
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: #f6f7f8;
}

.content-loader--fx {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 36%);
  background-position: 0 0;
  background-size: 1000 100;
  animation: shimmer infinite alternate ease-in-out;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
