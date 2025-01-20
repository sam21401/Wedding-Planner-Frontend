<script setup lang="ts">
import { reactive } from "@vue/runtime-dom";
import apiClient from "../services/api.js";
import { AxiosError } from "axios";
import router from "@/router";
import { ref } from "vue";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const form = reactive<RegisterForm>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const message = reactive({
  message: "",
});

const errors = reactive({
  name: [],
  email: [],
  password: [],
});

const successMessage = ref("");

const showSuccessMessage = (message: string) => {
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = "";
    router.push({ name: "Login" });
  }, 3000);
};

const register = async (form: RegisterForm) => {
  try {
    const response = await apiClient.post("register", form);
    if (response.data.errors) {
      errors.name = response.data.errors.name || [];
      errors.email = response.data.errors.email || [];
      errors.password = response.data.errors.password || [];
    } else {
      showSuccessMessage("Udało Ci się zarejestrować.");
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Błąd przy rejestracji", e);
    }
  }
};
</script>

<template>
  <form
      @submit.prevent="register(form)"
      class="container mt-5 p-4 border rounded shadow-lg bg-light"
  >
    <h1 class="text-center mb-4">Register</h1>

    <!-- Name Input Field -->
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
          type="text"
          id="name"
          name="name"
          v-model="form.name"
          class="form-control"
          placeholder="Enter your name"
      />
      <template v-if="errors.name?.length">
        <div class="text-danger">
          <span v-for="error in errors.name" :key="error">{{ error }}</span>
        </div>
      </template>
    </div>

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

    <!-- Password Confirmation Input Field -->
    <div class="mb-3">
      <label for="password_confirmation" class="form-label">Confirm Password</label>
      <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          v-model="form.password_confirmation"
          class="form-control"
          placeholder="Confirm your password"
      />
    </div>

    <template v-if="message.message">
      <div class="text-danger">
        <span v-for="msg in message.message" :key="msg">{{ msg }}</span>
      </div>
    </template>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary w-100">
      Submit
    </button>
  </form>

  <!-- Success Message -->
  <div v-if="successMessage" class="alert alert-success mt-3 text-center">
    {{ successMessage }}
  </div>
</template>

<style>
.form-control {
  text-transform: lowercase;
}
</style>
