<script setup>
import { reactive, ref } from 'vue'
import { api } from '../../api/client'

// PROPS: parent passes down the student's classes (typed array of objects)
const props = defineProps({
  classes: {
    type: Array,
    required: true,
  },
})

// EMITS: tells the parent a request was successfully submitted, so it
// can refresh its own state (e.g. notification count) without this
// child needing to know anything about the parent.
const emit = defineEmits(['submitted'])

const form = reactive({ slot_id: '', slot: null, reason: '' })
const freeSlots = ref([])
const message = ref('')
const error = ref('')

async function onClassChosen() {
  form.slot = null
  freeSlots.value = []
  const cls = props.classes.find((c) => c.id == form.slot_id)
  if (!cls) return
  freeSlots.value = await api.get('/timetable/free-slots?section_id=' + cls.section_id)
}

async function submit() {
  message.value = ''
  error.value = ''
  try {
    await api.post('/requests', {
      slot_id: form.slot_id,
      requested_day: form.slot.day,
      requested_start: form.slot.start_time,
      requested_end: form.slot.end_time,
      reason: form.reason,
    })
    message.value = 'Request sent to your teacher.'
    form.slot_id = ''
    form.slot = null
    form.reason = ''
    freeSlots.value = []
    emit('submitted')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div>
    <label>Class to reschedule
      <select v-model="form.slot_id" @change="onClassChosen">
        <option value="">— choose —</option>
        <option v-for="c in props.classes" :key="c.id" :value="c.id">
          {{ c.subject }} ({{ c.day }} {{ c.start_time }})
        </option>
      </select>
    </label>

    <div v-if="form.slot_id">
      <p>Free slots for your section:</p>
      <button
        v-for="(s, i) in freeSlots"
        :key="i"
        :class="{ secondary: form.slot !== s }"
        @click="form.slot = s"
      >
        {{ s.day }} {{ s.start_time }}–{{ s.end_time }}
      </button>
    </div>

    <label>Reason
      <textarea v-model="form.reason"></textarea>
    </label>
    <button :disabled="!form.slot_id || !form.slot || !form.reason.trim()" @click="submit">
      Send Request
    </button>

    <p class="msg-success" v-if="message">{{ message }}</p>
    <p class="msg-error" v-if="error">{{ error }}</p>
  </div>
</template>
