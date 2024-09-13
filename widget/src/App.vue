<template>
  <h1 class="text-gray-500">Widget</h1>

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
