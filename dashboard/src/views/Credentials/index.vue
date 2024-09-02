<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <ContentTitle
    title="Credenciais"
    description="Guia de instalação e geração de suas credenciais"
  />

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-gray-800">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <content-loader
        v-if="isShowLoader"
        class="rounded"
        width="600"
        height="50px"
      />

      <ApiKey
        v-else
        :hasError="state.hasError"
        :apiKey="apiKey"
        @onCopy="handleCopy"
        @onGenerateApiKey="handleGenerateApiKey"
      />

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="isShowLoader"
        class="rounded"
        width="600"
        height="50px"
      />

      <Script
        v-else
        :hasError="state.hasError"
        :apiKey="apiKey"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'

import HeaderLogged from '@/components/HeaderLogged'
import ContentTitle from '@/components/ContentTitle'
import ContentLoader from '@/components/ContentLoader'
import ApiKey from './ApiKey.vue'
import Script from './Script.vue'

import useStore from '@/hooks/useStore'
import { setApiKey } from '@/store/user'

import services from '@/services'

import palette from '../../../palette'

export default {
  name: 'credentials-page',
  components: {
    HeaderLogged,
    ContentTitle,
    ContentLoader,
    ApiKey,
    Script
  },
  setup () {
    const storeUser = useStore('User')
    const storeGlobal = useStore('Global')
    const toast = useToast()

    const state = reactive({
      isLoading: false,
      hasError: false
    })

    const apiKey = computed(() => storeUser.currentUser.apiKey)
    const isShowLoader = computed(() => storeGlobal.isLoading || state.isLoading)

    watch(() => storeUser.currentUser, () => {
      if (!storeGlobal.isLoading && !apiKey.value) handleError(true)
    })

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true

        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)
      } catch (error) {
        handleError(error)
      } finally {
        state.isLoading = false
      }
    }

    function handleError (error) {
      state.hasError = !!error
      state.isLoading = false
    }

    async function handleCopy () {
      toast.clear()

      try {
        await navigator.clipboard.writeText(apiKey.value)

        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      apiKey,
      brandColors: palette.brand,
      isShowLoader,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
