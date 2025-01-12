<template>
  <section class="contact-section">
    <div class="container">
      <div class="row">
        <!-- Sekcja tekstowa -->
        <div class="col-md-6 fade-in">
          <h1>Skontaktuj się z nami</h1>
          <p>
            Masz pytania lub potrzebujesz pomocy? Jesteśmy tutaj, aby Cię wesprzeć. 
            Skontaktuj się z nami poprzez poniższy formularz lub zadzwoń do nas.
          </p>
          <div class="contact-info">
            <p><i class="fas fa-map-marker-alt"></i> ul. Wesoła 123, 00-001 Warszawa</p>
            <p><i class="fas fa-phone"></i> +48 123 456 789</p>
            <p><i class="fas fa-envelope"></i> kontakt@planerwesela.pl</p>
            <p><i class="fas fa-clock"></i> Pn - Pt: 8:00 - 18:00, Sb: 10:00 - 14:00</p>
          </div>
        </div>

        <!-- Formularz kontaktowy -->
        <div class="col-md-6">
          <div class="contact-form slide-in">
            <h2>Formularz kontaktowy</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Imię i nazwisko</label>
                <input type="text" id="name" v-model="form.name" required />
              </div>
              <div class="form-group">
                <label for="email">Adres email</label>
                <input type="email" id="email" v-model="form.email" required />
              </div>
              <div class="form-group">
                <label for="message">Wiadomość</label>
                <textarea id="message" v-model="form.message" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-animate">Wyślij wiadomość</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

function submitForm() {
  alert(`Dziękujemy, ${form.value.name}! Twoja wiadomość została wysłana.`);
  // Tu możesz dodać logikę wysyłania danych do API
  form.value = { name: "", email: "", message: "" }; // Reset formularza
}
</script>

<style scoped>
.contact-section {
  padding: 60px 20px;
  background-color: #f9f9f9;
}

.contact-section h1 {
  color: #6b1c92;
  margin-bottom: 20px;
}

.contact-info p {
  margin: 10px 0;
  font-size: 1.1rem;
}

.contact-info i {
  color: #6b1c92;
  margin-right: 10px;
}

.contact-form {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  margin-bottom: 20px;
  color: #6b1c92;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #6b1c92;
  outline: none;
}

.btn {
  background-color: #6b1c92;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #5a167e;
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

.slide-in {
  animation: slideIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
