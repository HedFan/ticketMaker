<template>
  <div class="flex justify-center gap-4">
    <div class="w-64">
      <SideMenu :active="activeView" @select="activeView = $event"/>
    </div>

    <div class="p-6 flex-1 w-100">
      <div v-show="activeView === 'queue'">
        <TicketQueue/>
      </div>

      <div v-show="activeView === 'approved'">
        // approved
      </div>

      <div v-show="activeView === 'partner'">
        // partner
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {ref} from "vue";
import SideMenu from "@/components/SideMenu.vue";
import TicketQueue from "@/components/TicketQueue.vue";

const activeView = ref("queue");
</script>
