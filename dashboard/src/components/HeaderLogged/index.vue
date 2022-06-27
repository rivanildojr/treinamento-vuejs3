<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img
        src="@/assets/images/logo.png"
        alt="logo"
        class="w-full"
      />
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
          @click="handleRedirectCredentials"
        >
          Credenciais
        </li>

        <li
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
          @click="handleRedirectFeedbacks"
        >
          Feedbacks
        </li>

        <li
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
      window.localStorage.removeItem('token-feedbacker')
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
