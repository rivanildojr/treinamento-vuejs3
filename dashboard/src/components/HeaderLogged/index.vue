<template>
  <div class="flex flex-col items-center justify-center flex-wrap w-4/5 max-w-6xl py-10 md:flex-row md:justify-between">
    <div class="w-28 lg:w-36">
      <img
        src="@/assets/images/logo.png"
        alt="logo"
        class="w-full"
      />
    </div>

    <div class="flex">
      <ul class="flex flex-col list-none md:flex-row">
        <li
          class="list-item"
          @click="handleRedirectCredentials"
        >
          Credenciais
        </li>

        <li
          class="list-item"
          @click="handleRedirectFeedbacks"
        >
          Feedbacks
        </li>

        <li
          id="logout-button"
          class="px-6 py-2 font-bold bg-white text-brand-main rounded-full cursor-pointer focus:outline-none"
          @click="handleLogout"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import useStore from '@/hooks/useStore'
import { cleanCurrentUser } from '@/store/user'

import { LOCAL_STORAGE } from '@/constants/localStorage'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() => {
      return !store.currentUser.name ? '...' : `${store.currentUser.name} (sair)`
    })

    function handleRedirectCredentials () {
      router.push({ name: 'Credentials' })
    }

    function handleRedirectFeedbacks () {
      router.push({ name: 'Feedbacks' })
    }

    function handleLogout () {
      window.localStorage.removeItem(LOCAL_STORAGE.TOKEN_LOGIN)

      cleanCurrentUser()

      router.push({ name: 'Home' })
    }

    return {
      logoutLabel,
      handleRedirectCredentials,
      handleRedirectFeedbacks,
      handleLogout
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-item {
  @apply px-6 py-2 font-bold text-white rounded-full cursor-pointer md:mr-2 focus:outline-none;
}
</style>
