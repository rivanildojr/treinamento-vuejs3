<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

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

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasError">Erro ao carregar ao carregar a apikey</span>

        <span v-else>{{ apiKey }}</span>

        <div
          v-if="!state.hasError"
          class="flex ml-20 mr-1"
        >
          <icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
            @click="handleCopy"
          />

          <icon
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
            @click="handleGenerateApiKey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="isShowLoader"
        class="rounded"
        width="600"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>

        <pre v-else>
          &lt;script src="https://rivanildojr-feedbacker-widget.netlify.app?api_key={{ apiKey }}"&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'

import HeaderLogged from '@/components/HeaderLogged'
import Icon from '@/components/Icon'
import ContentLoader from '@/components/ContentLoader'

import useStore from '@/hooks/useStore'
import { setApiKey } from '@/store/user'

import services from '@/services'

import palette from '../../../palette'

export default {
  name: 'credentials-page',
  components: {
    HeaderLogged,
    Icon,
    ContentLoader
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
