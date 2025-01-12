<template>
  <section class="guest-list-section">
    <div class="container">
      <!-- Sprawdzamy, czy użytkownik jest zalogowany -->
      <div v-if="isLoggedIn">
        <div class="row">
          <!-- Nagłówek sekcji -->
          <div class="col-12 text-center fade-in">
            <h1>Lista Gości</h1>
            <p>Dodawaj, edytuj i zarządzaj listą gości w jednym miejscu!</p>
          </div>
        </div>
        <div class="row">
          <!-- Formularz dodawania gości -->
          <div class="col-md-6 slide-in">
            <h2>Dodaj gościa</h2>
            <form @submit.prevent="addGuest">
              <div class="form-group">
                <label for="name">Imię i nazwisko</label>
                <input type="text" id="name" v-model="newGuest.name" required />
              </div>
              <div class="form-group">
                <label for="status">Status RSVP</label>
                <select id="status" v-model="newGuest.status" required>
                  <option value="confirmed">Potwierdzony</option>
                  <option value="pending">Oczekujący</option>
                  <option value="declined">Odmówiony</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary btn-animate">Dodaj gościa</button>
            </form>
          </div>

          <!-- Lista gości -->
          <div class="col-md-6 fade-in">
            <h2>Twoja lista gości</h2>
            <div v-if="guests.length > 0" class="guest-list">
              <div class="guest-item" v-for="guest in guests" :key="guest.id">
                <div class="guest-details">
                  <p><strong>{{ guest.name }}</strong></p>
                  <p>Status: <span :class="'status-' + guest.status">{{ guest.status }}</span></p>
                </div>
                <button @click="removeGuest(guest.id)" class="btn btn-danger btn-sm">Usuń</button>
              </div>
            </div>
            <p v-else class="no-guests">Brak gości na liście. Dodaj pierwszego gościa!</p>
          </div>
        </div>
      </div>

      <!-- Reklama dla niezalogowanych -->
      <div v-else class="guest-list-promo text-center fade-in">
        <h1>Zarządzaj swoją listą gości z Planerem Wesela!</h1>
        <p>
          Zarejestruj się, aby korzystać z funkcji zarządzania gośćmi. Dodawaj, edytuj i miej pełną kontrolę
          nad swoją listą gości w jednym miejscu.
        </p>
        <router-link to="/register" class="btn btn-primary btn-animate">Zarejestruj się</router-link>
        <router-link to="/login" class="btn btn-secondary btn-animate">Zaloguj się</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Przyjmujemy, że isLoggedIn to zmienna sprawdzająca, czy użytkownik jest zalogowany
const isLoggedIn = ref(false); // Ustaw na true, jeśli użytkownik jest zalogowany

interface Guest {
  id: number;
  name: string;
  status: string;
}

const guests = ref<Guest[]>([]);

const newGuest = ref<Guest>({
  id: 0,
  name: "",
  status: "pending",
});

function addGuest() {
  if (newGuest.value.name) {
    guests.value.push({
      ...newGuest.value,
      id: Date.now(),
    });
    newGuest.value = { id: 0, name: "", status: "pending" }; // Reset formularza
  }
}

function removeGuest(id: number) {
  guests.value = guests.value.filter((guest) => guest.id !== id);
}
</script>

<style scoped>
.guest-list-section {
  padding: 60px 20px;
  background-color: #f9f9f9;
}

h1, h2 {
  color: #6b1c92;
}

form {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.guest-list {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.guest-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.guest-item p {
  margin: 0;
}

.guest-list-promo {
  margin-top: 40px;
}

.guest-list-promo p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #6b1c92;
  color: #fff;
}

.btn-secondary {
  background-color: #ccc;
  color: #333;
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
