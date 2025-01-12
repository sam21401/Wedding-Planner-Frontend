<template>
  <div class="about-page">
    <div class="hero-section">
      <div class="container">
        <h1 class="fade-in">Poznaj nas bliżej</h1>
        <p class="fade-in">Jesteśmy tutaj, aby pomóc Ci stworzyć niezapomniane wesele!</p>
      </div>
    </div>

    <div class="content-section container">
      <div class="mission-section slide-in">
        <h2>Nasza misja</h2>
        <p>
          Wierzymy, że organizacja wesela może być przyjemna, a nie stresująca. Nasz zespół
          stworzył aplikację, która sprawia, że planowanie jest proste, szybkie i bezproblemowe.
        </p>
      </div>

      <div class="features-section fade-in">
        <h2>Co oferujemy?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-users"></i>
            <h3>Planer gości</h3>
            <p>Zarządzaj listą gości, statusami RSVP i ich wymaganiami w jednym miejscu.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-chair"></i>
            <h3>Plan stołów</h3>
            <p>Stwórz idealne rozmieszczenie gości bez chaosu.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-calendar-check"></i>
            <h3>Zarządzanie zadaniami</h3>
            <p>Bądź na bieżąco z przygotowaniami do Twojego wyjątkowego dnia.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-chart-bar"></i>
            <h3>Statystyki i budżet</h3>
            <p>Monitoruj wydatki i harmonogram, aby wszystko było pod kontrolą.</p>
          </div>
        </div>
      </div>

      <div class="contact-section zoom-in">
        <h2>Skontaktuj się z nami</h2>
        <p>Masz pytania? Z przyjemnością pomożemy! Odwiedź naszą zakładkę 
          <router-link to="/kontakt">Kontakt</router-link>, aby uzyskać więcej informacji.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
/* Ogólny styl strony */
.about-page {
  font-family: Arial, sans-serif;
  color: #333;
}

/* Sekcja bohatera */
.hero-section {
  background: linear-gradient(to bottom right, #6b1c92, #b35fcd);
  color: white;
  text-align: center;
  padding: 4rem 1rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in-out;
}

.hero-section p {
  font-size: 1.5rem;
  animation: fadeIn 2s ease-in-out;
}

/* Sekcja treści */
.content-section {
  margin: 2rem auto;
  padding: 2rem 1rem;
}

.mission-section,
.features-section,
.contact-section {
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #f9f9f9;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.feature-card i {
  font-size: 2.5rem;
  color: #6b1c92;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 1rem;
  color: #555;
}

/* Animacje */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.mission-section {
  animation: slideIn 1s ease-in-out;
}

.features-section {
  animation: fadeIn 1s ease-in-out;
}

.contact-section {
  animation: zoomIn 1s ease-in-out;
}
</style>
