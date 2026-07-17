<script setup>
import { reactive } from 'vue'

const props = defineProps({
  semesters: { type: Array, required: true },
})
const emit = defineEmits(['add'])

const form = reactive({ name: '' })

function submit() {
  if (!form.name.trim()) return
  emit('add', { name: form.name })
  form.name = ''
}
</script>

<template>
  <fieldset>
    <legend>Semesters</legend>
    <table>
      <tr><th>Name</th><th>Active</th></tr>
      <tr v-for="s in props.semesters" :key="s.id">
        <td>{{ s.name }}</td><td>{{ s.is_active ? 'Yes' : 'No' }}</td>
      </tr>
    </table>
    <label>Name <input v-model="form.name" @keyup.enter="submit" /></label>
    <button @click="submit">Add semester</button>
  </fieldset>
</template>
