<script setup>
import { reactive } from 'vue'

const props = defineProps({
  subjects: { type: Array, required: true },
  semesters: { type: Array, required: true },
})
const emit = defineEmits(['add'])

const form = reactive({ name: '', code: '', semester_id: '' })

function submit() {
  if (!form.name.trim() || !form.code.trim() || !form.semester_id) return
  emit('add', { name: form.name, code: form.code, semester_id: form.semester_id })
  form.name = ''
  form.code = ''
}
</script>

<template>
  <fieldset>
    <legend>Subjects</legend>
    <table>
      <tr><th>Name</th><th>Code</th></tr>
      <tr v-for="s in props.subjects" :key="s.id">
        <td>{{ s.name }}</td><td>{{ s.code }}</td>
      </tr>
    </table>
    <label>Name <input v-model="form.name" /></label>
    <label>Code <input v-model="form.code" /></label>
    <label>Semester
      <select v-model="form.semester_id">
        <option v-for="s in props.semesters" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </label>
    <button @click="submit">Add subject</button>
  </fieldset>
</template>
