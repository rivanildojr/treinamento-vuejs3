<template>
  <header class="header">
    <div class="header-group">
      <div class="flex flex-col md:flex-row items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <img
            class="w-full"
            src="@/assets/images/logo.png"
            alt="logo"
          >
        </div>

        <div class="flex flex-col sm:flex-row">
          <button
            id="header-create-account-button"
            class="button button--secondary"
            @click="handleRegister"
          >
            Crie uma conta
          </button>

          <button
            id="header-login-button"
            class="button button--primary"
            @click="handleLogin"
          >
            Entrar
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedbacker. <br>
          E faça seus clientes mais <br class="hidden lg:inline-block">
          felizes!
        </h1>

        <p class="text-lg font-medium text-white">
          Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
          simples widget na página.
        </p>

        <div>
          <button
            id="cta-create-account-button"
            class="button button--primary mt-10"
            @click="handleRegister"
          >
            Crie uma conta grátis
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'customHeader-component',
  setup (_, { emit }) {
    function handleLogin () {
      emit('login')
    }

    function handleRegister () {
      emit('create-account')
    }

    return {
      handleLogin,
      handleRegister
    }
  }
}
</script>
<style lang="postcss" scoped>
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

.button {
  @apply px-6 py-2 font-bold rounded-full focus:outline-none hover:brightness-125;
}

.button--primary {
  @apply bg-white text-brand-main;
}

.button--secondary {
  @apply text-white;
}

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue-balloons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
