<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-grow min-h-0">
      <div class="flex flex-wrap mt-10">
        <MainContent />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import MainContent from '@/components/MainContent.vue'
</script>
