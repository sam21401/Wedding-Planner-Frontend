<template>
    <section class="faq-section">
      <div class="container">
        <!-- Nagłówek sekcji FAQ -->
        <div class="header-section">
          <h1>Najczęściej zadawane pytania (FAQ)</h1>
          <p>Odpowiedzi na najczęstsze pytania dotyczące naszego systemu.</p>
        </div>
  
        <!-- Lista pytań -->
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.id"
            class="faq-item"
            :class="{ active: activeFAQ === index }"
          >
            <div class="faq-question" @click="toggleFAQ(index)">
              <h3>{{ faq.question }}</h3>
              <i :class="activeFAQ === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            </div>
            <div v-if="activeFAQ === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // Dane FAQ
  const faqs = ref([
    {
      id: 1,
      question: "Jak mogę dodać gościa do listy?",
      answer:
        "Aby dodać gościa, zaloguj się na swoje konto, przejdź do zakładki 'Lista gości' i kliknij przycisk 'Dodaj gościa'. Wypełnij dane i zapisz.",
    },
    {
      id: 2,
      question: "Czy mogę edytować dane gościa po ich dodaniu?",
      answer:
        "Tak, możesz edytować dane gościa. Wystarczy kliknąć ikonę edycji obok imienia i nazwiska na liście gości.",
    },
    {
      id: 3,
      question: "Czy mogę usunąć konto w dowolnym momencie?",
      answer:
        "Tak, możesz usunąć swoje konto w ustawieniach konta. Pamiętaj jednak, że usunięcie konta jest nieodwracalne.",
    },
    {
      id: 4,
      question: "Jak działa planer noclegów?",
      answer:
        "Planer noclegów pozwala przypisywać gości do pokoi. Możesz łatwo zarządzać dostępnymi pokojami i przydzielać gości na podstawie ich potrzeb.",
    },
    {
      id: 5,
      question: "Czy moje dane są bezpieczne?",
      answer:
        "Tak, przykładamy dużą wagę do bezpieczeństwa Twoich danych. Wszystkie dane są szyfrowane i przechowywane zgodnie z najlepszymi praktykami.",
    },
  ]);
  
  // Aktywne pytanie
  const activeFAQ = ref<number | null>(null);
  
  // Przełączanie widoczności odpowiedzi
  function toggleFAQ(index: number) {
    activeFAQ.value = activeFAQ.value === index ? null : index;
  }
  </script>
  
  <style scoped>
  .faq-section {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .header-section {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header-section h1 {
    font-size: 2rem;
    color: #6b1c92;
  }
  
  .header-section p {
    font-size: 1rem;
    color: #555;
  }
  
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .faq-item {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .faq-item.active {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    cursor: pointer;
    background-color: #6b1c92;
    color: white;
    font-size: 1.1rem;
  }
  
  .faq-question h3 {
    margin: 0;
    font-weight: normal;
  }
  
  .faq-question i {
    font-size: 1.2rem;
  }
  
  .faq-answer {
    padding: 15px 20px;
    background-color: #f9f9f9;
    color: #333;
    font-size: 1rem;
    border-top: 1px solid #ddd;
  }
  </style>
  