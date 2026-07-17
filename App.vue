<script setup>
import { useAuth } from './composables/useAuth'
import { useRoute } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'

const { user, isLoggedIn } = useAuth()
const route = useRoute()
</script>

<template>
  <div class="app-shell">
    <AppNavbar v-if="isLoggedIn() && route.name !== 'login'" :user="user" />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>
