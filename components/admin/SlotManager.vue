<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
  subjects: { type: Array, required: true },
  teachers: { type: Array, required: true },
  periods: { type: Object, required: true }, // { days, regular, friday }
  errorMessage: { type: String, default: '' },
})
const emit = defineEmits(['add'])

const ROOMS = ['106', '107', 'SJ Lab', '102 Lab', 'AK Lab', '311', 'Phar - 2', '108', '201']

const form = reactive({
  section_id: '', subject_id: '', teacher_id: '',
  day: 'Monday', period_index: '', room: '',
})

const periodsForDay = computed(() =>
  form.day === 'Friday' ? props.periods.friday : props.periods.regular
)

function formatTime(t) {
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}

function submit() {
  if (form.period_index === '') return
  const [start_time, end_time] = periodsForDay.value[form.period_index]
  emit('add', {
    section_id: form.section_id,
    subject_id: form.subject_id,
    teacher_id: form.teacher_id,
    day: form.day,
    start_time,
    end_time,
    room: form.room,
  })
}
</script>

<template>
  <fieldset>
    <legend>Timetable Slots</legend>
    <label>Section
      <select v-model="form.section_id">
        <option v-for="s in props.sections" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </label>
    <label>Subject
      <select v-model="form.subject_id">
        <option v-for="s in props.subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </label>
    <label>Teacher
      <select v-model="form.teacher_id">
        <option v-for="t in props.teachers" :key="t.id" :value="t.id">{{ t.name }}</option>
      </select>
    </label>
    <label>Day
      <select v-model="form.day">
        <option v-for="d in props.periods.days" :key="d">{{ d }}</option>
      </select>
    </label>
    <label>Lecture / Period
      <select v-model="form.period_index">
        <option value="" disabled>— choose a lecture —</option>
        <option v-for="(p, i) in periodsForDay" :key="i" :value="i">
          Lecture {{ i + 1 }} ({{ formatTime(p[0]) }} – {{ formatTime(p[1]) }})
        </option>
      </select>
    </label>
    <label>Room
      <select v-model="form.room">
        <option value="" disabled>— choose a room —</option>
        <option v-for="r in ROOMS" :key="r" :value="r">{{ r }}</option>
      </select>
    </label>
    <button @click="submit">Add slot</button>
    <p class="msg-error" v-if="props.errorMessage">{{ props.errorMessage }}</p>
  </fieldset>
</template>
