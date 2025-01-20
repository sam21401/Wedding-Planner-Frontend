<template>
  <header class="header_section">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-ring" style="color: #6b1c92; font-size: 2rem; margin-right: 10px;"></i>
        <span style="font-size: 1.5rem; font-weight: bold; color: #6b1c92;">Planer Wesela</span>
      </router-link>

      <!-- Nawigacja -->
      <nav class="navbar navbar-expand-lg custom_nav-container flex-grow-1">
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: isActive('/') }" to="/">Start</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: isActive('/o-nas') }" to="/o-nas">O nas</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
              >
                Strona Weselna <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/wedding-landing-page">
                    Dodaj
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
              >
                Aplikacja <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/goscie">Lista gości</router-link></li>
                <li><router-link class="dropdown-item" to="/o-aplikacji/planer-stolow">Planer stołów</router-link></li>
                <li><router-link class="dropdown-item" to="/o-aplikacji/planer-noclegow">Planer noclegów</router-link></li>
                <li><router-link class="dropdown-item" to="/o-aplikacji/organizer-zadan">Organizer zadań</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: isActive('/faq') }" to="/faq">FAQ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: isActive('/kontakt') }" to="/kontakt">Kontakt</router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Zaloguj/Wyloguj z rozwijanym menu -->
      <div class="dropdown custom-login-wrapper">
        <a href="#" class="custom-login-link dropdown-toggle" id="loginDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-user"></i>
          <span v-if="isLoggedIn">Wyloguj</span>
          <span v-else>Zaloguj</span>
        </a>
        <ul class="dropdown-menu" aria-labelledby="loginDropdown">
          <li v-if="!isLoggedIn"><router-link class="dropdown-item" to="/logowanie"><i class="fas fa-envelope me-2"></i>Zaloguj</router-link></li>
          <li v-if="!isLoggedIn"><a class="dropdown-item" href="/logowanie/google"><i class="fab fa-google me-2"></i>Zaloguj przez Sociale</a></li>
          <li v-if="isLoggedIn"><a class="dropdown-item" @click.prevent="logout"><i class="fas fa-sign-out-alt me-2"></i>Wyloguj</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();

    const isLoggedIn = ref(localStorage.getItem("auth_token") !== null);

    const logout = () => {
      localStorage.removeItem("auth_token");
      isLoggedIn.value = false;
      router.push("/");
    };

    const isActive = (path: string) => router.currentRoute.value.path === path;

    return {
      isLoggedIn,
      isActive,
      logout
    };
  }
};
</script>
