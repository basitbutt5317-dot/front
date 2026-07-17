<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import uosLogo from '../../assets/uos-logo.png'

// PROPS: parent (App.vue) passes the logged-in user down into this child,
// with a type-safe contract so the wrong shape of data fails fast.
const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (u) => typeof u.name === 'string' && typeof u.role === 'string',
  },
})

// EMITS: declares the custom event this component can send upward.
const emit = defineEmits(['logout'])

const router = useRouter()
const { logout } = useAuth()

function handleLogout() {
  logout()
  emit('logout') // notify parent the user has logged out
  router.push({ name: 'login' })
}
</script>

<template>
  <aside class="navbar">
    <div class="navbar-brand">
      <img :src="uosLogo" alt="University of Sialkot logo" class="brand-logo" />
      <div class="brand-text">
        <strong>Software Engineering Dept.</strong>
        <span>Timetable Change System</span>
      </div>
    </div>

    <div class="navbar-user">
      <strong>{{ props.user.name }}</strong>
      <span class="role-badge">{{ props.user.role }}</span>
    </div>

    <nav>
      <RouterLink to="/timetable/full">Full Timetable</RouterLink>

      <template v-if="props.user.role === 'student'">
        <RouterLink to="/student/timetable">My Timetable</RouterLink>
        <RouterLink to="/student/request">New Request</RouterLink>
        <RouterLink to="/student/requests">My Requests</RouterLink>
      </template>

      <template v-if="props.user.role === 'teacher'">
        <RouterLink to="/teacher/pending">Pending Requests</RouterLink>
        <RouterLink to="/teacher/history">History</RouterLink>
      </template>

      <template v-if="props.user.role === 'advisor'">
        <RouterLink to="/advisor/log">Activity Log</RouterLink>
        <RouterLink to="/advisor/manage">Manage</RouterLink>
      </template>

      <RouterLink to="/notifications">Notifications</RouterLink>
    </nav>

    <button class="secondary" @click="handleLogout">Logout</button>
  </aside>
</template>

<style scoped>
.navbar {
  width: 220px;
  flex-shrink: 0;
  background: #ffffff;
  color: var(--color-text);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-right: 1px solid var(--color-border);
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}
.brand-logo {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  background: #ffffff;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.brand-text strong {
  font-size: 12px;
  color: var(--color-primary-dark);
}
.brand-text span {
  font-size: 10px;
  color: var(--color-gold, #b8860b);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.navbar-user { margin-bottom: 18px; }
.role-badge {
  display: block;
  font-size: 12px;
  color: var(--color-muted);
  text-transform: capitalize;
}
.navbar nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.navbar nav a {
  color: var(--color-text);
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 14px;
}
.navbar nav a:hover { background: var(--color-bg); }
.navbar nav a.router-link-active {
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
}
</style>
