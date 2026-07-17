<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../api/client'
import SemesterManager from '../../components/admin/SemesterManager.vue'
import SectionManager from '../../components/admin/SectionManager.vue'
import SubjectManager from '../../components/admin/SubjectManager.vue'
import TeacherManager from '../../components/admin/TeacherManager.vue'
import SlotManager from '../../components/admin/SlotManager.vue'

const semesters = ref([])
const sections = ref([])
const subjects = ref([])
const teachers = ref([])
const periods = ref({ days: [], regular: [], friday: [] })
const slotError = ref('')

async function loadAll() {
  semesters.value = await api.get('/admin/semesters')
  sections.value = await api.get('/admin/sections')
  subjects.value = await api.get('/admin/subjects')
  teachers.value = await api.get('/admin/users?role=teacher')
}
onMounted(async () => {
  periods.value = await api.get('/timetable/periods')
  loadAll()
})

async function addSemester(payload) {
  await api.post('/admin/semesters', payload)
  loadAll()
}
async function addSection(payload) {
  await api.post('/admin/sections', payload)
  loadAll()
}
async function addSubject(payload) {
  await api.post('/admin/subjects', payload)
  loadAll()
}
async function addTeacher(payload) {
  await api.post('/admin/users', { ...payload, role: 'teacher' })
  loadAll()
}
async function addSlot(payload) {
  slotError.value = ''
  try {
    await api.post('/admin/timetable-slots', payload)
    loadAll()
  } catch (err) {
    slotError.value = err.message
  }
}
</script>

<template>
  <div class="card">
    <h2>Manage</h2>
    <SemesterManager :semesters="semesters" @add="addSemester" />
    <SectionManager :sections="sections" :semesters="semesters" @add="addSection" />
    <SubjectManager :subjects="subjects" :semesters="semesters" @add="addSubject" />
    <TeacherManager :teachers="teachers" @add="addTeacher" />
    <SlotManager
      :sections="sections"
      :subjects="subjects"
      :teachers="teachers"
      :periods="periods"
      :error-message="slotError"
      @add="addSlot"
    />
  </div>
</template>
