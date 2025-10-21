<template>
  <div class="text-right mr-3">
    <select
      id="choseRole"
      class="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      v-model="appRole"
    >
      <option v-for="option in ROLES" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ROLES } from '../../configs/globalConfig.ts'
import { useAppStore } from '@/stores/appStore.ts'

const appStore = useAppStore()
const appRole = computed({
  get: () => appStore.role || 'Manager',
  set: (value) => appStore.setRole(value),
})
</script>
