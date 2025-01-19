<template>
  <div>
    <h1>Lista Gości</h1>
    <button @click="fetchGuests">Załaduj Gości</button>
    <ul v-if="guests.length">
      <li v-for="guest in guests" :key="guest.id">
        ID: {{ guest.id }}, Imię: {{ guest.name }}
      </li>
    </ul>
    <p v-else>Brak danych lub dane się ładują...</p>
  </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
  data() {
    return {
      guests: [],
    };
  },
  methods: {
    async fetchGuests() {
      try {
        const response = await apiClient.get('/guests');
        this.guests = response.data;
      } catch (error) {
        console.error('Błąd podczas pobierania:', error.response || error.message);
      }
    },
  },
};
</script>
