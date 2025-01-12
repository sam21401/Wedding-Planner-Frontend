<!-- src/components/Snowfall.vue -->
<template>
  <div>
    <!-- Kontener na płatki śniegu -->
    <div class="snow-container">
      <div
        v-for="n in snowflakeCount"
        :key="n"
        class="snowflake"
        :style="generateSnowflakeStyle()"
      >
        ❄
      </div>
    </div>

    <!-- Komunikat
    <div :class="['overlay', { show: overlayVisible }]">
      <div class="card">
        <span class="close-btn" @click="closeOverlay">&times;</span>
        <h2>Witaj!</h2>
        <p>
          Szanowni Państwo,<br />
          Z okazji 
        </p>

      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Reaktywne zmienne
const snowflakeCount = 50; // Liczba płatków śniegu
const overlayVisible = ref(false);

// Funkcja do generowania losowych stylów dla płatków śniegu
function generateSnowflakeStyle() {
  const left = Math.random() * 100 + '%';
  const fontSize = (Math.random() * 1 + 0.8) + 'em';
  const animationDelay = Math.random() + 's';
  const opacity = Math.random();
  return {
    left,
    fontSize,
    animationDelay,
    opacity,
  };
}

// Funkcja do wyświetlania overlay
function showOverlay() {
  overlayVisible.value = true;
}

// Funkcja do zamykania overlay
function closeOverlay() {
  overlayVisible.value = false;
}

// Dodanie płatków śniegu po załadowaniu komponentu
onMounted(() => {
  // Wyświetlenie overlay po 1 sekundach
  setTimeout(() => {
    showOverlay();
  }, 1000);
});
</script>

<style scoped>
/* Kontener na płatki śniegu */
.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
}

/* Stylizacja płatków śniegu */
.snowflake {
  position: absolute;
  top: -10%;
  color: #fff;
  animation-name: snowflakes-fall, snowflakes-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
}

@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}

@keyframes snowflakes-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(80px);
  }
}

/* Nakładka z alertem */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom:0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease;
}

.overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.card {
  background: #fff;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  border-radius: 10px;
  position: relative;
  text-align: center;
  font-family: "Georgia", serif;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  animation: fadeInUp 1s forwards;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(20px);
    opacity:0;
  }
  100% {
    transform: translateY(0);
    opacity:1;
  }
}

.card h2 {
  margin-bottom: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.card p {
  color: #34495e;
  font-size: 1.1em;
  line-height: 1.5em;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  color: #888;
  cursor: pointer;
}

.close-btn:hover {
  color: #333;
}
</style>
