<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import apiClient from "../services/api.js";
import { AxiosError } from "axios";
import router from "@/router";

interface LoginForm {
  email: string;
  password: string;
}


const form = reactive<LoginForm>({
  email: "",
  password: "",
});

const errors = reactive({
  email: [],
  password: [],
});


const isLoggedIn = computed(() => localStorage.getItem("auth_token") !== null);


const login = async (form: LoginForm) => {
  try {
    const response = await apiClient.post('login', form);

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
</script>

<template>
  <form @submit.prevent="login(form)" v-if="!isLoggedIn" class="container mt-5 p-4 border rounded shadow-lg bg-light">
    <h1 class="text-center mb-4">Logowanie</h1>

    <!-- Email Input Field -->
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
          type="email"
          id="email"
          name="email"
          v-model="form.email"
          class="form-control"
          placeholder="Enter your email"
      />
      <template v-if="errors.email?.length">
        <div class="text-danger">
          <span v-for="error in errors.email" :key="error">{{ error }}</span>
        </div>
      </template>
    </div>

    <!-- Password Input Field -->
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
          type="password"
          id="password"
          name="password"
          v-model="form.password"
          class="form-control"
          placeholder="Enter your password"
      />
      <template v-if="errors.password?.length">
        <div class="text-danger">
          <span v-for="error in errors.password" :key="error">{{ error }}</span>
        </div>
      </template>
    </div>
    <button
        type="submit"
        class="btn btn-primary w-100"
    >
      Submit
    </button>
  </form>
</template>

<style>
.form-control {
  text-transform: lowercase;
}
</style>
