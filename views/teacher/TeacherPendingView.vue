<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/client'
import RequestRow from '../../components/requests/RequestRow.vue'

const pending = ref([])

async function load() {
  pending.value = await api.get('/requests/pending')
}
onMounted(load)

async function handleApprove(id) {
  await api.put(`/requests/${id}/approve`)
  load()
}
async function handleReject({ id, comment }) {
  await api.put(`/requests/${id}/reject`, { comment })
  load()
}
</script>

<template>
  <div class="card">
    <h2>Pending Requests</h2>
    <table>
      <thead>
        <tr>
          <th>Student</th><th>Subject</th><th>Original</th><th>Requested</th><th>Reason</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        <RequestRow
          v-for="r in pending"
          :key="r.id"
          :request="r"
          @approve="handleApprove"
          @reject="handleReject"
        />
        <tr v-if="!pending.length">
          <td colspan="6" style="text-align:center; color: var(--color-muted);">No pending requests.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
