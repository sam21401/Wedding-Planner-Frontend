<!-- src/components/Footer.vue -->
<template>
  <footer>
    <div class="container">
      <div class="row">
        <!-- Logo i informacje kontaktowe -->
        <div class="col-md-3">
          <div class="full">
            <div class="logo_footer mb-4">
              <router-link to="/" class="navbar-brand">
                <i class="fas fa-ring" style="color: #6b1c92; font-size: 2rem; margin-right: 10px;"></i>
                <span style="font-size: 1.5rem; font-weight: bold; color: #6b1c92;">Planer Wesela</span>
              </router-link>
            </div>
            <div class="information_f">
              <p><strong>Biuro Obsługi Klienta</strong></p>
              <p>ul. Wesoła 123<br />00-001 Warszawa</p>
              <p><strong>Telefon:</strong> +48 123 456 789</p>
              <p><strong>Email:</strong> kontakt@planerwesela.pl</p>
              <p><strong>Godziny otwarcia:</strong><br />Pn - Pt: 8:00 - 18:00<br />Sb: 10:00 - 14:00</p>
            </div>
          </div>
        </div>

        <!-- Menu -->
        <div class="col-md-3">
          <div class="widget_menu">
            <h3>Menu</h3>
            <ul>
              <li><router-link to="/">Strona główna</router-link></li>
              <li><router-link to="/o-nas">O nas</router-link></li>
              <li><router-link to="/o-aplikacji">O aplikacji</router-link></li>
              <li><router-link to="/faq">FAQ</router-link></li>
              <li><router-link to="/kontakt">Kontakt</router-link></li>
            </ul>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="col-md-3">
          <div class="widget_menu">
            <h3>Newsletter</h3>
            <div class="information_f">
              <p>Zapisz się na nasz newsletter, aby otrzymywać najnowsze informacje o aplikacji, porady i promocje!</p>
            </div>
            <div class="form_sub">
              <form @submit.prevent="subscribe">
                <fieldset>
                  <div class="field">
                    <input
                      type="email"
                      placeholder="Wpisz swój email"
                      v-model="email"
                      name="email"
                      required
                    />
                    <button type="submit" class="btn-newsletter">Zapisz się</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        <!-- Kontakt online -->
        <div class="col-md-3">
          <div class="widget_menu">
            <h3>Kontakt online</h3>
            <div class="information_f">
              <p>Masz pytania? Skontaktuj się z nami natychmiast!</p>
            </div>
            <div class="contact_online">
              <router-link to="/kontakt" class="btn-online">
                <i class="fas fa-envelope me-2"></i> Formularz kontaktowy
              </router-link>
              <a href="#" class="btn-chat">
                <i class="fas fa-comments me-2"></i> Rozpocznij czat
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Dolny pasek -->
      <div class="row mt-4">
        <div class="col text-center">
          <p class="copyright">© 2025 Planer Wesela - Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');

// Funkcja do obsługi subskrypcji newslettera
const subscribe = () => {
  if (email.value) {
    // Tutaj możesz dodać logikę wysyłania emaila do API
    // Przykład:
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: email.value }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Sukces:', data);
    //     alert('Dziękujemy za zapisanie się do newslettera!');
    //     email.value = '';
    //   })
    //   .catch((error) => {
    //     console.error('Błąd:', error);
    //     alert('Wystąpił błąd. Spróbuj ponownie później.');
    //   });

    // Dla celów demonstracyjnych, tylko alert
    alert(`Dziękujemy za zapisanie się, ${email.value}!`);
    email.value = '';
  }
};
</script>

