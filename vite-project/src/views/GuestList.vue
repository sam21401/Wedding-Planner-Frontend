<template>
  <section class="guest-list-section">
    <div class="container">
      <transition name="fade">
        <div v-if="isLoggedIn" class="logged-in-view">
          <div class="header-section">
            <h1>Lista Gości</h1>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Wyszukaj gościa..."
              class="search-bar"
            />
          </div>
          <div class="stats-section">
            <div class="stat-card" v-for="stat in stats" :key="stat.id">
              <i :class="stat.icon" class="stat-icon"></i>
              <div>
                <h3>{{ stat.value }}</h3>
                <p>{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <table class="guest-table">
            <thead>
              <tr>
                <th>Gość</th>
                <th>Wesele</th>
                <th>Poprawiny</th>
                <th>Noclegi</th>
                <th>Ostatnie logowanie</th>
                <th>Menu</th>
                <th>Aktywny</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="guest in filteredGuests" :key="guest.id">
                <td>{{ guest.name }}</td>
                <td>
                  <i
                    :class="guest.wedding ? 'fas fa-check-circle text-success' : 'fas fa-times-circle text-danger'"
                  ></i>
                </td>
                <td>
                  <i
                    :class="guest.afterParty ? 'fas fa-check-circle text-success' : 'fas fa-times-circle text-danger'"
                  ></i>
                </td>
                <td>
                  <i
                    :class="guest.accommodation ? 'fas fa-check-circle text-success' : 'fas fa-times-circle text-danger'"
                  ></i>
                </td>
                <td>{{ guest.lastLogin }}</td>
                <td>{{ guest.menu || 'Brak' }}</td>
                <td>
                  <i
                    :class="guest.active ? 'fas fa-circle text-success' : 'fas fa-circle text-secondary'"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="guest-list-promo text-justify">
          <h1>Zarządzaj swoją listą gości z Planerem Wesela!</h1>
          <p>
            Zarejestruj się, aby korzystać z funkcji zarządzania gośćmi. Dodawaj,
            edytuj i miej pełną kontrolę nad swoją listą gości w jednym miejscu.
          </p>

          <div class="feature-text">
            <h2>Jak działa nasza lista gości?</h2>
            <p>
              Po założeniu darmowego konta, w menu głównym znajdziesz opcję "Lista gości". Po jej wybraniu ukaże się widok, który zawiera:
            </p>
            <ul>
              <li><strong>Przyciski akcji</strong> – umożliwiają dodanie nowych gości, pobranie listy potwierdzonych osób oraz generowanie załączników do zaproszeń.</li>
              <li><strong>Uczestnicy spoza listy gości</strong> – sekcja dedykowana dla osób takich jak zespół muzyczny czy fotograf, którzy nie potrzebują zaproszeń, ale wymagają miejsca przy stole.</li>
              <li><strong>Lista gości</strong> – główna sekcja, w której możesz przechowywać dane wszystkich zaproszonych osób.</li>
            </ul>
            <p>
              Dzięki temu kompleksowemu rozwiązaniu jednym rzutem oka zobaczysz, ilu gości przyjdzie na poprawiny lub ilu będzie potrzebować noclegu. Proste i przejrzyste narzędzie oszczędzi Twój czas i pomoże Ci uniknąć niepotrzebnego stresu.
            </p>

            <h2>Organizacja na najwyższym poziomie</h2>
            <p>
              Dzięki naszej liście gości łatwo zaplanujesz rozmieszczenie uczestników na sali weselnej czy w hotelu. Planer stołów w połączeniu z listą gości pozwala na błyskawiczne przygotowanie planu sali weselnej. Jeśli oferujesz nocleg, skorzystasz także z planera noclegów, by zorganizować pokoje dla przyjezdnych gości.
            </p>

            <h2>Alternatywa dla Excela i notatek</h2>
            <p>
              Zarządzanie listą gości w Excelu to czasochłonne i mało wygodne rozwiązanie, szczególnie na urządzeniach mobilnych. Dzięki naszej aplikacji Excel stanie się zbędny – nawet na darmowym koncie. Możesz szybko wprowadzać zmiany, dodawać nowych gości lub edytować ich dane, korzystając z telefonu czy tabletu.
            </p>

            <h2>Deklaracje online</h2>
            <p>
              Jedną z najciekawszych funkcji aplikacji są deklaracje online. Dzięki nim lista gości zacznie się "uzupełniać sama". Po wysłaniu zaproszeń goście mogą logować się do systemu i oznaczać swoją obecność. Ty jako organizator masz pełną kontrolę – możesz modyfikować ich odpowiedzi i zarządzać listą bez żadnych ograniczeń.
            </p>
          </div>

          <img
            src="/images/GuestList.png"
            class="img-fluid"
            alt="Przykład listy gości"
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
import { reactive } from "@vue/runtime-dom";
import apiClient from "../services/api.js";
import router from "@/router";
import {AxiosError} from "axios";
import Guest from "@/components/Guest.vue";

const isLoggedIn = computed(() => localStorage.getItem("auth_token") !== null);

interface GuestForm {
  name: string;
  surname: string;

  email: string;
  phone: string;
}


const form = reactive<GuestForm>({
  email: "",
  name: "",
  surname: "",
  phone: "",
});

const errors = reactive({
  email: [],
  password: [],
  surname: [],
  phone: [],
});


const guestAdd = async (form: GuestForm) => {
  try {
    const response = await apiClient.post('guests', form);

    if (response.data.token) {
      const token = response.data.token;
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('auth_token', token);
      router.push({ name: 'WeddingLandingPage' });
    } else {
      errors.email = ['Niepoprawny email lub hasło'];
      errors.password = [''];
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      errors.email = ['Wystąpił błąd przy logowaniu. Spróbuj ponownie.'];
      errors.password = [''];
    }
  }
};

const guests = ref<Guest[]>([
  {
    id: 1,
    name: "Ryszard Motadella",
    wedding: true,
    afterParty: false,
    accommodation: false,
    lastLogin: "12.11.2024",
    menu: "wegańskie",
    active: true,
  },
  {
    id: 2,
    name: "Ania Nowak",
    wedding: true,
    afterParty: true,
    accommodation: false,
    lastLogin: "11.11.2024",
    menu: "",
    active: true,
  },
  {
    id: 3,
    name: "Grażyna Spór",
    wedding: false,
    afterParty: true,
    accommodation: true,
    lastLogin: "18.12.2024",
    menu: "bezglutenowe",
    active: true,
  },
  {
    id: 4,
    name: "Filip Gozdyra",
    wedding: false,
    afterParty: false,
    accommodation: false,
    lastLogin: "08.11.2024",
    menu: "",
    active: false,
  },
]);

const searchQuery = ref("");
const filteredGuests = computed(() =>
  guests.value.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const confirmedGuests = computed(() =>
  guests.value.filter(
    (guest) => guest.wedding || guest.afterParty || guest.accommodation
  ).length
);

const accommodationGuests = computed(() =>
  guests.value.filter((guest) => guest.accommodation).length
);

const stats = computed(() => [
  {
    id: 1,
    icon: "fas fa-users",
    value: guests.value.length,
    label: "Wszyscy Goście",
  },
  {
    id: 2,
    icon: "fas fa-check-circle",
    value: confirmedGuests.value,
    label: "Potwierdzonych",
  },
  {
    id: 3,
    icon: "fas fa-bed",
    value: accommodationGuests.value,
    label: "Potrzebują Noclegu",
  },
]);
</script>

<style scoped>
.guest-list-section {
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
  color: #333;
}

.search-bar {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  transition: border-color 0.3s ease;
}

.search-bar:focus {
  border-color: #6b1c92;
  outline: none;
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

.guest-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.guest-table th,
.guest-table td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 12px 15px;
}

.guest-table th {
  background-color: #6b1c92;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.guest-table td {
  color: #555;
}

.guest-table td i {
  font-size: 1.2rem;
}

.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}

.text-secondary {
  color: #6c757d;
}

.guest-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.guest-list-promo {
  margin-top: 40px;
  animation: fadeIn 1s ease-in-out;
}

.guest-list-promo h1 {
  font-size: 2rem;
  color: #6b1c92;
  margin-bottom: 20px;
}

.guest-list-promo p {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-bar {
    width: 100%;
    margin-top: 10px;
  }

  .stats-section {
    flex-direction: column;
    align-items: stretch;
  }

  .stat-card {
    flex: 1 1 100%;
  }

  .guest-table th,
  .guest-table td {
    padding: 10px;
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
