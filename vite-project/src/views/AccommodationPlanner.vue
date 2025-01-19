<template>
    <section class="accommodation-planner-section">
      <div class="container">
        <!-- Widok dla zalogowanych użytkowników -->
        <transition name="fade">
          <div v-if="isLoggedIn" class="logged-in-view">
            <!-- Nagłówek i akcje -->
            <div class="header-section">
              <h1>Planer Noclegów</h1>
              <div class="actions">
                <button @click="addRoom" class="btn btn-primary">
                  <i class="fas fa-plus"></i> Dodaj Pokój
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
  
            <!-- Lista pokoi -->
            <div class="planner-container">
              <div
                class="room-card"
                v-for="room in rooms"
                :key="room.id"
                @click="selectRoom(room)"
                :class="{ selected: selectedRoom && selectedRoom.id === room.id }"
              >
                <div class="room-header">
                  <i class="fas fa-bed"></i> Pokój {{ room.number }}
                  <button @click.stop="removeRoom(room.id)" class="btn btn-remove">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
                <ul class="guest-list">
                  <li v-for="guest in room.guests" :key="guest.id">
                    <i class="fas fa-user"></i> {{ guest.name }}
                    <button
                      @click.stop="removeGuest(room.id, guest.id)"
                      class="btn btn-small btn-remove-guest"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </li>
                </ul>
                <div class="add-guest">
                  <input
                    type="text"
                    v-model="newGuestName"
                    placeholder="Dodaj gościa..."
                    @keyup.enter="addGuest(room.id)"
                    class="add-guest-input"
                  />
                  <button @click="addGuest(room.id)" class="btn btn-small btn-add-guest">
                    <i class="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Modal szczegółów pokoju -->
            <transition name="modal">
              <div v-if="selectedRoom" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content">
                  <h2>Pokój {{ selectedRoom.number }}</h2>
                  <ul class="modal-guest-list">
                    <li v-for="guest in selectedRoom.guests" :key="guest.id">
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
          <div v-else class="accommodation-planner-promo text-justify">
            <h1>Planuj noclegi z łatwością!</h1>
            <p>
              Zarejestruj się, aby zarządzać pokojami noclegowymi dla swoich gości.
              Dodawaj pokoje, przypisuj gości i miej pełną kontrolę nad miejscami noclegowymi.
            </p>
            <img src="/images/AccommodationPlanner.png" class="img-fluid" alt="Planer noclegów" />
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
  
  // Dane pokoi i gości
  interface Guest {
    id: number;
    name: string;
  }
  
  interface Room {
    id: number;
    number: number;
    guests: Guest[];
  }
  
  const rooms = ref<Room[]>([
    {
      id: 1,
      number: 101,
      guests: [
        { id: 1, name: "Ryszard Motadella" },
        { id: 2, name: "Ania Nowak" },
      ],
    },
    {
      id: 2,
      number: 102,
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
      icon: "fas fa-bed",
      value: rooms.value.length,
      label: "Liczba Pokoi",
    },
    {
      id: 2,
      icon: "fas fa-users",
      value: totalGuests.value,
      label: "Łączna liczba gości",
    },
  ]);
  
  const totalGuests = computed(() =>
    rooms.value.reduce((acc, room) => acc + room.guests.length, 0)
  );
  
  // Dodawanie pokoju
  let nextRoomId = rooms.value.length + 1;
  let nextGuestId = rooms.value.reduce((acc, room) => acc + room.guests.length, 0) + 1;
  
  function addRoom() {
    rooms.value.push({
      id: nextRoomId,
      number: 100 + nextRoomId,
      guests: [],
    });
    nextRoomId++;
  }
  
  // Usuwanie pokoju
  function removeRoom(roomId: number) {
    rooms.value = rooms.value.filter((room) => room.id !== roomId);
  }
  
  // Przypisywanie gości
  const newGuestName = ref("");
  function addGuest(roomId: number) {
    if (newGuestName.value.trim() === "") return;
    const room = rooms.value.find((r) => r.id === roomId);
    if (room) {
      room.guests.push({
        id: nextGuestId,
        name: newGuestName.value.trim(),
      });
      nextGuestId++;
      newGuestName.value = "";
    }
  }
  
  // Usuwanie gości
  function removeGuest(roomId: number, guestId: number) {
    const room = rooms.value.find((r) => r.id === roomId);
    if (room) {
      room.guests = room.guests.filter((guest) => guest.id !== guestId);
    }
  }
  
  // Resetowanie planera
  function resetPlanner() {
    rooms.value = [];
    nextRoomId = 1;
    nextGuestId = 1;
  }
  
  // Modal szczegółów pokoju
  const selectedRoom = ref<Room | null>(null);
  
  function selectRoom(room: Room) {
    selectedRoom.value = room;
  }
  
  function closeModal() {
    selectedRoom.value = null;
  }
  </script>
  
  <style scoped>
  .accommodation-planner-section {
    padding: 20px;
    background-color: #f9f9f9;
    color: #6b1c92;
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
    color: #6b1c92;
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  /* Dodano resztę stylów podobnych do TablePlanner.vue */
  </style>
  