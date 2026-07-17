<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/client'
import DataTable from '../../components/common/DataTable.vue'

const rows = ref([])
const columns = [
  { key: 'student_name', label: 'Student' },
  { key: 'subject', label: 'Subject' },
  { key: 'teacher_name', label: 'Teacher' },
  { key: 'original', label: 'Original' },
  { key: 'requested', label: 'Requested' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const data = await api.get('/requests/all')
  rows.value = data.map((r) => ({
    ...r,
    original: `${r.original_day} ${r.original_start}-${r.original_end}`,
    requested: `${r.requested_day} ${r.requested_start}-${r.requested_end}`,
  }))
}
onMounted(load)
</script>

<template>
  <div class="card">
    <h2>Activity Log</h2>
    <DataTable :columns="columns" :rows="rows" />
  </div>
</template>
