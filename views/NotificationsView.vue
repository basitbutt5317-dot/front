<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'

const notifications = ref([])

async function load() {
  notifications.value = await api.get('/notifications')
}
onMounted(load)
</script>

<template>
  <div class="card">
    <h2>Notifications</h2>
    <ul>
      <li v-for="n in notifications" :key="n.id">
        <strong>{{ n.title }}</strong> — {{ n.body }}
        <em style="color: var(--color-muted); font-size: 12px;">({{ n.created_at }})</em>
      </li>
    </ul>
    <p v-if="!notifications.length" style="color: var(--color-muted);">No notifications yet.</p>
  </div>
</template>
