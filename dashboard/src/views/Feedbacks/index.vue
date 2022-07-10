<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6 py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-gray-800">
          Listagem
        </h1>

        <suspense>
          <template #default>
            <filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
              @select="handleChangeFeedbackType"
            />
          </template>
          <template #fallback>
            <filters-loading
              class="mt-8"
            />
          </template>
        </suspense>
      </div>

      <div class="col-span-3 px-10 pt-20">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feddbacks :(
        </p>

        <feedback-card-loading
          v-if="state.isLoading || state.isLoadingFeedbacks"
        />

        <p
          v-else-if="!state.feedbacks.length && !state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda não tem nenhum feedback recebido
        </p>

        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="`${feedback.id}-${index}`"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

        <feedback-card-loading
          v-if="state.isLoadingMoreFeedbacks"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue'

import HeaderLogged from '@/components/HeaderLogged'
import FeedbackCard from '@/components/FeedbackCard'
import FeedbackCardLoading from '@/components/FeedbackCard/Loading.vue'
import Filters from './Filters.vue'
import FiltersLoading from './FiltersLoading.vue'

import services from '@/services'

export default {
  name: 'feedbacks-page',
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },
  setup () {
    const state = reactive({
      hasError: false,
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0
      }
    })

    onErrorCaptured(handleErrors)

    onMounted(() => {
      getFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    async function handleScroll () {
      const isBottomOfWindow = Math.ceil(
        document.documentElement.scrollTop + window.innerHeight
      ) >= document.documentElement.scrollHeight

      if (
        state.isLoading ||
        state.isLoadingMoreFeedbacks ||
        !isBottomOfWindow ||
        (state.feedbacks.length >= state.pagination.total)
      ) return

      try {
        state.isLoadingMoreFeedbacks = true

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: state.pagination.offset + 5
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoadingMoreFeedbacks = false
      }
    }

    function handleErrors (error) {
      state.hasError = !!error
    }

    async function getFeedbacks () {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoading = false
      }
    }

    async function handleChangeFeedbackType (type) {
      try {
        state.isLoadingFeedbacks = true

        state.pagination.limit = 5
        state.pagination.offset = 0
        state.currentFeedbackType = type

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
      } catch (error) {
        handleErrors(error)
      } finally {
        state.isLoadingFeedbacks = false
      }
    }

    return {
      state,
      handleChangeFeedbackType
    }
  }
}
</script>
