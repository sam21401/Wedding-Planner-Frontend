<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "../services/api.js";
import { useRouter } from "vue-router";

// Router
const router = useRouter();
const isLoggedIn = computed(() => localStorage.getItem("auth_token") !== null);
const token = localStorage.getItem("auth_token");
if (!token) {
  console.error("Brak tokenu w LocalStorage!");
}
const successMessage = ref("");
const errorMessage = ref("");
const posts = ref([]);
const singlePost = ref({
  title: "",
  description: "",
  wedding_date: "",
  venue_name: "",
  venue_address: "",
  theme: "",
  dress_code: "",
  estimated_cost: 0,
  latitude: null,
  longitude: null,
  rsvp_deadline: "",
  transportation_notes: "",
  gifts: "",
  music_type: "",
  host: "",
  with_children: true,
});

async function fetchPosts() {
  try {
    const response = await axios.get("/posts");
    posts.value = response.data;
  } catch (error) {
    console.error("Nie udało się pobrać postów:", error);
  }
}

const showSuccessMessage = (message) => {
  successMessage.value = message;
  setTimeout(() => (successMessage.value = ""), 3000);
};

async function createPost() {
  try {
    await axios.post("/posts", singlePost.value);
    fetchPosts();
    showSuccessMessage("Wesele zostało dodane pomyślnie.");
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
    }
    console.error("Błąd przy tworzeniu posta:", error);
  }
}

async function editPost(post) {
  singlePost.value = { ...post };
}

async function updatePost(id) {
  try {
    const updatedPost = { ...singlePost.value };
    await axios.put(`/posts/${id}`, updatedPost);
    fetchPosts();
    showSuccessMessage("Wesele zostało zaaktualizowane pomyślnie.");
  } catch (error) {
    console.error("Błąd przy aktualizacji:", error);
  }
}

async function deletePost(id: number) {
  try {
    await axios.delete(`/posts/${id}`);
    fetchPosts();
    showSuccessMessage("Wesele zostało usunięte pomyślnie.");
  } catch (error) {
    console.error("Błąd przy usuwaniu posta:", error);
  }
}

onMounted(() => {
  fetchPosts();
});

const errors = ref([]);
</script>

<template>
  <form @submit.prevent="singlePost.id ? updatePost(singlePost.id) : createPost()" class="wedding-form">
    <div class="form-group">
      <label for="title">Tytuł:</label>
      <input
          id="title"
          v-model="singlePost.title"
          type="text"
          required
          maxlength="255"
          placeholder="Tytuł wesela"
      />
    </div>

    <div class="form-group">
      <label for="description">Opis:</label>
      <textarea
          id="description"
          v-model="singlePost.description"
          placeholder="Opcjonalny opis wesela"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="wedding_date">Data wesela:</label>
      <input
          id="wedding_date"
          v-model="singlePost.wedding_date"
          type="date"
          placeholder="YYYY-MM-DD"
      />
    </div>

    <div class="form-group">
      <label for="venue_address">Adres sali:</label>
      <input
          id="venue_address"
          v-model="singlePost.venue_address"
          type="text"
          placeholder="Adres wesela"
      />
    </div>

    <div class="form-group">
      <label for="latitude">Szerokość geograficzna:</label>
      <input
          id="latitude"
          v-model="singlePost.latitude"
          type="number"
          step="0.0000001"
          placeholder="Np. 50.0646501"
      />
    </div>

    <div class="form-group">
      <label for="longitude">Długość geograficzna:</label>
      <input
          id="longitude"
          v-model="singlePost.longitude"
          type="number"
          step="0.0000001"
          placeholder="Np. 19.9449799"
      />
    </div>

    <div class="form-group">
      <label for="dress_code">Dress Code:</label>
      <input
          id="dress_code"
          v-model="singlePost.dress_code"
          type="text"
          placeholder="Np. Formalny"
      />
    </div>

    <div class="form-group">
      <label for="with_children">Czy na przyjęciu będą dzieci?</label>
      <select id="with_children" v-model="singlePost.with_children" class="form-select">
        <option value="true">Tak</option>
        <option value="false">Nie</option>
      </select>
    </div>

    <button type="submit" class="btn btn-success">
      {{ singlePost.id ? "Edytuj" : "Dodaj" }}
    </button>
  </form>

  <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
  <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

  <section v-if="posts.length">
    <h2>Twoje posty:</h2>
    <table class="post-table">
      <thead>
      <tr>
        <th>Tytuł</th>
        <th>Opis</th>
        <th>Data wesela</th>
        <th>Akcje</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
        <td>{{ post.wedding_date }}</td>
        <td>
          <button class="btn btn-success" @click="editPost(post)">Edytuj</button>
          <button class="btn btn-danger" @click="deletePost(post.id)">Usuń</button>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-success {
  background-color: #28a745;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  text-align: center;
  cursor: pointer;
  border: none;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.post-table th,
.post-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.post-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
</style>
