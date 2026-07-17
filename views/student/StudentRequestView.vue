<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/client'
import NewRequestForm from '../../components/requests/NewRequestForm.vue'

const myTimetable = ref([])

async function load() {
  myTimetable.value = await api.get('/timetable/me')
}
onMounted(load)

function handleSubmitted() {
  // Could refresh notification badge counts etc. here.
}
</script>

<template>
  <div class="card">
    <h2>Submit Reschedule Request</h2>
    <NewRequestForm :classes="myTimetable" @submitted="handleSubmitted" />
  </div>
</template>
