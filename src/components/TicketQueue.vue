<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="w-max">
    <div class="flex mb-3">
      <div v-for="(statusItem, index) in STATUS_OPTIONS" :key="index" class="mr-1">
        <span
          @click="choseFilter(statusItem)"
          :class="[
            'cursor-pointer hover:bg-gray-200 p-2 rounded-lg',
            activeItemFilter.includes(statusItem) ? 'bg-gray-200' : 'bg-gray-400',
          ]"
          >{{ statusItem }}</span
        >
      </div>
    </div>
    <div v-if="filteredTickets">
      <div
        v-for="(ticket, index) in filteredTickets"
        :key="ticket.id"
        class="cursor-pointer p-2 rounded-lg hover:bg-gray-100 flex justify-between items-center border-b border-gray-300"
        @click="usePopup.openPopup(ticket.id)"
      >
        <span class="font-medium text-gray-800">{{ ticket.name }}</span>
        <span
          class="ml-2 w-6 h-6 rounded-full border-2 border-gray-300"
          :style="{ backgroundColor: itemColors[ticket.status] }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useTicketStore, usePopupStore } from '@/stores/ticketPinia.ts'
import { itemColors } from '../../configs/fetchingDataConfig.ts'
import {
  type IStatus,
  type IFetchingData,
  STATUS_OPTIONS,
} from '../../configs/fetchingDataTypes.ts'

const isLoading = ref(true)
const ticketsData = useTicketStore()
const usePopup = usePopupStore()
const activeItemFilter = ref<IStatus[]>([])

onMounted(async () => {
  await ticketsData.fetchTickets()
  isLoading.value = false
})

const unapprovedTickets = computed(() => ticketsData.tickets.filter((item) => !item.isApprouve))

const filteredTickets = computed<IFetchingData[]>(() => {
  if (
    activeItemFilter.value.length === 0 ||
    activeItemFilter.value.length === unapprovedTickets.value.length + 1
  ) {
    if (activeItemFilter.value.length === unapprovedTickets.value.length + 1) {
      activeItemFilter.value = []
    }
    return unapprovedTickets.value
  }
  return unapprovedTickets.value.filter((item) => activeItemFilter.value.includes(item.status))
})

const choseFilter = (activeStatusItem: IStatus) => {
  if (activeItemFilter.value.includes(activeStatusItem)) {
    activeItemFilter.value = activeItemFilter.value.filter((item) => item !== activeStatusItem)
  } else {
    activeItemFilter.value.push(activeStatusItem)
  }
}
</script>
