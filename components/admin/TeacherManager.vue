<script setup>
import { reactive } from 'vue'

const props = defineProps({
  teachers: { type: Array, required: true },
})
const emit = defineEmits(['add'])

const form = reactive({ name: '', email: '', password: '' })

function submit() {
  if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return
  emit('add', { ...form })
  form.name = ''
  form.email = ''
  form.password = ''
}
</script>

<template>
  <fieldset>
    <legend>Teachers</legend>
    <table>
      <tr><th>Name</th><th>Email</th></tr>
      <tr v-for="t in props.teachers" :key="t.id">
        <td>{{ t.name }}</td><td>{{ t.email }}</td>
      </tr>
    </table>
    <label>Name <input v-model="form.name" /></label>
    <label>Email <input v-model="form.email" type="email" /></label>
    <label>Password <input v-model="form.password" type="password" /></label>
    <button @click="submit">Add teacher</button>
  </fieldset>
</template>
