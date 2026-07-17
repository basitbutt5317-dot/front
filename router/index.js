import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/student/timetable',
    name: 'student-timetable',
    component: () => import('../views/student/StudentTimetableView.vue'),
    meta: { role: 'student' },
  },
  {
    path: '/student/request',
    name: 'student-request',
    component: () => import('../views/student/StudentRequestView.vue'),
    meta: { role: 'student' },
  },
  {
    path: '/student/requests',
    name: 'student-requests',
    component: () => import('../views/student/StudentRequestsView.vue'),
    meta: { role: 'student' },
  },
  {
    path: '/teacher/pending',
    name: 'teacher-pending',
    component: () => import('../views/teacher/TeacherPendingView.vue'),
    meta: { role: 'teacher' },
  },
  {
    path: '/teacher/history',
    name: 'teacher-history',
    component: () => import('../views/teacher/TeacherHistoryView.vue'),
    meta: { role: 'teacher' },
  },
  {
    path: '/timetable/full',
    name: 'timetable-full',
    component: () => import('../views/TimetableFullView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/advisor/log',
    name: 'advisor-log',
    component: () => import('../views/advisor/AdvisorLogView.vue'),
    meta: { role: 'advisor' },
  },
  {
    path: '/advisor/manage',
    name: 'advisor-manage',
    component: () => import('../views/advisor/AdvisorManageView.vue'),
    meta: { role: 'advisor' },
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('../views/NotificationsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    // Fallback: send unknown paths to the right home for the logged-in role
    path: '/:pathMatch(.*)*',
    redirect: () => roleHome(),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function roleHome() {
  const { user, isLoggedIn } = useAuth()
  if (!isLoggedIn()) return { name: 'login' }
  if (user.value.role === 'student') return { name: 'student-timetable' }
  if (user.value.role === 'teacher') return { name: 'teacher-pending' }
  return { name: 'timetable-full' }
}

// Navigation guard: blocks unauthenticated access and enforces per-role routes
router.beforeEach((to) => {
  const { isLoggedIn, user } = useAuth()

  if (to.name === 'login' && isLoggedIn()) {
    return roleHome()
  }
  if (to.name !== 'login' && !isLoggedIn()) {
    return { name: 'login' }
  }
  if (to.meta.role && to.meta.role !== user.value?.role) {
    return roleHome()
  }
  return true
})

export default router
