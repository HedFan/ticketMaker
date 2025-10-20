import { defineStore } from 'pinia'
import type { IFetchingData } from "../../configs/fetchingDataTypes.ts";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    tickets: [] as IFetchingData[],
    refreshInterval: null as null | number
  }),

  actions: {
    async fetchTickets() {
      const res = await fetch("http://localhost:3000/api/tickets");

      this.tickets = await res.json();
      console.log("this.tickets", this.tickets);
    },
    updateLocalTicket(id: number, updates: Partial<IFetchingData>) {
      const index = this.tickets.findIndex((item) => item.id === id);
      if (index !== -1) {
        const currentTicket = this.tickets[index] as IFetchingData;
        this.tickets[index] = { ...currentTicket, ...updates };
      }
    },
    async setUpdatedData(id: number | undefined, updates: Partial<IFetchingData> | undefined, isSync = false) {
      if(id === undefined || updates === undefined) {
        return;
      }
      try {
        await fetch(`http://localhost:3000/api/tickets/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates)
        });
        if(isSync) {
          this.updateLocalTicket(id, updates);
        }
      } catch (err) {
        console.error("Error while updating", err);
      }
    }
  }
})

export const usePopupStore = defineStore("popup", {
  state: () => ({
    isOpen: false,
    currentOpenTicketId: null as number | null
  }),
  actions: {
    closePopup() {
      this.isOpen = false;
      this.currentOpenTicketId = null;
    },
    openPopup(id: number) {
      this.isOpen = true;
      this.currentOpenTicketId = id;
    }
  }
})
