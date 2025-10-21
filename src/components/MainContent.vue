<template>
  <div class="w-full">
    <div class="">
      <TopMenu />
    </div>
    <div class="flex justify-center gap-4 mt-10 flex-col md:flex-row w-full">
      <div class="w-full md:w-64">
        <SideMenu :active="activeView" @select="activeView = $event" />
      </div>

      <div class="p-6 flex-1 w-full">
        <div v-show="activeView === 'queue'">
          <TicketQueue />
        </div>

        <div v-show="activeView === 'approved'">
          <ApprovedLibrary />
        </div>

        <div v-show="activeView === 'partner'">// partner</div>
      </div>
    </div>
  </div>

  <div v-if="usePopup.isOpen">
    <PopupTicket />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import SideMenu from '@/components/SideMenu.vue'
import TicketQueue from '@/components/TicketQueue.vue'
import PopupTicket from '@/components/PopupTicket.vue'
import ApprovedLibrary from '@/components/ApprovedLibrary.vue'
import { usePopupStore } from '@/stores/ticketPinia.ts'
import TopMenu from '@/components/TopMenu.vue'

const activeView = ref('queue')
const usePopup = usePopupStore()
</script>
