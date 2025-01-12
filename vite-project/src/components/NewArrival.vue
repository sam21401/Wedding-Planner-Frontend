<!-- src/components/NewArrival.vue -->
<template>
    <section class="arrival_section">
      <div class="container">
        <div class="container-fluid">
          <div class="row">
            <!-- Ikona z ozdobną linią -->
            <div class="col-md-6 d-flex justify-content-center align-items-center p-0">
              <div>
                <div class="icon-custom">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="decorative-line"></div>
              </div>
            </div>
            <!-- Tekst obok -->
            <div class="col-md-6 d-flex align-items-center p-0">
              <div class="heading_container">
                <h2>Dlaczego warto wybrać Planer Wesela?</h2>
                <p>
                  Twój ślub to jeden z najważniejszych dni w życiu. Nasz Planer Wesela
                  ułatwi Ci przygotowania, zapewniając porządek i spokój.
                </p>
                <div class="list-container">
                  <ul>
                    <li>
                      <i class="fas fa-check-circle"></i>
                      <strong>Zarządzaj listą gości</strong> – zapisy, status RSVP i
                      wymagania w jednym miejscu.
                    </li>
                    <li>
                      <i class="fas fa-check-circle"></i>
                      <strong>Plan stołów</strong> – rozmieszczenie gości bez chaosu.
                    </li>
                    <li>
                      <i class="fas fa-check-circle"></i>
                      <strong>Monitoruj zadania</strong> – bądź na bieżąco z
                      przygotowaniami.
                    </li>
                    <li>
                      <i class="fas fa-check-circle"></i>
                      <strong>Budżet i statystyki</strong> – kontroluj wydatki i
                      harmonogram.
                    </li>
                    <li>
                      <i class="fas fa-check-circle"></i>
                      <strong>Dostęp online</strong> – planuj ślub z dowolnego
                      miejsca.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  // Przykładowe dane - w rzeczywistości mogą pochodzić z API
  const items = ref([
    {
      id: 1,
      name: 'Produkt 1',
      description: 'Opis produktu 1.',
      image: '@/assets/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Produkt 2',
      description: 'Opis produktu 2.',
      image: '@/assets/images/product2.jpg',
    },
    {
      id: 3,
      name: 'Produkt 3',
      description: 'Opis produktu 3.',
      image: '@/assets/images/product3.jpg',
    },
  ]);
  
  // Jeśli potrzebujesz pobrać dane z API:
  onMounted(() => {
    // fetch('/api/new-arrivals')
    //   .then(response => response.json())
    //   .then(data => {
    //     items.value = data;
    //   });
  });
  </script>
  
  