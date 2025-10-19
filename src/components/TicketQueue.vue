<template>
  <div v-if="isLoading"> Loading...
  </div>
  <div v-else>
    <div
        v-for="(ticket, index) in ticketsData.tickets"
        :key="ticket.id"
        class="cursor-pointer p-2 rounded-lg hover:bg-gray-100 flex justify-between items-center border-b border-gray-300"
    >
      <span class="font-medium text-gray-800">{{ ticket.name }}</span>
      <span
          class="ml-2 w-6 h-6 rounded-full border-2 border-gray-300"
          :style="{ backgroundColor: itemColors[ticket.status] }"
      ></span>
    </div>

  </div>

</template>

<style scoped>

</style>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useTicketStore } from "@/stores/counter.ts";
import { itemColors } from "../../configs/fetchingDataConfig.ts";

const isLoading = ref(true);
const ticketsData = useTicketStore();

onMounted(async () => {

  await ticketsData.startAutoRefresh();

  isLoading.value = false;
});

onUnmounted(() => ticketsData.stopAutoRefresh());

</script>
