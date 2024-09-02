<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-gray-800">
      Filtros
    </h1>

    <ul class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer"
        :class="{
          'bg-gray-200 bg-opacity-50': filter.active
        }"
        @click="handleSelect(filter)"
      >
        <div class="flex items-center">
          <span
            class="inline-block w-2 h-2 mr-2 rounded-full"
            :class="filter.bgColor"
          ></span>

          {{ filter.label }}
        </div>

        <span
          class="font-bold"
          :class="filter.active ? `${filter.textColor}` : 'text-brand-graydark'"
        >
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'

import services from '@/services'

import useStore from '@/hooks/useStore'

import { LABELS, BG_COLORS, TEXT_COLORS } from './constants'

function applyFiltersStructure (summary) {
  return Object.keys(summary).reduce((acc, nameKey) => {
    const currentFilter = {
      label: LABELS[nameKey],
      bgColor: BG_COLORS[nameKey],
      textColor: TEXT_COLORS[nameKey],
      amount: summary[nameKey]
    }

    if (nameKey === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = nameKey
    }

    return [...acc, currentFilter]
  }, [])
}

export default {
  async setup (_, { emit }) {
    const store = useStore('Global')

    const state = reactive({
      hasError: false,
      filters: [{
        label: null,
        amount: null
      }]
    })

    try {
      const { data } = await services.feedbacks.getSummary()

      state.filters = applyFiltersStructure(data)
    } catch (error) {
      state.hasError = !!error

      state.filters = applyFiltersStructure({ all: 0, issue: 0, idea: 0, other: 0 })
    }

    function handleSelect ({ type }) {
      if (store.isLoading) return

      state.filters = state.filters.map((filter) => {
        if (filter.type === type) {
          return { ...filter, active: true }
        }

        return { ...filter, active: false }
      })

      emit('select', type)
    }

    return {
      state,
      handleSelect
    }
  }
}
</script>
