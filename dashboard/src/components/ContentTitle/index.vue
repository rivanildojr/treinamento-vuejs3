<template>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      {{ title }}
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      {{ description }}
    </p>
  </div>

</template>

<script>
export default {
  name: 'contentTitle-component',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>
