<!-- src/components/Options.vue -->
<template>
  <div :class="['sidebar_menu', { open: isOpen }]" id="sidebarMenu">
    <div class="menu_toggle_icon" @click="toggleMenu">
      <i class="fas fa-wheelchair"></i>
    </div>
    <div class="sidebar_menu_content">
      <a href="#" @click.prevent="increaseFontSize">Zwiększ rozmiar</a>
      <a href="#" @click.prevent="decreaseFontSize">Zmniejsz rozmiar</a>
      <a href="#" @click.prevent="applyFilter('grayscale(100%)')">Odcienie szarości</a>
      <a href="#" @click.prevent="applyFilter('contrast(200%)')">Wysoki kontrast</a>
      <a href="#" @click.prevent="applyFilter('invert(100%)')">Odwrócone kolory</a>
      <a href="#" @click.prevent="applyFilter('brightness(150%)')">Jasne odcienie</a>
      <a href="#" @click.prevent="resetSettings">Reset</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Reaktywne zmienne
const isOpen = ref(false);
const currentFontSize = ref(16);
const maxFontSize = 22;
const minFontSize = 12;

// Funkcja do przełączania menu
function toggleMenu() {
  isOpen.value = !isOpen.value;
}

// Funkcja do dostosowywania rozmiaru czcionki
function adjustFontSize(increment: number) {
  currentFontSize.value += increment;
  if (currentFontSize.value > maxFontSize) {
    currentFontSize.value = maxFontSize;
  } else if (currentFontSize.value < minFontSize) {
    currentFontSize.value = minFontSize;
  }
  document.body.style.fontSize = `${currentFontSize.value}px`;
}

// Funkcje do zwiększania i zmniejszania rozmiaru czcionki
function increaseFontSize() {
  adjustFontSize(1);
}

function decreaseFontSize() {
  adjustFontSize(-1);
}

// Funkcja do stosowania filtrów
function applyFilter(filterValue: string) {
  document.body.style.filter = filterValue;
}

// Funkcja do resetowania ustawień
function resetSettings() {
  currentFontSize.value = 16;
  document.body.style.fontSize = `${currentFontSize.value}px`;
  document.body.style.filter = '';
}
</script>

<style scoped>
.sidebar_menu {
  margin: 0;
  font-family: Arial, sans-serif;
  position: fixed;
  top: 0;
  left: -200px; /* Ukryj menu */
  width: 200px;
  background-color: #292323; /* Ciemny kolor tła menu */
  transition: left 0.3s;
  z-index: 1000;
  color: #fff; /* Biały tekst */
  height: 100%; /* Rozciągnij menu na całą wysokość strony */
}

.sidebar_menu.open {
  left: 0; /* Pokazuje menu */
}

.menu_toggle_icon {
  position: absolute;
  top: 20px;
  left: 100%; /* Ustawienie po prawej stronie sidebar_menu */
  cursor: pointer;
  padding: 10px;
  background-color: #292323; /* Kolor ikony */
  color: #fff;
  border-radius: 0 5px 5px 0;
}

.sidebar_menu_content a {
  color: white; /* Biały kolor linków */
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: #292323; /* Ciemny kolor tła linków */
  transition: background-color 0.3s ease;
}

.sidebar_menu_content a:hover {
  background-color: #00aaaa; /* Jaśniejszy odcień turkusu przy najechaniu */
}

body {
  transition: font-size 0.3s ease, filter 0.3s ease; /* Płynna zmiana rozmiaru czcionki i filtrów */
  font-size: 16px; /* Początkowy rozmiar czcionki */
}
</style>
