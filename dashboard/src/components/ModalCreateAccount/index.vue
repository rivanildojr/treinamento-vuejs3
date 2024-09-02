<template>
  <div
    id="modal-create-account"
    class="flex justify-between"
  >
    <h1 class="text-4xl font-black text-gray-800">
      Crie uma conta
    </h1>

    <button
      class="text-4xl text-gray-600 focus:outline-none"
      @click="close"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">
          Nome
        </span>

        <input
          v-model="state.name.value"
          type="text"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{'border-brand-danger': !!state.name.errorMessage}"
          placeholder="Jane Dae"
        >

        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">
          E-mail
        </span>

        <input
          v-model="state.email.value"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{'border-brand-danger': !!state.email.errorMessage}"
          placeholder="jane.dae@gmail.com"
        >

        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">
          Senha
        </span>

        <input
          v-model="state.password.value"
          type="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{'border-brand-danger': !!state.password.errorMessage}"
        >

        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        type="submit"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        :disabled="state.isLoading"
        :class="{'opacity-50': state.isLoading}"
      >
        <icon
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
        />

        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'

import Icon from '@/components/Icon'

import useModal from '@/hooks/useModal'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '@/utils/validators'
import { STATUS_RESPONSE_API } from '@/constants/statusCode'

import services from '@/services'

import { LOCAL_STORAGE } from '@/constants/localStorage'

export default {
  name: 'modalCreateAccount-component',
  components: {
    Icon
  },
  setup () {
    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({
        email,
        password
      })

      if (!errors) {
        window.localStorage.setItem(LOCAL_STORAGE.TOKEN_LOGIN, data.token)

        router.push({
          name: 'Feedbacks'
        })

        modal.close()
      }
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })
          return
        }

        if (errors.status === STATUS_RESPONSE_API.CLIENT_ERROR_BAD_REQUEST) {
          toast.error('Ocorreu um erro ao criar a conta')
        }
      } catch (error) {
        state.hasErrors = !!error

        toast.error('Ocorreu um erro ao criar a conta')
      } finally {
        state.isLoading = false
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
