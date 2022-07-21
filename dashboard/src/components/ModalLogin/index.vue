<template>
  <div
    id="modal-login"
    class="flex justify-between"
  >
    <h1 class="text-4xl font-black text-gray-800">
      Entre na sua conta
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
        <span class="text-lg font-medium text-gray-800">E-mail</span>

        <input
          id="email-field"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{'border-brand-danger': !!state.email.errorMessage}"
          placeholder="jane.dae@gmail.com"
          v-model="state.email.value"
        >

        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>

        <input
          id="password-field"
          type="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{'border-brand-danger': !!state.password.errorMessage}"
          v-model="state.password.value"
        >

        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        id="submit-button"
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

export default {
  name: 'modalLogin-component',
  components: {
    Icon
  },
  setup () {
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

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token-feedbacker', data.token)
          router.push({
            name: 'Feedbacks'
          })
          modal.close()
          return
        }

        if (errors.status === STATUS_RESPONSE_API.CLIENT_ERROR_NOT_FOUND) {
          toast.error('E-mail não encontrado')
        }

        if (errors.status === STATUS_RESPONSE_API.CLIENT_ERROR_UNAUTHORIZED) {
          toast.error('E-mail ou senha inválidos')
        }

        if (errors.status === STATUS_RESPONSE_API.CLIENT_ERROR_BAD_REQUEST) {
          toast.error('Ocorreu um erro ao fazer o login')
        }
      } catch (error) {
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o login')
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
