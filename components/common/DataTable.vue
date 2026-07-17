<script setup>
// PROPS: a generic, reusable table driven entirely by data from its parent.
// columns: [{ key: 'subject', label: 'Subject' }, ...]
// rows: array of plain objects whose keys match column keys
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  emptyText: {
    type: String,
    default: 'No data to display.',
  },
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="row.id ?? i">
        <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
      </tr>
      <tr v-if="!rows.length">
        <td :colspan="columns.length" style="text-align:center; color: var(--color-muted);">
          {{ emptyText }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
