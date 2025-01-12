<template>
    <section class="statistics-section">
      <div class="container">
        <!-- Symulacja logowania/wylogowania -->
        <div class="auth-simulation">
          <button @click="toggleLogin" class="btn btn-toggle">
            <i :class="isLoggedIn ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"></i>
            {{ isLoggedIn ? " Wyloguj się" : " Zaloguj się" }}
          </button>
        </div>
  
        <!-- Widok dla zalogowanych użytkowników -->
        <transition name="fade">
          <div v-if="isLoggedIn" class="logged-in-view">
            <!-- Nagłówek -->
            <div class="header-section">
              <h1>Statystyki</h1>
              <p>Przegląd kluczowych danych dotyczących Twojego planu.</p>
            </div>
  
            <!-- Statystyki w kartach -->
            <div class="stats-cards">
              <div class="stat-card" v-for="stat in stats" :key="stat.id">
                <i :class="stat.icon" class="stat-icon"></i>
                <div>
                  <h3>{{ stat.value }}</h3>
                  <p>{{ stat.label }}</p>
                </div>
              </div>
            </div>
  
            <!-- Wykres -->
            <div class="chart-container">
              <canvas id="myChart"></canvas>
            </div>
          </div>
  
          <!-- Reklama dla niezalogowanych -->
          <div v-else class="statistics-promo text-justify">
            <h1>Zobacz swoje statystyki w jednym miejscu!</h1>
            <p>
              Zarejestruj się, aby uzyskać pełny dostęp do statystyk, które pomogą Ci
              lepiej zarządzać swoim planem weselnym.
            </p>
            <img
              src="/images/Statistics.png"
              class="img-fluid"
              alt="Statystyki"
            />
            <div class="button-group">
              <router-link to="/register" class="btn btn-primary">
                <i class="fas fa-user-plus"></i> Zarejestruj się
              </router-link>
              <router-link to="/login" class="btn btn-secondary">
                <i class="fas fa-sign-in-alt"></i> Zaloguj się
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import Chart from "chart.js/auto";
  
  // Symulacja logowania/wylogowania
  const isLoggedIn = ref(false);
  
  function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value;
  }
  
  // Statystyki do wyświetlenia w kartach
  const stats = ref([
    { id: 1, label: "Goście na weselu", value: 120, icon: "fas fa-users" },
    { id: 2, label: "Goście na poprawinach", value: 85, icon: "fas fa-glass-cheers" },
    { id: 3, label: "Goście z noclegiem", value: 50, icon: "fas fa-bed" },
  ]);
  
  // Inicjalizacja wykresu
  let chartInstance: Chart | null = null;
  
  onMounted(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
  
    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: stats.value.map((stat) => stat.label),
        datasets: [
          {
            label: "Statystyki",
            data: stats.value.map((stat) => stat.value),
            backgroundColor: ["#6b1c92", "#dc3545", "#28a745"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  });
  
  // Niszczenie wykresu podczas odmontowywania
  onUnmounted(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Zniszczenie instancji wykresu
      chartInstance = null;
    }
  });
  </script>
  
  <style scoped>
  .statistics-section {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .container {
    max-width: 1200px;
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
    transition: background-color 0.3s ease;
  }
  
  .btn-toggle:hover {
    background-color: #5a167e;
  }
  
  .header-section {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header-section h1 {
    font-size: 2rem;
    color: #333;
  }
  
  .header-section p {
    font-size: 1rem;
    color: #555;
  }
  
  .stats-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  
  .stat-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    flex: 1 1 22%;
    display: flex;
    align-items: center;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .stat-icon {
    font-size: 2rem;
    margin-right: 15px;
    color: #6b1c92;
  }
  
  .stat-card h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }
  
  .stat-card p {
    margin: 5px 0 0 0;
    color: #666;
  }
  
  .chart-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .statistics-promo {
    margin-top: 40px;
    animation: fadeIn 1s ease-in-out;
  }
  
  .statistics-promo h1 {
    font-size: 2rem;
    color: #6b1c92;
    margin-bottom: 20px;
  }
  
  .statistics-promo p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: #555;
  }
  
  .img-fluid {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    background-color: #6b1c92;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .btn-secondary {
    background-color: #ccc;
    color: #333;
  }
  
  .btn-primary:hover {
    background-color: #5a167e;
  }
  
  .btn-secondary:hover {
    background-color: #b3b3b3;
  }
  
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
  </style>
  