<template>
  <Widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from './views/Widget/index.vue'

export default defineComponent({
  name: 'App-View',
  components: {
    Widget
  }
})
</script>
