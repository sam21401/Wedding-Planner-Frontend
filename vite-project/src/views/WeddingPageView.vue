<template>
    <section class="wedding-page">
      <div class="container">
        <!-- Symulacja logowania/wylogowania -->
        <div class="auth-simulation">
          <button @click="toggleLogin" class="btn btn-toggle">
            <i :class="isLoggedIn ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"></i>
            {{ isLoggedIn ? " Wyloguj się" : " Zaloguj się" }}
          </button>
        </div>
  
        <!-- Widok dla niezalogowanych -->
        <div v-if="!isLoggedIn" class="not-logged-in">
          <h1>Musisz się zalogować</h1>
          <p>Zaloguj się, aby uzyskać dostęp do szczegółów wesela.</p>
          <router-link to="/login" class="btn btn-primary">Zaloguj się</router-link>
          <router-link to="/register" class="btn btn-secondary">Zarejestruj się</router-link>
        </div>
  
        <!-- Widok dla zalogowanych -->
        <div v-else>
          <!-- Nagłówek strony -->
          <header class="header">
            <h1>{{ weddingPage.title }}</h1>
            <p>{{ weddingPage.subtitle }}</p>
          </header>
  
          <!-- Mapa dojazdu -->
          <div class="map-section">
            <h2>Mapa Dojazdu</h2>
            <iframe
              :src="weddingPage.googleMapURL"
              width="100%"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
  
          <!-- Dane kontaktowe -->
          <div class="contact-section">
            <h2>Dane Kontaktowe</h2>
            <p>
              <strong>Telefon:</strong> {{ weddingPage.contact.phone }}<br />
              <strong>Email:</strong> {{ weddingPage.contact.email }}
            </p>
          </div>
  
          <!-- Oczekiwania prezentowe -->
          <div class="gifts-section">
            <h2>Oczekiwania Prezentowe</h2>
            <ul>
              <li v-for="gift in weddingPage.gifts" :key="gift">{{ gift }}</li>
            </ul>
          </div>
  
          <!-- Dodatkowe informacje -->
          <div class="extra-info-section">
            <h2>Dodatkowe Informacje</h2>
            <p>{{ weddingPage.extraInfo }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // Symulacja logowania
  const isLoggedIn = ref(false); // Domyślnie niezalogowany
  
  function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value; // Zmiana stanu logowania
  }
  
  // Dane strony weselnej
  const weddingPage = ref({
    title: "Nasze Wesele",
    subtitle: "Zapraszamy serdecznie do wspólnego świętowania naszego wielkiego dnia!",
    googleMapURL:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.5358960049!2d-74.0060152!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDAlNDInNDYuOCJOIDc0wrAwMicxMC4xIlc!5e0!3m2!1sen!2spl!4v1684256124895!5m2!1sen!2spl",
    contact: {
      phone: "123-456-789",
      email: "kontakt@przykladowewesele.pl",
    },
    gifts: ["Butelka dobrego wina", "Kupon podarunkowy", "Dowolna kwota na podróż poślubną"],
    extraInfo:
      "Prosimy o przybycie na salę weselną najpóźniej o godzinie 17:00. Parking dostępny na miejscu. Dress code: formalny.",
  });
  </script>
  
  <style scoped>
  .wedding-page {
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
  
  .not-logged-in {
    text-align: center;
    margin-top: 50px;
  }
  
  .not-logged-in h1 {
    color: #6b1c92;
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .map-section,
  .contact-section,
  .gifts-section,
  .extra-info-section {
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.8rem;
    color: #6b1c92;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: disc;
    margin-left: 20px;
  }
  
  p,
  li {
    font-size: 1.1rem;
    color: #333;
  }
  
  p strong {
    color: #6b1c92;
  }
  </style>
  