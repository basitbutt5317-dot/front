<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/client'
import DataTable from '../../components/common/DataTable.vue'

const myTimetable = ref([])

const columns = [
  { key: 'day', label: 'Day' },
  { key: 'time', label: 'Time' },
  { key: 'subject', label: 'Subject' },
  { key: 'room', label: 'Room' },
  { key: 'teacher', label: 'Teacher' },
]

// Derive a single "time" display field for the generic DataTable
const rows = ref([])

async function load() {
  myTimetable.value = await api.get('/timetable/me')
  rows.value = myTimetable.value.map((c) => ({
    ...c,
    time: `${c.start_time}–${c.end_time}`,
  }))
}

onMounted(load)
</script>

<template>
  <div class="card">
    <h2>My Timetable</h2>
    <DataTable :columns="columns" :rows="rows" empty-text="No classes scheduled yet." />
  </div>
</template>
