<template>
  <modal-factory />

  <router-view />
</template>

<script>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import ModalFactory from '@/components/ModalFactory'

import services from '@/services'

import { setCurrentUser } from '@/store/user'

import { LOCAL_STORAGE } from '@/constants/localStorage'

export default {
  components: {
    ModalFactory
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem(LOCAL_STORAGE.TOKEN_LOGIN)

        if (!token) {
          router.push({ name: 'Home' })

          return
        }

        const { data } = await services.users.getMe()

        setCurrentUser(data)
      }
    })
  }
}
</script>
