<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import uosLogo from '../assets/uos-logo.png'

const router = useRouter()
const { login } = useAuth()

const form = reactive({ email: '', password: '' })
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    const user = await login(form.email, form.password)
    if (user.role === 'student') router.push({ name: 'student-timetable' })
    else if (user.role === 'teacher') router.push({ name: 'teacher-pending' })
   else router.push({ name: 'timetable-full' })
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-shell card">
      <img :src="uosLogo" alt="University of Sialkot logo" class="login-logo" />
      <h1 class="login-title">Software Engineering Department</h1>
      <h2 class="login-subtitle">Timetable Change System</h2>

      <label>Email
        <input v-model="form.email" type="email" />
      </label>
      <label>Password
        <input v-model="form.password" type="password" @keyup.enter="handleLogin" />
      </label>
      <button @click="handleLogin">Login</button>
      <p class="msg-error" v-if="error">{{ error }}</p>
      <p style="font-size: 12px; color: var(--color-muted); margin-top: 14px;">
        Demo accounts (password: password123):<br />
        Student: basit@student.com<br />
        Teacher: museb@teacher.com<br />
        Advisor: nibtal@advisor.com
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}
.login-shell {
  margin: 0;
  text-align: center;
}
.login-logo {
  width: 76px;
  height: 76px;
  display: block;
  margin: 0 auto 12px;
  background: #ffffff;
}
.login-title {
  font-size: 17px;
  margin: 0;
  color: var(--color-primary-dark);
}
.login-subtitle {
  font-size: 14px;
  font-weight: 600;
  margin: 2px 0 18px;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.login-shell label { text-align: left; }
</style>

