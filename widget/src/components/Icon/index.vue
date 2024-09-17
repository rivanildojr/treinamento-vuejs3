<template>
  <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'
import Chat from './Chat.vue'
import Close from './Close.vue'
import Arrow from './Arrow.vue'
import Check from './Check.vue'
import Attention from './Attention.vue'

export default {
  name: 'icon-component',
  components: {
    Loading,
    Copy,
    ChevronDown,
    Chat,
    Close,
    Arrow,
    Check,
    Attention
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
