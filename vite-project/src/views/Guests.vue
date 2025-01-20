<template>
  <section class="guest-list-section">
    <div class="container">
      <div class="form-section">
        <h2>{{ isEditing ? "Edytuj Gościa" : "Dodaj Nowego Gościa" }}</h2>
        <form @submit.prevent="isEditing ? updateGuest() : addGuest()">
          <div class="form-group">
            <label for="name">Imię</label>
            <input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="Wpisz imię"
            />
            <span class="error">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label for="surname">Nazwisko</label>
            <input
                type="text"
                id="surname"
                v-model="form.surname"
                placeholder="Wpisz nazwisko"
            />
            <span class="error">{{ errors.surname }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="Wpisz email"
            />
            <span class="error">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="phone">Telefon</label>
            <input
                type="text"
                id="phone"
                v-model="form.phone"
                placeholder="Wpisz numer telefonu"
            />
            <span class="error">{{ errors.phone }}</span>
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-success">
              {{ isEditing ? "Zapisz zmiany" : "Dodaj Gościa" }}
            </button>
            <button
                type="button"
                class="btn btn-secondary"
                v-if="isEditing"
                @click="cancelEdit"
            >
              Anuluj
            </button>
          </div>
        </form>

        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      </div>

      <div class="guest-list">
        <h2>Lista Gości</h2>
        <table>
          <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="guest in guests" :key="guest.id">
            <td>{{ guest.name }}</td>
            <td>{{ guest.surname }}</td>
            <td>{{ guest.email }}</td>
            <td>{{ guest.phone }}</td>
            <td>{{ guest.status}}</td>
            <td>
              <button class="btn btn-warning" @click="editGuest(guest)">
                Edytuj
              </button>
              <button
                  class="btn btn-danger"
                  @click="deleteGuest(guest.id)"
              >
                Usuń
              </button>
            </td>
          </tr>
          <tr v-if="guests.length === 0">
            <td colspan="5" class="no-data">
              Brak gości do wyświetlenia.
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "GuestCRUD",
  setup() {
    const guests = ref([]);
    const form = reactive({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    const errors = reactive({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    const successMessage = ref("");
    const errorMessage = ref("");
    const isEditing = ref(false);
    const currentGuestId = ref(null);

    const apiClient = axios.create({
      baseURL: "http://localhost/api/",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });

    const fetchGuests = async () => {
      try {
        const response = await apiClient.get("/guests");
        guests.value = response.data.data || [];
      } catch (e) {
        console.error("Failed to fetch guests:", e);
      }
    };

    const addGuest = async () => {
      try {
        await apiClient.post("/guests", form);
        await fetchGuests();
        showSuccessMessage("Gość został dodany pomyślnie.");
        resetForm();
      } catch (e) {
        handleErrors(e);
      }
    };

    const editGuest = (guest) => {
      form.name = guest.name;
      form.surname = guest.surname;
      form.email = guest.email;
      form.phone = guest.phone;
      currentGuestId.value = guest.id;
      isEditing.value = true;
    };

    const updateGuest = async () => {
      try {
        await apiClient.put(`/guests/${currentGuestId.value}`, form);
        await fetchGuests();
        showSuccessMessage("Gość został zaaktualizowany pomyślnie.");
        resetForm();
      } catch (e) {
        handleErrors(e);
      }
    };

    const deleteGuest = async (guestId) => {
      try {
        await apiClient.delete(`/guests/${guestId}`);
        await fetchGuests();
        showSuccessMessage("Gość został usunięty pomyślnie.");
      } catch (e) {
        console.error("Failed to delete guest:", e);
      }
    };

    const resetForm = () => {
      form.name = "";
      form.surname = "";
      form.email = "";
      form.phone = "";
      currentGuestId.value = null;
      isEditing.value = false;
    };

    const cancelEdit = () => {
      resetForm();
    };

    const handleErrors = (e) => {
      if (e.response && e.response.data.errors) {
        const serverErrors = e.response.data.errors;
        Object.keys(errors).forEach((field) => {
          errors[field] = serverErrors[field] || "";
        });
      } else {
        errorMessage.value = "Wystąpił nieoczekiwany błąd.";
        setTimeout(() => (errorMessage.value = ""), 3000);
        console.error("An unexpected error occurred:", e);
      }
    };

    const showSuccessMessage = (message) => {
      successMessage.value = message;
      setTimeout(() => (successMessage.value = ""), 3000);
    };

    onMounted(() => {
      fetchGuests();
    });

    return {
      guests,
      form,
      errors,
      successMessage,
      errorMessage,
      isEditing,
      addGuest,
      editGuest,
      updateGuest,
      deleteGuest,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 0.875em;
}

.alert {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.no-data {
  text-align: center;
  font-style: italic;
}
</style>
