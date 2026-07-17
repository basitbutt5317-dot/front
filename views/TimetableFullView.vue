<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'
import TimetableGrid from '../components/timetable/TimetableGrid.vue'

const rows = ref([])
const periods = ref({ days: [], regular: [], friday: [] })
const loading = ref(true)
const sectionLabel = ref('')

async function load() {
  loading.value = true
  const [allRows, periodsData] = await Promise.all([
    api.get('/timetable/all'),
    api.get('/timetable/periods'),
  ])
  rows.value = allRows
  periods.value = periodsData
  sectionLabel.value = allRows[0]?.section || ''
  loading.value = false
}
onMounted(load)
</script>

<template>
  <div class="card">
    <h2 style="text-align: center;">Full Department Timetable</h2>
    <p v-if="loading">Loading timetable…</p>
    <TimetableGrid v-else :rows="rows" :periods="periods" :section-label="sectionLabel" />
  </div>
</template>
