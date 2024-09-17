<template>
  <div class="flex justify-between w-full my-5">
    <button
      class="rounded-xl bg-brand-gray flex flex-col justify-center items-center p-5 w-28 focus:outline-none cursor-pointer hover:bg-gray-100"
      @click="handleSelect('ISSUE')"
    >
      <div class="w-12">
        <img class="full" src="../../assets/images/issue.png" alt="problema" />
      </div>

      <p class="font-medium mt-1 text-gray-800">Problema</p>
    </button>

    <button
      class="rounded-xl bg-brand-gray flex flex-col justify-center items-center p-5 w-28 focus:outline-none cursor-pointer hover:bg-gray-100"
      @click="handleSelect('IDEA')"
    >
      <div class="w-12">
        <img class="full" src="../../assets/images/lamp.png" alt="ideia" />
      </div>

      <p class="font-medium mt-1 text-gray-800">Ideia</p>
    </button>

    <button
      class="rounded-xl bg-brand-gray flex flex-col justify-center items-center p-5 w-28 focus:outline-none cursor-pointer hover:bg-gray-100"
      @click="handleSelect('OTHER')"
    >
      <div class="w-12">
        <img class="full" src="../../assets/images/fire.png" alt="outro" />
      </div>

      <p class="font-medium mt-1 text-gray-800">Outro</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { SetupContext } from 'vue'

interface SetupReturn {
  handleSelect: (type: string) => void
}

export default defineComponent({
  emits: ['select-feedback-type', 'next'],
  setup(_, { emit }: SetupContext): SetupReturn {
    function handleSelect(type: string): void {
      emit('select-feedback-type', type)
      emit('next')
    }

    return {
      handleSelect
    }
  }
})
</script>
