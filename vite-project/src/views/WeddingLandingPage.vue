<template>
    <section class="wedding-landing-page">
      <div class="container">
        <!-- Symulacja logowania/wylogowania -->
        <div class="auth-simulation">
          <button @click="toggleLogin" class="btn btn-toggle">
            <i :class="isLoggedIn ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"></i>
            {{ isLoggedIn ? " Wyloguj się" : " Zaloguj się" }}
          </button>
        </div>
  
        <!-- Widok dla niezalogowanych użytkowników -->
        <div v-if="!isLoggedIn" class="not-logged-in">
          <h1>Stwórz swoją stronę weselną!</h1>
          <p>Zaloguj się, aby rozpocząć konfigurację strony weselnej.</p>
          <router-link to="/login" class="btn btn-primary">Zaloguj się</router-link>
          <router-link to="/register" class="btn btn-secondary">Zarejestruj się</router-link>
        </div>
  
        <!-- Widok dla zalogowanych użytkowników -->
        <div v-else>
          <h1>Konfiguracja strony weselnej</h1>
          <form @submit.prevent="saveWeddingPage" class="wedding-form">
            <!-- Tytuł wesela -->
            <div class="form-group">
              <label for="title">Tytuł strony:</label>
              <input
                id="title"
                v-model="weddingPage.title"
                type="text"
                placeholder="Np. Nasze Wesele"
                required
              />
            </div>
  
            <!-- Mapa dojazdu -->
            <div class="form-group">
              <label for="map">Link do mapy Google:</label>
              <input
                id="map"
                v-model="weddingPage.googleMapURL"
                type="url"
                placeholder="Wklej link do mapy Google"
                required
              />
            </div>
  
            <!-- Dane kontaktowe -->
            <div class="form-group">
              <label for="phone">Telefon kontaktowy:</label>
              <input
                id="phone"
                v-model="weddingPage.contact.phone"
                type="text"
                placeholder="123-456-789"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Adres e-mail:</label>
              <input
                id="email"
                v-model="weddingPage.contact.email"
                type="email"
                placeholder="kontakt@example.com"
                required
              />
            </div>
  
            <!-- Oczekiwania prezentowe -->
            <div class="form-group">
              <label for="gifts">Oczekiwania prezentowe (oddziel przecinkami):</label>
              <input
                id="gifts"
                v-model="giftsInput"
                type="text"
                placeholder="Np. Butelka wina, Kupon podarunkowy"
              />
            </div>
  
            <!-- Dodatkowe informacje -->
            <div class="form-group">
              <label for="extraInfo">Dodatkowe informacje:</label>
              <textarea
                id="extraInfo"
                v-model="weddingPage.extraInfo"
                placeholder="Np. Dress code, godzina przybycia..."
              ></textarea>
            </div>
  
            <button type="submit" class="btn btn-success">Zapisz stronę</button>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  // Router
  const router = useRouter();
  
  // Symulacja logowania
  const isLoggedIn = ref(false);
  
  function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value;
  }
  
  // Dane strony weselnej
  const weddingPage = ref({
    title: "",
    googleMapURL: "",
    contact: {
      phone: "",
      email: "",
    },
    gifts: [] as string[],
    extraInfo: "",
  });
  
  const giftsInput = ref(""); // Oczekiwania prezentowe jako string
  
  function saveWeddingPage() {
    // Konwersja prezentów z ciągu tekstowego na tablicę
    weddingPage.value.gifts = giftsInput.value.split(",").map((gift) => gift.trim());
  
    // Przekierowanie na podgląd strony weselnej
    router.push({ name: "WeddingPage", params: { slug: "moja-strona-weselna" } });
  }
  </script>
  
  <style scoped>
  .wedding-landing-page {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .auth-simulation {
    margin-bottom: 20px;
    text-align: right;
  }
  
  .btn-toggle {
    background-color: #6b1c92;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-toggle:hover {
    background-color: #5a167e;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .btn-success {
    background-color: #28a745;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    text-align: center;
    cursor: pointer;
    border: none;
  }
  
  .btn-success:hover {
    background-color: #218838;
  }
  </style>
  