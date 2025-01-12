<template>
    <section class="table-planner-section">
      <div class="container">
        <!-- Symulacja logowania/wylogowania -->
        <div class="auth-simulation">
          <button @click="toggleLogin" class="btn btn-toggle">
            <i :class="isLoggedIn ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"></i>
            {{ isLoggedIn ? " Wyloguj się" : " Zaloguj się" }}
          </button>
        </div>
  
        <!-- Widok dla zalogowanych użytkowników z animacją -->
        <transition name="fade">
          <div v-if="isLoggedIn" class="logged-in-view">
            <!-- Nagłówek i wyszukiwarka -->
            <div class="header-section">
              <h1>Planer Stołów</h1>
              <div class="actions">
                <button @click="addTable" class="btn btn-primary">
                  <i class="fas fa-plus"></i> Dodaj Stół
                </button>
                <button @click="resetPlanner" class="btn btn-danger">
                  <i class="fas fa-redo"></i> Resetuj Planer
                </button>
              </div>
            </div>
  
            <!-- Statystyki -->
            <div class="stats-section">
              <div class="stat-card" v-for="stat in stats" :key="stat.id">
                <i :class="stat.icon" class="stat-icon"></i>
                <div>
                  <h3>{{ stat.value }}</h3>
                  <p>{{ stat.label }}</p>
                </div>
              </div>
            </div>
  
            <!-- Planer stołów -->
            <div class="planner-container">
              <div
                class="table-card"
                v-for="table in tables"
                :key="table.id"
                @click="selectTable(table)"
                :class="{ selected: selectedTable && selectedTable.id === table.id }"
              >
                <div class="table-header">
                  <i class="fas fa-chair"></i> Stół {{ table.number }}
                  <button @click.stop="removeTable(table.id)" class="btn btn-remove">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
                <ul class="guest-list">
                  <li v-for="guest in table.guests" :key="guest.id">
                    <i class="fas fa-user"></i> {{ guest.name }}
                    <button @click.stop="removeGuest(table.id, guest.id)" class="btn btn-small btn-remove-guest">
                      <i class="fas fa-times"></i>
                    </button>
                  </li>
                </ul>
                <div class="add-guest">
                  <input
                    type="text"
                    v-model="newGuestName"
                    placeholder="Dodaj gościa..."
                    @keyup.enter="addGuest(table.id)"
                    class="add-guest-input"
                  />
                  <button @click="addGuest(table.id)" class="btn btn-small btn-add-guest">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Modal do wyświetlania szczegółów stołu -->
            <transition name="modal">
              <div v-if="selectedTable" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content">
                  <h2>Stół {{ selectedTable.number }}</h2>
                  <ul class="modal-guest-list">
                    <li v-for="guest in selectedTable.guests" :key="guest.id">
                      <i class="fas fa-user"></i> {{ guest.name }}
                    </li>
                  </ul>
                  <button @click="closeModal" class="btn btn-secondary">
                    <i class="fas fa-times"></i> Zamknij
                  </button>
                </div>
              </div>
            </transition>
          </div>
  
          <!-- Reklama dla niezalogowanych -->
          <div v-else class="table-planner-promo text-justify">
            <h1>Zarządzaj rozmieszczeniem stołów z Planerem Stołów!</h1>
            <p>
              Zarejestruj się, aby korzystać z funkcji zarządzania stołami. Dodawaj, edytuj i przypisuj gości do stołów, aby zapewnić idealne rozmieszczenie na Twoim weselu.
            </p>
  
            <div class="feature-text">
              <h2>Jak działa nasz Planer Stołów?</h2>
              <p>
                Po założeniu darmowego konta, w menu głównym znajdziesz opcję "Planer Stołów". Po jej wybraniu ukaże się widok, który zawiera:
              </p>
              <ul>
                <li><strong>Dodawanie stołów</strong> – umożliwia tworzenie nowych stołów i ich numerowanie.</li>
                <li><strong>Przypisywanie gości</strong> – przypisuj gości do wybranych stołów, aby łatwo zarządzać ich miejscami.</li>
                <li><strong>Podgląd szczegółów</strong> – kliknij na stół, aby zobaczyć listę przypisanych gości.</li>
              </ul>
              <p>
                Dzięki temu narzędziu jednym rzutem oka zobaczysz, jak rozplanowane są stoły na Twoim weselu, co ułatwi organizację i zapewni płynny przebieg uroczystości.
              </p>
            </div>
  
            <img
              src="/images/TablePlanner.png"
              class="img-fluid"
              alt="Przykład planera stołów"
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
  import { ref, computed } from "vue";
  
  // Symulacja logowania/wylogowania
  const isLoggedIn = ref(false); // Domyślnie niezalogowany
  
  function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value;
  }
  
  // Dane stołów
  interface Guest {
    id: number;
    name: string;
  }
  
  interface Table {
    id: number;
    number: number;
    guests: Guest[];
  }
  
  const tables = ref<Table[]>([
    {
      id: 1,
      number: 1,
      guests: [
        { id: 1, name: "Ryszard Motadella" },
        { id: 2, name: "Ania Nowak" },
      ],
    },
    {
      id: 2,
      number: 2,
      guests: [
        { id: 3, name: "Grażyna Spór" },
        { id: 4, name: "Filip Gozdyra" },
      ],
    },
  ]);
  
  // Statystyki
  const stats = computed(() => [
    {
      id: 1,
      icon: "fas fa-chair",
      value: tables.value.length,
      label: "Łączna liczba stołów",
    },
    {
      id: 2,
      icon: "fas fa-users",
      value: totalGuests.value,
      label: "Łączna liczba gości",
    },
  ]);
  
  const totalGuests = computed(() =>
    tables.value.reduce((acc, table) => acc + table.guests.length, 0)
  );
  
  // Dodawanie stołu
  let nextTableId = tables.value.length + 1;
  let nextGuestId = tables.value.reduce((acc, table) => {
    return acc + table.guests.length;
  }, 0) + 1;
  
  function addTable() {
    tables.value.push({
      id: nextTableId,
      number: nextTableId,
      guests: [],
    });
    nextTableId++;
  }
  
  // Usuwanie stołu
  function removeTable(tableId: number) {
    tables.value = tables.value.filter((table) => table.id !== tableId);
  }
  
  // Przypisywanie gościa
  const newGuestName = ref("");
  function addGuest(tableId: number) {
    if (newGuestName.value.trim() === "") return;
    const table = tables.value.find((t) => t.id === tableId);
    if (table) {
      table.guests.push({
        id: nextGuestId,
        name: newGuestName.value.trim(),
      });
      nextGuestId++;
      newGuestName.value = "";
    }
  }
  
  // Usuwanie gościa
  function removeGuest(tableId: number, guestId: number) {
    const table = tables.value.find((t) => t.id === tableId);
    if (table) {
      table.guests = table.guests.filter((guest) => guest.id !== guestId);
    }
  }
  
  // Resetowanie planera
  function resetPlanner() {
    tables.value = [];
    nextTableId = 1;
    nextGuestId = 1;
  }
  
  // Modal do wyświetlania szczegółów stołu
  const selectedTable = ref<Table | null>(null);
  
  function selectTable(table: Table) {
    selectedTable.value = table;
  }
  
  function closeModal() {
    selectedTable.value = null;
  }
  </script>
  
  <style scoped>
  .table-planner-section {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header-section h1 {
    font-size: 2rem;
    color: #6b1c92
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .btn-primary,
  .btn-danger {
    display: inline-flex;
    align-items: center;
    background-color: #6b1c92;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-danger {
    background-color: #dc3545;
  }
  
  .btn-primary:hover {
    background-color: #5a167e;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
  }
  
  .stats-section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  
  .stat-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    flex: 1 1 30%;
    display: flex;
    align-items: center;
    padding: 20px;
    margin: 10px;
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
  
  .planner-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
  }
  
  .table-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 300px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    position: relative;
  }
  
  .table-card.selected {
    border-color: #6b1c92;
    box-shadow: 0 4px 12px rgba(107, 28, 146, 0.3);
  }
  
  .table-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #333;
  }
  
  .btn-remove {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .btn-remove:hover {
    color: #a71d2a;
  }
  
  .guest-list {
    list-style: none;
    padding: 0;
    margin: 0 0 10px 0;
  }
  
  .guest-list li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    color: #555;
  }
  
  .guest-list li i {
    margin-right: 8px;
  }
  
  .btn-small {
    padding: 5px 8px;
    font-size: 0.8rem;
  }
  
  .btn-add-guest {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-add-guest:hover {
    background-color: #218838;
  }
  
  .btn-remove-guest {
    background: none;
    border: none;
    color: #dc3545;
    cursor: pointer;
    margin-left: auto;
  }
  
  .btn-remove-guest:hover {
    color: #a71d2a;
  }
  
  .add-guest {
    display: flex;
    align-items: center;
  }
  
  .add-guest-input {
    flex: 1;
    padding: 5px 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-right: 5px;
    transition: border-color 0.3s ease;
  }
  
  .add-guest-input:focus {
    border-color: #6b1c92;
    outline: none;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal-content h2 {
    margin-top: 0;
    color: #6b1c92;
  }
  
  .modal-guest-list {
    list-style: none;
    padding: 0;
    margin: 15px 0;
  }
  
  .modal-guest-list li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: #555;
  }
  
  .modal-guest-list li i {
    margin-right: 8px;
  }
  
  .modal-content .btn-secondary {
    background-color: #6b1c92;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .modal-content .btn-secondary:hover {
    background-color: #5a167e;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
  
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .table-planner-promo {
    margin-top: 40px;
    animation: fadeIn 1s ease-in-out;
  }
  
  .table-planner-promo h1 {
    font-size: 2rem;
    color: #6b1c92;
    margin-bottom: 20px;
  }
  
  .table-planner-promo p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: #555;
  }
  
  .feature-text {
    margin-bottom: 30px;
  }
  
  .feature-text h2 {
    font-size: 1.5rem;
    color: #6b1c92;
    margin-top: 20px;
  }
  
  .feature-text p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
  
  .feature-text ul {
    list-style: disc inside;
    margin-left: 20px;
    color: #555;
  }
  
  .feature-text li {
    margin-bottom: 10px;
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
  
  .btn-primary i,
  .btn-secondary i {
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    .header-section {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .actions {
      margin-top: 10px;
      width: 100%;
      display: flex;
      gap: 10px;
    }
  
    .stats-section {
      flex-direction: column;
      align-items: stretch;
    }
  
    .stat-card {
      flex: 1 1 100%;
    }
  
    .planner-container {
      flex-direction: column;
      align-items: center;
    }
  
    .table-card {
      width: 100%;
    }
  
    .button-group {
      flex-direction: column;
      align-items: stretch;
    }
  
    .btn-primary,
    .btn-secondary {
      width: 100%;
      justify-content: center;
    }
  }
  </style>
  