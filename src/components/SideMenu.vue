<template>
  <div class="w-64 bg-gray-900 text-gray-100 flex flex-col rounded-r-lg">
    <div class="flex-1 p-4 space-y-2">
      <button
          v-for="item in menuItems"
          :key="item.id"
          @click="$emit('select', item.id)"
          :class="[
          'w-full text-left px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer',
          active === item.id
            ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-700 hover:text-white text-gray-300'
        ]"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
const props = defineProps({
  active: String,
})
const emit = defineEmits(["select"])

const menuItems = [
  { id: "queue", label: "Ticket Queue" },
  { id: "approved", label: "Approved Library" },
  { id: "partner", label: "Partner Overview" },
]

</script>
