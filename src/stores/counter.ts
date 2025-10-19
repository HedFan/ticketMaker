import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IFetchingData } from "../../configs/fetchingDataTypes.ts";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    tickets: [] as IFetchingData[],
    refreshInterval: null as null | number
  }),

  actions: {
    async startAutoRefresh() {
      await this.fetchTickets();
      this.refreshInterval = setInterval(() => this.fetchTickets(), 180000);

    },
    stopAutoRefresh() {
      if(this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
    },
    async fetchTickets() {
      console.log("check");
      const res = await fetch("http://localhost:3000/api/tickets");
      // const resData = await res.json();

      this.tickets = await res.json();
      console.log("this.tickets", this.tickets);
    }
  }
})
