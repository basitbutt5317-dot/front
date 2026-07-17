<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/client'
import DataTable from '../../components/common/DataTable.vue'

const rows = ref([])
const columns = [
  { key: 'subject', label: 'Subject' },
  { key: 'original', label: 'Original' },
  { key: 'requested', label: 'Requested' },
  { key: 'status', label: 'Status' },
  { key: 'teacher_comment', label: 'Teacher note' },
]

async function load() {
  const data = await api.get('/requests/mine')
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
    <h2>My Requests</h2>
    <DataTable :columns="columns" :rows="rows" empty-text="You haven't submitted any requests yet." />
  </div>
</template>
