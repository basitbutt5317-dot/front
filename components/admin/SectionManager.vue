<script setup>
import { reactive } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
  semesters: { type: Array, required: true },
})
const emit = defineEmits(['add'])

const form = reactive({ name: '', semester_id: '' })

function submit() {
  if (!form.name.trim() || !form.semester_id) return
  emit('add', { name: form.name, semester_id: form.semester_id })
  form.name = ''
}
</script>

<template>
  <fieldset>
    <legend>Sections</legend>
    <table>
      <tr><th>Name</th><th>Semester</th></tr>
      <tr v-for="s in props.sections" :key="s.id">
        <td>{{ s.name }}</td><td>{{ s.semester_name }}</td>
      </tr>
    </table>
    <label>Name <input v-model="form.name" /></label>
    <label>Semester
      <select v-model="form.semester_id">
        <option v-for="s in props.semesters" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </label>
    <button @click="submit">Add section</button>
  </fieldset>
</template>
