<template>
  <div
    class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
  >
    <span v-if="hasError">
      Erro ao carregar o script
    </span>

    <pre v-else-if="apiKey">
      &lt;script
        defer
        async
        onload="init('{{apiKey}}')"
        src="https://rivanildojr-feedbacker-widget.netlify.app/init.js"
      &gt;&lt;/script&gt;
    </pre>
  </div>
</template>

<script>

export default {
  name: 'script-component',
  props: {
    hasError: {
      type: Boolean,
      default: false
    },
    apiKey: {
      type: String,
      required: false
    }
  }
}
</script>
