<template>
  <div class="flex flex-col items-center justify-center w-full my-5">
    <textarea
      v-model="state.feedback"
      class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"
    ></textarea>

    <button
      :disabled="submitButtonIsDisabled"
      class="rounded-lg font-black mt-3 flex flex-col justify-center items-center py-2 w-full cursor-pointer focus:outline-none transition-all duration-200"
      :class="{
        'opacity-50': state.isLoading,
        'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
        'bg-brand-main text-white': !submitButtonIsDisabled
      }"
      @click="handleAFeedback"
    >
      <Icon v-if="state.isLoading" name="loading" class="animate-spin" color="white" />

      <template v-else> Enviar feedback </template>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import type { ComputedRef } from 'vue'

import Icon from '@/components/Icon/index.vue'

import { setMessage } from '@/store'
import useStore from '@/hooks/store'
import useNavigation from '@/hooks/navigation'

import services from '@/services'

interface SetupReturn {
  state: State
  submitButtonIsDisabled: ComputedRef<boolean>
  handleAFeedback: () => Promise<void>
}

type State = {
  feedback: string
  isLoading: boolean
  hasError: Error | null
}

export default defineComponent({
  components: {
    Icon
  },
  emits: ['select-feedback-type', 'next'],
  setup(): SetupReturn {
    const store = useStore()
    const { setErrorState, setSuccessState } = useNavigation()

    const state = reactive<State>({
      feedback: '',
      isLoading: false,
      hasError: null
    })

    const submitButtonIsDisabled = computed<boolean>(() => {
      return !state.feedback.trim().length
    })

    function handleError(error: Error) {
      state.hasError = error
      state.isLoading = false

      setErrorState()
    }

    async function handleAFeedback(): Promise<void> {
      try {
        setMessage(state.feedback)

        state.isLoading = true

        const response = await services.feedbacks.create({
          type: store.feedbackType,
          text: store.message,
          page: store.currentPage,
          apiKey: store.apiKey,
          fingerprint: store.fingerprint,
          device: window.navigator.userAgent
        })

        if (!response.errors) {
          setSuccessState()

          return
        }

        setErrorState()
      } catch (error: Error | any) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      submitButtonIsDisabled,
      handleAFeedback
    }
  }
})
</script>
