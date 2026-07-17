<script setup>
import { ref } from 'vue'

// PROPS: typed single request object passed down from the parent list
const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
})

// EMITS: child notifies parent of the action and a payload (id, comment)
// rather than calling the API directly — keeps this component dumb/reusable.
const emit = defineEmits(['approve', 'reject'])

const isRejecting = ref(false)
const comment = ref('')

function confirmReject() {
  emit('reject', { id: props.request.id, comment: comment.value })
  isRejecting.value = false
  comment.value = ''
}
</script>

<template>
  <tr>
    <td>{{ request.student_name }}</td>
    <td>{{ request.subject }}</td>
    <td>{{ request.original_day }} {{ request.original_start }}-{{ request.original_end }}</td>
    <td>{{ request.requested_day }} {{ request.requested_start }}-{{ request.requested_end }}</td>
    <td>{{ request.reason }}</td>
    <td>
      <button @click="emit('approve', request.id)">Approve</button>
      <button class="secondary" @click="isRejecting = true">Reject</button>
      <div v-if="isRejecting" style="margin-top:6px;">
        <input v-model="comment" placeholder="comment (optional)" />
        <button class="danger" @click="confirmReject">Confirm reject</button>
      </div>
    </td>
  </tr>
</template>
