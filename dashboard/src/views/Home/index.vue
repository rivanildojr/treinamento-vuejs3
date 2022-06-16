<template>
  <custom-header
    @create-account="handleAccountCreate"
    @login="handleLogin"
  />

  <contact />

  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker © 2022</p>
  </footer>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'

export default {
  components: {
    CustomHeader,
    Contact
  },
  name: 'home-page',
  setup () {
    const router = useRouter()

    onMounted(() => {
      const token = window.localStorage.getItem('token-feedbacker')
      if (token) {
        router.push({
          name: 'Feedbacks'
        })
      }
    })

    function handleLogin () {
      return 'e'
    }

    function handleAccountCreate () {
      return 'e'
    }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
