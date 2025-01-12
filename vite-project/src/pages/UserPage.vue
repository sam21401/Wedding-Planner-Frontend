<!-- src/pages/UserPage.vue -->
<template>
    <div class="hero_area">
      <!-- slider section -->
      <Slider />
      <!-- end slider section -->
    </div>
  
    <!-- new arrival section -->
    <NewArrival />
    <!-- end new arrival section -->
  
    <!-- subscribe section (odkomentuj, jeśli potrzebne) -->
    <!-- <Subscribe /> -->
  
    <!-- client section (odkomentuj, jeśli potrzebne) -->
    <!-- <Client /> -->
  </template>
  
  <script setup>
import SliderSection from '@/components/SliderSection.vue'
  import NewArrival from '@/components/NewArrival.vue'
  
  // Jeżeli chcesz dołączyć "subscribe" lub "client", odkomentuj
  // import Subscribe from '@/components/Subscribe.vue'
  // import Client from '@/components/Client.vue'
  </script>
  
  <style scoped>
  /* style lokalne dla całej strony / sekcji */
  </style>
  