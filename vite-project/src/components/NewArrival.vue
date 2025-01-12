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
  
  <style scoped>
  .arrival_section {
    padding: 4rem 0;
    background-color: #f9f9f9;
  }
  
  .icon-custom {
    font-size: 3rem;
    color: #ff6347;
  }
  
  .decorative-line {
    width: 50px;
    height: 4px;
    background-color: #ff6347;
    margin-top: 1rem;
  }
  
  .heading_container {
    padding: 2rem;
  }
  
  .heading_container h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .heading_container p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  .list-container ul {
    list-style: none;
    padding: 0;
  }
  
  .list-container ul li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
  }
  
  .list-container ul li i {
    color: #ff6347;
    margin-right: 0.5rem;
  }
  
  @media (max-width: 767.98px) {
    .arrival_section {
      padding: 2rem 0;
    }
  
    .heading_container {
      padding: 1rem;
    }
  
    .icon-custom {
      font-size: 2rem;
    }
  
    .decorative-line {
      width: 30px;
      height: 3px;
    }
  }
  </style>
  