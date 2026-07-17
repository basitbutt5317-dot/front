import { ref } from 'vue'
import { api } from '../api/client'

// Module-level refs => single shared reactive state across every component
// that imports useAuth(), without needing Vuex/Pinia for this small app.
const token = ref(localStorage.getItem('token') || '')
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

export function useAuth() {
  async function login(email, password) {
    const data = await api.post('/auth/login', { email, password })
    token.value = data.token
    user.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data.user
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function isLoggedIn() {
    return !!token.value
  }

  return { token, user, login, logout, isLoggedIn }
}
