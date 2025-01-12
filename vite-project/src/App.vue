<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Elementy wspólne, widoczne na każdej stronie -->
    <Header />
    <Options />

    <!-- SliderSection widoczny tylko na stronie głównej -->
    <SliderSection v-if="isHome" />

    <!-- NewArrival widoczny tylko na stronie głównej -->
    <NewArrival v-if="isHome" />

    <!-- Miejsce na widoki z routera -->
    <router-view />

    <Footer />
    <Snowfall />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Import komponentów wspólnych
import Header from './components/Header.vue'
import Options from './components/Options.vue'
import SliderSection from './components/SliderSection.vue'
import NewArrival from './components/NewArrival.vue'
import Footer from './components/Footer.vue'
import Snowfall from './components/Snowfall.vue'

// Używamy hooka useRoute, aby sprawdzić aktualną ścieżkę
const route = useRoute()

// Computed property, które zwraca true tylko dla ścieżki '/'
const isHome = computed(() => route.path === '/')
</script>

<style>
/* (Opcjonalnie) Globalne style dla layoutu */
</style>
