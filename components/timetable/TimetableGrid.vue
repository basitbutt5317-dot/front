<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  periods: {
    type: Object, // { days: [...], regular: [[start,end],...], friday: [[start,end],...] }
    required: true,
  },
  sectionLabel: {
    type: String,
    default: '',
  },
})

const days = computed(() => props.periods.days || [])
const activeDay = ref(days.value[0] || 'Monday')

function setDay(day) {
  activeDay.value = day
}

const dayIndex = computed(() => days.value.indexOf(activeDay.value))
function goPrevDay() {
  const i = dayIndex.value
  if (i > 0) activeDay.value = days.value[i - 1]
}
function goNextDay() {
  const i = dayIndex.value
  if (i < days.value.length - 1) activeDay.value = days.value[i + 1]
}

const periodsForActiveDay = computed(() =>
  activeDay.value === 'Friday' ? props.periods.friday : props.periods.regular
)

function formatTime(t) {
  // '08:30:00' -> '8:30 AM'
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}

// Find the scheduled class (if any) for a given period's start time on the active day
function classFor(startTime) {
  return props.rows.find(
    (r) => r.day === activeDay.value && r.start_time === startTime
  )
}

const isJummahDay = computed(() => activeDay.value === 'Friday')
</script>

<template>
  <div class="timetable-grid">
    <div class="grid-header">
      <h3 v-if="sectionLabel">{{ sectionLabel }}</h3>
      <div class="day-tabs">
        <button class="nav-arrow" :disabled="dayIndex === 0" @click="goPrevDay">‹</button>
        <button
          v-for="d in days"
          :key="d"
          :class="{ secondary: d !== activeDay }"
          @click="setDay(d)"
        >
          {{ d }}
        </button>
        <button class="nav-arrow" :disabled="dayIndex === days.length - 1" @click="goNextDay">›</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 160px;">Class (Lecture / Time)</th>
          <th>Subject &amp; Teacher</th>
          <th style="width: 120px;">Room</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(p, idx) in periodsForActiveDay" :key="idx">
          <tr v-if="isJummahDay && idx === 3" class="jummah-row">
            <td colspan="3">Jummah Break — 12:00 PM to 12:30 PM</td>
          </tr>
          <tr :class="{ 'free-row': !classFor(p[0]) }">
            <td>
              Lecture {{ idx + 1 }}<br />
              <small>{{ formatTime(p[0]) }} – {{ formatTime(p[1]) }}</small>
            </td>
            <td v-if="classFor(p[0])">
              {{ classFor(p[0]).subject }} — {{ classFor(p[0]).teacher }}
            </td>
            <td v-else class="free-label">Free</td>
            <td>{{ classFor(p[0]) ? classFor(p[0]).room : '—' }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.grid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
.day-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
}
.day-tabs button { margin: 0; }
.nav-arrow {
  background: var(--color-bg);
  color: var(--color-primary-dark);
  border: 1px solid var(--color-border);
  font-size: 16px;
  padding: 6px 10px;
}
.nav-arrow:disabled { opacity: 0.35; cursor: default; }
.free-row .free-label {
  color: var(--color-muted);
  font-style: italic;
}
.jummah-row td {
  background: #fdf6e3;
  color: var(--color-gold);
  font-weight: 600;
  text-align: center;
}
</style>
