<template>
  <SideMenu :active="activeView" @select="activeView = $event"/>

  <div class="p-6">
    <div v-show="activeView === 'queue'">
      // queue
    </div>

    <div v-show="activeView === 'approved'">
      // approved
    </div>

    <div v-show="activeView === 'partner'">
      // partner
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {ref} from "vue";
import SideMenu from "@/components/SideMenu.vue";

const activeView = ref("queue");
</script>
